function loadSetting() {
	$('#setting-components').load('components/setting.html',function(response, status, xhr){
		$('#tokenSubmitButton').click(function(event) {
			tokenSubmitButton();
		});
	});
}

settingsServerUrl = "http://127.0.0.1:7000";

function tokenSubmitButton() {
	var xhr = new XMLHttpRequest();
	xhr.open("GET", settingsServerUrl+"/v1/tokenstorage/?instance_id=ferer");
	xhr.send();

	xhr.onreadystatechange = function(){
		if(xhr.readyState < 4) {
			$('#settingsResponseText').html("Loading..");
		} else if(xhr.readyState===4 && xhr.status===404){
			sendTokenKey("POST", createTokenJSON());
			$('#settingsResponseText').html("API Keys Updated (POST)");
		} else if(xhr.readyState===4 && xhr.status===200){
			sendTokenKey("PUT", createTokenJSON)
			$('#settingsResponseText').html("API Keys Updated (PUT)");
		} else {
			$('#settingsResponseText').html("There was an error processing your request");
		}
	}
}

function createTokenJSON() {
	var instance_id = "wefwefwefwefweg";
	var github_token = "weejtjretjrgwr";
	var slack_token = "wregertewerg";
	var vsts_token = "woiugiuwerh";
	var slack_channel = "wiogewroigjr";
	var json = {
		"instance_id": instance_id,
		"github_token": github_token,
		"slack_token": slack_token,
		"vsts_token": vsts_token,
		"slack_channel": slack_channel
	};
	return JSON.stringify(json);
}

function sendTokenKey(REQ, jsonString) {
    var xhr = new XMLHttpRequest();
    xhr.open(REQ, settingsServerUrl+"/v1/tokenstorage/");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(jsonString);
    return xhr.status;
}