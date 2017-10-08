import { firebaseModule } from 'firebase-config';

class DataBase {
    constructor(config) {
        this.database = config.database;
        this.auth = config.auth;
    }

    createUser(data) {
        return this.auth
            .createUserWithEmailAndPassword(data.email, data.password);
    }

    signInWithEmail(data) {
        return this.auth.signInWithEmailAndPassword(data.email, data.password);
    }

    signOut() {
        return this.auth.signOut();
    }

    getCurrentUser() {
        return this.auth.currentUser;
    }

    onAuthStateChanged(callback) {
        return this.auth.onAuthStateChanged(function(user) {
            callback(user);
        });
    }

    updateUserProfile(data) {
        const user = this.getCurrentUser();
        return user.updateProfile(data);
    }

    createPost(data) {
        this.database.ref('posts/' + data.authorUid + data.dateOfCreation)
            .set(data)
            .catch((err) => {
                console.log(err.message);
            });
    }
    createComment(data) {
        const path = 'posts/' + data.postId + '/comments';
        this.database.ref(path)
        .push(data).catch((err) => {
            console.log(err.message);
        });
    }

    createSubComment(data) {
        const path = 'posts/' + data.postId + '/comments' + data.commentId;
        this.database.ref(path)
        .push(data).catch((err) => {
            console.log(err.message);
        });
    }

    getAllPosts() {
        return new Promise((resolve, reject) => {
            const posts = this.database.ref('posts/');
            posts.once('value', (data) => {
                resolve(data.val());
            });
        });
    }

    getPosts(query) {
        return new Promise((resolve, reject) => {
            const posts = this.database.ref('posts/')
                .orderByChild(query.prop).equalTo(query.value);
            posts.once('value', (data) => {
                resolve(data.val());
            });
        });
    }

    getPost(query) {
        return new Promise((resolve, reject) => {
            const posts = this.database.ref('posts/').child(query);
            posts.once('value', (data) => {
                resolve(data.val());
            });
        });
    }
}

const dataBase = new DataBase(firebaseModule);

export { dataBase };
