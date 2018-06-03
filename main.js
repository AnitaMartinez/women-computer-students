'use strict';

//run http-server

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

const dataStudents = [];

const firstYear = 2008;
const lastYear = 2016;

for (let yearA = firstYear; yearA <= lastYear; yearA++){
    let yearB = yearA + 1;
    fetch(`http://localhost:8080/csv/${yearA}-${yearB}.csv`)
        .then((response) => {
            return response.text();
        })
        .then((text) => {
            return convertCSVtoJSON(text);
        })
        .then((arrayOfObjectsWithData) => {
            if(arrayOfObjectsWithData.length <= 1){
                dataStudents.push(arrayOfObjectsWithData[0]);
            }
            else {
                dataStudents.push(arrayOfObjectsWithData)
            }

            return arrayOfObjectsWithData;
        })
        .then((json) => {
            console.log(dataStudents);
        })
}




