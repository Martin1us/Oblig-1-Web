function fetchHomeData() {
    //API Endpoint: https://jsonplaceholder.typicode.com/posts
    limit = 9;
    fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => {
        if (!response.ok) {
            throw new Error("Error with the status: " + response.status);
        }
        return response.json();
    })
    .then((posts) => {
        //console.log(posts);

        let container = document.getElementById("main-container");
        container.innerHTML = "";

        let i = 1;
        for (post of posts) {
            if (i <= limit) {
                const article = document.createElement("article");
                const title = document.createElement("h1");
                title.textContent = post.title;
                const body = document.createElement("p");
                body.textContent = post.body;
                article.appendChild(title);
                article.appendChild(body);
                container.appendChild(article);
                if (i % 3 == 0) {
                    const clearfix = document.createElement("div");
                    clearfix.setAttribute("class", "clearfix");
                    container.appendChild(clearfix);
                }
            }
            i++;
        }
    })
}

function fetchToDo() {
    //API Endpoint: https://jsonplaceholder.typicode.com/todos
    let limit = 10;
    fetch("https://jsonplaceholder.typicode.com/todos")
    .then((response) => {
        return response.json();
    })
    .then((todo) => {
        console.log(todo);
        let container = document.getElementById("main-container");
        container.innerHTML = "";
        let i = 1;
        for (task of todo) {
            if (i <= limit) {
                const article = document.createElement("article");
                const title = document.createElement("h1");
                title.textContent = task.title;
                const status = document.createElement("p");
                status.textContent = (task.completed) ? "Completed" : "In progress";
                article.appendChild(title);
                article.appendChild(status);
                container.appendChild(article);
            }
            if (i %3 == 0) {
                const clearfix = document.createElement("div");
                clearfix.setAttribute("class", "clearfix");
                container.appendChild(clearfix);
            }
            i++;
        }
    });

}

function fetchUsers() {
    //API Endpoint: https://jsonplaceholder.typicode.com/users

    let limit = 10;
    fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => {
        return response.json();
    })
    .then((users) => {
        console.log(users);
        let container = document.getElementById("main-container");
        container.innerHTML = "";
        let i = 1;
        for (user of users) {
            if (i <= limit) {
                const article = document.createElement("article");
                const title = document.createElement("h1");
                title.textContent = user.name;
                const email = document.createElement("p");
                email.textContent = user.email;
                const address = document.createElement("p");
                address.textContent = user.address.street + " City: " + user.address.city;
                article.appendChild(title);
                article.appendChild(email);
                article.appendChild(address);
                container.appendChild(article);
            }
            if (i %3 == 0) {
                const clearfix = document.createElement("div");
                clearfix.setAttribute("class", "clearfix");
                container.appendChild(clearfix);
            }
            i++;
        }
        
        const clearfix = document.createElement("div");
        clearfix.setAttribute("class", "clearfix");
        container.appendChild(clearfix);
    });
}

fetchHomeData();