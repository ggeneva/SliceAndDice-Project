'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* global $ */
var Validator = function () {
    function Validator() {
        _classCallCheck(this, Validator);
    }

    _createClass(Validator, [{
        key: 'validateLogin',
        value: function validateLogin() {
            $('#login-form').validate({
                rules: {
                    email: {
                        required: true,
                        email: true
                    },
                    password: {
                        required: true,
                        minlength: 6
                    }
                },
                highlight: function highlight(element) {
                    $(element).closest('.control-group').removeClass('success').addClass('error');
                }
            });
        }
    }, {
        key: 'validateRegister',
        value: function validateRegister() {
            $('#register-form').validate({
                rules: {
                    email: {
                        required: true,
                        email: true
                    },
                    password: {
                        required: true,
                        minlength: 6
                    },
                    confirmedPassword: {
                        equalTo: '#password'
                    },
                    username: {
                        required: true,
                        minlength: 3
                    }
                },
                highlight: function highlight(element) {
                    $(element).closest('.control-group').removeClass('success').addClass('error');
                }
            });
        }
    }, {
        key: 'validatePost',
        value: function validatePost() {
            $('#post-form').validate({
                rules: {
                    title: {
                        required: true,
                        minlength: 5
                    },
                    content: {
                        required: true,
                        minlength: 50
                    }
                },
                highlight: function highlight(element) {
                    $(element).closest('.control-group').removeClass('success').addClass('error');
                }
            });
        }
    }]);

    return Validator;
}();

var validator = new Validator();

exports.validator = validator;