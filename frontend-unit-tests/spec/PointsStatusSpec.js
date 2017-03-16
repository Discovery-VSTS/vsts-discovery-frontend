	


describe("Test load100PtStatus", function() {
	var pointsStatus;
	beforeEach(function() {
		pointsStatus = new PointsStatus;
		points = new Points();
	});


	it ("verifies colours have been selected", function () {
		var colors = pointsStatus.randomColors();
		var colorsOnly = colors.split(")"); //gives "rgba(111,222,333,0.5" at index 0

		var colorsOnly = colorsOnly[0].split("(");   //gives "111,222,333,0.5 at index 1
			
		var colorsOnly = colorsOnly[1].split(",");

		var red = parseInt(colorsOnly[0]);
		var green = parseInt(colorsOnly[1]);
		var blue = parseInt(colorsOnly[2]);
		var opacity = parseFloat(colorsOnly[3]);

	    var expectedColors = "rgba(" + red + "," + green + "," + blue + ", "+ opacity+")";
	    expect(colors).toEqual(expectedColors);
	});

	it("verifies random colorset is generated with labels undefined", function() {
		var labels;
		var colorSet = pointsStatus.randomColorSet(labels);
		expect(colorSet.length).toEqual(11);
	});

	it("verfies random colorset is generated with labels defined", function() {
		var labels = ["Krinal", "Jason", "Yichen"];
		var colorset = pointsStatus.randomColorSet(labels);
		expect(colorset.length).toEqual(3);
	});





	it("verifies the correct pie chart object is created", function() {

		thisWeekPieChart = new Chart('', {
			type: 'pie',
			data: this.pieDataConf,
			options: {
				responsive: false
			}
        });
        pointsStatus.load100PtStatus();
        expect(this.thisWeekPieChart).toEqual(pointsStatus.thisWeekPieChart);
	});

	it("verifies the getWeeklyDistribution with data", function() {
		var Krinal = new Points ("Krinal", 20, "2017-03-05", "krinal@email.com");
		var Jason = new Points ("Jason", 20, "2017-03-05", "jason@email.com");
		var Yichen = new Points("Yichen", 20, "2017-03-05", "yichen@email.com");

		pointsStatus.addEntry(Krinal);
		pointsStatus.addEntry(Jason);
		pointsStatus.addEntry(Yichen);

		var r = pointsStatus.getWeeklyDistribution("2017-03-05");
		expect(r.length).toEqual(3);

	});

	it("verifies the getWeeklyDistribution method gets the correct data entries by date", function() {
		var Krinal = new Points ("Krinal", 20, "2017-03-05", "krinal@email.com");
		var Jason = new Points ("Jason", 20, "2017-03-05", "jason@email.com");
		var Yichen = new Points("Yichen", 20, "2017-03-06", "yichen@email.com");

		pointsStatus.addEntry(Krinal);
		pointsStatus.addEntry(Jason);
		pointsStatus.addEntry(Yichen);

		var r = pointsStatus.getWeeklyDistribution("2017-03-05");
		expect(r.length).toEqual(2);		
	});

	it("verifies teamWeekPieChartConfig is called within getWeeklyDistribution", function() {
		var Krinal = new Points ("Krinal", 20, "2017-03-05", "krinal@email.com");
		pointsStatus.addEntry(Krinal);
		pointsStatus.teamWeekPieChartConfig = jasmine.createSpy("teamWeekPieChartConfig spy");
		pointsStatus.getWeeklyDistribution("2017-03-05");
		expect(pointsStatus.teamWeekPieChartConfig).toHaveBeenCalled();

	});

	it("verifies randomColorSet is called within getWeeklyDistribution", function() {
		var Krinal = new Points ("Krinal", 20, "2017-03-05", "krinal@email.com");
		pointsStatus.addEntry(Krinal);
		pointsStatus.randomColorSet = jasmine.createSpy("randomColorSet spy");
		pointsStatus.getWeeklyDistribution("2017-03-05");
		expect(pointsStatus.randomColorSet).toHaveBeenCalled();

	});	

	it("verifies teamWeekPieChart.destroy is called within getWeeklyDistribution", function() {
		pointsStatus.destroy = jasmine.createSpy("destroy spy");
		pointsStatus.getWeeklyDistribution();
		expect(pointsStatus.destroy).toHaveBeenCalled();

	});

	it("verifies teamWeekPieChart.destroy is called when there is no data", function() {
		pointsStatus.destroy = jasmine.createSpy("destroy spy");
		pointsStatus.getWeeklyDistribution();
		var r = pointsStatus.getWeeklyDistribution("2017-03-05");
		expect(pointsStatus.destroy).toHaveBeenCalled();

	});			

	
	it("verifies all the names and e-mail addresses of all students are shown", function() {
		var names = new Array();
		var email = new Array();

		var Krinal = new Points ("Krinal", 20, "2017-03-05", "krinal@email.com");
		var Jason = new Points ("Jason", 20, "2017-03-05", "jason@email.com");
		var Yichen = new Points("Yichen", 20, "2017-03-05", "yichen@email.com");

		pointsStatus.addEntry(Krinal);
		pointsStatus.addEntry(Jason);
		pointsStatus.addEntry(Yichen);

		var r = pointsStatus.fillMembersDropdown();

		var members = new Array();
		var email = new Array();

		for (var i = 0; i < r.length; i++) {
			members.push(r[i].getName());
			
			email.push(r[i].getEmail());
		}

		expect(members[0]).toEqual("Krinal");
		expect(email[0]).toEqual("krinal@email.com");
		expect(members[1]).toEqual("Jason");
		expect(email[1]).toEqual("jason@email.com");
		expect(members[2]).toEqual("Yichen");
		expect(email[2]).toEqual("yichen@email.com");

	});



	it("verifies that an error is produced when there are no records", function() {
		var r = pointsStatus.fillMembersDropdown();
		expect(r.length).toEqual(0);
	});


	it("Retrieves all the points for a student", function() {
		var Krinal = new Points ("Krinal", 20, "2017-03-05", "krinal@email.com");
		var Jason = new Points ("Jason", 20, "2017-03-05", "jason@email.com");
		var Yichen = new Points("Yichen", 20, "2017-03-05", "yichen@email.com");
		var Krinal2 = new Points ("Krinal", 20, "2017-03-12", "krinal@email.com");
		var Krinal3 = new Points ("Krinal", 20, "2017-03-19", "krinal@email.com");	

		pointsStatus.addEntry(Krinal);
		pointsStatus.addEntry(Jason);
		pointsStatus.addEntry(Yichen);
		pointsStatus.addEntry(Krinal2);
		pointsStatus.addEntry(Krinal3);

		var r = pointsStatus.getHistoryDistribution("krinal@email.com");
		expect(r.length).toEqual(3);
	});

	it("Ensures no history data when there are no matching entries", function() {
		var Krinal = new Points ("Krinal", 20, "2017-03-05", "krinal@email.com");
		var Yichen = new Points("Yichen", 20, "2017-03-05", "yichen@email.com");
		var Krinal2 = new Points ("Krinal", 20, "2017-03-12", "krinal@email.com");
		var Krinal3 = new Points ("Krinal", 20, "2017-03-19", "krinal@email.com");	

		pointsStatus.addEntry(Krinal);
		
		pointsStatus.addEntry(Yichen);
		pointsStatus.addEntry(Krinal2);
		pointsStatus.addEntry(Krinal3);

		var r = pointsStatus.getHistoryDistribution("jason@email.com");
		expect(r.length).toEqual(0);		
	});

	it("calls chart destroy", function() {
		var Krinal = new Points ("Krinal", 20, "2017-03-05", "krinal@email.com");	

		pointsStatus.addEntry(Krinal);
		
		pointsStatus.memHistoryChartDestroy = jasmine.createSpy("memHistoryChartDestroy spy");
		pointsStatus.getHistoryDistribution("krinal@email.com");
		expect(pointsStatus.memHistoryChartDestroy).toHaveBeenCalled();
	});

	it("calls memHistoryLineChartConfig", function() {
		var Krinal = new Points ("Krinal", 20, "2017-03-05", "krinal@email.com");	

		pointsStatus.addEntry(Krinal);
		
		pointsStatus.memHistoryLineChartConfig = jasmine.createSpy("memHistoryLineChartConfig spy");
		pointsStatus.getHistoryDistribution("krinal@email.com");
		expect(pointsStatus.memHistoryLineChartConfig).toHaveBeenCalled();
	});

	it("ensures correct line data configurations", function() {
		memHistoryChartData = [20];

    	memHistoryChartConfig = {
        labels: "memHistoryChartLabels",
        datasets: [
            {
                label: "History of points earned by ",
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
		

		memHistoryChartConfig2 = {
        labels: "memHistoryChartLabels",
        datasets: [
            {
                label: "History of points earned by ",
                data: [20],
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
    expect(memHistoryChartConfig).toEqual(memHistoryChartConfig2);
	}); 
});