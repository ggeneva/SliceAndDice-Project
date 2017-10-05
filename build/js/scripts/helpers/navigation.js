'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.navUser = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* global $ */


var _userModel = require('user-model');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NavUser = function () {
    function NavUser() {
        _classCallCheck(this, NavUser);

        this.userModel = _userModel.userModel;
    }

    _createClass(NavUser, [{
        key: 'toggleNavigationUserElement',
        value: function toggleNavigationUserElement() {
            this.userModel.isUserLoggedIn().then(function (user) {
                if (user) {
                    $('.isLogged').addClass('hidden');
                    $('.userIsLogged').removeClass('hidden');
                    $('#logout').removeClass('hidden');
                } else {
                    $('.isLogged').removeClass('hidden');
                    $('.userIsLogged').addClass('hidden');
                    $('#logout').addClass('hidden');
                }
            }).catch(function (err) {
                console.log(err.msg);
            });
        }
    }]);

    return NavUser;
}();

var navUser = new NavUser(_userModel.userModel);

exports.navUser = navUser;