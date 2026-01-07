document.addEventListener("DOMContentLoaded", () => {
    
    // Fetch the JSON file
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            loadTeams(data.teams);
            loadGroupMatches(data.groupMatches);
            loadResults(data.results);
        })
        .catch(error => console.error('Error loading JSON:', error));

});

// 1. Function to Load Teams and Players
function loadTeams(teams) {
    const container = document.getElementById('teams-container');
    if(!container) return;

    teams.forEach(team => {
        const card = document.createElement('div');
        card.className = 'team-card';
        card.style.borderTopColor = team.color;

        const header = document.createElement('div');
        header.className = 'team-name';
        header.innerText = team.name;
        header.style.color = team.color;
        card.appendChild(header);

        const playerGrid = document.createElement('div');
        playerGrid.className = 'players-list';

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

// 2. Function to Load Group Stage Matches
function loadGroupMatches(matches) {
    const container = document.getElementById('group-stage-container');
    if(!container) return;

    matches.forEach(match => {
        const matchCard = document.createElement('div');
        matchCard.className = 'match-card';

        matchCard.innerHTML = `
            <div class="match-label">Match #${match.id}</div>
            <div class="team-row">
                <span>${match.teamA}</span>
                <span class="score">${match.scoreA}</span>
            </div>
            <div class="team-row">
                <span>${match.teamB}</span>
                <span class="score">${match.scoreB}</span>
            </div>
        `;
        container.appendChild(matchCard);
    });
}

// 3. Function to Load Final Results
function loadResults(results) {
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

    const semi1 = document.getElementById('semi-1');
    const semi2 = document.getElementById('semi-2');
    const grandFinal = document.getElementById('grand-final');

    if(semi1) semi1.innerHTML = createMatchHTML(results.semiFinal1);
    if(semi2) semi2.innerHTML = createMatchHTML(results.semiFinal2);
    if(grandFinal) grandFinal.innerHTML += createMatchHTML(results.final);
}