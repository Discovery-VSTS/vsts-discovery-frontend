// Project: VSTS Discovery extension
// JavaScript functions for controlling 100 points assign component
// Author: Jason Martyres
// Create Date: 01-Feb-2017
// Update Date: 13-Mar-2017

//DEV
// var serverURL = "http://127.0.0.1:8000";
// var vsts_instance_id = "555555";
// var vsts_instance_name = "vsts-discovery";
// var currentUser = "jason@jason.com";

// var firstdayofweek = "2017-03-20";

//PROD
var serverURL = "https://discovery-100p.azurewebsites.net";
var vsts_instance_id;
var vsts_instance_name;
var currentUser;

var firstdayofweek = firstDayOfWeek();

var members;
var weekPointDistribution;

function load100PtAssign() {
	vsts_instance_id = VSS.getWebContext().account.id;
	vsts_instance_name = VSS.getWebContext().account.name;
	currentUser = VSS.getWebContext().user.email;
    $('#100-points-components').load("components/100-points-assign.html", function (response, status, xhr) {
        if (status == "success") {
            $.ajax({
                url: serverURL + '/v1/points/distribution/' + firstdayofweek + '/',
                type: 'GET',
                dataType: 'json',
                data: { instance_id: vsts_instance_id },
            })
                .done(function (data) {
                    weekPointDistribution = data;
                    if (data.is_final) {
                        validatedPointsView();
                    } else {
                        mainMethods();
                    }
                })
                .fail(function (data) {
                    mainMethods();
                })
                .always(function () {
                });
        }
    });
}

function mainMethods() {
    displayFirstAndLastDate();

    generateUserTableRows();

    $('#submitButton').click(function (event) {
        submitButton();
    });

    $('#validateButton').click(function (event) {
        validatePoints();
    });
}

function validatedPointsView() {
    jQuery.getJSON(serverURL + '/v1/members/', { instance_id: vsts_instance_id, instance_name: vsts_instance_name, user_email: currentUser }, function (json, textStatus) {
        $('#loadingtext').empty();
        $('#100pointassignhtml').empty();
        $('#validatedHtml').show();
        var user_list = $("#user_list22");
        var pointDistribution = weekPointDistribution;
        console.log(pointDistribution);
        console.log(pointDistribution.given_points[0].to_member);
        //replace identifier with name
        jQuery.each(pointDistribution.given_points, function (index, val) {
            for (var i = 0; i < json.length; i++) {
                if (pointDistribution.given_points[index].to_member == json[i].identifier) {
                    pointDistribution.given_points[index].to_member = json[i].name;
                }
            }
        });
        jQuery.each(pointDistribution.given_points, function (index, val) {
            user_list.append("<tr><td>" + pointDistribution.given_points[index].to_member + "</td><td>" + pointDistribution.given_points[index].points + "</td></tr>")
        });
        $('#nextPointDate').html("New points can be assigned next week")
    });
}

function generateUserTableRows() {
    jQuery.getJSON(serverURL + '/v1/members/', { instance_id: vsts_instance_id, instance_name: vsts_instance_name, user_email: currentUser }, function (json, textStatus) {
        $('#loadingtext').empty()
        if (json.length == 0) {
            $('#100pointassignhtml').text("Error: No members loaded!")
        } else {
            $('#100pointassignhtml').show();
            members = json;
            if (typeof weekPointDistribution != "undefined") {
                generateAssignStatusTable();
            }

            var user_list = $("#user_list");

            $.each(json, function (index, user) {
                user_list.append("<tr id='user_list_div'>" +
                    "<td>" + user.name + "</td>" +
                    "<td> <input class='points-field' type='number' min='0' max='100' id='user_" + index + "' email = " + user.email + " />" +
                    "<td>" + "</tr>");
            });

            $('input.points-field').change(function (event) {
                var usedPoints = 0;
                $('.points-field').each(function (index, el) {
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
    });
}

function submitButton() {
    var x = parseInt($('#pointValue').html());
    if (x > 0) {
        $('#assignResponseText').html("Error: Please distribute " + x + " more points between members");
    } else if (x < 0) {
        $('#assignResponseText').html("Error: You have tried to distribute too many points!");
    } else {
        $.ajax({
            url: serverURL + '/v1/points/distribution/' + firstdayofweek + '/',
            type: 'GET',
            dataType: 'json',
            data: { instance_id: vsts_instance_id },
        })
            .done(function (data, textStatus, jqHR) {
                data = weekPointDistribution;
                if (hasSent()) {
                    var jsonString = createJSONUPDATE();
                    sendPoints("PUT", jsonString);
                    //$('#assignResponseText').html("Success: Your points have been updated");
                } else if (!hasSent()) {
                    var jsonString = createJSON();
                    sendPoints("POST", jsonString);
                    //$('#assignResponseText').html("Success: Your points have been added");
                } else {
                    $('#assignResponseText').html("Error: There was an error processing the request " + this.status);
                }
            })
            .fail(function () {
                var jsonString = createJSON();
                sendPoints("POST", jsonString);
                //$('#assignResponseText').html("Success: Your points have been added");
            })
            .always(function () {
                console.log("complete");
            });
    }
}

function hasSent() {
    array = weekPointDistribution;
    var current;
    jQuery.each(members, function (index, val) {
        if (members[index].email == currentUser) {
            current = members[index].name;
        }
    });
    for (var i = 0; i < array.given_points.length; i++) {
        if (array.given_points[i].from_member == current) {
            return true;
            break;
        }
    }
    return false;
}

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
        item["instance_id"] = vsts_instance_id;

        jsonObj.push(item);
    });
    return jsonObj;
}

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
        item["instance_id"] = vsts_instance_id;

        jsonObj.push(item);
    });
    return jsonObj;
}

