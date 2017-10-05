'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.postModel = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _database = require('database');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PostModel = function () {
    function PostModel(database) {
        _classCallCheck(this, PostModel);

        this.dataBase = database;
    }

    _createClass(PostModel, [{
        key: 'create',
        value: function create(data) {
            console.log(data);
            this.dataBase.createPost(data);
        }
    }, {
        key: 'isUserLoggedIn',
        value: function isUserLoggedIn() {
            var _this = this;

            return new Promise(function (resolve, reject) {
                _this.dataBase.onAuthStateChanged(function (user) {
                    return resolve(!!user);
                });
            });
        }
    }, {
        key: 'getCurrentUser',
        value: function getCurrentUser() {
            return this.dataBase.getCurrentUser();
        }
    }, {
        key: 'getAllPosts',
        value: function getAllPosts() {
            return this.dataBase.getAllPosts();
        }
    }, {
        key: 'getPosts',
        value: function getPosts(query) {
            return this.dataBase.getPosts(query);
        }
    }, {
        key: 'getPost',
        value: function getPost(query) {
            return this.dataBase.getPost(query);
        }
    }, {
        key: 'getComments',
        value: function getComments(query) {
            return this.dataBase.getComments(query);
        }
    }]);

    return PostModel;
}();

var postModel = new PostModel(_database.dataBase);

exports.postModel = postModel;