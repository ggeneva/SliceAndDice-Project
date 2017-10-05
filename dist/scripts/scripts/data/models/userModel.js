"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(exports,"__esModule",{value:!0}),exports.userModel=void 0;var _createClass=function(){function e(e,t){for(var a=0;a<t.length;a++){var r=t[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,a,r){return a&&e(t.prototype,a),r&&e(t,r),t}}(),_database=require("database"),UserModel=function(){function e(t){_classCallCheck(this,e),this.database=t}return _createClass(e,[{key:"register",value:function(e){return this.database.createUser(e)}},{key:"login",value:function(e){return this.database.signInWithEmail(e)}},{key:"signOut",value:function(){return this.database.signOut()}},{key:"getCurrentUser",value:function(){return this.database.getCurrentUser()}},{key:"isUserLoggedIn",value:function(){var e=this;return new Promise(function(t,a){e.database.onAuthStateChanged(function(e){return t(!!e)})})}},{key:"updateProfile",value:function(e){return this.database.updateUserProfile(e)}},{key:"createUserComment",value:function(e){console.log("enter"),this.dataBase.createComment(e)}}]),e}(),userModel=new UserModel(_database.dataBase);exports.userModel=userModel;