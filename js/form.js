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
        console.log(index + ": " + $(val).val()+$(val).attr("email"));
    });
});