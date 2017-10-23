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
                        templateLoader.loadTemplate('create-post', '#g-app-container')
                            .then(() => {
                                validator.validatePost();
                            });
                    }).catch((err) => {
                        console.log(err);
                    });
            } else {
                sammy.redirect('#/home/?page=1&pageSize=11');
            }
        });
    }

    loadPost(sammy) {
        let isLogged;
        let authorPosts;
        let relatedPosts;
        let relatedPostsAside;

        Promise
            .all([
                postModel.isUserLoggedIn(),
                postModel.getPost(sammy.params.id),
                postModel.getAllPosts(),
            ])
            .then(([isLoggedIn, post, allPosts]) => {
                if (isLoggedIn) {
                    isLogged = false;
                } else {
                    isLogged = true;
                }

                let counter = 0;
                if (post.hasOwnProperty('comments')) {
                    counter = Object.keys(post.comments).length;
                } else {
                    counter = 0;
                }

                const sortedAllPosts = postSort.sortByDate(allPosts);
                const recentPosts = sortedAllPosts.slice(0, 6);

                const randomPosts = postSort.sortRandom(allPosts, 4);
                const randomPostsFooter = postSort.sortRandom(allPosts, 6);


                Promise
                    .all([
                        postModel.getPosts(
                            {
                                prop: 'author',
                                value: post.author,
                            }),
                        postModel.getPosts(
                            {
                                prop: 'category',
                                value: post.category,
                            }
                        ),
                    ])
                    .then(([posts, relatePosts]) => {
                        authorPosts = postSort.sortByDate(posts);
                        authorPosts = authorPosts.slice(0, 4);

                        relatedPosts = postSort.sortByDate(relatePosts);
                        relatedPosts = relatedPosts.slice(0, 4);
                        relatedPostsAside = relatedPosts.slice(0, 3);

                        templateLoader.loadTemplate('footer', '#g-app-footer',
                            {
                                recentPosts: recentPosts,
                                randomPosts: randomPostsFooter,
                            }
                        );

                        templateLoader.loadTemplate('post', '#g-app-container',
                            {
                                post: post,
                                counter: counter,
                                isLogged: isLogged,
                                recentPosts: recentPosts,
                                authorPosts: authorPosts,
                                relatedPosts: relatedPosts,
                                randomPosts: randomPosts,
                                relatedPostsAside: relatedPostsAside,
                            }
                        );
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    loadCategory(sammy) {
        const pageSize = sammy.params.pageSize;
        const page = sammy.params.page;

        Promise
            .all([
                postModel.getAllPosts(),
                postModel.getPosts({
                    prop: 'category',
                    value: sammy.params.category,
                }),
            ])
            .then(([allPosts, posts]) => {
                const countPages = Math.ceil(Object.keys(posts).length / pageSize);
                const pageNumbers = Array.from({ length: countPages }, (v, i) => i + 1);
                const sortedPosts = postSort.sortByDate(posts);
                const sortedAllPosts = postSort.sortByDate(allPosts);
                const filteredPosts = postSort.sortByPageAndPageSize(page, pageSize, sortedPosts);
                const recentPosts = sortedAllPosts.slice(0, 6);
                const randomPosts = postSort.sortRandom(allPosts, 6);

                templateLoader.loadTemplate('footer', '#g-app-footer',
                    {
                        recentPosts: recentPosts,
                        randomPosts: randomPosts,
                    });
                templateLoader.loadTemplate('category', '#g-app-container',
                    {
                        posts: filteredPosts,
                        countPages: countPages,
                        pageNumbers: pageNumbers,
                        pageSize: pageSize,
                        pagination: true,
                        category: sammy.params.category,
                        recentPosts: recentPosts,
                        randomPosts: randomPosts,
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    searchTag(sammy) {
        const pageSize = sammy.params.pageSize;
        const page = sammy.params.page;
        const author = $('#searchForm').val();
        $('#search-form')[0].reset();

        Promise
            .all([
                postModel.getAllPosts(),
                postModel.getPosts({
                    prop: 'author',
                    value: author,
                }),
            ])
            .then(([allPosts, posts]) => {
                const countPages = 0;
                const pageNumbers = 0;
                let sortedPosts = [];
                // let filteredPosts;

                if (posts) {
                    // countPages = Math.ceil(Object.keys(posts).length / pageSize);
                    // pageNumbers = Array.from({ length: countPages }, (v, i) => i + 1);
                    sortedPosts = postSort.sortByDate(posts);
                    // filteredPosts = postSort.sortByPageAndPageSize(page, pageSize, sortedPosts);
                }

                const sortedAllPosts = postSort.sortByDate(allPosts);
                const recentPosts = sortedAllPosts.slice(0, 6);
                const randomPosts = postSort.sortRandom(allPosts, 6);

                templateLoader.loadTemplate('footer', '#g-app-footer',
                    {
                        recentPosts: recentPosts,
                        randomPosts: randomPosts,
                    });
                templateLoader.loadTemplate('home', '#g-app-container',
                    {
                        posts: sortedPosts,
                        countPages: countPages,
                        pageNumbers: pageNumbers,
                        pageSize: pageSize,
                        pagination: false,
                        templateForSearch: true,
                        recentPosts: recentPosts,
                        author: author,
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    }
}

const postController = new PostController(postModel, validator, uploadImg);

export { postController };
