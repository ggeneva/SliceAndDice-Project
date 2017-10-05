'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.dataBase = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _firebaseConfig = require('firebase-config');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DataBase = function () {
    function DataBase(config) {
        _classCallCheck(this, DataBase);

        this.database = config.database;
        this.auth = config.auth;
    }

    _createClass(DataBase, [{
        key: 'createUser',
        value: function createUser(data) {
            return this.auth.createUserWithEmailAndPassword(data.email, data.password);
        }
    }, {
        key: 'signInWithEmail',
        value: function signInWithEmail(data) {
            return this.auth.signInWithEmailAndPassword(data.email, data.password);
        }
    }, {
        key: 'signOut',
        value: function signOut() {
            return this.auth.signOut();
        }
    }, {
        key: 'getCurrentUser',
        value: function getCurrentUser() {
            return this.auth.currentUser;
        }
    }, {
        key: 'onAuthStateChanged',
        value: function onAuthStateChanged(callback) {
            return this.auth.onAuthStateChanged(function (user) {
                callback(user);
            });
        }
    }, {
        key: 'updateUserProfile',
        value: function updateUserProfile(data) {
            var user = this.getCurrentUser();
            return user.updateProfile(data);
        }
    }, {
        key: 'createPost',
        value: function createPost(data) {
            this.database.ref('posts/' + data.authorUid + data.dateOfCreation).set(data).catch(function (err) {
                console.log(err.message);
            });
        }
    }, {
        key: 'createComment',
        value: function createComment(data) {
            console.log('enter');
            this.database.ref('posts/${data.postId}/'.child('comments') + data.authorUid + data.dateOfCreation).set(data).catch(function (err) {
                console.log(err.message);
            });
        }
    }, {
        key: 'getAllPosts',
        value: function getAllPosts() {
            var _this = this;

            return new Promise(function (resolve, reject) {
                var posts = _this.database.ref('posts/');
                posts.once('value', function (data) {
                    resolve(data.val());
                });
            });
        }
    }, {
        key: 'getPosts',
        value: function getPosts(query) {
            var _this2 = this;

            return new Promise(function (resolve, reject) {
                var posts = _this2.database.ref('posts/').orderByChild(query.prop).equalTo(query.value);
                posts.once('value', function (data) {
                    resolve(data.val());
                });
            });
        }
    }, {
        key: 'getPost',
        value: function getPost(query) {
            var _this3 = this;

            return new Promise(function (resolve, reject) {
                var posts = _this3.database.ref('posts/').child(query);
                posts.once('value', function (data) {
                    resolve(data.val());
                });
            });
        }
    }]);

    return DataBase;
}();

var dataBase = new DataBase(_firebaseConfig.firebaseModule);

exports.dataBase = dataBase;