//req POST for initial distribution or PUT to update
// function sendPoints(REQ, jsonString) {
//     var xhr = new XMLHttpRequest();
//     xhr.open(REQ, serverURL + "/v1/points/distribution/send/");
//     xhr.setRequestHeader("Content-Type", "application/json");
    // var json = {
    //     "given_points": jsonString,
    //     "date": firstdayofweek,
    //     "instance_id": vsts_instance_id
    // }
//     xhr.send(JSON.stringify(json));
// }

function sendPoints(REQ, jsonString) {
	$('#assignResponseText').html("Sending points..");
    var xhr = new XMLHttpRequest();
    xhr.open(REQ, serverURL + "/v1/points/distribution/send/");
    xhr.setRequestHeader("Content-Type", "application/json");
    var json = {
        "given_points": jsonString,
        "date": firstdayofweek,
        "instance_id": vsts_instance_id
    }
    xhr.onload = function () {
        if (this.status == 200) {
            $('#assignResponseText').html("Success: Your points have been allocated");
            refreshAssignStatusTable();
        } else {
            $('#assignResponseText').html("Error: Please check your point distribution");
        }
    };
    xhr.send(JSON.stringify(json));
}

function validatePoints() {
	$('#assignResponseText').html("Validating points..");
    var xhr = new XMLHttpRequest();
    xhr.open("PUT", serverURL + "/v1/points/distribution/validate/");
    xhr.setRequestHeader("Content-Type", "application/json");
    var json = {
        "week": firstdayofweek,
        "instance_id": vsts_instance_id
    }
    xhr.send(JSON.stringify(json));
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 400) {
            $('#assignResponseText').html(JSON.parse(xhr.responseText).detail);
        } else if (xhr.readyState === 4 && xhr.status === 200) {
            $('#assignResponseText').html("Succes: Your points have been validated");
        } else {
            $('#assignResponseText').html(JSON.parse(xhr.responseText).detail);
        }
    }
}

//Return the first day of the current week (Monday)
function firstDayOfWeek() {
    var curr = new Date;
    var firstday;
    if (curr.getDay() != 0) {
        firstday = new Date(curr.setDate(curr.getDate() - curr.getDay() + 1));
    } else {
        firstday = new Date(curr.setDate(curr.getDate() - curr.getDay() - 6));
    }
    return firstday.toISOString().substring(0, 10);
}

//Return the last day of the current week (Sunday)
function lastDayOfWeek() {
    var curr = new Date;
    var lastday;
    if (curr.getDay() != 0) {
        lastday = new Date(curr.setDate(curr.getDate() - curr.getDay() + 7));
    } else {
        lastday = new Date(curr.setDate(curr.getDate() - curr.getDay()));
    }
    return lastday.toISOString().substring(0, 10);
}

//Return date formatted
function displayFirstAndLastDate() {
    var firstDay = firstDayOfWeek();
    var lastDay = lastDayOfWeek();
    $('#assign-date-range').text("Week: " + firstDay + " to " + lastDay);
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

function updateJSONForTable() {
    var pointsWeek = weekPointDistribution;

    var newPoints = pointsWeek.given_points;

    //replace identifier with name
    jQuery.each(newPoints, function (index, val) {
        for (var i = members.length - 1; i >= 0; i--) {
            if (newPoints[index].from_member == members[i].identifier) {
                newPoints[index].from_member = members[i].name;
            }
        }
        for (var i = members.length - 1; i >= 0; i--) {
            if (newPoints[index].to_member == members[i].identifier) {
                newPoints[index].to_member = members[i].name;
            }
        }
    });

    //delete the week value
    jQuery.each(newPoints, function (index, val) {
        delete newPoints[index].week;
    });

    return newPoints;
}

function generateAssignStatusTable() {
    $('#assignStatusHeaders').html("<h3>Assign Status</h3><p>Points assigned by team members</p>");
    var assignStatusJSON = getJSON();
    console.log(assignStatusJSON);
    jQuery.each(assignStatusJSON, function (index, val) {
        console.log(assignStatusJSON[index]);
    });
    jQuery.each(assignStatusJSON, function (index, val) {
        $('#assignStatusTableHead').append('<th>' + assignStatusJSON[index][0] + '</th>');
    });
    for (var i = 1; i < assignStatusJSON[0].length; i++) {
        $('#assignStatusTableBody').append('<tr id="tableRow_' + i + '"></tr>');
        jQuery.each(assignStatusJSON, function (index, val) {
            $('#tableRow_' + i).append('<td>' + assignStatusJSON[index][i] + '</td>');
        });
    }
}

function refreshAssignStatusTable() {
    jQuery.get(serverURL + '/v1/points/distribution/' + firstdayofweek + '/', { instance_id: vsts_instance_id }, function (data, textStatus, xhr) {
        weekPointDistribution = data;
        $('#assignStatusTableHead').empty();
        $('#assignStatusTableBody').empty();
        generateAssignStatusTable();
    });
}