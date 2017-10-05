import { dataBase } from 'database';
class UserModel {
    constructor(database) {
        this.database = database;
    }
    register(formData) {
        return this.database.createUser(formData);
    }
    login(formData) {
        return this.database.signInWithEmail(formData);
    }
    signOut() {
        return this.database.signOut();
    }
    getCurrentUser() {
        return this.database.getCurrentUser();
    }
    isUserLoggedIn() {
        return new Promise((resolve, reject) => {
            this.database.onAuthStateChanged((user) => resolve(!!user));
        });
    }
    updateProfile(data) {
        return this.database.updateUserProfile(data);
    }

    createUserComment(data) {
        console.log('enter');
        this.dataBase.createComment(data);
    }
}

const userModel = new UserModel(dataBase);

export { userModel };
