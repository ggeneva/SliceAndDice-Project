'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/* global firebase */

var firebaseModule = function () {
    // Initialize the App in Firebase
    var config = {
        apiKey: 'AIzaSyCo3FRSStnFYijzll_1fRP2RFyeujL4eXU',
        authDomain: 'sliceanddiceproject-89fec.firebaseapp.com',
        databaseURL: 'https://sliceanddiceproject-89fec.firebaseio.com/',
        projectId: 'sliceanddiceproject-89fec',
        storageBucket: '',
        messagingSenderId: '385925591895'
    };

    firebase.initializeApp(config);

    var database = firebase.database();
    var auth = firebase.auth();

    return {
        database: database,
        auth: auth
    };
}();

exports.firebaseModule = firebaseModule;