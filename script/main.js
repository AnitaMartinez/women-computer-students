(function () {
    'use strict';

    let studentsPerYear = [] ;
    const ctx = document.getElementById("chart").getContext('2d');

    getDataStudents().then(data => {
        studentsPerYear = data;
        studentsPerYear.shift(); //temporal, por el NaN
        const totalPerYear = {women : [], men : [], year : []};
        studentsPerYear.forEach(studentsOneYear => {
            let women = 0;
            let men = 0;
            studentsOneYear.forEach(students => {
                women += students.women;
                men += students.men;
            });
            totalPerYear.women.push(women);
            totalPerYear.men.push(men);
            totalPerYear.year.push(studentsOneYear[0].schoolYearInitial);
        });
        console.log('totalPerYear->', totalPerYear);

        const chartData = {
            labels: totalPerYear.year,
            datasets: [{
                label: 'Mujeres',
                backgroundColor: '#9900ff',
                stack: 'Stack 0',
                data: totalPerYear.women
            }, {
                label: 'Hombres',
                backgroundColor: '#1FC3AA',
                stack: 'Stack 0',
                data: totalPerYear.men
            }]
        };

        const myChart = new Chart(ctx, {
            type: 'bar',
            data: chartData,
            options: {
                title: {
                    display: true,
                    text: 'Número de estudiantes de informática por género'
                },
                tooltips: {
                    mode: 'index',
                    intersect: false
                },
                responsive: true,
                scales: {
                    xAxes: [{
                        stacked: true,
                    }],
                    yAxes: [{
                        stacked: true
                    }]
                }
            }
        });

    });

})();

