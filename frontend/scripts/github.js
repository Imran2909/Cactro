    // Tab navigation
    function openTab(tabName) {
        const tabContents = document.querySelectorAll('.tab-content');
        const tabButtons = document.querySelectorAll('.tab-button');

        tabContents.forEach(content => content.classList.remove('active'));
        tabButtons.forEach(button => button.classList.remove('active'));

        document.getElementById(tabName).classList.add('active');
        event.currentTarget.classList.add('active');
    }

    // Fetch GitHub Data
    async function fetchGitHubData() {
        try {
            const response = await fetch('https://cactro-backend-p503.onrender.com/github');
            const data = await response.json();
            console.log(data)

            document.getElementById('github-info').innerHTML = `
                <p><strong>Username:</strong> ${data.username}</p>
                <p><strong>Followers:</strong> ${data.followers}</p>
                <p><strong>Following:</strong> ${data.following}</p>
                <p><strong>Public Repos:</strong> ${data.public_repos}</p>
                <h3>Repositories:</h3>
                <ul>
                    ${data.repos.map(repo => `<li><a href="${repo.url}" target="_blank">${repo.name}</a></li>`).join('')}
                </ul>
            `;
        } catch (error) {
            console.error('Error fetching GitHub data:', error);
        }
    }

    // Fetch Repo Details
    async function fetchRepoDetails() {
        const repoName = document.getElementById('repoName').value;
        if (!repoName) return alert('Please enter a repository name.');

        try {
            const response = await fetch(`https://cactro-backend-p503.onrender.com/github/${repoName}`);
            const data = await response.json();

            document.getElementById('repo-info').innerHTML = `
                <p><strong>Name:</strong> ${data.name}</p>
                <p><strong>Description:</strong> ${data.description}</p>
                <p><strong>Stars:</strong> ${data.stars}</p>
                <p><strong>Forks:</strong> ${data.forks}</p>
                <p><strong>Open Issues:</strong> ${data.open_issues}</p>
                <a href="${data.url}" target="_blank">Visit Repo</a>
            `;
        } catch (error) {
            console.error('Error fetching repo details:', error);
        }
    }

    // Create GitHub Issue
    async function createIssue() {
        const repoName = document.getElementById('issueRepoName').value;
        const title = document.getElementById('issueTitle').value;
        const body = document.getElementById('issueBody').value;

        if (!repoName || !title) return alert('Repository name and issue title are required.');

        try {
            const response = await fetch(`https://cactro-backend-p503.onrender.com/github/${repoName}/issues`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, body }),
            });
            
            const data = await response.json();
            document.getElementById('issue-info').innerHTML = `
                <p>Issue created: <a href="${data.url}" target="_blank">${data.url}</a></p>
            `;
        } catch (error) {
            console.error('Error creating issue:', error);
        }
    }
