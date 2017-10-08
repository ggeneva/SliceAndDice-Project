'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.homeController = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _postModel = require('post-model');

var _templateLoader = require('template-loader');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HomeController = function () {
    function HomeController() {
        _classCallCheck(this, HomeController);

        this.postModel = _postModel.postModel;
        this.templateLoader = _templateLoader.templateLoader;
    }

    _createClass(HomeController, [{
        key: 'loadHomePage',
        value: function loadHomePage(sammy) {
            _postModel.postModel.getAllPosts().then(function (posts) {
                _templateLoader.templateLoader.loadTemplate('home', '#g-app-container', { posts: posts });
            }).catch(function (err) {
                console.log(err);
            });
        }
    }]);

    return HomeController;
}();

var homeController = new HomeController(_postModel.postModel, _templateLoader.templateLoader);

exports.homeController = homeController;