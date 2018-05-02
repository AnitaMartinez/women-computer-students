'use strict';

//run http-server

function csvJSON(csv) {
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

fetch("http://localhost:8080/csv/2016-2017.csv")
    .then((response) => {
        return response.text();
    })
    .then((text) => {
        return csvJSON(text);
    })
    .then((json) => {
        console.log(json);
    })

