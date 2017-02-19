// Project: VSTS Discovery extension
// JavaScript functions for controlling 100 points status component
// Author: Yichen Lu
// Create Date: 01-Feb-2017
// Update Date: 01-Feb-2017


rawData = {
    groupID: "12345",
    data: {
        "Red": 12,
        "Blue": 20,
        "Yellow": 15,
        "Green": 35,
        "Purple": 13,
        "Orange": 5
    }
};


function getWeeklyDistribution() {
    chartLabels = [];
    labelVal = [];
    $.ajax({
        url: 'http://127.0.0.1:8000/points/distribution/'+'2017-02-18',
        type: 'GET',
        dataType: 'json',
    })
    .done(function(data) {
        console.log("success");
        var rData = readData(data);
        chartLabels = rData.chartLabels;
        labelVal = rData.labelVal;
        console.log(chartLabels);
        console.log(labelVal);
    })
    .fail(function() {
        console.log("error");
    })
    .always(function() {
        console.log("complete");
    });

    return {chartLabels: chartLabels, labelVal: labelVal}

}

// {
//     "given_points": [
//         {
//             "to_member": "bar@gmail.com",
//             "points": 35,
//             "from_member": "foo@gmail.com",
//             "week": "2017-02-18"
//         },
//         {
//             "to_member": "foo@gmail.com",
//             "points": 15,
//             "from_member": "bar@gmail.com",
//             "week": "2017-02-18"
//         },
//         {
//             "to_member": "yoo@gmail.com",
//             "points": 50,
//             "from_member": "bar@gmail.com",
//             "week": "2017-02-18"
//         },
//         {
//             "to_member": "bar@gmail.com",
//             "points": 35,
//             "from_member": "yoo@gmail.com",
//             "week": "2017-02-18"
//         },
//         {
//             "to_member": "foo@gmail.com",
//             "points": 15,
//             "from_member": "yoo@gmail.com",
//             "week": "2017-02-18"
//         },
//         {
//             "to_member": "yoo@gmail.com",
//             "points": 50,
//             "from_member": "foo@gmail.com",
//             "week": "2017-02-18"
//         }
//     ],
//     "week": "2017-02-18",
//     "is_final": false
// }

function readData(rawData) {
    chartLabels = [];
    labelVal = [];
    content = rawData.given_points;
    $.each(content, function(index, obj) {
        $.each(obj, function(key, val) {
            if (key == "to_member") {
                chartLabels.push(val);
                console.log(val)
            }
            if (key == "points") {
                labelVal.push(val);
            }
        });
    });

    return {chartLabels: chartLabels, labelVal: labelVal}
}


// chartLabels = ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"]
// labelVal = [12, 19, 10, 5, 2, 3]
function load100PtStatus() {

    var chartLabels = readData(rawData).chartLabels;
    var labelVal = readData(rawData).labelVal;


    $('#100-points-components').load("components/100-points-status.html", function(response, status, xhr){
        if (status == "success") {
            var ctx = $("#myChart");
            var ctx2 = $("#myChart2");
            var myChart = new Chart(ctx2, {
            type: 'bar',
            data: {
                labels: chartLabels,
                datasets: [{
                    label: '# of Votes',
                    data: labelVal,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                            }
                        }]
                    }
                }
            });

            var pieData = getWeeklyDistribution();
            var pieLabels = [];
            pieLabels = pieData.chartLabels;;
            var pieVal = pieData.labelVal;
            console.log(pieLabels);
            var pieDataConf = {
                labels: pieData.chartLabels,
                datasets: [
                    {
                        data: pieData.labelVal,
                        backgroundColor: [
                            "#FF6384",
                            "#36A2EB",
                            "#FFCE56",
                            "#FF6384",
                            "#36A2EB",
                            "#FFCE56"
                        ],
                        hoverBackgroundColor: [
                            "#FF6384",
                            "#36A2EB",
                            "#FFCE56",
                            "#FF6384",
                            "#36A2EB",
                            "#FFCE56"
                        ]
                    }]
            };

            var myPieChart = new Chart(ctx,{
                type: 'pie',
                data: pieDataConf,
                options: {
                    responsive: false
                }
            });
        }
    });
}

