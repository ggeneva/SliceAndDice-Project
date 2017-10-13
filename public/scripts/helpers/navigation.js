/* global $ */
import { userModel } from 'user-model';

class NavUser {
    constructor() {
        this.userModel = userModel;
    }

    toggleNavigationUserElement() {
        this.userModel.isUserLoggedIn()
            .then((user) => {
                if (user) {
                    $('.isLogged').addClass('hidden');
                    $('.userIsLogged').removeClass('hidden');
                    $('#logout').removeClass('hidden');
                } else {
                    $('.isLogged').removeClass('hidden');
                    $('.userIsLogged').addClass('hidden');
                    $('#logout').addClass('hidden');
                }
            }).catch((err) => {
                console.log(err.msg);
            });
    }
}

const navUser = new NavUser(userModel);

export { navUser };
