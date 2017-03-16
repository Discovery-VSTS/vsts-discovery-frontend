describe ("Test Points Assign", function() {
	var pointsAssign;
	var pointsAssignDB;
	

	//test load assign

 it("ensures displayFirstAndLastDate is called in load100PtAssign when status is success, submit is true, no entry exists and validate is true.", function() {
		pointsAssign = new PointsAssign();
		
		pointsAssign.success = true;
		pointsAssign.submit = true;
		pointsAssign.validate = true;

		pointsAssign.displayFirstAndLastDate = jasmine.createSpy("pointsAssign.displayFirstAndLastDate spy");
		pointsAssign.generateUserTableRows = jasmine.createSpy("pointsAssign.generateUserTableRows spy");
		pointsAssign.generateAssignStatusTable = jasmine.createSpy("pointsAssign.generateAssignStatusTable spy");
		pointsAssign.addEntry = jasmine.createSpy("pointsAssign.addEntry spy");
		pointsAssign.alertNoEntry = jasmine.createSpy("pointsAssign.alertNoEntry spy");
		pointsAssign.createJSON = jasmine.createSpy("pointsAssign.createJSON spy");
		
		pointsAssign.alertValidatePoints = jasmine.createSpy("pointsAssign.alertValidatePoints spy");
		pointsAssign.validatePoints = jasmine.createSpy("pointsAssign.validatePoints spy");
		pointsAssign.alertPointsDistroCreated = jasmine.createSpy("pointsAssign.alertPointsDistroCreated spy");

	    
		
		pointsAssign.load100PtAssign();
		expect(pointsAssign.displayFirstAndLastDate).toHaveBeenCalled();
		expect(pointsAssign.generateUserTableRows).toHaveBeenCalled();
		expect(pointsAssign.generateAssignStatusTable).toHaveBeenCalled();
		
		expect(pointsAssign.createJSON).toHaveBeenCalled();
		expect(pointsAssign.addEntry).toHaveBeenCalled();
		expect(pointsAssign.database.length).toEqual(1);
		expect(pointsAssign.alertPointsDistroCreated).toHaveBeenCalled();

		expect(pointsAssign.validatePoints).toHaveBeenCalled();
		expect(pointsAssign.alertValidatePoints).toHaveBeenCalled();

	});

	it("ensures displayFirstAndLastDate is called in load100PtAssign when status is success, submit is true, no entry exists and validate is true.", function() {
		pointsAssign = new PointsAssign();
		
		pointsAssign.success = true;
		pointsAssign.submit = true;
		pointsAssign.validate = false;

		pointsAssign.displayFirstAndLastDate = jasmine.createSpy("pointsAssign.displayFirstAndLastDate spy");
		pointsAssign.generateUserTableRows = jasmine.createSpy("pointsAssign.generateUserTableRows spy");
		pointsAssign.generateAssignStatusTable = jasmine.createSpy("pointsAssign.generateAssignStatusTable spy");
		pointsAssign.addEntry = jasmine.createSpy("pointsAssign.addEntry spy");
		pointsAssign.alertNoEntry = jasmine.createSpy("pointsAssign.alertNoEntry spy");
		pointsAssign.createJSON = jasmine.createSpy("pointsAssign.createJSON spy");
		
		pointsAssign.alertValidatePoints = jasmine.createSpy("pointsAssign.alertValidatePoints spy");
		pointsAssign.validatePoints = jasmine.createSpy("pointsAssign.validatePoints spy");
		pointsAssign.alertPointsDistroCreated = jasmine.createSpy("pointsAssign.alertPointsDistroCreated spy");

	    
		
		pointsAssign.load100PtAssign();
		expect(pointsAssign.displayFirstAndLastDate).toHaveBeenCalled();
		expect(pointsAssign.generateUserTableRows).toHaveBeenCalled();
		expect(pointsAssign.generateAssignStatusTable).toHaveBeenCalled();
		
		expect(pointsAssign.createJSON).toHaveBeenCalled();
		expect(pointsAssign.addEntry).toHaveBeenCalled();
		expect(pointsAssign.database.length).toEqual(1);
		expect(pointsAssign.alertPointsDistroCreated).toHaveBeenCalled();

		expect(pointsAssign.validatePoints).not.toHaveBeenCalled();
		expect(pointsAssign.alertValidatePoints).not.toHaveBeenCalled();

	});

	it("ensures displayFirstAndLastDate is called in load100PtAssign when status is success, submit is true, hasSet is true and validate is true.", function() {
		pointsAssign = new PointsAssign();
		
		pointsAssign.success = true;
		pointsAssign.submit = true;
		pointsAssign.validate = true;

		pointsAssign.displayFirstAndLastDate = jasmine.createSpy("pointsAssign.displayFirstAndLastDate spy");
		pointsAssign.generateUserTableRows = jasmine.createSpy("pointsAssign.generateUserTableRows spy");
		pointsAssign.generateAssignStatusTable = jasmine.createSpy("pointsAssign.generateAssignStatusTable spy");
		pointsAssign.addEntry = jasmine.createSpy("pointsAssign.addEntry spy");
		pointsAssign.alertNoEntry = jasmine.createSpy("pointsAssign.alertNoEntry spy");
		pointsAssign.createJSONUpdate = jasmine.createSpy("pointsAssign.createJSONUpdate spy");
		pointsAssign.hasSent = jasmine.createSpy("pointsAssign.hasSent spy").and.returnValue(true);
		pointsAssign.alertPointsUpdated = jasmine.createSpy("pointsAssign.alertPointsUpdated spy");
		pointsAssign.validatePoints = jasmine.createSpy("pointsAssign.validatePoints spy");
		pointsAssign.alertValidatePoints = jasmine.createSpy("pointsAssign.alertValidatePoints spy");

		var jsonObj = new Array();
        var item = {};
        item["to_member"] = "to@user.com";
    
        item["points"] = 20;
        item["from_member"] = "current@user.com";
        item["week"] = "2017-03-06";
        
		pointsAssign.database.push(item);	    
		
		pointsAssign.load100PtAssign();
		expect(pointsAssign.displayFirstAndLastDate).toHaveBeenCalled();
		expect(pointsAssign.generateUserTableRows).toHaveBeenCalled();
		expect(pointsAssign.generateAssignStatusTable).toHaveBeenCalled();
		
		expect(pointsAssign.hasSent).toHaveBeenCalled();
		expect(pointsAssign.createJSONUpdate).toHaveBeenCalled();
		expect(pointsAssign.database.length).toEqual(1);
		expect(pointsAssign.addEntry).toHaveBeenCalled();
		expect(pointsAssign.alertPointsUpdated).toHaveBeenCalled();

		expect(pointsAssign.validatePoints).toHaveBeenCalled();
		expect(pointsAssign.alertValidatePoints).toHaveBeenCalled();

	});

it("ensures displayFirstAndLastDate is called in load100PtAssign when status is success, submit is true, hasSet is true and validate is false.", function() {
		pointsAssign = new PointsAssign();
		
		pointsAssign.success = true;
		pointsAssign.submit = true;
		pointsAssign.validate = false;

		pointsAssign.displayFirstAndLastDate = jasmine.createSpy("pointsAssign.displayFirstAndLastDate spy");
		pointsAssign.generateUserTableRows = jasmine.createSpy("pointsAssign.generateUserTableRows spy");
		pointsAssign.generateAssignStatusTable = jasmine.createSpy("pointsAssign.generateAssignStatusTable spy");
		pointsAssign.addEntry = jasmine.createSpy("pointsAssign.addEntry spy");
		pointsAssign.alertNoEntry = jasmine.createSpy("pointsAssign.alertNoEntry spy");
		pointsAssign.createJSONUpdate = jasmine.createSpy("pointsAssign.createJSONUpdate spy");
		pointsAssign.hasSent = jasmine.createSpy("pointsAssign.hasSent spy").and.returnValue(true);
		pointsAssign.alertPointsUpdated = jasmine.createSpy("pointsAssign.alertPointsUpdated spy");
		pointsAssign.validatePoints = jasmine.createSpy("pointsAssign.validatePoints spy");
		pointsAssign.alertValidatePoints = jasmine.createSpy("pointsAssign.alertValidatePoints spy");

		var jsonObj = new Array();
        var item = {};
        item["to_member"] = "to@user.com";
    
        item["points"] = 20;
        item["from_member"] = "current@user.com";
        item["week"] = "2017-03-06";
        
		pointsAssign.database.push(item);	    
		
		pointsAssign.load100PtAssign();
		expect(pointsAssign.displayFirstAndLastDate).toHaveBeenCalled();
		expect(pointsAssign.generateUserTableRows).toHaveBeenCalled();
		expect(pointsAssign.generateAssignStatusTable).toHaveBeenCalled();
		
		expect(pointsAssign.hasSent).toHaveBeenCalled();
		expect(pointsAssign.createJSONUpdate).toHaveBeenCalled();
		expect(pointsAssign.database.length).toEqual(1);
		expect(pointsAssign.addEntry).toHaveBeenCalled();
		expect(pointsAssign.alertPointsUpdated).toHaveBeenCalled();

		expect(pointsAssign.validatePoints).not.toHaveBeenCalled();
		expect(pointsAssign.alertValidatePoints).not.toHaveBeenCalled();

	});



it("ensures displayFirstAndLastDate is called in load100PtAssign when status is success, submit is true, hasSet is false and validate is false.", function() {
		pointsAssign = new PointsAssign();
		
		pointsAssign.success = true;
		pointsAssign.submit = true;
		pointsAssign.validate = false;

		pointsAssign.displayFirstAndLastDate = jasmine.createSpy("pointsAssign.displayFirstAndLastDate spy");
		pointsAssign.generateUserTableRows = jasmine.createSpy("pointsAssign.generateUserTableRows spy");
		pointsAssign.generateAssignStatusTable = jasmine.createSpy("pointsAssign.generateAssignStatusTable spy");
		pointsAssign.addEntry = jasmine.createSpy("pointsAssign.addEntry spy");
		pointsAssign.alertNoEntry = jasmine.createSpy("pointsAssign.alertNoEntry spy");
		pointsAssign.createJSON = jasmine.createSpy("pointsAssign.createJSON spy");
		pointsAssign.hasSent = jasmine.createSpy("pointsAssign.hasSent spy").and.returnValue(false);
		pointsAssign.alertValidatePoints = jasmine.createSpy("pointsAssign.alertValidatePoints spy");
		pointsAssign.validatePoints = jasmine.createSpy("pointsAssign.validatePoints spy");
		pointsAssign.alertPointsDistroCreated = jasmine.createSpy("pointsAssign.alertPointsDistroCreated spy");

		var jsonObj = new Array();
        var item = {};
        item["to_member"] = "to@user.com";
    
        item["points"] = 20;
        item["from_member"] = "current@user.com";
        item["week"] = "2017-03-06";
        
		pointsAssign.database.push(item);	    
		
		pointsAssign.load100PtAssign();
		expect(pointsAssign.displayFirstAndLastDate).toHaveBeenCalled();
		expect(pointsAssign.generateUserTableRows).toHaveBeenCalled();
		expect(pointsAssign.generateAssignStatusTable).toHaveBeenCalled();
		
		expect(pointsAssign.hasSent).toHaveBeenCalled();
		expect(pointsAssign.createJSON).toHaveBeenCalled();

		expect(pointsAssign.addEntry).toHaveBeenCalled();
		expect(pointsAssign.database.length).toEqual(2);
		expect(pointsAssign.alertPointsDistroCreated).toHaveBeenCalled();

		expect(pointsAssign.validatePoints).not.toHaveBeenCalled();
		expect(pointsAssign.alertValidatePoints).not.toHaveBeenCalled();

	});

it("ensures displayFirstAndLastDate is called in load100PtAssign when status is success, submit is true, hasSet is false and validate is true.", function() {
		pointsAssign = new PointsAssign();
		
		pointsAssign.success = true;
		pointsAssign.submit = true;
		pointsAssign.validate = true;

		pointsAssign.displayFirstAndLastDate = jasmine.createSpy("pointsAssign.displayFirstAndLastDate spy");
		pointsAssign.generateUserTableRows = jasmine.createSpy("pointsAssign.generateUserTableRows spy");
		pointsAssign.generateAssignStatusTable = jasmine.createSpy("pointsAssign.generateAssignStatusTable spy");
		pointsAssign.addEntry = jasmine.createSpy("pointsAssign.addEntry spy");
		pointsAssign.alertNoEntry = jasmine.createSpy("pointsAssign.alertNoEntry spy");
		pointsAssign.createJSON = jasmine.createSpy("pointsAssign.createJSON spy");
		pointsAssign.hasSent = jasmine.createSpy("pointsAssign.hasSent spy").and.returnValue(false);
		pointsAssign.alertValidatePoints = jasmine.createSpy("pointsAssign.alertValidatePoints spy");
		pointsAssign.validatePoints = jasmine.createSpy("pointsAssign.validatePoints spy");
		pointsAssign.alertPointsDistroCreated = jasmine.createSpy("pointsAssign.alertPointsDistroCreated spy");

		var jsonObj = new Array();
        var item = {};
        item["to_member"] = "to@user.com";
    
        item["points"] = 20;
        item["from_member"] = "current@user.com";
        item["week"] = "2017-03-06";
        
		pointsAssign.database.push(item);	    
		
		pointsAssign.load100PtAssign();
		expect(pointsAssign.displayFirstAndLastDate).toHaveBeenCalled();
		expect(pointsAssign.generateUserTableRows).toHaveBeenCalled();
		expect(pointsAssign.generateAssignStatusTable).toHaveBeenCalled();
		
		expect(pointsAssign.hasSent).toHaveBeenCalled();
		expect(pointsAssign.createJSON).toHaveBeenCalled();
		expect(pointsAssign.database.length).toEqual(2);
		expect(pointsAssign.addEntry).toHaveBeenCalled();
		expect(pointsAssign.alertPointsDistroCreated).toHaveBeenCalled();

		expect(pointsAssign.validatePoints).toHaveBeenCalled();
		expect(pointsAssign.alertValidatePoints).toHaveBeenCalled();

	}); 



	it("ensures there is an alert when success is false", function() {
		pointsAssign = new PointsAssign();

		pointsAssign.displayFirstAndLastDate = jasmine.createSpy("pointsAssign.displayFirstAndLastDate spy");
		pointsAssign.generateUserTableRows = jasmine.createSpy("pointsAssign.generateUserTableRows spy");
		pointsAssign.generateAssignStatusTable = jasmine.createSpy("pointsAssign.generateAssignStatusTable spy"); 
		
		pointsAssign.success = false;

		pointsAssign.alertSuccessFail = jasmine.createSpy("pointsAssign.alertSuccessFail spy");

		pointsAssign.load100PtAssign();

		expect(pointsAssign.displayFirstAndLastDate).not.toHaveBeenCalled();
		expect(pointsAssign.generateUserTableRows).not.toHaveBeenCalled();
		expect(pointsAssign.generateAssignStatusTable).not.toHaveBeenCalled();

		expect(pointsAssign.alertSuccessFail).toHaveBeenCalled();

	});


	it("ensures displayFirstAndLastDate is called in load100PtAssign when status is success, submit is false and validate is true.", function() {
		pointsAssign = new PointsAssign();
		
		pointsAssign.success = true;
		pointsAssign.submit = false;
		pointsAssign.validate = true;

		pointsAssign.displayFirstAndLastDate = jasmine.createSpy("pointsAssign.displayFirstAndLastDate spy");
		pointsAssign.generateUserTableRows = jasmine.createSpy("pointsAssign.generateUserTableRows spy");
		pointsAssign.generateAssignStatusTable = jasmine.createSpy("pointsAssign.generateAssignStatusTable spy");
		pointsAssign.addEntry = jasmine.createSpy("pointsAssign.addEntry spy");
		pointsAssign.alertNoEntry = jasmine.createSpy("pointsAssign.alertNoEntry spy");
		pointsAssign.createJSON = jasmine.createSpy("pointsAssign.createJSON spy");
		pointsAssign.createJSONUpdated = jasmine.createSpy("pointsAssign.createJSONUpdated spy");

		pointsAssign.hasSent = jasmine.createSpy("pointsAssign.hasSent spy").and.returnValue(false);
		pointsAssign.alertValidatePoints = jasmine.createSpy("pointsAssign.alertValidatePoints spy");
		pointsAssign.validatePoints = jasmine.createSpy("pointsAssign.validatePoints spy");
		pointsAssign.alertPointsDistroCreated = jasmine.createSpy("pointsAssign.alertPointsDistroCreated spy");
		pointsAssign.alertPointsUpdated = jasmine.createSpy("pointsAssign.alertPointsUpdated spy");

    
		
		pointsAssign.load100PtAssign();
		expect(pointsAssign.displayFirstAndLastDate).toHaveBeenCalled();
		expect(pointsAssign.generateUserTableRows).toHaveBeenCalled();
		expect(pointsAssign.generateAssignStatusTable).toHaveBeenCalled();
		
		expect(pointsAssign.hasSent).not.toHaveBeenCalled();
		expect(pointsAssign.createJSON).not.toHaveBeenCalled();
		expect(pointsAssign.createJSONUpdated).not.toHaveBeenCalled();
		expect(pointsAssign.addEntry).not.toHaveBeenCalled();
		expect(pointsAssign.alertPointsDistroCreated).not.toHaveBeenCalled();
		expect(pointsAssign.alertPointsUpdated).not.toHaveBeenCalled();

		expect(pointsAssign.validatePoints).toHaveBeenCalled();
		expect(pointsAssign.alertValidatePoints).toHaveBeenCalled();

	}); 

	it("ensures displayFirstAndLastDate is called in load100PtAssign when status is success, submit is false and validate is false.", function() {
		pointsAssign = new PointsAssign();
		
		pointsAssign.success = true;
		pointsAssign.submit = false;
		pointsAssign.validate = false;

		pointsAssign.displayFirstAndLastDate = jasmine.createSpy("pointsAssign.displayFirstAndLastDate spy");
		pointsAssign.generateUserTableRows = jasmine.createSpy("pointsAssign.generateUserTableRows spy");
		pointsAssign.generateAssignStatusTable = jasmine.createSpy("pointsAssign.generateAssignStatusTable spy");
		pointsAssign.addEntry = jasmine.createSpy("pointsAssign.addEntry spy");
		pointsAssign.alertNoEntry = jasmine.createSpy("pointsAssign.alertNoEntry spy");
		pointsAssign.createJSON = jasmine.createSpy("pointsAssign.createJSON spy");
		pointsAssign.createJSONUpdated = jasmine.createSpy("pointsAssign.createJSONUpdated spy");

		pointsAssign.hasSent = jasmine.createSpy("pointsAssign.hasSent spy").and.returnValue(false);
		pointsAssign.alertValidatePoints = jasmine.createSpy("pointsAssign.alertValidatePoints spy");
		pointsAssign.validatePoints = jasmine.createSpy("pointsAssign.validatePoints spy");
		pointsAssign.alertPointsDistroCreated = jasmine.createSpy("pointsAssign.alertPointsDistroCreated spy");
		pointsAssign.alertPointsUpdated = jasmine.createSpy("pointsAssign.alertPointsUpdated spy");

    
		
		pointsAssign.load100PtAssign();
		expect(pointsAssign.displayFirstAndLastDate).toHaveBeenCalled();
		expect(pointsAssign.generateUserTableRows).toHaveBeenCalled();
		expect(pointsAssign.generateAssignStatusTable).toHaveBeenCalled();
		
		expect(pointsAssign.hasSent).not.toHaveBeenCalled();
		expect(pointsAssign.createJSON).not.toHaveBeenCalled();
		expect(pointsAssign.createJSONUpdated).not.toHaveBeenCalled();
		expect(pointsAssign.addEntry).not.toHaveBeenCalled();
		expect(pointsAssign.alertPointsDistroCreated).not.toHaveBeenCalled();
		expect(pointsAssign.alertPointsUpdated).not.toHaveBeenCalled();

		expect(pointsAssign.validatePoints).not.toHaveBeenCalled();
		expect(pointsAssign.alertValidatePoints).not.toHaveBeenCalled();

	}); 

	it("ensures displayFirstAndLastDate is called in load100PtAssign when status is success, submit is true and validate is true but database is undefined.", function() {
		pointsAssign = new PointsAssign();
		
		pointsAssign.success = true;
		pointsAssign.submit = true;
		pointsAssign.validate = true;
		pointsAssign.database = undefined;

		pointsAssign.displayFirstAndLastDate = jasmine.createSpy("pointsAssign.displayFirstAndLastDate spy");
		pointsAssign.generateUserTableRows = jasmine.createSpy("pointsAssign.generateUserTableRows spy");
		pointsAssign.generateAssignStatusTable = jasmine.createSpy("pointsAssign.generateAssignStatusTable spy");
		pointsAssign.addEntry = jasmine.createSpy("pointsAssign.addEntry spy");
		pointsAssign.alertNoEntry = jasmine.createSpy("pointsAssign.alertNoEntry spy");
		pointsAssign.createJSON = jasmine.createSpy("pointsAssign.createJSON spy");
		pointsAssign.createJSONUpdated = jasmine.createSpy("pointsAssign.createJSONUpdated spy");

		pointsAssign.hasSent = jasmine.createSpy("pointsAssign.hasSent spy").and.returnValue(false);
		pointsAssign.alertValidatePoints = jasmine.createSpy("pointsAssign.alertValidatePoints spy");
		pointsAssign.validatePoints = jasmine.createSpy("pointsAssign.validatePoints spy");
		pointsAssign.alertPointsDistroCreated = jasmine.createSpy("pointsAssign.alertPointsDistroCreated spy");
		pointsAssign.alertPointsUpdated = jasmine.createSpy("pointsAssign.alertPointsUpdated spy");

		pointsAssign.alertTerribleError = jasmine.createSpy("pointsAssign.alertTerribleError spy");

    
		
		pointsAssign.load100PtAssign();
		expect(pointsAssign.displayFirstAndLastDate).toHaveBeenCalled();
		expect(pointsAssign.generateUserTableRows).toHaveBeenCalled();
		expect(pointsAssign.generateAssignStatusTable).toHaveBeenCalled();
		
		expect(pointsAssign.hasSent).not.toHaveBeenCalled();
		expect(pointsAssign.createJSON).not.toHaveBeenCalled();
		expect(pointsAssign.createJSONUpdated).not.toHaveBeenCalled();
		expect(pointsAssign.addEntry).not.toHaveBeenCalled();
		expect(pointsAssign.alertPointsDistroCreated).not.toHaveBeenCalled();
		expect(pointsAssign.alertPointsUpdated).not.toHaveBeenCalled();
		expect(pointsAssign.alertTerribleError).toHaveBeenCalled();

		expect(pointsAssign.validatePoints).toHaveBeenCalled();
		expect(pointsAssign.alertValidatePoints).toHaveBeenCalled();

	});

	it("ensures displayFirstAndLastDate is called in load100PtAssign when status is success, submit is true and validate is false but database is undefined.", function() {
		pointsAssign = new PointsAssign();
		
		pointsAssign.success = true;
		pointsAssign.submit = true;
		pointsAssign.validate = false;
		pointsAssign.database = undefined;

		pointsAssign.displayFirstAndLastDate = jasmine.createSpy("pointsAssign.displayFirstAndLastDate spy");
		pointsAssign.generateUserTableRows = jasmine.createSpy("pointsAssign.generateUserTableRows spy");
		pointsAssign.generateAssignStatusTable = jasmine.createSpy("pointsAssign.generateAssignStatusTable spy");
		pointsAssign.addEntry = jasmine.createSpy("pointsAssign.addEntry spy");
		pointsAssign.alertNoEntry = jasmine.createSpy("pointsAssign.alertNoEntry spy");
		pointsAssign.createJSON = jasmine.createSpy("pointsAssign.createJSON spy");
		pointsAssign.createJSONUpdated = jasmine.createSpy("pointsAssign.createJSONUpdated spy");

		pointsAssign.hasSent = jasmine.createSpy("pointsAssign.hasSent spy").and.returnValue(false);
		pointsAssign.alertValidatePoints = jasmine.createSpy("pointsAssign.alertValidatePoints spy");
		pointsAssign.validatePoints = jasmine.createSpy("pointsAssign.validatePoints spy");
		pointsAssign.alertPointsDistroCreated = jasmine.createSpy("pointsAssign.alertPointsDistroCreated spy");
		pointsAssign.alertPointsUpdated = jasmine.createSpy("pointsAssign.alertPointsUpdated spy");

		pointsAssign.alertTerribleError = jasmine.createSpy("pointsAssign.alertTerribleError spy");

    
		
		pointsAssign.load100PtAssign();
		expect(pointsAssign.displayFirstAndLastDate).toHaveBeenCalled();
		expect(pointsAssign.generateUserTableRows).toHaveBeenCalled();
		expect(pointsAssign.generateAssignStatusTable).toHaveBeenCalled();
		
		expect(pointsAssign.hasSent).not.toHaveBeenCalled();
		expect(pointsAssign.createJSON).not.toHaveBeenCalled();
		expect(pointsAssign.createJSONUpdated).not.toHaveBeenCalled();
		expect(pointsAssign.addEntry).not.toHaveBeenCalled();
		expect(pointsAssign.alertPointsDistroCreated).not.toHaveBeenCalled();
		expect(pointsAssign.alertPointsUpdated).not.toHaveBeenCalled();
		expect(pointsAssign.alertTerribleError).toHaveBeenCalled();

		expect(pointsAssign.validatePoints).not.toHaveBeenCalled();
		expect(pointsAssign.alertValidatePoints).not.toHaveBeenCalled();

	});

	//createJSON
	it("creates a JSON object from when supplied with receiver and points", function() {
		pointsAssign = new PointsAssign();
		var result = pointsAssign.createJSON("to@user.com", "20");
		expect (result).toEqual([ Object({ to_member: 'to@user.com', points: 20, from_member: 'current@user.com', week: '2017-03-06' }) ]);
	});

	it("creates a JSON object from when supplied with receiver and points. Receiver is same as sender", function() {
		pointsAssign = new PointsAssign();
		var result = pointsAssign.createJSON("current@user.com", "20");
		expect (result).toEqual([ Object({ to_member: 'current@user.com', points: 20, from_member: 'current@user.com', week: '2017-03-06' }) ]);
	});

	it("creates a JSON object from when supplied with receiver and points. Points is not a number", function() {
		pointsAssign = new PointsAssign();
		var result = pointsAssign.createJSON("current@user.com", "a");
		expect (result).toEqual([ Object({ to_member: 'current@user.com', points: 0, from_member: 'current@user.com', week: '2017-03-06' }) ]);
	});

	//createJSONUpdate
		it("updates a JSON object from when supplied with receiver and points", function() {
			pointsAssign = new PointsAssign();
		var result = pointsAssign.createJSONUpdate("to@user.com", "20");
		expect (result).toEqual([ Object({ to_member: 'to@user.com', points: 20, from_member: 'current@user.com', week: '2017-03-06' }) ]);
	});

	it("updates a JSON object from when supplied with receiver and points. Receiver is same as sender", function() {
		pointsAssign = new PointsAssign();
		var result = pointsAssign.createJSONUpdate("current@user.com", "20");
		expect (result).toEqual([ Object({ to_member: 'current@user.com', points: 20, from_member: 'current@user.com', week: '2017-03-06' }) ]);
	});

	it("updates a JSON object from when supplied with receiver and points. Points is not a number", function() {
		pointsAssign = new PointsAssign();
		var result = pointsAssign.createJSONUpdate("current@user.com", "a");
		expect (result).toEqual(undefined);
	});


	//firstDayOfWeek
	it("shows the first day of the week", function() {
		pointsAssign = new PointsAssign();
		var result = pointsAssign.firstDayofWeek();
		expect(result).toEqual("2017-03-13");
	});

	//last day of week
	it("shows the last day of the week", function() {
		pointsAssign = new PointsAssign();
		var result = pointsAssign.lastDayOfWeek();
		expect(result).toEqual("2017-03-19");
	});

	//sendPoints
	it("Checks if 1 entry has been added to the database", function() {
		pointsAssign = new PointsAssign();
		json = pointsAssign.createJSON("to@user.com", "20");
		entry = {"given_points": json, "week": "2017-03-06"};
		pointsAssign.sendPoints(entry);
		expect(pointsAssign.database.length).toEqual(1);
	});

	it("sendPoints: Checks if 2 entries has been added to the database", function() {
		pointsAssign = new PointsAssign();
		json = pointsAssign.createJSON("to@user.com", "20");
		entry = {"given_points": json, "week": "2017-03-06"};
		pointsAssign.sendPoints(entry);

		json2 = pointsAssign.createJSON("to2@user.com", "20");
		entry2 = {"given_points": json, "week": "2017-03-06"};
		pointsAssign.sendPoints(entry2);

		expect(pointsAssign.database.length).toEqual(2);
	});

	it("sendPoints: Checks if empty entry has been added to the database", function() {
		pointsAssign = new PointsAssign();
		json = pointsAssign.createJSON("", "");
		entry = {"given_points": json, "week": "2017-03-06"};
		pointsAssign.sendPoints(entry);

		expect(pointsAssign.database.length).toEqual(1);
	});

	//validatePoints
	it("Checks whether the functions in validatePoints are called", function() {
		pointsAssign = new PointsAssign();
		  var originalConstructor = MyXHR
		  var spiedObj;
		  spyOn(window, 'MyXHR').and.callFake(function() {
		    spiedObj = new originalConstructor();
		    spyOn(spiedObj, 'send');
		    spyOn(spiedObj, 'open');
		    spyOn(spiedObj, 'setRequestHeader');

		    return spiedObj;
		  });
		  pointsAssign.validatePoints();
		  //expect(spiedObj.open).toHaveBeenCalled();
		  expect(spiedObj.send).toHaveBeenCalled();
		  expect(spiedObj.setRequestHeader).toHaveBeenCalled();

	});

	//getPointsForWeek
	it("Checks whether the correct entries are returned for the week when there is 1 entry", function() {
		pointsAssign = new PointsAssign();
		json = pointsAssign.createJSON("to@user.com", "20");
		entry = {"given_points": json, "week": "2017-03-06"};

		pointsAssign.sendPoints(entry);
		var result = pointsAssign.getPointsForWeek();
		expect(result.length).toEqual(1);

	});

	it("Checks whether the correct entries are returned for the week when there is 0 entry", function() {
		pointsAssign = new PointsAssign();
		json = pointsAssign.createJSON("to@user.com", "20");
		entry = {"given_points": json, "week": "2017-03-13"};

		pointsAssign.sendPoints(entry);
		var result = pointsAssign.getPointsForWeek();
		expect(result.length).toEqual(0);

	});

	it("Checks whether the correct entries are returned for the week when there is 2 entries", function() {
		pointsAssign = new PointsAssign();
		json = pointsAssign.createJSON("to@user.com", "20");
		entry = {"given_points": json, "week": "2017-03-13"};

		pointsAssign.sendPoints(entry);

		json2 = pointsAssign.createJSON("to2@user.com", "20");
		entry2 = {"given_points": json, "week": "2017-03-06"};

		pointsAssign.sendPoints(entry2);
		var result = pointsAssign.getPointsForWeek();
		expect(result.length).toEqual(1);

	});

	it("Checks whether the correct entries are returned for the week when there is 2 entries", function() {
		pointsAssign = new PointsAssign();
		json = pointsAssign.createJSON("to@user.com", "20");
		entry = {"given_points": json, "week": "2017-03-06"};

		pointsAssign.sendPoints(entry);

		json2 = pointsAssign.createJSON("to2@user.com", "20");
		entry2 = {"given_points": json, "week": "2017-03-06"};

		pointsAssign.sendPoints(entry2);
		var result = pointsAssign.getPointsForWeek();
		expect(result.length).toEqual(2);

	});
	//getMembers
	it("Checks whether getMembers is correctly called with one team member", function() {
		pointsAssign = new PointsAssign();

		member1 = {"email": "current@user.com", "name": "Current User", "team": "A"};
		pointsAssign.members.push(member1);
		result = pointsAssign.getMembers("A");

		expect(result[0].email).toEqual(member1.email);
		expect(result[0].name).toEqual(member1.name);
		expect(result[0].team).toEqual(member1.team);

	});

	it("Checks whether getMembers is correctly called with two team members", function() {
		pointsAssign = new PointsAssign();

		member1 = {"email": "current@user.com", "name": "Current User", "team": "A"};
		member2 = {"email": "current2@user.com", "name": "Current User2", "team": "A"};

		pointsAssign.members.push(member1);
		pointsAssign.members.push(member2);
		result = pointsAssign.getMembers("A");

		expect(result[0].email).toEqual(member1.email);
		expect(result[0].name).toEqual(member1.name);
		expect(result[0].team).toEqual(member1.team);

		expect(result[1].email).toEqual(member2.email);
		expect(result[1].name).toEqual(member2.name);
		expect(result[1].team).toEqual(member2.team);

	});

	it("Checks whether getMembers is correctly called with two team members from different teams", function() {
		pointsAssign = new PointsAssign();

		member1 = {"email": "current@user.com", "name": "Current User", "team": "A"};
		member2 = {"email": "current2@user.com", "name": "Current User2", "team": "B"};

		pointsAssign.members.push(member1);
		pointsAssign.members.push(member2);
		result = pointsAssign.getMembers("A");

		expect(result.length).toEqual(1);

		expect(result[0].email).toEqual(member1.email);
		expect(result[0].name).toEqual(member1.name);
		expect(result[0].team).toEqual(member1.team);

	});	

	it("Checks whether getMembers is correctly called with two team members from different teams", function() {
		pointsAssign = new PointsAssign();

		member1 = {"email": "current@user.com", "name": "Current User", "team": "A"};
		member2 = {"email": "current2@user.com", "name": "Current User2", "team": "B"};

		pointsAssign.members.push(member1);
		pointsAssign.members.push(member2);
		result = pointsAssign.getMembers("B");

		expect(result.length).toEqual(1);
		
		expect(result[0].email).toEqual(member2.email);
		expect(result[0].name).toEqual(member2.name);
		expect(result[0].team).toEqual(member2.team);


	});

	//updateJSONForTable
	it("Checks whether JSON is correctly updated for table with two members and one entry", function() {
		pointsAssign = new PointsAssign();

		json = pointsAssign.createJSON("to@user.com", "20");
		//json=[{"to_member": "to@user.com", "points": "20", "from_member": "current@user.com", "week": "2017-03-06"}];
		entry = {"given_points": json, "week": "2017-03-06"};
		pointsAssign.sendPoints(entry);
		//alert(json[0].points);
		member1 = {"email": "current@user.com", "name": "Current User", "team": "A"};
		member2 = {"email": "to@user.com", "name": "To User", "team": "A"};

		pointsAssign.members.push(member1);
		pointsAssign.members.push(member2);

		
		var result = pointsAssign.updateJSONForTable("A");
		expect(result.length).toEqual(1);
		expect(result).toEqual([ Object({ to_member: 'To User', points: 20, from_member: 'Current User' }) ]);

	});	

	it("Checks whether JSON is correctly updated for table with two members and two entries from same team", function() {
		pointsAssign = new PointsAssign();

		json = pointsAssign.createJSON("to@user.com", "20");
		//json=[{"to_member": "to@user.com", "points": "20", "from_member": "current@user.com", "week": "2017-03-06"}];
		entry = {"given_points": json, "week": "2017-03-06"};

		json2 = pointsAssign.createJSON("from@user.com", "21");
		entry2 = {"given_points": json2, "week": "2017-03-06"};

		pointsAssign.sendPoints(entry);
		pointsAssign.sendPoints(entry2);
		//alert(json[0].points);
		member1 = {"email": "current@user.com", "name": "Current User", "team": "A"};
		member2 = {"email": "to@user.com", "name": "To User", "team": "A"};

		pointsAssign.members.push(member1);
		pointsAssign.members.push(member2);

		
		var result = pointsAssign.updateJSONForTable("A");
		expect(result.length).toEqual(2);
		expect(result).toEqual([ Object({ to_member: 'from@user.com', points: 21, from_member: 'Current User' }), Object({ to_member: 'from@user.com', points: 21, from_member: 'Current User' })]);

	});

	it("Checks whether JSON is correctly updated for table with two members and two entries and members from different teams", function() {
		pointsAssign = new PointsAssign();

		json = pointsAssign.createJSON("to@user.com", "20");
		//json=[{"to_member": "to@user.com", "points": "20", "from_member": "current@user.com", "week": "2017-03-06"}];
		entry = {"given_points": json, "week": "2017-03-06"};

		json2 = pointsAssign.createJSON("from@user.com", "21");
		entry2 = {"given_points": json2, "week": "2017-03-06"};

		pointsAssign.sendPoints(entry);
		pointsAssign.sendPoints(entry2);
		//alert(json[0].points);
		member1 = {"email": "current@user.com", "name": "Current User", "team": "A"};
		member2 = {"email": "to@user.com", "name": "To User", "team": "A"};
		member3 = {"email": "new@user.com", "name": "New User", "team": "B"};

		pointsAssign.members.push(member1);
		pointsAssign.members.push(member2);

		
		var result = pointsAssign.updateJSONForTable("A");
		expect(result.length).toEqual(2);
		expect(result).toEqual([ Object({ to_member: 'from@user.com', points: 21, from_member: 'Current User' }), Object({ to_member: 'from@user.com', points: 21, from_member: 'Current User' })]);

	});	

	//hasSent
	it("checks if hasSent has been called and true is returned", function() {
		pointsAssign = new PointsAssign();
		json = [{"to_member": "to@user.com", "points": "20", "from_member": "current@user.com", "week": "2017-03-06"}];

		entry = {"given_points": json, "week": "2017-03-06"};

		pointsAssign.sendPoints(entry);

		//json2 = pointsAssign.createJSON("to2@user.com", "20");
		//entry2 = {"given_points": json, "week": "2017-03-06"};
		//pointsAssign.sendPoints(entry2);
		
		var result = pointsAssign.hasSent();
		expect(result).toEqual(true);		

	});

	it("checks if hasSent has been called and false is  returned", function() {
		pointsAssign = new PointsAssign();
		json = [{"to_member": "to@user.com", "points": "20", "from_member": "current1@user.com", "week": "2017-03-06"}];

		entry = {"given_points": json, "week": "2017-03-06"};

		pointsAssign.sendPoints(entry);

		//json2 = pointsAssign.createJSON("to2@user.com", "20");
		//entry2 = {"given_points": json, "week": "2017-03-06"};
		//pointsAssign.sendPoints(entry2);
		
		var result = pointsAssign.hasSent();
		expect(result).toEqual(false);		

	}); 

	it("checks if hasSent has been called", function() {
		pointsAssign = new PointsAssign();
		json = [{"to_member": "to@user.com", "points": "20", "from_member": "current1@user.com", "week": "2017-03-06"}];

		entry = {"given_points": json, "week": "2017-03-06"};

		pointsAssign.sendPoints(entry);

		json2 = pointsAssign.createJSON("to2@user.com", "20");
		entry2 = {"given_points": json2, "week": "2017-03-06"};
		pointsAssign.sendPoints(entry2);
		
		var result = pointsAssign.hasSent();
		expect(result).toEqual(true);		

	});
});