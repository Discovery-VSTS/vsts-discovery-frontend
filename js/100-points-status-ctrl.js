// Project: VSTS Discovery extension
// JavaScript functions for controlling 100 points status component
// Author: Yichen Lu
// Create Date: 01-Feb-2017
// Update Date: 20-Feb-2017

// var endpoint = "https://138.68.147.100:8000/" // live
var endpoint = "http://127.0.0.1:8000/" // dev
// testing global variable for instance ID-->REMOVE in deployment
console.log(currentAccountID);

function randomColors() {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    return "rgba(" + r + "," + g + "," + b + ", 0.4)";
}

function randomColourSet(labels) {
    var colorSet = [];
    if (labels===undefined) { // don't know how many colours needed
        for (var i = 10; i >= 0; i--) {
            colorSet.push(randomColors());
        }
    }else{ // known how many colours needed
        for (var i = labels.length - 1; i >= 0; i--) {
            colorSet.push(randomColors());
        }
    }
    return colorSet;
}

var chartSelector;
var thisWeekPieChart;
var colorSet;
var chartLabels;
var labelVal;
var pieDataConf;

var lineChartSelector;
var memHistoryChart;
var memHistoryChartConfig;
var memHistoryChartOptions;
var memHistoryChartLabels;
var memHistoryChartData;
var selectedMemberEmail;
var selectedMemberName;

function load100PtStatus() {
    $('#100-points-components').load("components/100-points-status.html", function(response, status, xhr){
        if (status == "success") {
            console.log("start ajax");
            var today = moment().format("YYYY-MM-DD");

            $('#weekdatepicker').datetimepicker({
                format:"dd/M/yyyy",
                weekStart: 1,
                daysOfWeekDisabled: [0,2,3,4,5,6],
                startView: "month",
                minView: "month",
                maxView: "month",
                todayBtn: "linked",
                todayHighlight: true
            });

            $('#weekdatepicker').datetimepicker()
            .on('changeDate', function(ev){
                console.log("date changed")
                var selectedDate = moment(ev.date.valueOf()).format("YYYY-MM-DD");
                getWeeklyDistribution(selectedDate);
            });

            $('#weekdatepicker').val(moment(today).format("DD/MMM/YYYY"));

            if (colorSet===undefined) {
                colorSet = randomColourSet(chartLabels);
            }

            // set up pie chart
            chartSelector = $("#pieChart");
            // configure team weekly distribution pie chart
            teamWeekPieChartConfig();
            // display current week's distribution in pie chart
            getWeeklyDistribution(today);

            //fill members into dropdown list
            fillMembersDropdown();

            // configure line chart
            lineChartSelector = $('#lineChart');
            // configure member history line chart
            memHistoryLineChartConfig();
            // display current member data in line chart
            // code needed.....
        }

    });
}

function teamWeekPieChartConfig() {
    pieDataConf = {
        labels: chartLabels,
        datasets: [
            {
                data: labelVal,
                backgroundColor: colorSet,
                hoverBackgroundColor: colorSet,
                fill: false
            }]
    };

    thisWeekPieChart = new Chart(chartSelector,{
        type: 'pie',
        data: pieDataConf,
        options: {

        }
    });
}

function memHistoryLineChartConfig() {
    if (selectedMemberName === undefined) {
        selectedMemberName = "";
    }
    memHistoryChartConfig = {
        labels: memHistoryChartLabels,
        datasets: [
            {
                label: "History of points earned by "+selectedMemberName,
                data: memHistoryChartData,
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(75,192,192,0.4)",
                borderColor: "rgba(75,192,192,1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(75,192,192,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                spanGaps: false,
            }
        ]
    };

    memHistoryChartOptions = {

    };

    memHistoryChart = new Chart(lineChartSelector, {
        type: 'line',
        data: memHistoryChartConfig,
        options: memHistoryChartOptions
    });
}

