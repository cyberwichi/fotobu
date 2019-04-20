const path = require('path');
const exhander = require('express-handlebars');

const morgan = require('morgan');
const multer = require('multer');
const express = require('express');
const routes = require('../routes/index');
const errorHandler= require('errorhandler');



module.exports = app => {
    //si esiste un puerto del sistema lo pone si no el 3000
    app.set('port', process.env.PORT || 3000);

    //le decimos donde estan las vistas
    app.set('views', path.join(__dirname, '../views'));

    //motor de plantillas
    app.engine('.hbs', exhander({
        defaultLayout: 'main',
        partialsDir: path.join(app.get('views'), 'partials'),
        layoutsDir: path.join(app.get('views'), 'layouts'),
        extname: '.hbs',        
        helpers: require('./helpers')

    }));
    app.set('view engine', '.hbs');

    //midlewares
    app.use(morgan('dev'));
    app.use(multer({
        dest: path.join(__dirname, '../public/upload/temp')
    }).single('image'));
    app.use(express.urlencoded({
        extended: false
    }));
    app.use(express.json());
    routes(app);

    //ficheros estaticos
    app.use('/public', express.static(path.join(__dirname, '../public')));

    // manejador de errores

     if ('development'===app.get('env')){
         app.use(errorHandler);
     }








    return app;
};