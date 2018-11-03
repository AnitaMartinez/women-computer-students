(function () {
    'use strict';
    const ctx = document.getElementById("chart").getContext('2d');
    let myChart;
    let studentsPerYear = [];
    const idDataset = {
        women : 'women',
        men   : 'men'
    };

    const createChart = () => {
        const chartData = {
            labels: studentsPerYear.year,
            datasets: [{
                backgroundColor: '#9900ff',
                stack: 'Stack 0',
                data: studentsPerYear.women,
                idDataset : 'women'
            }, {
                backgroundColor: '#1FC3AA',
                stack: 'Stack 0',
                data: studentsPerYear.men,
                idDataset : 'men'
            }]
        };
        myChart = new Chart(ctx, {
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
                }
            }
        });
    };

    const updateChartByGender = (idDatasetToDelete, idDatasetToAdd) => {
        let datasetToDelete = myChart.data.datasets.find(dataset => dataset.idDataset === idDatasetToDelete);
        let datasetToAdd = myChart.data.datasets.find(dataset => dataset.idDataset === idDatasetToAdd);
        datasetToDelete.data = [];
        if(datasetToAdd.data.length === 0) {
            datasetToAdd.data = studentsPerYear[idDatasetToAdd];
        }
        myChart.update();
    };

    const resetChart = () => {
        myChart.data.datasets.find(dataset => dataset.idDataset === idDataset.women).data = studentsPerYear.women;
        myChart.data.datasets.find(dataset => dataset.idDataset === idDataset.men).data = studentsPerYear.men;
        myChart.update();
    };

    const onWomenBtn = () => {
        updateChartByGender(idDataset.men, idDataset.women);
    };

    const onMenBtn = () => {
        updateChartByGender(idDataset.women, idDataset.men);
    };

    const onGenderButtons = () => {
        const womenBtn = document.getElementById('btnWomen');
        const menBtn = document.getElementById('btnMen');
        const resetBtn = document.getElementById('btnReset');
        womenBtn.addEventListener('click', onWomenBtn);
        menBtn.addEventListener('click', onMenBtn);
        resetBtn.addEventListener('click', resetChart);
    };

    getDataStudents()  //ES6 ??
        .then(dataStudents => {
            //NO SÉ SI ESTO VA A AQUÍ O EN DATA.JS
            dataStudents.shift(); //temporal, por el NaN
            studentsPerYear = {women: [], men: [], year: []};
            dataStudents.forEach(studentsOneYear => {
                let women = 0;
                let men = 0;
                studentsOneYear.forEach(students => {
                    women += students.women;
                    men += students.men;
                });
                studentsPerYear.women.push(women);
                studentsPerYear.men.push(men);
                studentsPerYear.year.push(studentsOneYear[0].schoolYearInitial);
            });
            createChart();
            onGenderButtons();
    });

})();