// get data for pie chart
function getWeeklyDistribution(date) {
    $.ajax({
        url: endpoint+'v1/points/distribution/'+date,
        type: 'GET',
        dataType: 'json',
        xhrFields: {
            // The 'xhrFields' property sets additional fields on the XMLHttpRequest.
            // This can be used to set the 'withCredentials' property.
            // Set the value to 'true' if you'd like to pass cookies to the server.
            // If this is enabled, your server must respond with the header
            // 'Access-Control-Allow-Credentials: true'.
            withCredentials: false
        },
    })
    .done(function(data) {
        // console.log("success");
        $('#lbl_week_data_status').text("");
        chartLabels = [];
        labelVal = [];
        // read data
        var content = data.given_points;
        $.each(content, function(index, obj) {
            $.each(obj, function(key, val) {
                if (key == "to_member") {
                    chartLabels.push(val);
                }
                if (key == "points") {
                    labelVal.push(val);
                }
            });
        });

        // distory current chart and reinitialize a new one with new data
        thisWeekPieChart.destroy();
        // setup colours
        if (colorSet===undefined) {
            colorSet = randomColourSet(chartLabels);
        }
        // fill in data
        teamWeekPieChartConfig()
    })
    .fail(function(obj, textStatus, errorThrown) {
        console.log("get weekly distribution error");
        // remove current chart and display error message
        thisWeekPieChart.destroy();
        $('#lbl_week_data_status').text(errorThrown);
        // display empty chart
        chartLabels = ['Unknown'];
        labelVal = ['100'];
        teamWeekPieChartConfig()
    })
    .always(function() {
        console.log("complete");
    });

}

function fillMembersDropdown() {
    $.ajax({
        url: endpoint+'v1/members',
        type: 'GET',
        dataType: 'json',
        xhrFields: {
            // The 'xhrFields' property sets additional fields on the XMLHttpRequest.
            // This can be used to set the 'withCredentials' property.
            // Set the value to 'true' if you'd like to pass cookies to the server.
            // If this is enabled, your server must respond with the header
            // 'Access-Control-Allow-Credentials: true'.
            withCredentials: false
        },
    })
    .done(function(data) {
        // console.log("success");
        // append items into list
        $.each(data, function(index, val) {
            $.each(val, function(dtype, val) {
                // console.log(dtype)
                if (dtype == "name") {
                    // console.log(val);
                    $('#memListItems').append('<li><a href="#" id="mli-'+index+'">'+val+'</a></li>');
                }
                if (dtype == "email") {
                    $('#mli-'+index).attr('mem-email', val);
                }
            });
        });
        // bind onclick event
        $('#memListItems').on('click', 'a', function(event) {
            event.preventDefault();
            selectedMemberEmail = $(this).attr("mem-email")
            selectedMemberName = $(this).text();
            getHistoryDistribution(selectedMemberEmail);
        });
    })
    .fail(function() {
        console.log("error");
    })
    .always(function() {
        console.log("complete");
    });
}

function getHistoryDistribution(email) {
    $.ajax({
        url: endpoint+'v1/member/history/'+email,
        type: 'GET',
        dataType: 'json',
        xhrFields: {
            // The 'xhrFields' property sets additional fields on the XMLHttpRequest.
            // This can be used to set the 'withCredentials' property.
            // Set the value to 'true' if you'd like to pass cookies to the server.
            // If this is enabled, your server must respond with the header
            // 'Access-Control-Allow-Credentials: true'.
            withCredentials: false
        },
    })
    .done(function(data) {
        // console.log("success");
        memHistoryChartLabels = [];
        memHistoryChartData = [];
        // read data
        $.each(data, function(index, val) {
            $.each(val, function(index, val) {
                if (index == "week") {
                    memHistoryChartLabels.push(val);
                }
                if (index == "points") {
                    memHistoryChartData.push(val);
                }

            });
        });

        console.log(memHistoryChartLabels);
        console.log(memHistoryChartData);

        // destory current line chart
        memHistoryChart.destroy();

        memHistoryLineChartConfig();
        //
    })
    .fail(function() {
        console.log("error");
    })
    .always(function() {
        console.log("complete");
    });
}

