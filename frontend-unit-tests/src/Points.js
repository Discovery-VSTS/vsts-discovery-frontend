var Points = function(n, p, d, s) {
	var sName  = n;
	var sPoints = p;
	var sDate = d;
	var sEmail = s;



	this.getName = function() {
		return sName;
	};

	this.getPoints = function () {
		return sPoints;
	}

	this.getPointsDate = function() {
		return sDate;
	}


	this.getEmail = function () {
		return sEmail;
	}
}