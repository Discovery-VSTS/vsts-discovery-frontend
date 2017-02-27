// Project: VSTS Discovery extension
// JavaScript functions for controlling 100 points status component
// Author: Yichen Lu
// Create Date: 01-Feb-2017
// Update Date: 20-Feb-2017

function randomColors() {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    return "rgba(" + r + "," + g + "," + b + ", 0.4)";
}

function randomColorSet(labels) {
    var colorSet = [];
    if (labels===undefined) {
        for (var i = 10; i >= 0; i--) {
            colorSet.push(randomColors());
        }
    }else{
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

function load100PtStatus() {
    $('#100-points-components').load("components/100-points-status.html", function(response, status, xhr){
        if (status == "success") {
            console.log("start ajax");
            var now = moment().format("YYYY-MM-DD");

            // set up pie chart
            chartSelector = $("#pieChart");
            if (colorSet===undefined) {
                colorSet = randomColorSet(chartLabels);
            }

            pieDataConf = {
                labels: chartLabels,
                datasets: [
                    {
                        data: labelVal,
                        backgroundColor: colorSet,
                        hoverBackgroundColor: colorSet
                    }]
            };

            thisWeekPieChart = new Chart(chartSelector,{
                type: 'pie',
                data: pieDataConf,
                options: {
                    responsive: false
                }
            });
            getWeeklyDistribution(now);

            //fill members into dropdown list
            getMembers();
        }

    });
}

// get data for pie chart
function getWeeklyDistribution(date) {
    $.ajax({
        url: 'https://138.68.147.100:8000/v1/points/distribution/'+date,
        type: 'GET',
        dataType: 'json',
    })
    .done(function(data) {
        console.log("success");
        var chartLabels = [];
        var labelVal = [];
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
        if (colorSet===undefined) {
            colorSet = randomColorSet(chartLabels);
        }

        pieDataConf = {
            labels: chartLabels,
            datasets: [
                {
                    data: labelVal,
                    backgroundColor: colorSet,
                    hoverBackgroundColor: colorSet
                }]
        };
        thisWeekPieChart = new Chart(chartSelector,{
            type: 'pie',
            data: pieDataConf,
            options: {
                responsive: false
            }
        });
    })
    .fail(function(obj, textStatus, errorThrown) {
        console.log("error");
        // remove current chart and display error message
        thisWeekPieChart.destroy();
        alert(errorThrown);
    })
    .always(function() {
        console.log("complete");
    });

}

function getMembers() {
    $.ajax({
        url: 'http://138.68.147.100:8000/v1/members',
        type: 'GET',
        dataType: 'json'
    })
    .done(function(data) {
        console.log("success");
        // append items into list
        $.each(data, function(index, val) {
            $.each(val, function(dtype, val) {
                console.log(dtype)
                if (dtype == "name") {
                    console.log(val);
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
            getHistoryDistribution($(this).attr("mem-email"));
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
        url: 'httpS://138.68.147.100:8000/v1/member/history/'+email,
        type: 'GET',
        dataType: 'json'
    })
    .done(function(data) {
        console.log("success");
        var chartLabels = [];
        var labelVal = [];
        // read data
        $.each(data, function(index, val) {
            if (index == "week") {
                chartLabels.push()
            }
            $.each(val, function(index, val) {
                 /* iterate through array or object */
            });
        });
    })
    .fail(function() {
        console.log("error");
    })
    .always(function() {
        console.log("complete");
    });
}


console.log(vssWebContext);
