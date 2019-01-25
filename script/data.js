'use strict';

const getDataStudents = () => {
    return new Promise((resolve, reject) => {
        const studentsPerYear = [];
        const firstYear = 2008;
        const lastYear = 2016;
        const urls = [];
        for (let firstYearOfSchoolYear = firstYear; firstYearOfSchoolYear <= lastYear; firstYearOfSchoolYear++) {
            let secondYearOfSchoolYear = firstYearOfSchoolYear + 1;
            urls.push(`/csv/${firstYearOfSchoolYear}-${secondYearOfSchoolYear}.csv`);
        }
        Promise.all(
            urls.map(url => fetch(url)
                .then(resp => resp.text())
        )).then(texts => {
            texts.forEach(text => {
                studentsPerYear.push(parsingData(text));
            });
            resolve(studentsPerYear);
        }).catch(error => {
            console.log('Error: ', error.message);
        })
    })
};


const parsingData = data => {
    const studentsData = convertCSVtoJSON(data);
    for (const studentsPerOneYear of studentsData) {
        transformObject(studentsPerOneYear);
    }
    return studentsData
};

const transformObject = data => {
    const studentsPerOneYear = data;
    studentsPerOneYear.women = parseInt(studentsPerOneYear.Mujeres);
    studentsPerOneYear.men = parseInt(studentsPerOneYear.Hombres);
    delete studentsPerOneYear['Mujeres'];
    delete studentsPerOneYear['Hombres'];
    const firstKeyObject = Object.keys(studentsPerOneYear)[0];
    const strSchoolYear = firstKeyObject.split(" ")[1].toString();
    const schoolYearInitial = parseInt(strSchoolYear.split("/")[0]);
    const schoolYearFinal = parseInt(strSchoolYear.split("/")[1]);
    studentsPerOneYear.schoolYearInitial = schoolYearInitial;
    studentsPerOneYear.schoolYearFinal = schoolYearFinal;
    studentsPerOneYear.degree = studentsPerOneYear[firstKeyObject].split("-")[1].trim();
    delete studentsPerOneYear[firstKeyObject];
};

const convertCSVtoJSON = csv => {
    const lines = csv.split("\n");
    const result = [];
    const headers = lines[0].split(";");
    for (let i = 1; i < lines.length; i++) {
        const obj = {};
        const currentLine = lines[i].split(";");
        for (let j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentLine[j];
        }
        result.push(obj);
    }
    return result;
};
