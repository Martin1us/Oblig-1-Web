let posts = []; // Array for å lagre postene

function fetchHomeData() { // Funksjon for å hente data
    fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => {
        if (!response.ok) {
            throw new Error("Error with the status: " + response.status);
        }
        return response.json();
    })
    .then((postData) => { // Funksjon til å håndtere data
        posts = postData;
        loadpost();
    })
}



    function loadpost() { // Funksjon for å laste opp postene
        let container = document.getElementById("main-container");

        let i = 1, limit = 12;
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
    }

fetchHomeData();

window.onscroll = function() { // Sjekker når bruker har skrollet til bunn av siden
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        fetchHomeData();
    }
}; 