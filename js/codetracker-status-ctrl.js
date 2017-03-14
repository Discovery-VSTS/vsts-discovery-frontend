// Project: VSTS Discovery extension
// JavaScript functions for controlling code tracker status component
// Author: Yichen Lu
// Create Date: 7-Mar-2017
// Update Date: 7-Mar-2017

var endpoint = "http://discovery-codemetrics.azurewebsites.net" // live
// var endpoint = "http://127.0.0.1:8000"; // dev

currentInstanceName = "vsts-discovery"; // dev
var repoName = "discovery-frontend";


var addChartSelector;
var addChartConfigObj;
var addChartLabels = [];
var addChartData = [];
var addChartOptions;
var addChart;

var testCovChartSelector;
var testCovChartConfigObj;
var testCovChartLabels = [];
var testCovChartData = [];
var testCovChartOptions;
var testCovChart;

var delChartSelector;
var delChartConfigObj;
var delChartLabels = [];
var delChartData = [];
var delChartOptions;
var delChart;

var gpaChartSelector;
var gpaChartConfigObj;
var gpaChartLabels = [];
var gpaChartData = [];
var gpaChartOptions;
var gpaChart;

var colorSet;

// generate colours with low and high opacity
function randomTwoColour() {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    var lo = "rgba(" + r + "," + g + "," + b + ",0.4)";
    var ho = "rgba(" + r + "," + g + "," + b + ",1)"
    return {low: lo, high: ho};
}

function loadCodetrackerStatus() {
    $('#codetracker-components').load("components/codetracker-status.html", function(response, status, xhr){
        if (status == "success") {
            // set up all charts
            addChartSelector = $("#addChart");
            testCovChartSelector = $("#testCovChart");
            delChartSelector = $("#delChart");
            gpaChartSelector = $("#gpaChart");


            $('#btn_testcov').click(function(event) {
            	console.log($('#github_user'))
            	getTestCoverage($('#github_repo').val());
            });


            // get data from backend
            getCommitStats(repoName);
            // getTestCoverage("codemetric");

            // configuration functions for each chart
            addChartConfig();
            testCovChartConfig();
            delChartConfig();
            gpaChartConfig();

        }

    });
}


function addChartConfig() {
	// generage random colours
	var colourPair = randomTwoColour();
	var lowColour = colourPair.low;
	var highColour = colourPair.high;

	addChartConfigObj = {
	    labels: addChartLabels,
	    datasets: [
	        {
	            label: "Line of code added over time",
	            data: addChartData,
	            fill: false,
	            lineTension: 0.1,
	            backgroundColor: lowColour,
	            borderColor: highColour,
	            borderCapStyle: 'butt',
	            borderDash: [],
	            borderDashOffset: 0.0,
	            borderJoinStyle: 'miter',
	            pointBorderColor: highColour,
	            pointBackgroundColor: "#fff",
	            pointBorderWidth: 1,
	            pointHoverRadius: 5,
	            pointHoverBackgroundColor: highColour,
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
	    data: addChartConfigObj,
	    options: addChartOptions
	});
}

function testCovChartConfig() {
	// generage random colours
	var colourPair = randomTwoColour();
	var lowColour = colourPair.low;
	var highColour = colourPair.high;

	testCovChartConfigObj = {
	    labels: testCovChartLabels,
	    datasets: [
	        {
	            label: "History of points earned by "+selectedMemberName,
	            data: testCovChartData,
	            fill: false,
	            lineTension: 0.1,
	            backgroundColor: lowColour,
	            borderColor: highColour,
	            borderCapStyle: 'butt',
	            borderDash: [],
	            borderDashOffset: 0.0,
	            borderJoinStyle: 'miter',
	            pointBorderColor: highColour,
	            pointBackgroundColor: "#fff",
	            pointBorderWidth: 1,
	            pointHoverRadius: 5,
	            pointHoverBackgroundColor: highColour,
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
	    data: testCovChartConfigObj,
	    options: testCovChartOptions
	});
}

function delChartConfig() {
	// generage random colours
	var colourPair = randomTwoColour();
	var lowColour = colourPair.low;
	var highColour = colourPair.high;

	delChartConfigObj = {
	    labels: delChartLabels,
	    datasets: [
	        {
	            label: "Line of code deleted over time",
	            data: delChartData,
	            fill: false,
	            lineTension: 0.1,
	            backgroundColor: lowColour,
	            borderColor: highColour,
	            borderCapStyle: 'butt',
	            borderDash: [],
	            borderDashOffset: 0.0,
	            borderJoinStyle: 'miter',
	            pointBorderColor: highColour,
	            pointBackgroundColor: "#fff",
	            pointBorderWidth: 1,
	            pointHoverRadius: 5,
	            pointHoverBackgroundColor: highColour,
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
	    data: delChartConfigObj,
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
	    data: gpaChartConfigObj,
	    options: gpaChartOptions
	});
}

function getCommitStats(repoName) {
	$.ajax({
		url: endpoint+'/repo-stats/commit-stats/',
		type: 'GET',
		dataType: 'json',
		data: {
			instance_name: currentInstanceName,
			repo_name: repoName
		},
	})
	.done(function(data) {
		console.log("commit stats success");
		console.log(data);
		$.each(data, function(epoch, obj) {
			var convertDate = moment(epoch*1000).format("DD/MMM/YYYY");
			var labelItem = convertDate;
			addChartLabels.push(labelItem);
			delChartLabels.push(labelItem);
			var addLoc = 0;
			var delLoc = 0;
			$.each(obj, function(index, obj) {
				addLoc += obj.commit.changes.add;
				delLoc += obj.commit.changes.delete;
			});
			addChartData.push(addLoc);
			delChartData.push(delLoc);
		});
	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});
}


function getTestCoverage(repoName) {
	$.ajax({
		url: endpoint+'/code-score/test_coverage',
		type: 'GET',
		dataType: 'json',
		data: {
			github_user: $('#github_user').val(),
			github_repo: repoName
		},
		headers: {
        "Authorization": "Basic "+$('#github_key').val(),
        'Access-Control-Allow-Origin': '*',
        'Content-Type':'text/plain'
    	},
	})
	.done(function(data) {
		console.log("test coverage success");
		console.log(data)
	})
	.fail(function() {
		console.log("test coverage error");
	})
	.always(function() {
		console.log("complete");
	});

}