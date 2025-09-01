document.addEventListener('DOMContentLoaded', () => {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            // Populate match header
            document.getElementById('home-team').textContent = data.match.homeTeam;
            document.getElementById('away-team').textContent = data.match.awayTeam;
            document.getElementById('home-score').textContent = data.match.homeScore;
            document.getElementById('away-score').textContent = data.match.awayScore;
            document.getElementById('match-status').textContent = data.match.status;
            document.getElementById('home-logo').src = data.match.homeLogo || 'placeholder-home-logo.png';
            document.getElementById('away-logo').src = data.match.awayLogo || 'placeholder-away-logo.png';

            // Populate timeline
            const timelineEvents = document.getElementById('timeline-events');
            data.timeline.forEach(event => {
                const eventDiv = document.createElement('div');
                eventDiv.className = `timeline-event ${event.type}`;

                if (event.type === 'commentary') {
                    eventDiv.innerHTML = `
                        <div class="event-time">${event.minute}'</div>
                        <div class="event-text">${event.text}</div>
                    `;
                } else if (event.type === 'yellow-card') {
                    eventDiv.innerHTML = `
                        <div class="event-time">${event.minute}'</div>
                        <div class="event-icon">📑</div>
                        <div class="event-details">
                            <span>${event.player}</span>
                            <span>${event.team === 'home' ? data.match.homeTeam : data.match.awayTeam} - ${event.position}</span>
                            <p>${event.comment}</p>
                        </div>
                    `;
                } else if (event.type === 'substitution') {
                    eventDiv.innerHTML = `
                        <div class="event-time">${event.minute}'</div>
                        <div class="event-icon">↕️</div>
                        <div class="event-details">
                            <div class="sub-in">
                                <span>IN: ${event.in.name}</span>
                                <span>${event.in.team === 'home' ? data.match.homeTeam : data.match.awayTeam} - ${event.in.position}</span>
                            </div>
                            <div class="sub-out">
                                <span>OUT: ${event.out.name}</span>
                                <span>${event.out.team === 'home' ? data.match.homeTeam : data.match.awayTeam} - ${event.out.position}</span>
                            </div>
                        </div>
                    `;
                }
                timelineEvents.appendChild(eventDiv);
            });

            // Populate lineup
            const homeLineup = document.getElementById('home-lineup');
            data.lineup.home.forEach(player => {
                const playerDiv = document.createElement('div');
                playerDiv.className = 'player';
                playerDiv.innerHTML = `
                    <img src="player-placeholder.png" alt="${player.name}">
                    <span>${player.name}</span>
                    <span class="rating">${player.rating}★</span>
                `;
                homeLineup.appendChild(playerDiv);
            });

            const awayLineup = document.getElementById('away-lineup');
            data.lineup.away.forEach(player => {
                const playerDiv = document.createElement('div');
                playerDiv.className = 'player';
                playerDiv.innerHTML = `
                    <img src="player-placeholder.png" alt="${player.name}">
                    <span>${player.name}</span>
                    <span class="rating">${player.rating}★</span>
                `;
                awayLineup.appendChild(playerDiv);
            });

            // Tab switching
            const tabs = document.querySelectorAll('.tab');
            const tabContents = document.querySelectorAll('.tab-content');

            tabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    tabs.forEach(t => t.classList.remove('active'));
                    tab.classList.add('active');

                    tabContents.forEach(content => {
                        content.classList.remove('active');
                        if (content.id === tab.dataset.tab) {
                            content.classList.add('active');
                        }
                    });
                });
            });
        });
});