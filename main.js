const application = (function() {
    'use strict';

    let studentsListPerYear;

    getDataStudents(function (data) {
        studentsListPerYear = data;
        console.log(studentsListPerYear);
    });


    function getDataStudents(callback){
        const studentsPerYear = [];
        const firstYear = 2008;
        const lastYear = 2016;

        for (let firstYearOfSchoolYear = firstYear; firstYearOfSchoolYear <= lastYear; firstYearOfSchoolYear++) {
            let secondYearOfSchoolYear = firstYearOfSchoolYear + 1;
            fetch(`http://localhost:8080/csv/${firstYearOfSchoolYear}-${secondYearOfSchoolYear}.csv`)
                .then((response) => {
                    return response.text();
                })
                .then((text) => {
                    return convertCSVtoJSON(text);
                })
                .then((oneYearStudents) => {
                    if (oneYearStudents.length <= 1) {
                        studentsPerYear.push(oneYearStudents[0]);
                    }
                    else {
                        studentsPerYear.push(oneYearStudents)
                    }
                })
        }
        callback(studentsPerYear);
    }

    function convertCSVtoJSON(csv) {
        const lines = csv.split("\n");
        const result = [];
        const headers = lines[0].split(";");
        for (let i = 1; i < lines.length; i++) {
            const obj = {};
            const currentline = lines[i].split(";");
            for (let j = 0; j < headers.length; j++) {
                obj[headers[j]] = currentline[j];
            }
            result.push(obj);
        }
        return result;
    }



});

