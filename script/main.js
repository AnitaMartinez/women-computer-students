(function () {
    'use strict';
    const ctx = document.getElementById("chart").getContext('2d');
    const womenBtn = document.getElementById('btnWomen');
    const menBtn = document.getElementById('btnMen');
    const resetBtn = document.getElementById('btnReset');
    const genderBtns = document.getElementsByClassName('btn-gender');
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
                            fontColor : "#2E2E2E",
                        }
                    }]
                }
            }
        });
    };

    const updateChartByGender = ({idDataToDelete, idDataToAdd}) => {
        let datasetToDelete = myChart.data.datasets.find(dataset => dataset.idDataset === idDataToDelete);
        let datasetToAdd = myChart.data.datasets.find(dataset => dataset.idDataset === idDataToAdd);
        datasetToDelete.data = [];
        if(datasetToAdd.data.length === 0) {
            datasetToAdd.data = studentsPerYear[idDataToAdd];
        }
        myChart.update();
    };

    const resetChart = () => {
        myChart.data.datasets.find(dataset => dataset.idDataset === idDataset.women).data = studentsPerYear.women;
        myChart.data.datasets.find(dataset => dataset.idDataset === idDataset.men).data = studentsPerYear.men;
        myChart.update();
    };

    const highlightBtn = (button) => {
        for(let i = 0; i < genderBtns.length; i++){
            if(genderBtns[i].classList.contains('underline')){
                genderBtns[i].classList.remove('underline');
            }
        }
        button.classList.add('underline');
    };

    const onWomenBtn = () => {
        updateChartByGender({idDataToDelete : idDataset.men, idDataToAdd : idDataset.women});
        highlightBtn(womenBtn);
    };

    const onMenBtn = () => {
        updateChartByGender({idDataToDelete : idDataset.women, idDataToAdd : idDataset.men});
        highlightBtn(menBtn);
    };

    const onResetBtn = () => {
        resetChart();
        highlightBtn(resetBtn);
    };

    const onGenderButtons = () => {
        womenBtn.addEventListener('click', onWomenBtn);
        menBtn.addEventListener('click', onMenBtn);
        resetBtn.addEventListener('click', onResetBtn);
    };

    getDataStudents()
        .then(dataStudents => {
            console.log('dataStudents', dataStudents);
            studentsPerYear = dataStudents;
            dataStudents.shift(); //TODO: temporal, por el NaN
            studentsPerYear = {women: [], men: [], year: []};  //TODO : DATA.JS
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

