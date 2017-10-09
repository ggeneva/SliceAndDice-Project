/* global $ */

import { postModel } from 'post-model';
import { validator } from 'validator';
import { uploadImg } from 'img-upload';
import { templateLoader } from 'template-loader';
import { getMonthName, getDayOfCreation } from 'date-helper';

class PostController {
    constructor() {
        this.postModel = postModel;
        this.validator = validator;
        this.uploadImg = uploadImg;
    }

    createPost(sammy) {
        const user = postModel.getCurrentUser();

        uploadImg.uploadToApi($('#image')[0].files[0])
            .then((response) => {
                const formData = {
                    author: user.displayName,
                    authorUid: user.uid,
                    image: response.data.link,
                    title: sammy.params.title,
                    content: sammy.params.content,
                    category: sammy.params.category,
                    dateOfCreation: Date.now(),
                    monthOfCreation: getMonthName(),
                    dayOfCreation: getDayOfCreation(),
                    comments: [],
                    tags: sammy.params.tags.trim().split(' '),
                };

                postModel.create(formData);
                sammy.redirect('#/home');
            });
    }

    loadCreatePostPage(sammy) {
        postModel.isUserLoggedIn().then((isLoggedIn) => {
            if (isLoggedIn) {
                templateLoader.loadTemplate('create-post', '#g-app-container')
                    .then(() => {
                        validator.validatePost();
                    });
            } else {
                sammy.redirect('#/');
            }
        });
    }

    loadPost(sammy) {
        // TO DO - refactor it

        let isLogged;

        postModel.isUserLoggedIn().then((isLoggedIn) => {
            if (isLoggedIn) {
                isLogged = false;
            } else {
                isLogged = true;
            }
            console.log(isLogged);
            return isLogged;
        });
        postModel.getPost(sammy.params.id)
            .then((post) => {
                let counter = 0;
                if (post.hasOwnProperty('comments')) {
                    counter = Object.keys(post.comments).length;
                } else {
                    counter = 0;
                }
                templateLoader.loadTemplate('post', '#g-app-container',
                    { post: post,
                    counter: counter,
                    isLogged: isLogged,
                    });
            }).catch((err) => {
                console.log(err);
            });
    }

    loadCategory(sammy) {
        postModel.getPosts({
            prop: 'category',
            value: sammy.params.category,
        })
            .then((posts) => {
                console.log(sammy.params.category);
                templateLoader.loadTemplate('category', '#g-app-container',
                    { posts: posts });
            }).catch((err) => {
                console.log(err);
            });
    }
}

const postController = new PostController(postModel, validator, uploadImg);

export { postController };
