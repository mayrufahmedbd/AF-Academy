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


// 2. Function to Load Group Stage Standings (With Sorting Algorithm)
function loadGroupMatches(matches) {
    const tableBody = document.getElementById('group-stage-body');
    if(!tableBody) return;

    tableBody.innerHTML = ''; // Clear existing content

    // STEP A: Calculate Stats (Points & Matches Played)
    const processedMatches = matches.map(team => {
        return {
            ...team,
            mp: team.W + team.D + team.L,       // Matches Played
            pts: (team.W * 3) + (team.D * 1)    // Points (Win=3, Draw=1)
        };
    });

    // STEP B: The Sorting Algorithm
    // Rule: Sort by Points first. If Points are tied, sort by Wins (W).
    processedMatches.sort((a, b) => {
        if (b.pts !== a.pts) {
            return b.pts - a.pts; // Primary: Higher Points
        } else {
            return b.W - a.W;     // Secondary: Higher Wins
        }
    });

    // STEP C: Generate Table Rows
    processedMatches.forEach((team, index) => {
        const row = document.createElement('tr');
        
        // Add a special class for the top 4 teams (Champions League style highlight)
        const rowClass = index < 4 ? 'top-team' : ''; 

        row.innerHTML = `
            <td class="position-cell">${index + 1}</td>
            <td class="team-col">
                <div class="team-info">
                    <span>${team.teamA}</span>
                </div>
            </td>
            <td>${team.mp}</td>
            <td>${team.W}</td>
            <td>${team.D}</td>
            <td>${team.L}</td>
            <td class="points-cell">${team.pts}</td>
        `;
        tableBody.appendChild(row);
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

