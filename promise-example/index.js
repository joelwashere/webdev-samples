const posts = [
    {title: "Post 1", body: "Love sosa"},
    {title: "Post 2", body: "God yall some broke boys"}
];

function getPosts() {
    setTimeout(() => {
        let output = '';
        posts.forEach((post, index) => {
            output += `<li>${post.title}<li>`;
        });
        document.body.innerHTML = output;
    }, 1000);
}

function createPost(post) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            posts.push(post);

            const error = false;

            if(!error)
            {
                resolve("Successfully created post.");
            } else reject("Failed to create post.");

        }, 2000);
    });
}

getPosts();
createPost({title: "Post 3", body: "All and to no end"})
    .then(getPosts)
    .catch((reason) => console.log(reason));