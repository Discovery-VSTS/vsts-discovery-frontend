// Project: VSTS Discovery extension
// JavaScript functions for controlling code tracker status component
// Author: Yichen Lu
// Create Date: 7-Mar-2017
// Update Date: 7-Mar-2017

// var endpoint = "https://138.68.147.100:8000/" // live
var endpoint = "http://127.0.0.1:8000/" // dev


var addChartSelector;
var addChartConfigObj;
var addChartLabels;
var addChartData;
var addChartOptions;
var addChart;

var testCovChartSelector;
var testCovChartConfigObj;
var testCovChartLabels;
var testCovChartData;
var testCovChartOptions;
var testCovChart;

var delChartSelector;
var delChartConfigObj;
var delChartLabels;
var delChartData;
var delChartOptions;
var delChart;

var gpaChartSelector;
var gpaChartConfigObj;
var gpaChartLabels;
var gpaChartData;
var gpaChartOptions;
var gpaChart;

var colorSet;

function loadCodetrackerStatus() {
    $('#codetracker-components').load("components/codetracker-status.html", function(response, status, xhr){
        if (status == "success") {
            // set up all charts
            addChartSelector = $("#addChart");
            testCovChartSelector = $("#testCovChart");
            delChartSelector = $("#delChart");
            gpaChartSelector = $("#gpaChart");

            if (colorSet===undefined) {
                colorSet = randomColorSet(chartLabels);
            }

            // configuration functions for each chart
            addChartConfig();
            testCovChartConfig();
            delChartConfig();
            gpaChartConfig();

        }

    });
}


function addChartConfig() {
	addChartConfigObj = {
	    labels: addChartLabels,
	    datasets: [
	        {
	            label: "History of points earned by "+selectedMemberName,
	            data: addChartData,
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

	addChartOptions = {

	};

	addChart = new Chart(addChartSelector, {
	    type: 'line',
	    data: addChartConfig,
	    options: addChartOptions
	});
}

function testCovChartConfig() {
	testCovChartConfigObj = {
	    labels: testCovChartLabels,
	    datasets: [
	        {
	            label: "History of points earned by "+selectedMemberName,
	            data: testCovChartData,
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

	testCovChartOptions = {

	};

	testCovChart = new Chart(testCovChartSelector, {
	    type: 'line',
	    data: testCovChartConfig,
	    options: testCovChartOptions
	});
}

function delChartConfig() {
	delChartConfigObj = {
	    labels: delChartLabels,
	    datasets: [
	        {
	            label: "History of points earned by "+selectedMemberName,
	            data: delChartData,
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

	delChartOptions = {

	};

	delChart = new Chart(delChartSelector, {
	    type: 'line',
	    data: delChartConfig,
	    options: delChartOptions
	});
}

function gpaChartConfig() {
	gpaChartConfigObj = {
	    labels: gpaChartLabels,
	    datasets: [
	        {
	            label: "History of points earned by "+selectedMemberName,
	            data: gpaChartData,
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

	gpaChartOptions = {

	};

	gpaChart = new Chart(gpaChartSelector, {
	    type: 'line',
	    data: gpaChartConfig,
	    options: gpaChartOptions
	});
}