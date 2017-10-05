'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* global $, Handlebars*/

var TEMPLATES_PATH = '../../templates/';

var TemplateLoader = function () {
    function TemplateLoader() {
        _classCallCheck(this, TemplateLoader);
    }

    _createClass(TemplateLoader, [{
        key: 'getTemplate',
        value: function getTemplate(templateName) {
            var templatePath = '' + TEMPLATES_PATH + templateName + '.handlebars';

            return new Promise(function (resolve, reject) {
                $.get(templatePath).done(resolve).fail(reject);
            });
        }
    }, {
        key: 'loadTemplate',
        value: function loadTemplate(templateName, targetSelector, dataObject) {
            return this.getTemplate(templateName).then(function (template) {
                var compiledTemplate = Handlebars.compile(template);
                var templateHtml = compiledTemplate(dataObject);
                var $wrappedTemplate = $('<div/>');
                $wrappedTemplate.html(templateHtml);
                $(targetSelector).html($wrappedTemplate.html());

                return template;
            }).catch(console.log);
        }
    }]);

    return TemplateLoader;
}();

var templateLoader = new TemplateLoader();

exports.templateLoader = templateLoader;