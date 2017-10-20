class PostSort {
    sortByDate(posts) {
        const postsArray = Object.keys(posts).map((key) => posts[key]);


        for (const comments in postsArray) {
            if (postsArray.hasOwnProperty(comments)) {
                const element = postsArray[comments].dateOfCreation;
                console.log(postsArray[comments]);
                console.log(element);
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
}

const postSort = new PostSort();

export { postSort };
