"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(exports,"__esModule",{value:!0}),exports.dataBase=void 0;var _createClass=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),_firebaseConfig=require("firebase-config"),DataBase=function(){function e(t){_classCallCheck(this,e),this.database=t.database,this.auth=t.auth}return _createClass(e,[{key:"createUser",value:function(e){return this.auth.createUserWithEmailAndPassword(e.email,e.password)}},{key:"signInWithEmail",value:function(e){return this.auth.signInWithEmailAndPassword(e.email,e.password)}},{key:"signOut",value:function(){return this.auth.signOut()}},{key:"getCurrentUser",value:function(){return this.auth.currentUser}},{key:"onAuthStateChanged",value:function(e){return this.auth.onAuthStateChanged(function(t){e(t)})}},{key:"updateUserProfile",value:function(e){return this.getCurrentUser().updateProfile(e)}},{key:"createPost",value:function(e){this.database.ref("posts/"+e.authorUid+e.dateOfCreation).set(e).catch(function(e){console.log(e.message)})}},{key:"createComment",value:function(e){console.log("enter"),this.database.ref("posts/${data.postId}/".child("comments")+e.authorUid+e.dateOfCreation).set(e).catch(function(e){console.log(e.message)})}},{key:"getAllPosts",value:function(){var e=this;return new Promise(function(t,a){e.database.ref("posts/").once("value",function(e){t(e.val())})})}},{key:"getPosts",value:function(e){var t=this;return new Promise(function(a,n){t.database.ref("posts/").orderByChild(e.prop).equalTo(e.value).once("value",function(e){a(e.val())})})}},{key:"getPost",value:function(e){var t=this;return new Promise(function(a,n){t.database.ref("posts/").child(e).once("value",function(e){a(e.val())})})}}]),e}(),dataBase=new DataBase(_firebaseConfig.firebaseModule);exports.dataBase=dataBase;