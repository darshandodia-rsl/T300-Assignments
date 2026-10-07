const input = document.getElementById("username");
const button = document.getElementById("searchBtn");
let intervalId;

button.addEventListener("click", async () => {
    const username = input.value.trim();
    if (!username) {
        console.log("Please enter a GitHub username.");
        return;
    }

    if (intervalId) {
        clearInterval(intervalId);
    }

    await loadData(username);
    intervalId = setInterval(async () => {
        await loadData(username);
    }, 60000);
});

async function loadData(username) {
    try {
        const repos = await fetchRepos(username);

        if (repos.length === 0) {
            console.log("This user has no public repositories.");
            return;
        }

        const owners = await fetchOwnersForRepos(repos);
        displayData(repos, owners);
    } catch (error) {
        console.log("Error:", error.message);
    }
}

async function fetchRepos(username) {
    const response = await fetch(`https://api.github.com/users/${username}/repos`);
    if (response.status === 404) {
        throw new Error("Invalid GitHub username: user not found.");
    }
    if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
    }
    return await response.json();
}

async function fetchOwnersForRepos(repos) {
    return await Promise.all(repos.map(repo => fetchOwner(repo.owner.login)));
}

async function fetchOwner(username) {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (response.status === 404) {
        throw new Error("Invalid GitHub username: user not found.");
    }
    if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
    }
    return await response.json();
}

function displayData(repos, owners) {
    console.log("=== Data refreshed at", new Date().toLocaleTimeString(), "===");
    repos.forEach((repo, i) => {
        const owner = owners[i];
        console.log("Repository:", repo.name);
        console.log("Description:", repo.description);
        console.log("URL:", repo.html_url);
        console.log("Owner:", owner.login);
        console.log("Name:", owner.name);
        console.log("Followers:", owner.followers);
        console.log("Following:", owner.following);
        console.log("Public repos:", owner.public_repos);
        console.log("--------------------");
    });
}
