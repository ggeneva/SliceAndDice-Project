/* global $ */

import { userModel } from 'user-model';
import { uploadImg } from 'img-upload';
import { navUser } from 'navigation-helper';
import { validator } from 'validator';
import { templateLoader } from 'template-loader';
import { getMonthName, getDayOfCreation } from 'date-helper';
import { commentModel } from 'comment-model';

class UserController {
    constructor() {
        this.helpers = uploadImg;
        this.userModel = userModel;
        this.templateLoader = templateLoader;
        this.navUser = navUser;
        this.validator = validator;
    }

    register(sammy) {
        const formData = {
            email: sammy.params.email,
            password: sammy.params.password,
        };
        let imgUrl = '';

        userModel
            .register(formData)
            .then(() => {
                navUser.toggleNavigationUserElement();

                uploadImg.uploadToApi($('#avatar')[0].files[0])
                    .then((response) => {
                        imgUrl = response.data.link;

                        userModel.updateProfile({
                            displayName: sammy.params.username,
                            photoURL: imgUrl,
                        }).then(() => {
                            sammy.redirect('#/');
                        }).catch((err) => {
                            console.log(err.msg);
                        });
                    });
            })
            .catch((error) => {
                console.log(error.message);
                $('.label.label-danger').text(error.message);
            });
    }

    login(sammy) {
        const formData = {
            email: sammy.params.email,
            password: sammy.params.password,
        };

        userModel
            .login(formData)
            .then(() => {
                navUser.toggleNavigationUserElement();
                sammy.redirect('#/');
            })
            .catch((error) => {
                console.log(error.message);
                $('.label.label-danger').text('Invalid username or password!');
            });
    }

    signOut(sammy) {
        userModel
            .signOut()
            .then(() => {
                console.log('you are now loged off');
                navUser.toggleNavigationUserElement();
                sammy.redirect('#/');
            }).catch((err) => {
                console.log(err);
            });
    }

    loadRegisterPage(sammy) {
        userModel.isUserLoggedIn().then((isLoggedIn) => {
            if (!isLoggedIn) {
                templateLoader.loadTemplate('register', '#g-app-container')
                    .then(() => {
                        validator.validateRegister();
                    });
            } else {
                sammy.redirect('#/');
            }
        });
    }

    loadLoginPage(sammy) {
        userModel.isUserLoggedIn().then((isLoggedIn) => {
            if (!isLoggedIn) {
                templateLoader.loadTemplate('login', '#g-app-container')
                    .then(() => {
                        validator.validateLogin();
                    });
            } else {
                sammy.redirect('#/');
            }
        });
    }

    loadProfile(sammy) {
        const user = userModel.getCurrentUser();
        templateLoader.loadTemplate('profile', '#g-app-container',
                                    { user: user });
    }
    createComment(sammy) {
        userModel.isUserLoggedIn().then((isLoggedIn) => {
            if (!isLoggedIn) {
                sammy.redirect('#/login');
            } else {
                const postId = window.location.href
                    .split('posts/')[1].split('/')[0];
                const user = userModel.getCurrentUser();
                const formData = {
                    postId: postId,
                    imageUrl: sammy.params.imageUrl,
                    authorName: sammy.params.name,
                    content: sammy.params.content,
                    authorUid: user.uid,
                    dateOfCreation: Date.now(),
                    monthOfCreation: getMonthName(),
                    dayOfCreation: getDayOfCreation(),
                };
                console.log(formData);

                commentModel.createCom(formData);
                sammy.redirect('#/posts/' + postId);
            }
            sammy.redirect('#/register');
        });
    }
    createSubComment(sammy) {
        userModel.isUserLoggedIn().then((isLoggedIn) => {
            if (!isLoggedIn) {
                sammy.redirect('#/login');
            } else {
                const postId = window.location.href
                    .split('posts/')[1].split('/')[0];
                const user = userModel.getCurrentUser();
                const formData = {
                    postId: postId,
                    imageUrl: sammy.params.imageUrl,
                    authorName: sammy.params.name,
                    content: sammy.params.content,
                    authorUid: user.uid,
                    dateOfCreation: Date.now(),
                    monthOfCreation: getMonthName(),
                    dayOfCreation: getDayOfCreation(),
                };
                console.log(formData);

                commentModel.createCom(formData);
                sammy.redirect('#/posts/' + postId);
            }
            sammy.redirect('#/register');
        });
    }
}

const userController = new UserController(userModel, uploadImg,
    templateLoader, navUser, validator);

export { userController };
