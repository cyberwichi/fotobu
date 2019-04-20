const express = require('express');
const config = require('./server/config');

const database = require ('./database');
const app = config(express());


app.listen(app.get('port'), () => {
    console.log('servidor en el puerto : ', app.get('port'));
});