"use strict";function _classCallCheck(e,s){if(!(e instanceof s))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(exports,"__esModule",{value:!0}),exports.navUser=void 0;var _createClass=function(){function e(e,s){for(var r=0;r<s.length;r++){var n=s[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(s,r,n){return r&&e(s.prototype,r),n&&e(s,n),s}}(),_userModel=require("user-model"),NavUser=function(){function e(){_classCallCheck(this,e),this.userModel=_userModel.userModel}return _createClass(e,[{key:"toggleNavigationUserElement",value:function(){this.userModel.isUserLoggedIn().then(function(e){e?($(".isLogged").addClass("hidden"),$(".userIsLogged").removeClass("hidden"),$("#logout").removeClass("hidden")):($(".isLogged").removeClass("hidden"),$(".userIsLogged").addClass("hidden"),$("#logout").addClass("hidden"))}).catch(function(e){console.log(e.msg)})}}]),e}(),navUser=new NavUser(_userModel.userModel);exports.navUser=navUser;