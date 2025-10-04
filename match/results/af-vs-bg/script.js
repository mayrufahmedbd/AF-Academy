function showTab(tab, e) {
  document.querySelectorAll(".tab-content").forEach((el) => {
    el.classList.remove("active");
  });
  document.querySelectorAll(".tab-btn").forEach((el) => {
    el.classList.remove("active");
  });
  document.getElementById(tab).classList.add("active");
  e.target.classList.add("active");
}

// Load data from JSON
fetch("data.json")
  .then((res) => res.json())
  .then((data) => {
    renderLineups(data.teams);
    renderTimeline(data.timeline);
  });

function renderLineups(teams) {
  // Home team
  const home = document.getElementById("home-team");
  home.innerHTML = `
    <div class="team-title">${teams.home.name}</div>
    <div class="formation">${teams.home.formation}</div>
    ${teams.home.rows.map((row) => renderRow(row)).join("")}
  `;

  // Away team
  const away = document.getElementById("away-team");
  away.innerHTML = `
    ${teams.away.rows.map((row) => renderRow(row)).join("")}
    <div class="team-title">${teams.away.name}</div>
    <div class="formation">${teams.away.formation}</div>
  `;
}

function renderRow(players) {
  return `
    <div class="player-row">
      ${players
        .map(
          (p) => `
        <div class="player ${p.position === "Goalkeeper" ? "goalkeeper" : ""}">
          <div class="player-circle">${p.number}</div>
          <div class="player-name">${p.name}</div>
        </div>
      `
        )
        .join("")}
    </div>
  `;
}

function renderTimeline(events) {
  const container = document.getElementById("timeline-events");
  events.forEach((ev) => {
    if (ev.type === "end") {
      container.innerHTML += `
        <div class="end-match">
          <div class="end-icon">⏱️</div>
          <div class="end-text">${ev.text}</div>
          <div class="final-time">${ev.time}</div>
        </div>
      `;
    } else {
      container.innerHTML += `
        <div class="event-card ${ev.side} ${ev.class || ""}">
          <div class="event-type">${ev.icon} ${ev.type.toUpperCase()}</div>
          ${ev.player ? `<div class="player-name">${ev.player}</div>` : ""}
          <div class="event-description">${ev.description}</div>
          <span class="time-badge">${ev.time}</span>
        </div>
      `;
    }
  });
}
