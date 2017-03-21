// Project: VSTS Discovery extension
// JavaScript functions for controlling main page behaviours
// Author: Yichen Lu
// Create Date: 31-Jan-2017
// Update Date: 01-Feb-2017

var webContext;
var currentAccount;
var currentAccountName;
var currentUser;
var currentInstanceName;
var currentInstanceID;
var currentUserName;
var currentUserEmail;
var currentProject;

var is100ptStatusLoaded = false;
var is100ptAssignLoaded = false;
var isCodeTrackerLoaded = false;
var isSettingLoaded = false;

jQuery(document).ready(function() {
    // activate 100pt-status component when page loaded by default
    // load100PtStatus();
    // loadSetting();
    // loadCodetrackerStatus();
    VSS.init({
        explicitNotifyLoaded: true
    });
    // console.log(is100ptStatusLoaded);
    VSS.ready(function(){
        load100PtStatus();
    });
    // load100PtStatus();
    VSS.notifyLoadSucceeded();
    // $('#100pt_loading_text').show();
    // $('#charts-container').hide();

});


function bindTopNavClickEvents() {
    $('#navbar a').click(function (e) {
      e.preventDefault()
      $(this).tab('show')
    })
}

// component menu items controls
$('#100pt-status').click(function(event) {
    event.preventDefault();
    $("#100-points-menu li").removeClass('active');
    $(this).addClass('active');
    // console.log(is100ptStatusLoaded)
    load100PtStatus();
});


$('#100pt-assign').click(function(event) {
    event.preventDefault();
    $("#100-points-menu li").removeClass('active');
    $(this).addClass('active');
    load100PtAssign();
});

$('#tab_code_tracker').click(function(event) {
    // event.preventDefault();
    // $("#codetracker-menu li").removeClass('active');
    // $(this).addClass('active');
    // console.log(isCodeTrackerLoaded)
    if (!isCodeTrackerLoaded) {
        loadCodetrackerStatus();
        isCodeTrackerLoaded = true;
    }
});


$('#tab_setting').click(function(event) {
    // event.preventDefault();
    // $("#codetracker-menu li").removeClass('active');
    // $(this).addClass('active');
    // console.log(isSettingLoaded)
    if (!isSettingLoaded) {
        loadSetting();
        isSettingLoaded = true;
    }
});



// if (webContext===undefined) {
//     VSS.init();
//     VSS.ready(function(){
//         load100PtStatus();
//         is100ptStatusLoaded = true;
//     });
//     VSS.notifyLoadSucceeded();
//     var webContext = VSS.getWebContext();
//     console.log(webContext);
// }





// function createMember() {
//     $.ajax({
//         url: 'http://discovery-100p.azurewebsites.net/v1/members/',
//         type: 'POST',
//         dataType: 'json',
//         data: {
//             name: currentUserName,
//             email: currentUserEmail,
//             instance_id: currentInstanceID
//         }
//     })
//     .done(function(data) {
//         console.log("Create member success");
//         console.log(data)
//     })
//     .fail(function(obj, textStatus, errorThrown) {
//         console.log("Create member error. "+errorThrown);
//     })
//     .always(function() {
//         console.log("complete");
//     });
// }
