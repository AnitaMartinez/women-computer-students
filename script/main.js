(function () {
    'use strict';

    const ctx = document.getElementById("chart").getContext('2d');

    const createChart = studentsPerYear => {
        const chartData = {
            labels: studentsPerYear.year,
            datasets: [{
                backgroundColor: '#9900ff',
                stack: 'Stack 0',
                data: studentsPerYear.women
            }, {
                backgroundColor: '#1FC3AA',
                stack: 'Stack 0',
                data: studentsPerYear.men
            }]
        };

        const myChart = new Chart(ctx, {
            type: 'bar',
            data: chartData,
            options: {
                legend : {
                    display: false
                },
                title: {
                    display: false,
                },
                tooltips: {
                    mode: 'index',
                    intersect: false
                },
                responsive: true,
                scales: {
                    xAxes: [{
                        stacked: true,
                        ticks : {
                            fontColor : "#2E2E2E"
                        }
                    }],
                    yAxes: [{
                        stacked: true,
                        ticks : {
                            fontColor : "#2E2E2E"
                        }
                    }]
                },
                hover : {
                    /*onHover : e => {
                        const chart = document.getElementById('chart');
                        chart.style.cursor = "pointer";
                    }*/
                }
            }
        });
    };

    getDataStudents()  //ES6 ??
        .then(studentsPerYear => {
            //NO SÉ SI ESTO VA A AQUÍ O EN DATA.JS
            studentsPerYear.shift(); //temporal, por el NaN
            const studentsPerYearOrdered = {women: [], men: [], year: []};
            studentsPerYear.forEach(studentsOneYear => {
                let women = 0;
                let men = 0;
                studentsOneYear.forEach(students => {
                    women += students.women;
                    men += students.men;
                });
                studentsPerYearOrdered.women.push(women);
                studentsPerYearOrdered.men.push(men);
                studentsPerYearOrdered.year.push(studentsOneYear[0].schoolYearInitial);
            });
            console.log('studentsPerYearOrdered->', studentsPerYearOrdered);

            createChart(studentsPerYearOrdered);


            const womenBtn = document.getElementById('btnWomen');

            womenBtn.addEventListener('click', () => {
                console.log('pulsaste');
            })

    });

})();

