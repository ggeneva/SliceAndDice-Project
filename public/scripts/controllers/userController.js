/* global $ */

import { userModel } from 'user-model';
import { uploadImg } from 'img-upload';
import { navUser } from 'navigation-helper';
import { validator } from 'validator';
import { templateLoader } from 'template-loader';
import { getMonthName, getDayOfCreation } from 'date-helper';
import { commentModel } from 'comment-model';
import { postModel } from 'post-model';
import { postSort } from 'post-sort';

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
                console.log('Log-out successful!');
                navUser.toggleNavigationUserElement();
                sammy.redirect('#/');
            }).catch((err) => {
                console.log(err);
            });
    }

    loadRegisterPage(sammy) {
        userModel.isUserLoggedIn().then((isLoggedIn) => {
            if (!isLoggedIn) {
                postModel.getAllPosts()
                    .then((posts) => {
                        const sortedPosts = postSort.sortByDate(posts);
                        const recentPosts = sortedPosts.slice(0, 6);
                        const randomPosts = postSort.sortRandom(posts, 6);

                        templateLoader.loadTemplate('footer', '#g-app-footer',
                            {
                                recentPosts: recentPosts,
                                randomPosts: randomPosts,
                            });
                        templateLoader.loadTemplate('register', '#g-app-container')
                            .then(() => {
                                validator.validateRegister();
                            });
                    }).catch((err) => {
                        console.log(err);
                    });
            } else {
                sammy.redirect('#/');
            }
        });
    }

    loadLoginPage(sammy) {
        userModel.isUserLoggedIn().then((isLoggedIn) => {
            if (!isLoggedIn) {
                postModel.getAllPosts()
                    .then((posts) => {
                        const sortedPosts = postSort.sortByDate(posts);
                        const recentPosts = sortedPosts.slice(0, 6);
                        const randomPosts = postSort.sortRandom(posts, 6);

                        templateLoader.loadTemplate('footer', '#g-app-footer',
                            {
                                recentPosts: recentPosts,
                                randomPosts: randomPosts,
                            });
                        templateLoader.loadTemplate('login', '#g-app-container')
                            .then(() => {
                                validator.validateLogin();
                            });
                    }).catch((err) => {
                        console.log(err);
                    });
            } else {
                sammy.redirect('#/');
            }
        });
    }

    loadProfile(sammy) {
        postModel.getAllPosts()
            .then((posts) => {
                const user = userModel.getCurrentUser();
                const sortedPosts = postSort.sortByDate(posts);
                const recentPosts = sortedPosts.slice(0, 6);
                const randomPosts = postSort.sortRandom(posts, 6);

                templateLoader.loadTemplate('footer', '#g-app-footer',
                    {
                        recentPosts: recentPosts,
                        randomPosts: randomPosts,
                    });
                templateLoader.loadTemplate('profile', '#g-app-container',
                    {
                        user: user,
                    });
            }).catch((err) => {
                console.log(err);
            });
        /*
        templateLoader.loadTemplate('footer', '#g-app-footer');
        async function getCurrentUser() {
            const currentUser = await userModel.getCurrentUser();
            return currentUser;
          }
        getCurrentUser().then((user) => {
            console.log(user);
            templateLoader.loadTemplate('profile', '#g-app-container',
                { user: user });
        });
        */
    }
    createComment(sammy) {
        userModel.isUserLoggedIn().then((isLoggedIn) => {
            if (isLoggedIn) {
                const user = userModel.getCurrentUser();

                const formData = {
                    postId: sammy.params.id,
                    imageUrl: user.photoURL,
                    authorName: user.displayName,
                    content: sammy.params.content,
                    authorUid: user.uid,
                    dateOfCreation: Date.now(),
                    monthOfCreation: getMonthName(),
                    dayOfCreation: getDayOfCreation(),
                };

                console.log(formData);

                commentModel.createCom(formData);
                sammy.redirect('#/posts/' + sammy.params.id);
            } else {
                sammy.redirect('#/login');
            }
        });
    }
    createSubComment(sammy) {
        userModel.isUserLoggedIn().then((isLoggedIn) => {
            if (isLoggedIn) {
                const user = userModel.getCurrentUser();

                const formData = {
                    postId: sammy.params.id,
                    imageUrl: user.photoURL,
                    authorName: user.displayName,
                    content: sammy.params.content,
                    authorUid: user.uid,
                    dateOfCreation: Date.now(),
                    monthOfCreation: getMonthName(),
                    dayOfCreation: getDayOfCreation(),
                    idComment: sammy.params.idComment,
                };

                console.log(formData);

                commentModel.createSubCom(formData);
                sammy.redirect('#/posts/' + sammy.params.id);
            } else {
                sammy.redirect('#/login');
            }
        });
    }
}

const userController = new UserController(userModel, uploadImg,
    templateLoader, navUser, validator);

export { userController };
