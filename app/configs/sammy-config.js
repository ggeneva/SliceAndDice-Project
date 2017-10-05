/* global Sammy, $ */

import { userController } from 'user-controller';
import { homeController } from 'home-controller';
import { navUser } from 'navigation-helper';
import { postController } from 'post-controller';

class Router {
    start() {
        /* eslint-disable */

        const sammy = Sammy(function() {

            // Home
            this.get('#/', (sammy) => {
                sammy.redirect('#/home');
            });
            this.get('#/home', homeController.loadHomePage);

            // User 
            this.get('#/register', userController.loadRegisterPage);
            this.post('#/register', userController.register);
            this.get('#/login', userController.loadLoginPage);
            this.post('#/login', userController.login);
            this.get('#/sign-out', userController.signOut);

            // Users-comments
            this.post('#/posts/:id/create-comment', userController.createComment);

            // Posts
            this.get('#/posts/:id', postController.loadPost);
            this.get('#/create-post', postController.loadCreatePostPage);
            this.post('#/create-post', postController.createPost);

            // Posts by category 
            this.get('#/posts/?', postController.loadCategory);


            navUser.toggleNavigationUserElement();
        });

        $(function() {
            sammy.run('#/');
        });
    }
}

/* eslint-enable */
const router = new Router();

export { router };
