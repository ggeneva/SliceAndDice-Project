/* global firebase */

const firebaseModule = (function() {
    // Initialize the App in Firebase
    const config = {
        apiKey: 'AIzaSyCo3FRSStnFYijzll_1fRP2RFyeujL4eXU',
        authDomain: 'sliceanddiceproject-89fec.firebaseapp.com',
        databaseURL: 'https://sliceanddiceproject-89fec.firebaseio.com/',
        projectId: 'sliceanddiceproject-89fec',
        storageBucket: '',
        messagingSenderId: '385925591895',
    };

    firebase.initializeApp(config);

    const database = firebase.database();
    const auth = firebase.auth();

    return {
        database,
        auth,
    };
}());

export { firebaseModule };
