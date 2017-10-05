"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(exports,"__esModule",{value:!0}),exports.postModel=void 0;var _createClass=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),_database=require("database"),PostModel=function(){function e(t){_classCallCheck(this,e),this.dataBase=t}return _createClass(e,[{key:"create",value:function(e){console.log(e),this.dataBase.createPost(e)}},{key:"isUserLoggedIn",value:function(){var e=this;return new Promise(function(t,a){e.dataBase.onAuthStateChanged(function(e){return t(!!e)})})}},{key:"getCurrentUser",value:function(){return this.dataBase.getCurrentUser()}},{key:"getAllPosts",value:function(){return this.dataBase.getAllPosts()}},{key:"getPosts",value:function(e){return this.dataBase.getPosts(e)}},{key:"getPost",value:function(e){return this.dataBase.getPost(e)}},{key:"getComments",value:function(e){return this.dataBase.getComments(e)}}]),e}(),postModel=new PostModel(_database.dataBase);exports.postModel=postModel;