/* global $, Handlebars*/

const TEMPLATES_PATH = '../../templates/';

class TemplateLoader {
    getTemplate(templateName) {
        const templatePath = `${TEMPLATES_PATH}${templateName}.handlebars`;

        return new Promise((resolve, reject) => {
            $.get(templatePath)
                .done(resolve)
                .fail(reject);
        });
    }

    loadTemplate(templateName, targetSelector, dataObject) {
        return this.getTemplate(templateName)
            .then((template) => {
                const compiledTemplate = Handlebars.compile(template);
                const templateHtml = compiledTemplate(dataObject);
                const $wrappedTemplate = $('<div/>');
                $wrappedTemplate.html(templateHtml);
                $(targetSelector).html($wrappedTemplate.html());

                return template;
            }).catch(console.log);
    }
}
const templateLoader = new TemplateLoader();

export { templateLoader };
