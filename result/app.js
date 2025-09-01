let matchData = {};

async function loadData() {
    const res = await fetch('data.json');
    matchData = await res.json();
    initApp();
}

function initApp() {
    updateScore();
    renderTimeline();
    renderLineup();
    renderStats();
    setInterval(() => { updateLiveIndicator(); }, 1000);

    // Tabs
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById(tab.dataset.tab).classList.add('active');
        });
    });
}

function updateScore() {
    document.getElementById('homeScore').textContent = matchData.homeTeam.score;
    document.getElementById('awayScore').textContent = matchData.awayTeam.score;
    document.getElementById('homeName').textContent = matchData.homeTeam.name;
    document.getElementById('awayName').textContent = matchData.awayTeam.name;
    document.getElementById('homeLogo').textContent = matchData.homeTeam.logo;
    document.getElementById('awayLogo').textContent = matchData.awayTeam.logo;
}

function renderTimeline() {
    const timeline = document.getElementById('timeline');
    timeline.innerHTML = '';
    matchData.timeline.forEach(ev => {
        let icon = '';
        let colorClass = '';
        if(ev.type==='goal'){icon='⚽'; colorClass='goal';}
        if(ev.type==='yellow'){icon='⚠'; colorClass='yellow-card';}
        if(ev.type==='red'){icon='❌'; colorClass='red-card';}
        if(ev.type==='substitution'){icon='↕'; colorClass='substitution';}
        if(ev.type==='fulltime'){ 
            timeline.innerHTML += `<div class="commentary-item"><div class="commentary-time">${ev.time}</div>${ev.description}</div>`;
            return;
        }
        timeline.innerHTML += `
        <div class="timeline-event">
            <div class="timeline-time">${ev.time}</div>
            <div class="timeline-icon ${colorClass}">${icon}</div>
            <div>
                ${ev.type==='substitution' ? 
                    `<strong>Substitution</strong><br><span style="color:#4ade80">IN:</span> ${ev.playerIn}<br><span style="color:#ef4444">OUT:</span> ${ev.playerOut}` 
                    : `<strong>${ev.player}</strong> (${ev.team})<br><small>${ev.description}</small>`}
            </div>
        </div>`;
    });
}

function renderLineup() {
    const lineup = document.getElementById('lineup');
    lineup.innerHTML = '';
    ['homeTeam','awayTeam'].forEach(teamKey => {
        const team = matchData[teamKey];
        let html = `<h3>${team.name} (${team.formation})</h3><div class="team-lineup">`;
        team.players.forEach(p => {
            html += `<div class="player"><div class="player-avatar">${p.name.split(' ').map(n=>n[0]).join('')}<div class="player-rating">${p.rating}</div></div><div class="player-name">${p.name}</div></div>`;
        });
        html += `</div>`;
        lineup.innerHTML += html;
    });
}

function renderStats() {
    const stats = document.getElementById('stats');
    const s = matchData.stats;
    stats.innerHTML = `
    <div class="stats-grid">
        <div class="stat-card"><div class="stat-value">${s.possession.home}%</div><div class="stat-label">Possession</div></div>
        <div class="stat-card"><div class="stat-value">${s.possession.away}%</div><div class="stat-label">Possession</div></div>
        <div class="stat-card"><div class="stat-value">${s.shots.home}</div><div class="stat-label">Total Shots</div></div>
        <div class="stat-card"><div class="stat-value">${s.shots.away}</div><div class="stat-label">Total Shots</div></div>
    </div>
    <div class="team-stats"><span>Shots on Target</span><span><strong>${s.shotsOnTarget.home}</strong> - <strong>${s.shotsOnTarget.away}</strong></span></div>
    <div class="team-stats"><span>Corners</span><span><strong>${s.corners.home}</strong> - <strong>${s.corners.away}</strong></span></div>
    <div class="team-stats"><span>Fouls</span><span><strong>${s.fouls.home}</strong> - <strong>${s.fouls.away}</strong></span></div>
    <div class="team-stats"><span>Yellow Cards</span><span><strong>${s.yellowCards.home}</strong> - <strong>${s.yellowCards.away}</strong></span></div>
    <div class="team-stats"><span>Pass Accuracy</span><span><strong>${s.passAccuracy.home}%</strong> - <strong>${s.passAccuracy.away}%</strong></span></div>
    <div style="margin-top:20px;">
        <h4 style="margin-bottom:10px;">Possession</h4>
        <div style="display:flex;justify-content:space-between;margin-bottom:5px;">
            <span>${matchData.homeTeam.name}</span><span>${matchData.awayTeam.name}</span>
        </div>
        <div class="possession-bar"><div class="possession-fill" style="width:${s.possession.home}%;"></div></div>
        <div style="display:flex;justify-content:space-between;font-size:0.9rem;color:#9ca3af;">
            <span>${s.possession.home}%</span><span>${s.possession.away}%</span>
        </div>
    </div>`;
}

function updateLiveIndicator() {
    const dot = document.querySelector('.live-dot');
    if(dot) dot.style.opacity = dot.style.opacity==='0.5'?'1':'0.5';
}

document.addEventListener('DOMContentLoaded', loadData);
