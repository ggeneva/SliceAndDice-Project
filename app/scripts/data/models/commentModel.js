import { dataBase } from 'database';

class CommentModel {
    constructor(database) {
        this.dataBase = database;
    }

    createCom(data) {
        this.dataBase.createComment(data);
    }

    createSubCom(data) {
        this.dataBase.createSubComment(data);
    }
    createSubReplayCom(data) {
        this.dataBase.createSubReplayComment(data);
    }
    getCurrentUser() {
        return this.dataBase.getCurrentUser();
    }
}

const commentModel = new CommentModel(dataBase);

export { commentModel };
