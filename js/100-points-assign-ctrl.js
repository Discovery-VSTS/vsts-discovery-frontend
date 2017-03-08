serverURL = "http://127.0.0.1:8000" //testing URL
    // serverURL = "https://138.68.147.100:8000"   //live URL

var currentUser = "jason@jason.com"; //testing currentUser
// var currentUser = vssWebContext.user.email //live


function load100PtAssign() {
    $('#100-points-components').load("components/100-points-assign.html", function(response, status, xhr) {
        if (status == "success") {
            displayFirstAndLastDate();

            generateUserTableRows();

            generateAssignStatusTable();

            submitButton();

            // event bindings for dynamically generated contents
            // $('#submitButton').click(function(event) {
            //     var xhr = new XMLHttpRequest();
            //     xhr.onreadystatechange = function() {
            //         if (this.readyState !== 4) return;
            //         if (this.status === 404) { // 404 means the distro doesn't exist so we POST it
            //             var jsonString = createJSON();
            //             sendPoints("POST", jsonString);
            //             alert("points distro created");
            //         } else if (this.status == 200) { // 200 means the distro exists so PUT updates
            //             if (hasSent()) {
            //                 var jsonString = createJSONUPDATE();
            //                 sendPoints("PUT", jsonString);
            //                 alert("points updated");
            //             } else {
            //                 var jsonString = createJSON();
            //                 sendPoints("POST", jsonString);
            //                 alert("points distro created");
            //             }
            //         } else {
            //             alert("something has gone terribly wrong: error " + this.status); // something else
            //         }
            //     };
            //     xhr.open('GET', serverURL + '/v1/points/distribution/2017-03-06/', true);
            //     xhr.send();
            // });

            $('#validateButton').click(function(event) {
                validatePoints();
                alert("not all members gave points to colleagues");
            });
        }
    });
}

//var firstdayofweek = firstDayOfWeek();
var firstdayofweek = "2017-03-06"

function generateUserTableRows() {

    var obj = getMembers();

    var user_list = $("#user_list");

    $.each(obj, function(index, user) {
        user_list.append("<tr id='user_list_div'>" +
            "<td>" + user.name + "</td>" +
            "<td> <input class='points-field' type='number' min='0' max='100' id='user_" + index + "' email = " + user.email + " />" +
            "<td>" + "</tr>");
    });

    $('input.points-field').change(function(event) {
        var usedPoints = 0;
        $('.points-field').each(function(index, el) {
            var fieldPoint;
            if ($(el).val() == "") {
                fieldPoint = 0;
            } else {
                fieldPoint = parseInt($(el).val());
            }
            usedPoints += fieldPoint;
            console.log(usedPoints)
        });
        $('#pointValue').text(100 - usedPoints);
    });
}

