//TO BE UPDATED WITH LIVE SERVER URL
// settingsServerUrl = "http://127.0.0.1:7000";
settingsServerUrl = "https://discovery-settingmanagement.azurewebsites.net";
//MUST UPDATE WITH INSTANCE ID FROM VSTS
// var instance_id = "vsts-discovery"; //dev
// var user_email = "yichen@gmail.com"; //dev
var user_email = currentUserEmail;
var instance_id = currentInstanceName;

function loadSetting() {
    $('#setting-components').load('components/setting.html',function(response, status, xhr){
        getTokens();
        $('#tokenSubmitButton').click(function(event) {
            tokenSubmitButton();
            getTokens();
        });
    });
}


function tokenSubmitButton() {
    var github_token = $('#githubTokenID').val();
    var slack_token = $('#slackTokenID').val();
    var slack_channel = $('#slackChannelID').val();
    var vsts_token = $('#vstsToken').val();

    $.ajax({
        url: settingsServerUrl+"/v1/tokenstorage/",
        type: 'POST',
        dataType: 'json',
        data: {
            "instance_id": instance_id,
            "user_email": user_email,
            "github_token": github_token,
            "slack_token": slack_token,
            "vsts_token": vsts_token,
            "slack_channel": slack_channel
        }
    })
    .done(function(data) {
        $('#settingsResponseText').html("Submit success");
        $('#settingsResponseText').css('color', '#279929');
        console.log("POST success");
        console.log(data);
    })
    .fail(function(obj, textStatus, errorThrown) {
        $('#settingsResponseText').html(errorThrown);
        $('#settingsResponseText').css('color', '#E42331');
        console.log("error");
    })
    .always(function() {
        console.log("complete");
    });
}


function getTokens() {
    $.ajax({
        url: settingsServerUrl+"/v1/tokenstorage/",
        type: 'GET',
        dataType: 'json',
        data: {
            instance_id: instance_id,
            user_email: user_email
        },
    })
    .done(function(data, textStatus, jqXHR) {
        // getStatus = textStatus;
        console.log("GET Tokens success");
        if (data.github_token!="") {
            $('#statusGitHubToken').show();
        }else{
            $('#statusGitHubToken').hide();
        }
        if (data.slack_token!="") {
            $('#statusSlackToken').show();
        }else{
            $('#statusSlackToken').hide();
        }
        if (data.slack_channel!="") {
            $('#statusSlackChannel').show();
        }else{
            $('#statusSlackChannel').hide();
        }
        if (data.vsts_token!="") {
            $('#statusVSTSAccessToken').show();
        }else{
            $('#statusVSTSAccessToken').hide();
        }
        console.log(data.vsts_token)
    })
    .fail(function() {
        console.log("error");
    })
    .always(function() {
        console.log("complete");
    });

}