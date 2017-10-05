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
                };

                postModel.create(formData);
                sammy.redirect('#/home');
            });
    }

    loadCreatePostPage(sammy) {
        postModel.isUserLoggedIn().then((isLoggedIn) => {
            if (isLoggedIn) {
                templateLoader.loadTemplate('create-post', '#app-container')
                    .then(() => {
                        validator.validatePost();
                    });
            } else {
                sammy.redirect('#/');
            }
        });
    }

    loadPost(sammy) {
        postModel.getPost(sammy.params.id)
            .then((post) => {
                templateLoader.loadTemplate('post', '#app-container', post);
            }).catch((err) => {
                console.log(err);
            });
    }

    loadCategory(sammy) {
        postModel.getPosts({ prop: 'category',
                            value: sammy.params.category })
            .then((posts) => {
                console.log(sammy.params.category);
                templateLoader.loadTemplate('category', '#app-container',
                    { posts: posts });
            }).catch((err) => {
                console.log(err);
            });
    }
}

const postController = new PostController(postModel, validator, uploadImg);

export { postController };
