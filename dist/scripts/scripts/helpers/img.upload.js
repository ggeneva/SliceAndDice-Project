"use strict";function _classCallCheck(e,a){if(!(e instanceof a))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function e(e,a){for(var r=0;r<a.length;r++){var t=a[r];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}return function(a,r,t){return r&&e(a.prototype,r),t&&e(a,t),a}}(),clientId="cb5cf831126a0dd",uploadUrl="https://api.imgur.com/3/image",ImageUpload=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"uploadToApi",value:function(e){return new Promise(function(a,r){$.ajax({url:uploadUrl,type:"POST",headers:{Authorization:"Client-ID "+clientId},data:e,success:a,error:r,processData:!1})})}}]),e}(),uploadImg=new ImageUpload;exports.uploadImg=uploadImg;