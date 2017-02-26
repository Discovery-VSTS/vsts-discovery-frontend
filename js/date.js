//Return the first day of the current week (Sunday)
function firstDayOfWeek() {
    var curr = new Date;
    var firstday = new Date(curr.setDate(curr.getDate() - curr.getDay()));
    return firstday.toISOString().substring(0, 10);
}

//Return the last day of the current week (Saturday)
function lastDayOfWeek() {
    var curr = new Date;
    var lastday = new Date(curr.setDate(curr.getDate() - curr.getDay() + 6));
    return lastday.toISOString().substring(0, 10);
}

//Return date formatted
function displayFirstAndLastDate() {
    return firstDayOfWeek() + " - " + lastDayOfWeek();
}