async function loadMatch() {
  const res = await fetch("data.json");
  const data = await res.json();
  const { match } = data;

  // Render Lineups
  const app = document.getElementById("app");
  app.innerHTML = `
    <div class="match-header">
      <div class="team-logos">
        <div class="team-info">
          <div style="width:60px;height:60px;background:${match.teams.home.color};
            border-radius:50%;display:flex;align-items:center;justify-content:center;
            color:${match.teams.home.color === 'white' ? 'black' : 'white'};font-weight:bold;">
            ${match.teams.home.short}
          </div>
          <div class="team-name">${match.teams.home.name}</div>
        </div>
        <div class="score">${match.teams.home.score} - ${match.teams.away.score}</div>
        <div class="team-info">
          <div style="width:60px;height:60px;background:${match.teams.away.color};
            border-radius:50%;display:flex;align-items:center;justify-content:center;
            color:white;font-weight:bold;">
            ${match.teams.away.short}
          </div>
          <div class="team-name">${match.teams.away.name}</div>
        </div>
      </div>
      <div style="font-size:14px;color:#888;">${match.status} • ${match.date}</div>
    </div>
  `;

  const pitchContainer = document.createElement("div");
  pitchContainer.classList.add("pitch-container");

  [match.teams.home, match.teams.away].forEach(team => {
    const pitch = document.createElement("div");
    pitch.classList.add("pitch");
    pitch.innerHTML = `<div class="team-title">${team.name}</div>
                       <div class="formation-display">${team.formation}</div>`;

    const addRow = (players, extraClass = "") => {
      const row = document.createElement("div");
      row.classList.add("player-row");
      players.forEach(p => {
        row.innerHTML += `
          <div class="player ${extraClass}">
            <div class="player-circle">${p.num}</div>
            <div class="player-name">${p.name}</div>
          </div>`;
      });
      pitch.appendChild(row);
    };

    if (team.players.goalkeeper) addRow(team.players.goalkeeper, "goalkeeper");
    if (team.players.defense) addRow(team.players.defense);
    if (team.players.midfieldDef) addRow(team.players.midfieldDef);
    if (team.players.midfieldAtt) addRow(team.players.midfieldAtt);
    if (team.players.midfield) addRow(team.players.midfield);
    if (team.players.forward) addRow(team.players.forward);

    pitchContainer.appendChild(pitch);
  });

  app.appendChild(pitchContainer);

  // Render Timeline
  const timelineContainer = document.getElementById("timeline-container");
  timelineContainer.innerHTML = `
    <div class="phone-container">
      <div class="score-header">
        <div class="team-logo real-madrid">${match.teams.home.short}</div>
        <div style="text-align:center;">
          <div class="score">${match.teams.home.score} - ${match.teams.away.score}</div>
          <div class="ft">${match.status}</div>
        </div>
        <div class="team-logo mallorca">${match.teams.away.short}</div>
      </div>
      <div class="content">
        ${match.events.map(e => renderEvent(e)).join("")}
      </div>
    </div>
  `;
}

function renderEvent(event) {
  if (event.type === "red-card") {
    return `
      <div class="event-card red-card">
        <div class="event-header">
          <div class="event-type"><span>🔴 RED CARD</span></div>
          <span class="time-badge">${event.minute}</span>
        </div>
        <div class="player-row">
          <div class="player-info">
            <div class="player-name">${event.player}</div>
            <div class="player-details">${event.team} • ${event.details}</div>
          </div>
        </div>
        <div class="event-description">${event.description}</div>
      </div>`;
  }
  if (event.type === "yellow-card") {
    return `
      <div class="event-card yellow-card">
        <div class="event-header">
          <div class="event-type"><span>🟨 YELLOW CARD</span></div>
          <span class="time-badge">${event.minute}</span>
        </div>
        <div class="player-row">
          <div class="player-info">
            <div class="player-name">${event.player}</div>
            <div class="player-details">${event.team} • ${event.details}</div>
          </div>
        </div>
        <div class="event-description">${event.description}</div>
      </div>`;
  }
  if (event.type === "substitution") {
    return `
      <div class="event-card substitution">
        <div class="event-header">
          <div class="event-type"><span>🔄 SUBSTITUTION</span></div>
          <span class="time-badge">${event.minute}</span>
        </div>
        <div class="player-row">
          <div>
            <div class="in-player">IN</div>
            <div class="player-info">
              <div class="player-name">${event.in}</div>
              <div class="player-details">${event.team} • ${event.inDetails}</div>
            </div>
          </div>
        </div>
        <div class="player-row">
          <div>
            <div class="out-player">OUT</div>
            <div class="player-info">
              <div class="player-name">${event.out}</div>
              <div class="player-details">${event.team} • ${event.outDetails}</div>
            </div>
          </div>
        </div>
        <div class="event-description">${event.description}</div>
      </div>`;
  }
  return "";
}

function showTab(tab) {
  document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));
  document.getElementById(tab).classList.add('active');
  event.target.classList.add('active');
}

loadMatch();
