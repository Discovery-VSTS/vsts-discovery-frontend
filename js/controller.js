// Project: VSTS Discovery extension
// JavaScript functions for controlling main page behaviours
// Author: Yichen Lu
// Create Date: 31-Jan-2017
// Update Date: 01-Feb-2017

jQuery(document).ready(function() {
    // activate 100pt-status component when page loaded by default
    load100PtStatus();
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
    load100PtStatus();
});


$('#100pt-assign').click(function(event) {
    event.preventDefault();
    $("#100-points-menu li").removeClass('active');
    $(this).addClass('active');
    load100PtAssign();
});

$('#codetracker-status').click(function(event) {
    event.preventDefault();
    $("#codetracker-menu li").removeClass('active');
    $(this).addClass('active');
    loadCodetrackerStatus();
});


$('#codetracker-setting').click(function(event) {
    event.preventDefault();
    $("#codetracker-menu li").removeClass('active');
    $(this).addClass('active');

});


// Global variables retrieved from VSS SDK
var vssWebContext = VSS.getWebContext();
console.log(vssWebContext);
var currentAccount = vssWebContext.account;
console.log(currentAccount);
var currentUser = vssWebContext.user;
console.log(currentUser);
var currentAccountID = currentAccount.id;
console.log("Current Account ID: "+currentAccountID);
var currentUserEmail = currentUser.email;
console.log("Current User's Email: "+currentUserEmail);
