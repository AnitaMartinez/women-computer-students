(function () {
    'use strict';

    let studentsPerYear = [] ;

    const ctx = document.getElementById("chart").getContext('2d');


    getDataStudents().then(data => {
        studentsPerYear = data;
        console.log('data', studentsPerYear);
        const women2016 = parseInt(studentsPerYear[8].women);
        const man2016 = parseInt(studentsPerYear[8].men);

        const myChart = new Chart(ctx, {
            type : 'bar',
            data : {
                labels : ['Mujeres', 'Hombres'],
                datasets : [{
                    label : "Número de estudiantes",
                    data  : [women2016, man2016],
                    backgroundColor : ['blue', 'orange']
                }]
            }
        });
    });




})();

