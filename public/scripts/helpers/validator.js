/* global $ */
class Validator {
    validateLogin() {
        $('#login-form').validate({
            rules: {
                email: {
                    required: true,
                    email: true,
                },
                password: {
                    required: true,
                    minlength: 6,
                },
            },
            highlight: function(element) {
                $('#l-loading').css('display', 'none');
                $(element).closest('.control-group')
                          .removeClass('success').addClass('error');
            },
        });
    }

    validateRegister() {
        $('#register-form').validate({
            rules: {
                email: {
                    required: true,
                    email: true,
                },
                password: {
                    required: true,
                    minlength: 6,
                },
                confirmedPassword: {
                    equalTo: '#password',
                },
                username: {
                    required: true,
                    minlength: 4,
                    maxlength: 25,
                },
            },
            highlight: function(element) {
                $('#r-loading').css('display', 'none');
                $(element).closest('.control-group')
                          .removeClass('success').addClass('error');
            },
        });
    }

    validatePost() {
        $('#post-form').validate({
            rules: {
                title: {
                    required: true,
                    minlength: 5,
                    maxlength: 50,
                },
                content: {
                    required: true,
                    minlength: 20,
                    maxlength: 40000,
                },
                category: {
                    required: true,
                },
                tags: {
                    required: true,
                    maxlength: 50,
                    minlength: 2,
                },
            },
            highlight: function(element) {
                $('#c-loading').css('display', 'none');
                $(element).closest('.control-group')
                          .removeClass('success').addClass('error');
            },
        });
    }
}

const validator = new Validator();

export { validator };
