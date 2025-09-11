async function loadMatch() {
  const res = await fetch("data.json");
  const match = await res.json();

  // Render Lineups
  const app = document.getElementById("app");
  app.innerHTML = `
    <div class="match-header">
      <div class="team-logos">
        <div class="team-info">
          <div style="width:60px;height:60px;background:${match.teams.home.color};
            border-radius:50%;display:flex;align-items:center;justify-content:center;
            color:${match.teams.home.color === 'white' ? 'black' : 'white'};
            font-weight:bold;">${match.teams.home.short}</div>
          <div class="team-name">${match.teams.home.name}</div>
        </div>
        <div class="score">${match.teams.home.score} - ${match.teams.away.score}</div>
        <div class="team-info">
          <div style="width:60px;height:60px;background:${match.teams.away.color};
            border-radius:50%;display:flex;align-items:center;justify-content:center;
            color:white;font-weight:bold;">${match.teams.away.short}</div>
          <div class="team-name">${match.teams.away.name}</div>
        </div>
      </div>
      <div style="font-size:14px;color:#888;">${match.status} • ${match.date}</div>
    </div>`;

  const pitchContainer = document.createElement("div");
  pitchContainer.classList.add("pitch-container");

  [match.teams.home, match.teams.away].forEach(team => {
    const pitch = document.createElement("div");
    pitch.classList.add("pitch");
    pitch.innerHTML = `<div class="team-title">${team.name}</div>
                      <div class="formation">${team.formation}</div>`;

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
  const timelineContainer = document.getElementById("timeline-events");
  timelineContainer.innerHTML = "";
  match.events.forEach((event, i) => {
    const side = i % 2 === 0 ? "left" : "right";
    timelineContainer.innerHTML += `
      <div class="event-card ${side} ${event.type}">
        <div class="event-type">${eventIcon(event.type)} ${event.type.replace("-", " ").toUpperCase()}</div>
        <div class="player-name">${event.player ? event.player + " (" + event.team + ")" : ""}</div>
        <div class="event-description">${event.description}</div>
        <span class="time-badge">${event.minute}</span>
      </div>`;
  });
}

function eventIcon(type) {
  switch (type) {
    case "red-card": return "🔴";
    case "yellow-card": return "📒";
    case "substitution": return "🔄";
    case "commentary": return "🎤";
    default: return "⚽";
  }
}

function showTab(tab, e) {
  document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));
  document.getElementById(tab).classList.add('active');
  e.target.classList.add('active');
}

loadMatch();
