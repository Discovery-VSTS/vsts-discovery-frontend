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


$('#100pt-status').click(function(event) {
    event.preventDefault();
    removeActiveClassInMenuItems();
    $(this).addClass('active');
    load100PtStatus();
});


$('#100pt-assign').click(function(event) {
    event.preventDefault();
    removeActiveClassInMenuItems();
    $(this).addClass('active');
    load100PtAssign();
});


function removeActiveClassInMenuItems() {
    $("#100-points-menu li").removeClass('active');
}


var vssWebContext = VSS.getWebContext()

