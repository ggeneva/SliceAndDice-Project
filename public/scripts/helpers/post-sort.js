class PostSort {
    sortByDate(posts) {
        const postsArray = Object.keys(posts).map((key) => posts[key]);

        const sortedPosts = postsArray.sort(function(a, b) {
            if (a.monthOfCreation > b.monthOfCreation) {
                return -1;
            } else if (a.monthOfCreation < b.monthOfCreation) {
                return 1;
            }

            if (a.dayOfCreation > b.dayOfCreaton) {
                return -1;
            } else if (a.dayOfCreation < b.dayOfCreation) {
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
}

const postSort = new PostSort();

export { postSort };
