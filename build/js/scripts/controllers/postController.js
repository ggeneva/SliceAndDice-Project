'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.postController = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* global $ */

var _postModel = require('post-model');

var _validator = require('validator');

var _imgUpload = require('img-upload');

var _templateLoader = require('template-loader');

var _dateHelper = require('date-helper');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PostController = function () {
    function PostController() {
        _classCallCheck(this, PostController);

        this.postModel = _postModel.postModel;
        this.validator = _validator.validator;
        this.uploadImg = _imgUpload.uploadImg;
    }

    _createClass(PostController, [{
        key: 'createPost',
        value: function createPost(sammy) {
            var user = _postModel.postModel.getCurrentUser();

            _imgUpload.uploadImg.uploadToApi($('#image')[0].files[0]).then(function (response) {
                var formData = {
                    author: user.displayName,
                    authorUid: user.uid,
                    image: response.data.link,
                    title: sammy.params.title,
                    content: sammy.params.content,
                    category: sammy.params.category,
                    dateOfCreation: Date.now(),
                    monthOfCreation: (0, _dateHelper.getMonthName)(),
                    dayOfCreation: (0, _dateHelper.getDayOfCreation)(),
                    comments: []
                };

                _postModel.postModel.create(formData);
                sammy.redirect('#/home');
            });
        }
    }, {
        key: 'loadCreatePostPage',
        value: function loadCreatePostPage(sammy) {
            _postModel.postModel.isUserLoggedIn().then(function (isLoggedIn) {
                if (isLoggedIn) {
                    _templateLoader.templateLoader.loadTemplate('create-post', '#g-app-container').then(function () {
                        _validator.validator.validatePost();
                    });
                } else {
                    sammy.redirect('#/');
                }
            });
        }
    }, {
        key: 'loadPost',
        value: function loadPost(sammy) {
            _postModel.postModel.getPost(sammy.params.id).then(function (post) {
                _templateLoader.templateLoader.loadTemplate('post', '#g-app-container', post);
            }).catch(function (err) {
                console.log(err);
            });
        }
    }, {
        key: 'loadCategory',
        value: function loadCategory(sammy) {
            _postModel.postModel.getPosts({ prop: 'category',
                value: sammy.params.category }).then(function (posts) {
                console.log(sammy.params.category);
                _templateLoader.templateLoader.loadTemplate('category', '#g-app-container', { posts: posts });
            }).catch(function (err) {
                console.log(err);
            });
        }
    }]);

    return PostController;
}();

var postController = new PostController(_postModel.postModel, _validator.validator, _imgUpload.uploadImg);

exports.postController = postController;