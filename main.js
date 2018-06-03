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

for (let i = 2008; i <= 2016; i++){
    let j = i + 1;
    fetch(`http://localhost:8080/csv/${i}-${j}.csv`)
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


