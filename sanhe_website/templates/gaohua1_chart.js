
    //Color
    var chartColors = {
        red: 'rgb(234, 27, 53)',
        green: 'rgb(52, 168, 83)',
        blue: '#1a73e8'
    };
    //Color Gradient
    var ctx = document.getElementById("chartjs").getContext("2d"); 
    var gradient = ctx.createLinearGradient(0, 0, 0, 220);
    gradient.addColorStop(0, chartColors.red);   
    gradient.addColorStop(1, "white");

    

    //d3.csv function inside a function
     /*--------------------------------------------------- FIX VARIATION --------------------------------------------------*/
    let filename_red = '../static/gaohua1.csv';
     /*--------------------------------------------------- FIX VARIATION --------------------------------------------------*/
    d3.csv(filename_red).then(function(loadedData){
        
        let data_red = [];
        let labels_red = [];
        for (let i = 0; i < loadedData.length; i++ ) {
            let date = loadedData[i].DATE;
            let roi = (loadedData[i].ROI).replace("%","");     //remove % 

            labels_red.push(date);
            data_red.push(roi);
        }

        
        let data_blue = [];
        let labels_blue = [];
        for (let i = 0; i < loadedData.length; i++ ) {
            let date = loadedData[i].DATE;
            let hushen = (loadedData[i].HUSHEN).replace("%",""); //remove %

                labels_blue.push(date);
                data_blue.push(hushen);
        }
            
            
/* This is a rediculous syntax, chart.js config starts here .................................*/
 //config = Type + Data (content) + Option (look) of the chart
 var config = {
        type: 'line',
        data: {
            labels: labels_red,
            datasets: [
                {
                    label: "沪深300指数",
                    fill: false,
                    pointRadius: 0,
                    backgroundColor: chartColors.blue,
                    borderColor: chartColors.blue,
                    data: data_blue
                },{
                     /*--------------------------------------------------- FIX VARIATION --------------------------------------------------*/
                    label: "三和-高华1号",
                     /*--------------------------------------------------- FIX VARIATION --------------------------------------------------*/
                     fill:{
                        target: 'origin',
                        above: gradient,   // Area will be graident above the origin
                        below: 'transparent'    // And transparent below the origin
                    },
                    pointRadius: 0,
                    borderColor: chartColors.red,
                    data: data_red
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        boxHeight: 1,
                        padding: 50
                    },
                    reverse: true
                },
                title: {
                    display: false
                },
                tooltips: {
                    mode: 'label',
                },
                elements:{
                    line: {
                        tension: 0
                    }
                }
            },
            interactions: {
                mode: 'nearest',
                intersect: true
            },
            scales: {
                x: {
                    display: true,
                    ticks: {
                        display: true,
                        maxRotation: 0,
                        minRotation: 0,
                        autoSkip: false,
                        callback: function(val, index) {
                            // Hide the label of every 2nd dataset
                            return index % 20 === 0 ? this.getLabelForValue(val) : '';
                        },
                    },
                    grid: {
                        display: false
                    }
                },
                y: {
                    display: true,
                    ticks: {
                        display: true,
                        callback: function(label, index, labels) {
                            // Add % 
                            return label+'%';
                        }
                    },
                    title: {
                        display: true,
                        text: '收益率'
                    }
                }
            }
        }
    };


var ctx = document.getElementById("chartjs").getContext("2d");
window.myLine = new Chart(ctx, config);

/* This is a rediculous syntax, chart.js config ends here .................................*/


    }); /* d3.csv for red data ends here */



   

