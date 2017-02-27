function getMembers() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://127.0.0.1:8000/v1/members/", false);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
    return JSON.parse(xhr.responseText);
}

var obj = [
    {
        "name": "Jason",
        "email": "jason@jason.com"
    },
    {
        "name": "krinal",
        "email": "krinal@krinal.com"
    },
    {
        "name": "yichen",
        "email": "yichen@yichen.com"
    }
]

var user_list = $("#user_list>div");

obj.forEach(function (user, index) {

    user_list.append("<div>" +
        "<h1>" + user.name + "</h1>" +
        "<input type='text' id='user_" + index + "'/>" +
        "</div>");
});

$("input[type='text']").each(function (input) {
    $(input).val();
});