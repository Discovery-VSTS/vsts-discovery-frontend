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


function getData(rawData) {
    chartLabels = [];
    dataSet = [];
    content = rawData.data;
    $.each(content, function(key, val) {
        chartLabels.push(key);
        dataSet.push(val);
    });

    return {chartLabels: chartLabels, dataSet: dataSet}
}


// chartLabels = ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"]
// dataSet = [12, 19, 10, 5, 2, 3]
function load100PtStatus() {

    chartLabels = getData(rawData).chartLabels;
    dataSet = getData(rawData).dataSet;

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
                    data: dataSet,
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


            var data = {
                labels: [
                    "Red",
                    "Blue",
                    "Yellow"
                ],
                datasets: [
                    {
                        data: [300, 50, 100],
                        backgroundColor: [
                            "#FF6384",
                            "#36A2EB",
                            "#FFCE56"
                        ],
                        hoverBackgroundColor: [
                            "#FF6384",
                            "#36A2EB",
                            "#FFCE56"
                        ]
                    }]
            };

            var myPieChart = new Chart(ctx,{
                type: 'pie',
                data: data,
                options: {
                    responsive: false
                }
            });
        }
    });
}

