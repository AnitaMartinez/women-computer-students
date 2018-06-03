const application = (function () {
    'use strict';

    let studentsListPerYear;

    getDataStudents(function (data) {
        studentsListPerYear = data;
        console.log(studentsListPerYear);
    });
    

});

