'use strict';

/* global SystemJS */

SystemJS.config({
    // tell SystemJS which transpiler to use
    transpiler: 'plugin-babel',
    // tell SystemJS where to look for the dependencies
    map: {
        'plugin-babel': 'https://cdn.rawgit.com/systemjs/plugin-babel/master/plugin-babel.js',
        'systemjs-babel-build': 'https://cdn.rawgit.com/systemjs/plugin-babel/master/systemjs-babel-browser.js',

        // app script 
        'main': '../scripts/main.js',
        'router': '../configs/sammy-config.js',

        'firebase-config': '../configs/firebase-config.js',
        'database': '../scripts/data/database.js',

        // helpers
        'img-upload': '../scripts/helpers/img-upload.js',
        'template-loader': '../scripts/helpers/template-loader.js',
        'navigation-helper': '../scripts/helpers/navigation.js',
        'validator': '../scripts/helpers/validator.js',
        'date-helper': '../scripts/helpers/date-helper.js',

        // models
        'user-model': '../scripts/data/models/userModel.js',
        'post-model': '../scripts/data/models/postModel.js',

        // controllers
        'home-controller': '../scripts/controllers/homeController.js',
        'user-controller': '../scripts/controllers/userController.js',
        'post-controller': '../scripts/controllers/postController.js'

    },
    packages: {
        '/': {
            defaultExtension: 'js'
        }
    }
});