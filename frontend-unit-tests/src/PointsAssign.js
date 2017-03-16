var MyXHR = function () {
	this.send = function() {
		alert("send");
	}

	this.open = function(v1, v2) {

	}


	this.setRequestHeader = function (v1, v2) {

	}

	this.getResponse = function() {
		//week
		//given_points
		//from_member
		//to_member
		return {"to_member": "to@user.com", "points": 20, "from_member": "current@user.com", "week": "2017-03-06"};
	}
}

var PointsAssign = function() {
	this.database = [];
	this.members = [];
	this.success = true;
	this.submit = false;
	this.validate = false;

	this.containsEntry = function(date)  {
		var result = false;
		for (var dBIndex = 0; dBIndex < this.database.length; dBIndex++) {
			if (this.database[dBIndex].week === date) {
				result = true;
				break
			} 
		}
		return result;		
	}

	this.addEntry = function () {
		//this.database.push(data);
		alert("added to database");
	}
	

	
	var currentUser = "current@user.com";
	var firstdayofweek = "2017-03-06";
	
	function alertNoEntry() {
		alert("No entry points distro created");
	}

	this.alertPointsUpdated = function () {
		alert("points updated");
	}
	this.load100PtAssign = function() {
		if (this.success) {
			//alertNoEntry();
			this.displayFirstAndLastDate();
			this.generateUserTableRows();
			this.generateAssignStatusTable();
			

			if (this.submit) {

                if (this.database !== undefined && !(this.containsEntry("2017-03-06"))) { //distro doesn't exist so we add it

                    var jsonString = this.createJSON("to@user.com", "20");
                    
                    this.database.push(jsonString);
                    this.addEntry();
                	this.alertPointsDistroCreated();
                } else if (this.database !== undefined && this.containsEntry("2017-03-06")) { // distro exists so PUT updates

                    if (this.hasSent()) {//assigned self point
                        var jsonString = this.createJSONUpdate("to@user.com", "20");
                        
                        this.addEntry(jsonString);
                        //sendPoints("PUT", jsonString);
                        this.alertPointsUpdated();
                    } else {
                        var jsonString = this.createJSON("to@user.com", "20");
                        this.database.push(jsonString);

                        this.addEntry();
						this.alertPointsDistroCreated();
                	}
				} else {
					this.alertTerribleError(); // something else
            	}
			}

			if (this.validate) {

				this.validatePoints();
				this.alertValidatePoints();
			}
		} else {
			this.alertSuccessFail();
		}
	}

	this.alertTerribleError = function() {
		alert("something has gone terribly wrong: error ");
	}

	this.alertSuccessFail = function() {
		alert("no success");
	}
	this.alertPointsDistroCreated = function() {
		alert("points distro created");
	}


	this.displayFirstAndLastDate = function() {

	}

	this.generateUserTableRows = function() {

	}

	this.generateAssignStatusTable = function() {

	}

	this.validatePoints = function() {
		xhr = new MyXHR();
	    xhr.open("PUT", "serverURL" + "/v1/points/distribution/validate/");
	    xhr.setRequestHeader("Content-Type", "application/json");
	    var json = {
	        "week": firstdayofweek
	    }
	    xhr.send(JSON.stringify(json));		

	}

	this.alertValidatePoints = function() {
		alert("not all members gave points to colleagues");
	}

	this.createJSON = function(id, points) {
		var jsonObj = new Array();

        var item = {};
        item["to_member"] = id;
        if (isNaN(parseInt(points))) {
            item["points"] = 0;
        } else {
            item["points"] = parseInt(points);
        }
        item["from_member"] = currentUser;
        item["week"] = firstdayofweek;

        jsonObj.push(item);
    
    return jsonObj;
	}

	this.createJSONUpdate = function(id, points) {
    	jsonObj = [];

       

        if (isNaN(parseInt(points))) {
            return;
        }

        item = {};
        item["to_member"] = id;
        if (isNaN(parseInt(points))) {
            item["points"] = 0;
        } else {
            item["points"] = parseInt(points);
        }
        item["from_member"] = currentUser;
        item["week"] = firstdayofweek;

        jsonObj.push(item);
    
    return jsonObj;		
	}

	this.firstDayofWeek = function() {
	    var curr = new Date;
	    var firstday = new Date(curr.setDate(curr.getDate() - curr.getDay() + 1));
	    return firstday.toISOString().substring(0, 10);
	}

	this.lastDayOfWeek = function() {
	    var curr = new Date;
	    var lastday = new Date(curr.setDate(curr.getDate() - curr.getDay() + 7));
	    return lastday.toISOString().substring(0, 10);
	}

	this.sendPoints = function(entry) {
		this.database.push(entry);
	}

	this.getPointsForWeek = function() {
		var result = new Array();
		var item = {};
		for(var i=0; i<this.database.length; i++) {
			if (this.database[i].week === firstdayofweek) {

				item.given_points = this.database[i].given_points;
				item.week = this.database[i].week;
				
				result.push(item);
			}
		}
		return result;
	}

	this.getMembers = function(team) {
		var result = new Array();
		for (var i = 0; i< this.members.length; i++) {
			if(this.members[i].team === team) {
				result.push(this.members[i]);
			}
		}
		return result;		
	}

	this.updateJSONForTable = function(team) {
		var pointsWeek = this.getPointsForWeek();
		var teamMembers = this.getMembers(team);
		var newPoints = new Array();

			for (var j = 0; j < pointsWeek.length; j++) {
				temp = pointsWeek[j];
				//alert(temp.given_points[0].email);
				for(var k = 0; k < temp.given_points.length; k++) {
					//alert(temp.given_points.length);
					//alert(temp.given_points[k].from_member);
					for (var i = 0; i<teamMembers.length; i++) {
						if(teamMembers[i].email === temp.given_points[k].from_member) {
							temp.given_points[k].from_member = teamMembers[i].name;
							//alert(temp.given_points[k].from_member);
						}

						if(teamMembers[i].email === temp.given_points[k].to_member) {
							temp.given_points[k].to_member = teamMembers[i].name;
							//alert(temp.given_points[k].to_member);
						}						
					}

					//alert(temp.given_points.length);
					//alert(newPoints.given_points.length);
					newPoints.push(temp.given_points[k]);

				}
			}
		
		for (var i = 0; i<newPoints.length; i++) {
			delete newPoints[i].week;
		}
		return newPoints;
	}

	this.hasSent = function() {
	    var array = this.getPointsForWeek();
	    
	    
	    
	    for (var i = 0; i < array.length; i++) {
	    	var temp = array[i];
	    	for (var j = 0; j< temp.given_points.length; j++) {
	    		
		        if (temp.given_points[j].from_member === currentUser) {
		        	return true;
		        }	    		
	    	}


	    }
	    return false;
	}

}