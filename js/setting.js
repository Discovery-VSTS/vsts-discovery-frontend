function loadSetting() {
	$('#setting-components').load('components/setting.html',function(response, status, xhr){
		$('#tokenSubmitButton').click(function(event) {
			tokenSubmitButton();
		});
	});
}

//TO BE UPDATED WITH LIVE SERVER URL
// settingsServerUrl = "http://127.0.0.1:7000";
settingsServerUrl = "https://discovery-settingmanagement.azurewebsites.net";
//MUST UPDATE WITH INSTANCE ID FROM VSTS
// var instance_id = "f352ef29-9321-4588-85ba-e35ca23db41f";
var instance_id = currentInstanceID;


function tokenSubmitButton() {
	var xhr = new XMLHttpRequest();
	xhr.open("GET", settingsServerUrl+"/v1/tokenstorage/?instance_id="+instance_id);
	xhr.send();

	xhr.onreadystatechange = function(){
		if(xhr.readyState < 4) {
			$('#settingsResponseText').html("Loading..");
		} else if(xhr.readyState===4 && xhr.status===404){
			sendTokenKey("POST", createTokenJSON());
			$('#settingsResponseText').html("API Keys Updated (POST)");
		} else if(xhr.readyState===4 && xhr.status===200){
			sendTokenKey("PUT", createTokenJSON(), instance_id);
			$('#settingsResponseText').html("API Keys Updated (PUT)");
		} else {
			$('#settingsResponseText').html("There was an error processing your request");
		}
	}
}

function createTokenJSON() {
	var github_token = $('#githubTokenID').val();
	var slack_token = $('#slackTokenID').val();
	var slack_channel = $('#slackChannelID').val();
    var vsts_token = $('#vstsToken').val();
	var json = {
		"instance_id": instance_id,
		"github_token": github_token,
		"slack_token": slack_token,
		"vsts_token": vsts_token,
		"slack_channel": slack_channel
	};
	return JSON.stringify(json);
}

function sendTokenKey(REQ, jsonString, instance) {
    var xhr = new XMLHttpRequest();
    if (instance) {
    	xhr.open(REQ, settingsServerUrl+"/v1/tokenstorage/"+instance_id+"/");
    } else {
    	xhr.open(REQ, settingsServerUrl+"/v1/tokenstorage/");
    }
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(jsonString);
    //xhr.status used for future validation
    return xhr.status;
}