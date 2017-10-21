/* global $ */

import { postModel } from 'post-model';
import { validator } from 'validator';
import { uploadImg } from 'img-upload';
import { templateLoader } from 'template-loader';
import { getMonthName, getDayOfCreation } from 'date-helper';
import { postSort } from 'post-sort';

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
                sammy.redirect('#/home/?page=1&pageSize=11');
            });
    }

    loadCreatePostPage(sammy) {
        postModel.isUserLoggedIn().then((isLoggedIn) => {
            if (isLoggedIn) {
                templateLoader.loadTemplate('footer', '#g-app-footer');
                templateLoader.loadTemplate('create-post', '#g-app-container')
                    .then(() => {
                        validator.validatePost();
                    });
            } else {
                sammy.redirect('#/home/?page=1&pageSize=11');
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
                    console.log('Tooovaaa tuk:');
                    console.log(post.comments);
                    counter = Object.keys(post.comments).length;
                } else {
                    counter = 0;
                }
                templateLoader.loadTemplate('footer', '#g-app-footer');
                templateLoader.loadTemplate('post', '#g-app-container',
                    {
                        post: post,
                        counter: counter,
                        isLogged: isLogged,
                    });
            }).catch((err) => {
                console.log(err);
            });
    }

    loadCategory(sammy) {
        const pageSize = sammy.params.pageSize;
        const page = sammy.params.page;
        console.log(pageSize);
        console.log(page);

        postModel.getPosts({
            prop: 'category',
            value: sammy.params.category,
        })
            .then((posts) => {
                const countPages = Math.ceil(Object.keys(posts).length / pageSize);
                const pageNumbers = Array.from({ length: countPages }, (v, i) => i + 1);
                const sortedPosts = postSort.sortByDate(posts);
                const filteredPosts = postSort.sortByPageAndPageSize(page, pageSize, sortedPosts);

                templateLoader.loadTemplate('footer', '#g-app-footer');
                templateLoader.loadTemplate('category', '#g-app-container',
                    {
                        posts: filteredPosts, countPages,
                        pageNumbers, pageSize, pagination: true,
                        category: sammy.params.category,
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    }
}

const postController = new PostController(postModel, validator, uploadImg);

export { postController };
