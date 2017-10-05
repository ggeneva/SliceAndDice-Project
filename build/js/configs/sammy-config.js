'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.router = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* global Sammy, $ */

var _userController = require('user-controller');

var _homeController = require('home-controller');

var _navigationHelper = require('navigation-helper');

var _postController = require('post-controller');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Router = function () {
    function Router() {
        _classCallCheck(this, Router);
    }

    _createClass(Router, [{
        key: 'start',
        value: function start() {
            /* eslint-disable */
            var sammy = Sammy(function () {
                this.get('#/', function (sammy) {
                    sammy.redirect('#/home');
                });
                this.get('#/home', _homeController.homeController.loadHomePage);

                // Category routes
                this.get('#/posts/?', _postController.postController.loadCategory);
                this.get('#/posts/:id', _postController.postController.loadPost);

                // User routes
                this.get('#/register', _userController.userController.loadRegisterPage);
                this.post('#/register', _userController.userController.register);
                this.get('#/login', _userController.userController.loadLoginPage);
                this.post('#/login', _userController.userController.login);
                this.get('#/sign-out', _userController.userController.signOut);

                //Users comments
                this.post('#/posts/:id/create-comment', _userController.userController.createComment);

                // Posts routes
                this.get('#/create-post', _postController.postController.loadCreatePostPage);
                this.post('#/create-post', _postController.postController.createPost);

                _navigationHelper.navUser.toggleNavigationUserElement();
            });

            $(function () {
                sammy.run('#/');
            });
        }
    }]);

    return Router;
}();

/* eslint-enable */


var router = new Router();

exports.router = router;