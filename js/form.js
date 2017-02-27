function getMembers() {
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "http://127.0.0.1:8000/v1/members/", false);
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.send();
	return JSON.parse(xhr.responseText);
}

var obj = getMembers();

var user_list = $("#user_list>div");

obj.forEach(function (user, index) {

	user_list.append("<div id='user_list_div'>" +
		"<h1>" + user.name + "</h1>" +
		"<input type='text' id='user_" + index + "' email = "+user.email+" />" +
		"</div>");
});

console.log(user_list)

$("#user_list_div input").on("click", function(){
	console.log($(this).attr("email"));
})

$("#user_list_div input").each(function(index, val) {
    // $.each(function(index, val){
    //     console.log(index + ": " + $(this).text());    
    // })
    console.log(index + ": " + $(val).val());
});

$('#submitButton').click(function(event) {
	$("#user_list_div input").each(function(index, val) {
        // $.each(function(index, val){
        //     console.log(index + ": " + $(this).text());    
        // })
        //console.log(index + ": " + $(val).val()+$(val).attr("email"));
    });
	var jsonString = createJSON();
	sendPoints(jsonString);
});

function createJSON() {
	jsonObj = [];
	$("#user_list_div input").each(function() {

		var id = $(this).attr("email");
		var points = $(this).val();

		item = {};
		item ["to_member"] = id;
		item ["points"] = parseInt(points);
		item ["from_member"] = "jason@jason.com";
		item ["week"] = "2017-02-27";

		jsonObj.push(item);
	});
	//console.log(jsonString = JSON.stringify(jsonObj));
	return jsonObj;
}

function sendPoints(jsonString) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://127.0.0.1:8000/v1/points/distribution/send/");
    xhr.setRequestHeader("Content-Type", "application/json");
    var json = {
        "given_points": jsonString,
        "week": "2017-02-27"
    }
    //console.log(JSON.stringify(json));
    xhr.send(JSON.stringify(json));
}

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