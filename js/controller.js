// Project: VSTS Discovery extension
// JavaScript functions for controlling main page behaviours
// Author: Yichen Lu
// Create Date: 31-Jan-2017
// Update Date: 01-Feb-2017

$('#status').click(function(event) {
    event.preventDefault();
    $('#100-points-components').load("components/100-points-status.html");
});

$('#assign').click(function(event) {
    event.preventDefault();
    $('#100-points-components').load("components/100-points-assign.html");
});