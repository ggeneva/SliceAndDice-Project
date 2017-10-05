'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var MONTH_NAMES = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
var getMonthName = function getMonthName() {
    var currentDate = new Date();
    var monthDigit = currentDate.getMonth();

    var monthShortName = MONTH_NAMES[monthDigit];

    return monthShortName;
};

var getDayOfCreation = function getDayOfCreation() {
    var currentDate = new Date();
    var dateCreated = currentDate.getDay();

    return dateCreated;
};

exports.getMonthName = getMonthName;
exports.getDayOfCreation = getDayOfCreation;