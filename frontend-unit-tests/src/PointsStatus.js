var Chart = function(x, y) {
	this.str = x;
	this.conf = y;

	this.destroy = function () {

	}
}
function PointsStatus () {
	
	var entries = new Array();
	var result = new Array();

	var chartSelector;
	var thisWeekPieChart;
	var colorSet;
	var chartLabels;
	var labelVal;
	var pieDataConf;
	var memHistoryChart;

	var lineChartSelector;
	var memHistoryChart;
	var memHistoryChartConfig;
	var memHistoryChartOptions;
	var memHistoryChartLabels;
	var memHistoryChartData;
	var selectedMemberEmail;
	var selectedMemberName;

	thisWeekPieChart = new Chart('', {
        type: 'pie',
        data: pieDataConf,
        options: {

        }		
	});

	this.addEntry = function(p) {
		entries.push(p);
		
	}

	this.teamWeekPieChartConfig = function() {
            pieDataConf = {
                labels: chartLabels,
                datasets: [
                    {
                        data: labelVal,
                        backgroundColor: colorSet,
                        hoverBackgroundColor: colorSet
                    }]
            };		
	}
		this.randomColors = function () {
	    var r = Math.floor(Math.random() * 255);
	    var g = Math.floor(Math.random() * 255);
	    var b = Math.floor(Math.random() * 255);
	    return "rgba(" + r + "," + g + "," + b + ", 0.4)";
	}

	this.randomColorSet = function(labels) {
	    var colorSet = [];
	    if (labels===undefined) {
	        for (var i = 10; i >= 0; i--) {
	            colorSet.push(this.randomColors());
	        }
	    }else{
	        for (var i = labels.length - 1; i >= 0; i--) {
	            colorSet.push(this.randomColors());
	        }
	    }
	    return colorSet;
	}

	this.load100PtStatus = function() {

            if (colorSet===undefined) {
            	//chartLabels = ['a', 'b']; 
                colorSet = this.randomColorSet(chartLabels);
            }

            this.teamWeekPieChartConfig();

	}
	this.destroy = function() {
		thisWeekPieChart.destroy();
	}
	this.getWeeklyDistribution = function(date) {
		
		for(var i = 0; i < entries.length; i++) {
			if (entries[i].getPointsDate() === date) {
				result.push(entries[i]);

			}
		}

		if (result.length >0) {
			var chartLabels = new Array();
			var labelVal = new Array();

			for (var i = 0; i < result.length; i++) {
				chartLabels.push(result[i].getName());
				chartLabels.push(result[i].getPoints());
			}
			this.destroy();
			

		if (colorSet===undefined) {
			
            colorSet = this.randomColorSet(chartLabels);
        }
			this.teamWeekPieChartConfig();
		} else {
			
			this.destroy();
		}
		return result;
	}

	this.fillMembersDropdown = function() {
		if (entries.length > 0) {
			this.getHistoryDistribution();
		}
		return entries;
	}
	
	this.getHistoryDistribution = function(email) {
		var result =  new Array();
		for (var i = 0; i < entries.length; i++) {
			if (entries[i].getEmail() === email) {
				result.push(entries[i]);
				memHistoryChartLabels = new Array();
				memHistoryChartData = new Array();
				memHistoryChartLabels.push(entries[i].getName());
				memHistoryChartData.push(entries[i].getPoints());
			}
		}
		this.memHistoryChartDestroy();
		this.memHistoryLineChartConfig();
		return result;
	}

	this.memHistoryChartDestroy = function () {
		//memHistoryChart.destroy();
	}

	this.memHistoryLineChartConfig = function() {
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

	}
	
}