function submitButton() {
	            $('#submitButton').click(function(event) {
                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function() {
                    if (this.readyState !== 4) return;
                    if (this.status === 404) { // 404 means the distro doesn't exist so we POST it
                        var jsonString = createJSON();
                        sendPoints("POST", jsonString);
                        alert("points distro created");
                    } else if (this.status == 200) { // 200 means the distro exists so PUT updates
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
                xhr.open('GET', serverURL + '/v1/points/distribution/2017-03-06/', true);
                xhr.send();
            });
}

function getMembers() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", serverURL + "/v1/members/", false);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
    return JSON.parse(xhr.responseText);
}

function createJSON() {
    jsonObj = [];
    $("#user_list_div input").each(function() {

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
    return jsonObj;
}

function createJSONUPDATE() {
    jsonObj = [];
    $("#user_list_div input").each(function() {

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
    return jsonObj;
}

//req POST for initial distribution or PUT to update
function sendPoints(REQ, jsonString) {
    var xhr = new XMLHttpRequest();
    xhr.open(REQ, serverURL + "/v1/points/distribution/send/");
    xhr.setRequestHeader("Content-Type", "application/json");
    var json = {
        "given_points": jsonString,
        "week": firstdayofweek
    }
    xhr.send(JSON.stringify(json));
}

function validatePoints() {
    var xhr = new XMLHttpRequest();
    xhr.open("PUT", serverURL + "/v1/points/distribution/validate/");
    xhr.setRequestHeader("Content-Type", "application/json");
    var json = {
        "week": firstdayofweek
    }
    xhr.send(JSON.stringify(json));
}

function getPointsForWeek() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", serverURL + "/v1/points/distribution/" + firstdayofweek + "/", false);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
    console.log(xhr.status);
    return JSON.parse(xhr.responseText);
}

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

//Return the first day of the current week (Sunday)
function firstDayOfWeek() {
    var curr = new Date;
    var firstday = new Date(curr.setDate(curr.getDate() - curr.getDay() + 1));
    return firstday.toISOString().substring(0, 10);
}

//Return the last day of the current week (Saturday)
function lastDayOfWeek() {
    var curr = new Date;
    var lastday = new Date(curr.setDate(curr.getDate() - curr.getDay() + 7));
    return lastday.toISOString().substring(0, 10);
}

//Return date formatted
function displayFirstAndLastDate() {
    var firstDay = firstDayOfWeek();
    var lastDay = lastDayOfWeek();
    $('#assign-date-range').text("Week: "+firstDay +" to "+ lastDay);
}

//assign status
function getJSON() {
    var data = updateJSONForTable();
    
    var result = [['From/To']];

    data.forEach(function (row, col) {
        return function (a) {
            if (!(a.to_member in row)) {
                row[a.to_member] = result.push([a.to_member]) - 1;
            }
            if (!(a.from_member in col)) {
                col[a.from_member] = result[0].push(a.from_member) - 1;
            }
            result[row[a.to_member]][col[a.from_member]] = a.points;
        };
    }(Object.create(null), (Object.create(null))));

    return result;
}

var members = getMembers();

function updateJSONForTable() {
    var pointsWeek = getPointsForWeek();

    var newPoints = pointsWeek.given_points;

    //replace email with name
    jQuery.each(newPoints, function(index, val) {
        for (var i = members.length - 1; i >= 0; i--) {
            if(newPoints[index].from_member == members[i].email) {
                newPoints[index].from_member = members[i].name;
            }
        }
        for (var i = members.length - 1; i >= 0; i--) {
            if(newPoints[index].to_member == members[i].email) {
                newPoints[index].to_member = members[i].name;
            }
        }
    });

    //delete the week value
    jQuery.each(newPoints, function(index, val) {
        delete newPoints[index].week;
    });

    return newPoints;
}

function generateAssignStatusTable() {
    var assignStatusJSON = getJSON();
    console.log(assignStatusJSON);
    jQuery.each(assignStatusJSON, function(index, val) {
    	console.log(assignStatusJSON[index]);
    });
    jQuery.each(assignStatusJSON, function(index, val) {
        $('#assignStatusTableHead').append('<th>' + assignStatusJSON[index][0] + '</th>'); 
    });
    // $('#assignStatusTableBody').append("<tr><td>"+assignStatusJSON[0][1]+"</td><td>"+assignStatusJSON[1][1]+"</td>"+"<td>"+assignStatusJSON[2][1]+"</td><td>"+assignStatusJSON[3][1]+"</td>");
    // $('#assignStatusTableBody').append("<tr><td>"+assignStatusJSON[0][2]+"</td><td>"+assignStatusJSON[1][2]+"</td>"+"<td>"+assignStatusJSON[2][2]+"</td><td>"+assignStatusJSON[3][2]+"</td>");
    // $('#assignStatusTableBody').append("<tr><td>"+assignStatusJSON[0][3]+"</td><td>"+assignStatusJSON[1][3]+"</td>"+"<td>"+assignStatusJSON[2][3]+"</td><td>"+assignStatusJSON[3][3]+"</td>");
    //for (var i = 1; i < assignStatusJSON.length; i++) {
        //$('#assignStatusTableBody').append('<tr id="tableRow_'+i+'"></tr>');
        for (var i = 1; i < assignStatusJSON.length; i++) {
            $('#assignStatusTableBody').append('<tr id="tableRow_'+i+'"></tr>');
            jQuery.each(assignStatusJSON, function(index, val) {
                $('#tableRow_'+i).append('<td>'+assignStatusJSON[index][i]+'</td>');
            });
        }
    //}
}

//working
// function generateAssignStatusTable() {
//     var assignStatusJSON = getJSON();
//     var assignStatusHead = assignStatusJSON[0];
//     jQuery.each(assignStatusHead, function(index, val) {
//         $('#assignStatusTableHead').append('<th>' + assignStatusHead[index] + '</th>');
//     });
//     var assignStatusBody = assignStatusJSON.slice(1);
//     jQuery.each(assignStatusBody, function(index, val) {
//     	console.log(assignStatusBody[index]);
//     	$('#assignStatusTableBody').append('<tr id="assignStatusBodyId_'+index+'"></tr>');
//     	jQuery.each(assignStatusBody[index], function(col, val) {
//     		$('#assignStatusBodyId_'+index).append('<td>'+val+'</td>');
//     	});
//     });
// }