const postsContainer = document.querySelector("#postWrapper");

function loadPosts() {
    return fetch("https://jsonplaceholder.typicode.com/posts?_limit=5")
        .then((res) => res.json())
        .then((res) => {
            console.log(res);
            return res;
        })
        .then((parsedJson) => parsedJson);
}

function addPostsToSite() {
    loadPosts().then((posts) => {
        for (post of posts) {
            const newPost = document.createElement("div");
            newPost.className = "column";
            newPost.innerHTML = `
            <div class="ui card">
                <div class="content">
                    <div class="header">${post.title.substr(0, 15)}..</div>
                    <div class="description">
                        <p>${post.body.substr(0, 60)}...</p>
                        <button class="ui secondary button">read more!</button>
                    </div>
                </div>
            </div>
      `;

            postsContainer.appendChild(newPost);
        }
    });
}
addPostsToSite();

function makeThreeColumns() {
    postsContainer.classList.replace("two", "three");
    postsContainer.classList.replace("one", "three");
}

function makeTwoColumns() {
    postsContainer.classList.replace("three", "two");
    postsContainer.classList.replace("one", "two");
}

function makeOneColumn() {
    postsContainer.classList.replace("three", "one");
    postsContainer.classList.replace("two", "one");
}