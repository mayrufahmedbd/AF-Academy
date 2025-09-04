async function loadMatch() {
  const res = await fetch("data.json");
  const data = await res.json();
  const { match } = data;

  const app = document.getElementById("app");

  // Header
  app.innerHTML = `
    <div class="match-header">
      <div class="team-logos">
        <div class="team-info">
          <div style="width: 60px; height: 60px; background: ${match.teams.home.color}; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: ${match.teams.home.color === 'white' ? 'black':'white'}; font-weight: bold;">${match.teams.home.short}</div>
          <div class="team-name">${match.teams.home.name}</div>
        </div>
        <div class="score">${match.teams.home.score} - ${match.teams.away.score}</div>
        <div class="team-info">
          <div style="width: 60px; height: 60px; background: ${match.teams.away.color}; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">${match.teams.away.short}</div>
          <div class="team-name">${match.teams.away.name}</div>
        </div>
      </div>
      <div style="font-size: 14px; color: #888;">${match.status} • ${match.date}</div>
    </div>
  `;

  // Pitch container
  const pitchContainer = document.createElement("div");
  pitchContainer.classList.add("pitch-container");

  // Render teams
  [match.teams.home, match.teams.away].forEach(team => {
    const pitch = document.createElement("div");
    pitch.classList.add("pitch");

    pitch.innerHTML = `
      <div class="team-title">${team.name}</div>
      <div class="formation-display">${team.formation}</div>
    `;

    const addRow = (players, extraClass = "") => {
      const row = document.createElement("div");
      row.classList.add("player-row");
      players.forEach(p => {
        row.innerHTML += `
          <div class="player ${extraClass}">
            <div class="player-circle">${p.num}</div>
            <div class="player-name">${p.name}</div>
          </div>
        `;
      });
      pitch.appendChild(row);
    };

    // Handle formations
    if (team.players.goalkeeper) addRow(team.players.goalkeeper, "goalkeeper");
    if (team.players.defense) addRow(team.players.defense);
    if (team.players.midfieldDef) addRow(team.players.midfieldDef);
    if (team.players.midfieldAtt) addRow(team.players.midfieldAtt);
    if (team.players.midfield) addRow(team.players.midfield);
    if (team.players.forward) addRow(team.players.forward);

    pitchContainer.appendChild(pitch);
  });

  app.appendChild(pitchContainer);

  // Substitutes
  const subsDiv = document.createElement("div");
  subsDiv.classList.add("substitutes");
  subsDiv.innerHTML = `<h3>Substitutes</h3>
    <div class="subs-grid">
      ${Object.values(match.teams).map(team => `
        <div class="team-subs">
          <h4>${team.name}</h4>
          ${team.subs.map(s => `
            <div class="sub-player">
              <div class="sub-number">${s.num}</div>
              <div class="sub-name">${s.name}</div>
            </div>
          `).join("")}
        </div>
      `).join("")}
    </div>`;
  app.appendChild(subsDiv);

  // Managers
  const managers = document.createElement("div");
  managers.classList.add("manager-section");
  managers.innerHTML = `
    <h3>Managers</h3>
    <div class="managers">
      <div class="manager"><strong>${match.teams.home.name}</strong><br>${match.teams.home.manager}</div>
      <div class="manager"><strong>${match.teams.away.name}</strong><br>${match.teams.away.manager}</div>
    </div>
  `;
  app.appendChild(managers);
}

loadMatch();
