document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Fetch the JSON file
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            // Load all sections
            if(data.teams) loadTeams(data.teams);
            if(data.groupMatches) loadGroupMatches(data.groupMatches);
            if(data.results) loadResults(data.results);
            if(data.schedule) loadSchedule(data.schedule);
        })
        .catch(error => console.error('Error loading JSON:', error));

    // 2. Global Click Listener (Closes popups when clicking empty space)
    document.addEventListener('click', function(event) {
        
        // A. Close Player Popups
        document.querySelectorAll('.player-popup').forEach(popup => {
            popup.classList.remove('active', 'mobile-center', 'show-below');
            // Force hide to override any CSS hover effects
            popup.style.display = ''; 
        });

        // B. Close Schedule/Pitch Popup
        const pitchPopup = document.getElementById('match-hover-popup');
        if (pitchPopup) {
            pitchPopup.style.display = 'none';
        }
    });
});

// --- TEAMS & PLAYERS FUNCTION ---
function loadTeams(teams) {
    const container = document.getElementById('teams-container');
    if(!container) return;
    container.innerHTML = ''; 

    teams.forEach(team => {
        const card = document.createElement('div');
        card.className = 'team-card';
        card.style.borderTopColor = team.color;

        // --- Header Section ---
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

        // --- Players Grid ---
        const playerGrid = document.createElement('div');
        playerGrid.className = 'players-list';

        team.players.forEach(player => {
            const pDiv = document.createElement('div');
            pDiv.className = 'player-item';

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

            // --- CLICK LOGIC (FIXED) ---
            pDiv.addEventListener('click', function(e) {
                // STOP the click from reaching the document (prevents instant closing)
                e.stopPropagation();

                const popup = this.querySelector('.player-popup');
                const wasActive = popup.classList.contains('active');

                // 1. Reset ALL other popups first
                document.querySelectorAll('.player-popup').forEach(p => {
                    p.classList.remove('active', 'mobile-center', 'show-below');
                    p.style.display = ''; // Clear inline styles
                });

                // 2. If it wasn't active before, show it now
                if (!wasActive) {
                    popup.classList.add('active');
                    popup.style.display = 'block'; // Force show

                    const rect = this.getBoundingClientRect(); 
                    
                    // Smart Position Calculation
                    if (window.innerWidth < 768) {
                        popup.classList.add('mobile-center');
                    } 
                    else if (rect.top < 300) {
                        popup.classList.add('show-below');
                    } 
                    // else: default shows above via CSS
                }
            });

            playerGrid.appendChild(pDiv);
        });

        card.appendChild(playerGrid);
        container.appendChild(card);
    });
}

// --- STANDINGS FUNCTION (RESTORED) ---
function loadGroupMatches(matches) {
    const tableBody = document.getElementById('group-stage-body');
    if(!tableBody) return; // Matches will fail if HTML ID is missing

    tableBody.innerHTML = ''; 

    // Calculate Points
    const processedMatches = matches.map(team => {
        return {
            ...team,
            mp: team.W + team.D + team.L,
            pts: (team.W * 3) + (team.D * 1)
        };
    });

    // Sort: Points first, then Wins
    processedMatches.sort((a, b) => {
        if (b.pts !== a.pts) {
            return b.pts - a.pts; 
        } else {
            return b.W - a.W;
        }
    });

    // Create Rows
    processedMatches.forEach((team, index) => {
        const row = document.createElement('tr');
        if(index < 4) row.classList.add('top-team'); 

        row.innerHTML = `
            <td class="position-cell">${index + 1}</td>
            <td class="team-col">
                <div class="team-info"><span>${team.teamA}</span></div>
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

// --- RESULTS FUNCTION ---
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

    if(semi1 && results.semiFinal1) semi1.innerHTML = createMatchHTML(results.semiFinal1);
    if(semi2 && results.semiFinal2) semi2.innerHTML = createMatchHTML(results.semiFinal2);
    if(grandFinal && results.final) grandFinal.innerHTML += createMatchHTML(results.final);
}

// --- SCHEDULE FUNCTION (FIXED CLICK) ---
function loadSchedule(schedule) {
    const container = document.getElementById('schedule-container');
    if (!container) return; 

    container.innerHTML = ''; 

    // Create popup if missing
    let pitchPopup = document.getElementById('match-hover-popup');
    if (!pitchPopup) {
        pitchPopup = document.createElement('div');
        pitchPopup.id = 'match-hover-popup';
        pitchPopup.className = 'match-hover-popup';
        // Prevent clicking inside the popup from closing it
        pitchPopup.addEventListener('click', (e) => e.stopPropagation());
        document.body.appendChild(pitchPopup);
    }

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

            let centerContent;
            let centerClass = 'match-time-badge'; 

            if (match.scoreA !== undefined && match.scoreB !== undefined) {
                centerContent = `${match.scoreA} : ${match.scoreB}`;
                centerClass = 'match-score-badge'; 
            } else {
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

            // --- CLICK LOGIC FOR MATCHES ---
            matchCard.addEventListener('click', (e) => {
                e.stopPropagation(); // Stop global closer

                // 1. Content
                let motmHTML = '';
                if (match.motm) {
                    motmHTML = `
                        <div class="motm-badge">
                            <span class="motm-icon">⭐</span>
                            <span>${match.motm}</span>
                        </div>
                    `;
                }

                pitchPopup.innerHTML = `
                    <div class="pitch-teams">
                        <div class="pitch-team">${match.teamA || ""}<h6>⚽ ${match.goalByA|| ""}</h6> <h6>👟 ${match.assistA|| ""}</h6></div>
                        <div class="pitch-vs">VS</div>
                        <div class="pitch-team">${match.teamB || ""} <h6>⚽ ${match.goalByB|| ""}</h6> <h6>👟 ${match.assistB|| ""}</h6></div>
                    </div>
                    ${motmHTML}
                `;

                // 2. Position
                const rect = matchCard.getBoundingClientRect();
                let topPos = rect.top - 190; 
                let leftPos = rect.left + (rect.width / 2) - 150; 

                // Edge detection
                if (topPos < 10) topPos = rect.bottom + 10;

                pitchPopup.style.top = `${topPos}px`;
                pitchPopup.style.left = `${leftPos}px`;
                pitchPopup.style.display = 'flex';
            });

            roundDiv.appendChild(matchCard);
        });

        container.appendChild(roundDiv);
    });
}