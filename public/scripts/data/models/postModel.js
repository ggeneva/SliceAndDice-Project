import { dataBase } from 'database';

class PostModel {
    constructor(database) {
        this.dataBase = database;
    }

    create(data) {
        this.dataBase.createPost(data);
    }

    isUserLoggedIn() {
        return new Promise((resolve, reject) => {
            this.dataBase.onAuthStateChanged((user) => resolve(!!user));
        });
    }

    getCurrentUser() {
        return this.dataBase.getCurrentUser();
    }

    getAllPosts() {
        return this.dataBase.getAllPosts();
    }

    getPosts(query) {
        return this.dataBase.getPosts(query);
    }

    getPost(query) {
        return this.dataBase.getPost(query);
    }

    getComments(query) {
        return this.dataBase.getComments(query);
    }
}

const postModel = new PostModel(dataBase);

export { postModel };
