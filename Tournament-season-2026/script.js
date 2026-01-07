document.addEventListener("DOMContentLoaded", () => {
    
    // Fetch the JSON data
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            loadTeams(data.teams);
            loadResults(data.results);
        })
        .catch(error => console.error('Error loading JSON:', error));

});

function loadTeams(teams) {
    const container = document.getElementById('teams-container');
    
    teams.forEach(team => {
        // Create the Team Card
        const card = document.createElement('div');
        card.className = 'team-card';
        card.style.borderTopColor = team.color;

        // Create Header
        const header = document.createElement('div');
        header.className = 'team-name';
        header.innerText = team.name;
        header.style.color = team.color;
        card.appendChild(header);

        // Create Player Grid
        const playerGrid = document.createElement('div');
        playerGrid.className = 'players-list';

        // Add all 8 players
        team.players.forEach(player => {
            const pDiv = document.createElement('div');
            pDiv.className = 'player-item';
            
            pDiv.innerHTML = `
                <img src="${player.photo}" alt="${player.name}" class="player-img">
                <span class="player-name">${player.name}</span>
            `;
            playerGrid.appendChild(pDiv);
        });

        card.appendChild(playerGrid);
        container.appendChild(card);
    });
}

function loadResults(results) {
    // Helper to generate HTML for a match
    const createMatchHTML = (match) => `
        <div class="team-row">
            <span>${match.teamA}</span>
            <span class="score">${match.scoreA}</span>
        </div>
        <div class="team-row">
            <span>${match.teamB}</span>
            <span class="score">${match.scoreB}</span>
        </div>
    `;

    document.getElementById('semi-1').innerHTML = createMatchHTML(results.semiFinal1);
    document.getElementById('semi-2').innerHTML = createMatchHTML(results.semiFinal2);
    document.getElementById('grand-final').innerHTML += createMatchHTML(results.final);
}