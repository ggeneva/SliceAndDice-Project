import { postModel } from 'post-model';
import { templateLoader } from 'template-loader';

class HomeController {
    constructor() {
        this.postModel = postModel;
        this.templateLoader = templateLoader;
    }
    loadHomePage(sammy) {
        postModel.getAllPosts()
            .then((posts) => {
                templateLoader.loadTemplate('home', '#app-container',
                    { posts: posts });
            }).catch((err) => {
                console.log(err);
            });
    }
}

const homeController = new HomeController(postModel, templateLoader);

export { homeController };
