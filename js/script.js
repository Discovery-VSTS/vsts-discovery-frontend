function getMembers() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://127.0.0.1:8000/v1/members/", false);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
    return JSON.parse(xhr.responseText);
}

function addMember(name, email) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://127.0.0.1:8000/v1/members/");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify({ "name": name, "email": email }));
    console.log(xhr.status);
}

function getPointsForWeek() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://127.0.0.1:8000/v1/points/distribution/2017-02-18/", false);
    xhr.send();
    return JSON.parse(xhr.responseText);
}

function sendPoints() {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://127.0.0.1:8000/v1/points/distribution/send/");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify({
        "given_points": [
            {
                "to_member": "krinal@krinal.com",
                "points": 100,
                "from_member": "jason@jason.com",
                "week": "2017-02-20"
            },
            {
                "to_member": "jason@jason.com",
                "points": 100,
                "from_member": "jason@jason.com",
                "week": "2017-02-20"
            },
            {
                "to_member": "hello@hello.com",
                "points": 100,
                "from_member": "jason@jason.com",
                "week": "2017-02-20"
            }
        ],
        "week": "2017-02-20"
    }));
    console.log(xhr.status);
}

function updatePoints() {
    var xhr = new XMLHttpRequest();
    xhr.open("PUT", "http://127.0.0.1:8000/v1/points/distribution/send/");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify({
        "given_points": [
            {
                "to_member": "hello@hello.com",
                "points": 1,
                "from_member": "jason@jason.com",
                "week": "2017-02-20"
            }
        ],
        "week": "2017-02-20"
    }));
    console.log(xhr.status);
}