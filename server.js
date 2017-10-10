/* global __dirname */
const express = require('express');
const app = express();

const port = 3000;

app.use(express.static(__dirname +'/app'));
app.use('/libs', express.static(__dirname + '/node_modules'));

app.listen(port, function() {
    // require('openurl').open(`http://localhost:${port}/index.html`);
    console.log('Server is running at port ' + port);
});
