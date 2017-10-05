'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.userModel = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _database = require('database');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserModel = function () {
    function UserModel(database) {
        _classCallCheck(this, UserModel);

        this.database = database;
    }

    _createClass(UserModel, [{
        key: 'register',
        value: function register(formData) {
            return this.database.createUser(formData);
        }
    }, {
        key: 'login',
        value: function login(formData) {
            return this.database.signInWithEmail(formData);
        }
    }, {
        key: 'signOut',
        value: function signOut() {
            return this.database.signOut();
        }
    }, {
        key: 'getCurrentUser',
        value: function getCurrentUser() {
            return this.database.getCurrentUser();
        }
    }, {
        key: 'isUserLoggedIn',
        value: function isUserLoggedIn() {
            var _this = this;

            return new Promise(function (resolve, reject) {
                _this.database.onAuthStateChanged(function (user) {
                    return resolve(!!user);
                });
            });
        }
    }, {
        key: 'updateProfile',
        value: function updateProfile(data) {
            return this.database.updateUserProfile(data);
        }
    }, {
        key: 'createUserComment',
        value: function createUserComment(data) {
            console.log('enter');
            this.dataBase.createComment(data);
        }
    }]);

    return UserModel;
}();

var userModel = new UserModel(_database.dataBase);

exports.userModel = userModel;