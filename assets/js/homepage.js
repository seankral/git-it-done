// formSubmitHandler variables
var userFormEl = document.querySelector("#user-form")
var nameInputEl = document.querySelector("#username")

// dispalyRepos variables
var repoContainerEl = document.querySelector("#repos-container")
var repoSearchTerm = document.querySelector("#repo-search-term")

var formSubmitHandler = function(e) {
    e.preventDefault();
    
    var username = nameInputEl.value.trim();

    if (username) {
        getUserRepos(username);
        nameInputEl.value = "";
    } else {
        alert("Please enter a Github username");
    };
};

var getUserRepos = function (user) {
    // format the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    // make request to the url
    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            displayRepos(data, user);
        });
    });
};

var displayRepos = function (repos, searchTerm) {
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;

    for (var i = 0; i < repos.length; i++) {
        // format repo name
        var repoName = repos[i].owner.login + "/" + repos[i].name;

        // create container for each repo
        var repoEl = document.createElement("div");
        repoEl.classList = "list-item flex-row justify-space-between align-center";

        // create span element to hold repository name
        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;

        // append to container
        repoEl.appendChild(titleEl);

        // append contianer to the dom
        repoContainerEl.appendChild(repoEl);
    };
};
    
userFormEl.addEventListener("submit", formSubmitHandler);
