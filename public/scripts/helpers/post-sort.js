class PostSort {
    sortByDate(posts) {
        const postsArray = Object.keys(posts).map((key) => posts[key]);

        for (const comments in postsArray) {
            if (postsArray.hasOwnProperty(comments)) {
                const element = postsArray[comments].dateOfCreation;
            }
        }
        const sortedPosts = postsArray.sort(function(a, b) {
            if (a.dateOfCreation > b.dateOfCreation) {
                return -1;
            } else if (a.dateOfCreation < b.dateOfCreation) {
                return 1;
            }

            return 0;
        });

        return sortedPosts;
    }

    sortByPageAndPageSize(page, pageSize, posts) {
        const filteredPosts = [];
        const length = Object.keys(posts).length;

        if (pageSize > length) {
            pageSize = length;
        }

        for (let i = (page - 1)*pageSize; i < page*pageSize; i++) {
            if ( i < length) {
                filteredPosts.push(posts[Object.keys(posts)[i]]);
            }
        }

        return filteredPosts;
    }

    sortRandom(posts, cnt) {
        const counter = cnt;
        const postsArray = Object.keys(posts).map((key) => posts[key]);
        const randomArray = [];

        for (let index = 0; index < counter; index++) {
            const randomItem = postsArray[Math.floor(Math.random()*postsArray.length)];
            randomArray.push(randomItem);
        }

        return randomArray;
    }
}

const postSort = new PostSort();

export { postSort };
