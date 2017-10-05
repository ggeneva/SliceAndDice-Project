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
                    minlength: 3,
                },
            },
            highlight: function(element) {
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
                },
                content: {
                    required: true,
                    minlength: 50,
                },
            },
            highlight: function(element) {
                $(element).closest('.control-group')
                          .removeClass('success').addClass('error');
            },
        });
    }
}

const validator = new Validator();

export { validator };
