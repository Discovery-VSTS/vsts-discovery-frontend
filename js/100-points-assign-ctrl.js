serverURL = "http://127.0.0.1:8000"         //testing URL
//serverURL = "https://138.68.147.100:8000"   //live URL

var currentUser = "jason@jason.com";   //testing currentUser
//var currentUser = vssWebContext.user.email/ /live

function getMembers() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", serverURL + "/v1/members/", false);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
    return JSON.parse(xhr.responseText);
}

var firstdayofweek = firstDayOfWeek();

console.log(firstdayofweek);

var obj = getMembers();

var user_list = $("#user_list");

obj.forEach(function (user, index) {

//     user_list.append("<div id='user_list_div'>" +
//         "<h1>" + user.name + "</h1>" +
//         "<input type='number' min='0' max='100' id='user_" + index + "' email = " + user.email + " />" +
//         "</div>");
// });

user_list.append("<tr id='user_list_div'>" +
        "<td>" + user.name + "</td>" +
        "<td> <input type='number' min='0' max='100' id='user_" + index + "' email = " + user.email + " />" +
        "<td>" + "</tr>");
});

//console.log(user_list)

$("#user_list_div input").on("click", function () {
    console.log($(this).attr("email"));
})

// $("#user_list_div input").each(function (index, val) {
//     // $.each(function(index, val){
//     //     console.log(index + ": " + $(this).text());    
//     // })
//     console.log(index + ": " + $(val).val());
// });

$('#submitButton').click(function (event) {
    // $("#user_list_div input").each(function (index, val) {
    //     $.each(function(index, val){
    //         console.log(index + ": " + $(this).text());    
    //     })
    //     console.log(index + ": " + $(val).val()+$(val).attr("email"));
    // });
    //old code before status check
    //var jsonString = createJSON();
    //sendPoints(jsonString);

    //start of test
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState !== 4) return;
        if (this.status === 404) { // 404 means the distro doesn't exist so we POST it
         var jsonString = createJSON();
     sendPoints("POST", jsonString);
     alert("points distro created");
        } else if (this.status == 200) { // 200 means the distro exists so PUT updates
            // previous working code
            // var jsonString = createJSONUPDATE();
            // sendPoints("PUT", jsonString);
            // alert("points updated");
            if (hasSent()) {
                var jsonString = createJSONUPDATE();
                sendPoints("PUT", jsonString);
                alert("points updated");
            } else {
                var jsonString = createJSON();
                sendPoints("POST", jsonString);
                alert("points distro created");
            }
        } else {
        	alert("something has gone terribly wrong: error " + this.status); // something else
        }
    };
    xhr.open('GET', serverURL + '/v1/points/distribution/2017-02-27/', true);
    xhr.send();
    //end of test
});

$('#validateButton').click(function (event) {
	validatePoints();
});

//WILL CLEAR UP
function createJSON() {
    jsonObj = [];
    $("#user_list_div input").each(function () {

        var id = $(this).attr("email");
        var points = $(this).val();

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
    });
    //console.log(jsonString = JSON.stringify(jsonObj));
    return jsonObj;
}

//MUST CLEAN UP AS createJSON()
function createJSONUPDATE() {
    jsonObj = [];
    $("#user_list_div input").each(function () {

        var id = $(this).attr("email");
        var points = $(this).val();

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
    });
    //console.log(jsonString = JSON.stringify(jsonObj));
    return jsonObj;
}

//// old code
// function createJSON() {
// 	jsonObj = [];
// 	$("#user_list_div input").each(function() {

// 		var id = $(this).attr("email");
// 		var points = $(this).val();

// 		item = {};
// 		item ["to_member"] = id;
// 		item ["points"] = parseInt(points);
// 		item ["from_member"] = "jason@jason.com";
// 		item ["week"] = "2017-02-27";

// 		jsonObj.push(item);
// 	});
// 	//console.log(jsonString = JSON.stringify(jsonObj));
// 	return jsonObj;
// }


//req POST for initial distribution or PUT to update
function sendPoints(REQ, jsonString) {
    var xhr = new XMLHttpRequest();
    xhr.open(REQ, serverURL + "/v1/points/distribution/send/");
    xhr.setRequestHeader("Content-Type", "application/json");
    var json = {
        "given_points": jsonString,
        "week": firstdayofweek
    }
    //console.log(JSON.stringify(json));
    xhr.send(JSON.stringify(json));
}

// function updatePoints(jsonString) {
//     var xhr = new XMLHttpRequest();
//     xhr.open("PUT", "http://127.0.0.1:8000/v1/points/distribution/send/");
//     xhr.setRequestHeader("Content-Type", "application/json");
//     var json = {
//         "given_points": jsonString,
//         "week": firstdayofweek
//     }
//     //console.log(JSON.stringify(json));
//     xhr.send(JSON.stringify(json));
//     console.log(xhr.statusText);
// }

function validatePoints() {
    var xhr = new XMLHttpRequest();
    xhr.open("PUT", serverURL + "/v1/points/distribution/validate/");
    xhr.setRequestHeader("Content-Type", "application/json");
    var json = {
        "week": firstdayofweek
    }
     console.log(JSON.stringify(json));
    //xhr.send(JSON.stringify(json));
}

function getPointsForWeek() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", serverURL + "/v1/points/distribution/" + firstdayofweek + "/", false);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
    console.log(xhr.status);
    return JSON.parse(xhr.responseText);
}

// function hasSent() {
// 	var array = getPointsForWeek();
//     for (var i = 0; i < array.given_points.length; i++) {
//         console.log(array.given_points[i].from_member);
//         if (array.given_points[i].from_member == currentUser) {
//             return true;
//             break;
//         }
//         return false;
//     }
// }

function hasSent() {
    var array = getPointsForWeek();
    for (var i = 0; i < array.given_points.length; i++) {
        if (array.given_points[i].from_member == currentUser) {
            return true;
            break;
        }
    }
    return false;
}

	////duplicate??
	// function sendPoints(jsonString) {
	//     var xhr = new XMLHttpRequest();
	//     xhr.open("POST", "http://127.0.0.1:8000/v1/points/distribution/send/");
	//     xhr.setRequestHeader("Content-Type", "application/json");
	//     var json = {
	//         "given_points": jsonString,
	//         "week": "2017-02-27"
	//     }
	//     //console.log(JSON.stringify(json));
	//     xhr.send(JSON.stringify(json));
	// }

	// function sendPoints() {
	//     var xhr = new XMLHttpRequest();
	//     xhr.open("POST", "http://127.0.0.1:8000/v1/points/distribution/send/");
	//     xhr.setRequestHeader("Content-Type", "application/json");
	//     xhr.send(JSON.stringify({
	//         "given_points": [
	//             {
	//                 "to_member": "krinal@krinal.com",
	//                 "points": 100,
	//                 "from_member": "jason@jason.com",
	//                 "week": "2017-02-20"
	//             },
	//             {
	//                 "to_member": "jason@jason.com",
	//                 "points": 100,
	//                 "from_member": "jason@jason.com",
	//                 "week": "2017-02-20"
	//             },
	//             {
	//                 "to_member": "hello@hello.com",
	//                 "points": 100,
	//                 "from_member": "jason@jason.com",
	//                 "week": "2017-02-20"
	//             }
	//         ],
	//         "week": "2017-02-20"
	//     }));
	// }