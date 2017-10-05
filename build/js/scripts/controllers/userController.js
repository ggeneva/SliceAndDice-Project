'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.userController = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* global $ */

var _userModel = require('user-model');

var _imgUpload = require('img-upload');

var _navigationHelper = require('navigation-helper');

var _validator = require('validator');

var _templateLoader = require('template-loader');

var _dateHelper = require('date-helper');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserController = function () {
    function UserController() {
        _classCallCheck(this, UserController);

        this.helpers = _imgUpload.uploadImg;
        this.userModel = _userModel.userModel;
        this.templateLoader = _templateLoader.templateLoader;
        this.navUser = _navigationHelper.navUser;
        this.validator = _validator.validator;
    }

    _createClass(UserController, [{
        key: 'register',
        value: function register(sammy) {
            var formData = {
                email: sammy.params.email,
                password: sammy.params.password
            };
            var imgUrl = '';

            _userModel.userModel.register(formData).then(function () {
                console.log('user created');
                _navigationHelper.navUser.toggleNavigationUserElement();

                _imgUpload.uploadImg.uploadToApi($('#avatar')[0].files[0]).then(function (response) {
                    imgUrl = response.data.link;

                    _userModel.userModel.updateProfile({
                        displayName: sammy.params.username,
                        photoURL: imgUrl
                    }).then(function () {
                        sammy.redirect('#/');
                    }).catch(function (err) {
                        console.log(err.msg);
                    });
                });
            }).catch(function (error) {
                console.log(error.message);
                $('.label.label-danger').text(error.message);
            });
        }
    }, {
        key: 'login',
        value: function login(sammy) {
            var formData = {
                email: sammy.params.email,
                password: sammy.params.password
            };

            _userModel.userModel.login(formData).then(function () {
                _navigationHelper.navUser.toggleNavigationUserElement();
                sammy.redirect('#/');
            }).catch(function (error) {
                console.log(error.message);
                $('.label.label-danger').text('Invalid username or password!');
            });
        }
    }, {
        key: 'signOut',
        value: function signOut(sammy) {
            _userModel.userModel.signOut().then(function () {
                console.log('you are now loged off');
                _navigationHelper.navUser.toggleNavigationUserElement();
                sammy.redirect('#/');
            }).catch(function (err) {
                console.log(err);
            });
        }
    }, {
        key: 'loadRegisterPage',
        value: function loadRegisterPage(sammy) {
            _userModel.userModel.isUserLoggedIn().then(function (isLoggedIn) {
                if (!isLoggedIn) {
                    _templateLoader.templateLoader.loadTemplate('register', '#app-container').then(function () {
                        _validator.validator.validateRegister();
                    });
                } else {
                    sammy.redirect('#/');
                }
            });
        }
    }, {
        key: 'loadLoginPage',
        value: function loadLoginPage(sammy) {
            _userModel.userModel.isUserLoggedIn().then(function (isLoggedIn) {
                if (!isLoggedIn) {
                    _templateLoader.templateLoader.loadTemplate('login', '#app-container').then(function () {
                        _validator.validator.validateLogin();
                    });
                } else {
                    sammy.redirect('#/');
                }
            });
        }
    }, {
        key: 'createComment',
        value: function createComment(sammy) {
            _userModel.userModel.isUserLoggedIn().then(function (isLoggedIn) {
                if (!isLoggedIn) {
                    sammy.redirect('#/login');
                } else {
                    var postId = window.location.href.split('posts/')[1].split('/')[0];
                    var user = _userModel.userModel.getCurrentUser();
                    var formData = {
                        postId: postId,
                        imageUrl: sammy.params.imageUrl,
                        authorName: sammy.params.name,
                        content: sammy.params.content,
                        authorUid: user.uid,
                        dateOfCreation: Date.now(),
                        monthOfCreation: (0, _dateHelper.getMonthName)(),
                        dayOfCreation: (0, _dateHelper.getDayOfCreation)()
                    };
                    console.log(formData);

                    _userModel.userModel.createUserComment(formData);
                    sammy.redirect('#/home');
                }
                sammy.redirect('#/register');
            });
        }
    }]);

    return UserController;
}();

var userController = new UserController(_userModel.userModel, _imgUpload.uploadImg, _templateLoader.templateLoader, _navigationHelper.navUser, _validator.validator);

exports.userController = userController;