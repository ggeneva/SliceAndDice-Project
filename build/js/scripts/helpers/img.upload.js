'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* global $ */

var clientId = 'cb5cf831126a0dd';
var uploadUrl = 'https://api.imgur.com/3/image';

var ImageUpload = function () {
    function ImageUpload() {
        _classCallCheck(this, ImageUpload);
    }

    _createClass(ImageUpload, [{
        key: 'uploadToApi',
        value: function uploadToApi(file) {
            return new Promise(function (resolve, reject) {
                $.ajax({
                    url: uploadUrl,
                    type: 'POST',
                    headers: {
                        'Authorization': 'Client-ID ' + clientId
                    },
                    data: file,
                    success: resolve,
                    error: reject,
                    processData: false
                });
            });
        }
    }]);

    return ImageUpload;
}();

var uploadImg = new ImageUpload();

exports.uploadImg = uploadImg;