$('#status').click(function(event) {
    event.preventDefault();
    $('#100-points-components').load("components/100-points-status.html");
});

$('#assign').click(function(event) {
    event.preventDefault();
    $('#100-points-components').load("components/100-points-assign.html");
});