// Project: VSTS Discovery extension
// JavaScript functions for controlling code tracker status component
// Author: Yichen Lu
// Create Date: 7-Mar-2017
// Update Date: 7-Mar-2017

var codeMetricEndpoint = "https://discovery-codemetrics.azurewebsites.net" // live
// var codeMetricEndpoint = "http://127.0.0.1:8000"; // dev

// var repoName = "discovery-frontend"; //dev
var repoName;
var covRepoName;
var ctCurrentInstanceID;
var ctCurrentInstanceName;
var ctCurrentUserEmail;

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

var currentGPA = 0;

// var gpaChartSelector;
// var gpaChartConfigObj;
// var gpaChartLabels = [];
// var gpaChartData = [];
// var gpaChartOptions;
// var gpaChart;

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
        repoName = VSS.getWebContext().project.name;
        covRepoName = VSS.getWebContext().project.name;
        ctCurrentInstanceID = VSS.getWebContext().account.id;
        ctCurrentInstanceName = VSS.getWebContext().account.name;
        ctCurrentUserEmail = VSS.getWebContext().user.email;

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
            getTestCoverage();
            getGPA()

            // configuration functions for each chart
            // addChartConfig();
            // delChartConfig();
            testCovChartConfig();
            // gpaChartConfig();

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
	            label: "Code coverage changes over time. Repo: "+covRepoName,
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
    var bar = new ProgressBar.Circle(gpaChart, {
        strokeWidth: 6,
        color: '#DA375A',
        trailColor: '#eee',
        trailWidth: 1,
        easing: 'easeInOut',
        duration: 1400,
        svgStyle: null,
        text: {
            value: '',
            alignToBottom: false
        },
        from: { color: '#DA375A' },
        to: { color: '#48D522' },
        // Set default step function for all animate calls
        step: (state, bar) => {
            bar.path.setAttribute('stroke', state.color);
            var value = Math.round(bar.value() * 100);
            if (value === 0) {
                bar.setText('');
            } else {
                bar.setText(value);
            }

            bar.text.style.color = state.color;
        }
    });
    bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
    bar.text.style.fontSize = '2rem';

    bar.animate(1.0); // Number from 0.0 to 1.0
}


function getCommitStats(repoName) {
	$.ajax({
		url: codeMetricEndpoint+'/repo-stats/commit-stats/',
		type: 'GET',
		dataType: 'json',
		data: {
			instance_name: ctCurrentInstanceName,
			repo_name: repoName
		},
	})
	.done(function(data) {
		console.log("commit stats success");
        addChartLabels = [];
        delChartLabels = [];
        addChartData = [];
        delChartData = [];
		$.each(data, function(epoch, obj) {
			// convert epoch time to human readable date
			var convertDate = moment(epoch*1000).format("DD/MMM/YYYY");
			var labelItem = convertDate;
			// add lable items for addChart and delChart
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
        console.log("Printing chart labels...")
        console.log(addChartLabels);
        console.log(addChartData);

        addChartConfig();
        delChartConfig();
	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});
}


function getTestCoverage() {
	$.ajax({
		url: codeMetricEndpoint+'/code-score/test_coverage',
		type: 'GET',
		dataType: 'json',
		data: {
			instance_id: ctCurrentInstanceID,
            github_repo: repoName,
			user_email: ctCurrentUserEmail
		}
	})
	.done(function(data) {
		console.log("test coverage success");
		console.log(data)
		$.each(data, function(index, obj) {
			if (index == "coverage-history") {
				$.each(obj.data, function(index, obj) {
					var prettyDate = moment(obj.attributes.committed_at).format("DD/MMM/YYYY HH:mm")
					testCovChartLabels.push(prettyDate);
					testCovChartData.push(obj.attributes.covered_percent)
				});
			}
		});
		console.log(testCovChartLabels)
	})
	.fail(function() {
		console.log("test coverage error");
	})
	.always(function() {
		console.log("complete");
	});

}


function getGPA() {
	$.ajax({
		url: codeMetricEndpoint+'/code-score/gpa',
		type: 'GET',
		dataType: 'json',
		data: {
			instance_id: ctCurrentInstanceID,
            github_repo: repoName,
			user_email: ctCurrentUserEmail
		},
	})
	.done(function(data) {
		console.log("GPA success");
		// currentGPA =
		$('#gpaText').text(data.gpa)
	})
	.fail(function() {
		console.log("GPA error");
	})
	.always(function() {
		console.log("GPA complete");
	});

}