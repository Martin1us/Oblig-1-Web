function fetchHomeData() {
    const limit = 15;
    fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => {
        if (!response.ok) {
            throw new Error("Error with the status: " + response.status);
        }
        return response.json();
    })
    .then((posts) => {
        let container = document.getElementById("main-container");

        let i = 1;
        for (const post of posts) {
            if (i <= limit) {
                const article = document.createElement("article");
                
                article.classList.add("post-container"); 
            
                const title = document.createElement("h1");
                title.textContent = post.title;
                const body = document.createElement("p");
                body.textContent = post.body;

                article.appendChild(title);
                article.appendChild(body);

                container.appendChild(article);
            }
            i++;
        }
    })
    .catch((error) => {
        console.error("There was an error fetching posts:", error);
    });
}

fetchHomeData();

window.addEventListener("scroll", () => {
        fetchHomeData();
}); 