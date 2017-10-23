import { postModel } from 'post-model';
import { templateLoader } from 'template-loader';
import { postSort } from 'post-sort';

class HomeController {
    constructor() {
        this.postModel = postModel;
        this.templateLoader = templateLoader;
    }
    loadHomePage(sammy) {
        const pageSize = sammy.params.pageSize;
        const page = sammy.params.page;

        postModel.getAllPosts()
            .then((posts) => {
                const countPages = Math.ceil(Object.keys(posts).length/pageSize);
                const pageNumbers = Array.from({ length: countPages }, (v, i) => i + 1);
                const sortedPosts = postSort.sortByDate(posts);
                const filteredPosts = postSort.sortByPageAndPageSize(page, pageSize, sortedPosts);
                const recentPosts = sortedPosts.slice(0, 6);

                templateLoader.loadTemplate('footer', '#g-app-footer',
                    {
                        recentPosts: recentPosts,
                    });
                templateLoader.loadTemplate('home', '#g-app-container',
                    {
                        posts: filteredPosts,
                        countPages: countPages,
                        pageNumbers: pageNumbers,
                        pageSize: pageSize,
                        pagination: true,
                    });
            }).catch((err) => {
                console.log(err);
            });
    }
}

const homeController = new HomeController(postModel, templateLoader);

export { homeController };
