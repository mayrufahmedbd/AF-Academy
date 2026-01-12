document.addEventListener("DOMContentLoaded", () => {
    
    // Fetch the JSON file
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            loadTeams(data.teams);
            loadGroupMatches(data.groupMatches);
            loadResults(data.results);
            // NEW: Load the schedule
            if(data.schedule) {
                loadSchedule(data.schedule);
            }
        })
        .catch(error => console.error('Error loading JSON:', error));

});

function loadTeams(teams) {
    const container = document.getElementById('teams-container');
    if(!container) return;
    container.innerHTML = ''; 

    teams.forEach(team => {
        // ... (Header/Logo creation code - SAME AS BEFORE) ...
        const card = document.createElement('div');
        card.className = 'team-card';
        card.style.borderTopColor = team.color;

        const header = document.createElement('div');
        header.className = 'team-header';
        
        const link = document.createElement('a');
        link.className = 'team-link';
        link.style.color = team.color;
        link.href = team.link || '#';
        
        const logoWrapper = document.createElement('div');
        logoWrapper.className = 'team-logo-wrapper';
        logoWrapper.style.borderColor = team.color;
        
        const logoImg = document.createElement('img');
        logoImg.src = team.logo || 'https://via.placeholder.com/50';
        logoImg.className = 'team-logo-img';
        
        logoWrapper.appendChild(logoImg);
        link.appendChild(logoWrapper);
        
        const nameSpan = document.createElement('span');
        nameSpan.innerText = team.name;
        link.appendChild(nameSpan);
        header.appendChild(link);
        card.appendChild(header);
        // ... (End of Header Code) ...

        const playerGrid = document.createElement('div');
        playerGrid.className = 'players-list';

        team.players.forEach(player => {
            const pDiv = document.createElement('div');
            pDiv.className = 'player-item';

            // HTML Structure
            pDiv.innerHTML = `
                <div class="img-wrapper">
                    <img src="${player.photo}"
                    onerror="this.src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'"
                    alt="${player.name}" class="player-img">
                </div>
                <span class="player-name">${player.name}</span>

                <div class="player-popup">
                    <div class="popup-img-container">
                        <img src="${player.photo}" class="popup-photo">
                    </div>
                    <div class="popup-name">${player.name}</div>
                    <div class="popup-team" style="color: ${team.color}">${team.name}</div>
                    <hr class="popup-divider">
                    <div class="stats-row">
                        <div class="stat-box">
                            <span class="stat-label"></span>
                            <span class="stat-value">⚽ ${player.goals || 0}</span>
                            <span class="stat-value">👟 ${player.assist || 0}</span>
                        </div>
                        <div class="stat-box">
                            <span class="stat-label">Cards</span>
                            <div class="cards-container">
                                <span class="card yellow-card">${player.yellowCards || 0}</span>
                                <span class="card red-card">${player.redCards || 0}</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            // --- UPDATED SMART POSITIONING LOGIC ---
            pDiv.addEventListener('mouseenter', function() {
                const popup = this.querySelector('.player-popup');
                const rect = this.getBoundingClientRect(); // Get position on screen
                
                // CHECK 1: Is this a Mobile Device? (Screen width < 768px)
                if (window.innerWidth < 768) {
                    popup.classList.add('mobile-center');
                    popup.classList.remove('show-below');
                } 
                // CHECK 2: Desktop - Is it too close to the top? (Changed 220 -> 300)
                else if (rect.top < 300) {
                    popup.classList.add('show-below');
                    popup.classList.remove('mobile-center');
                } 
                // DEFAULT: Desktop - Normal (Show Above)
                else {
                    popup.classList.remove('show-below');
                    popup.classList.remove('mobile-center');
                }
            });

            // Optional: Close popup on mouse leave (helps on mobile tap)
            pDiv.addEventListener('mouseleave', function() {
                const popup = this.querySelector('.player-popup');
                popup.classList.remove('show-below', 'mobile-center');
            });

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

// 4. Function to Load Match Schedule (CREATIVE & CENTERED)
function loadSchedule(schedule) {
    const container = document.getElementById('schedule-container');
    if (!container) return; 

    container.innerHTML = ''; 

    schedule.forEach(round => {
        const roundDiv = document.createElement('div');
        roundDiv.className = 'round-section';
        
        roundDiv.innerHTML = `
            <div class="round-header">
                <h3>Round ${round.round}</h3>
                <span class="round-date">${round.date}</span>
            </div>
        `;

        round.matches.forEach(match => {
            const matchCard = document.createElement('div');
            matchCard.className = 'match-card-creative';

            // LOGIC: Check if scores exist. 
            // If scoreA and scoreB are present, show Score. Otherwise, show Time.
            let centerContent;
            let centerClass = 'match-time-badge'; // Default style for time

            if (match.scoreA !== undefined && match.scoreB !== undefined) {
                // Show Score
                centerContent = `${match.scoreA} : ${match.scoreB}`;
                centerClass = 'match-score-badge'; // Style for score (usually bolder)
            } else {
                // Show Time
                centerContent = match.time;
            }

            matchCard.innerHTML = `
                <div class="team-side left">
                    <span class="team-name">${match.teamA}</span>
                </div>
                
                <div class="match-center">
                    <div class="${centerClass}">${centerContent}</div>
                </div>
                
                <div class="team-side right">
                    <span class="team-name">${match.teamB}</span>
                </div>
            `;
            roundDiv.appendChild(matchCard);
        });

        container.appendChild(roundDiv);
    });
}