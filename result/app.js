// Load JSON Data
async function loadData() {
  try {
    let response = await fetch("data.json?_=" + new Date().getTime()); // prevent cache
    let data = await response.json();

    // Update Scoreboard
    document.getElementById("team1").textContent = data.team1;
    document.getElementById("team2").textContent = data.team2;
    document.getElementById("score1").textContent = data.score1;
    document.getElementById("score2").textContent = data.score2;

    // Match Timer
    document.getElementById("matchTimer").textContent = `⏱️ Match Time: ${data.matchTime}`;

    // Lineups with positions
    document.getElementById("team1Name").textContent = data.team1;
    document.getElementById("team2Name").textContent = data.team2;

    let lineup1 = document.getElementById("lineup1");
    let lineup2 = document.getElementById("lineup2");
    lineup1.innerHTML = "";
    lineup2.innerHTML = "";

    data.lineup1.forEach(player => {
      let li = document.createElement("li");
      li.className = "player";
      li.innerHTML = `${player.name}<span class="position">${player.pos}</span>`;
      lineup1.appendChild(li);
    });

    data.lineup2.forEach(player => {
      let li = document.createElement("li");
      li.className = "player";
      li.innerHTML = `${player.name}<span class="position">${player.pos}</span>`;
      lineup2.appendChild(li);
    });

    // Timeline
    let timelineDiv = document.getElementById("timeline");
    timelineDiv.innerHTML = "";
    data.timeline.forEach(event => {
      let div = document.createElement("div");
      div.className = "event";
      div.textContent = `${event.minute}' - ${event.team}: ${event.event}`;
      timelineDiv.appendChild(div);
    });

    // Stats
    document.getElementById("statsTeam1").textContent = data.team1;
    document.getElementById("statsTeam2").textContent = data.team2;

    let stats1 = document.getElementById("stats1");
    let stats2 = document.getElementById("stats2");
    stats1.innerHTML = "";
    stats2.innerHTML = "";

    Object.entries(data.stats.team1).forEach(([key, val]) => {
      let li = document.createElement("li");
      li.textContent = `${key}: ${val}`;
      stats1.appendChild(li);
    });
    Object.entries(data.stats.team2).forEach(([key, val]) => {
      let li = document.createElement("li");
      li.textContent = `${key}: ${val}`;
      stats2.appendChild(li);
    });

  } catch (err) {
    console.error("Error loading data:", err);
  }
}

// Toggle Views
function showCard(showId, btnId) {
  ["timelineCard", "lineupsCard", "statsCard"].forEach(id =>
    document.getElementById(id).classList.add("hidden")
  );
  document.getElementById(showId).classList.remove("hidden");

  ["btnTimeline", "btnLineups", "btnStats"].forEach(id =>
    document.getElementById(id).classList.remove("active")
  );
  document.getElementById(btnId).classList.add("active");
}

document.getElementById("btnTimeline").addEventListener("click", () => showCard("timelineCard", "btnTimeline"));
document.getElementById("btnLineups").addEventListener("click", () => showCard("lineupsCard", "btnLineups"));
document.getElementById("btnStats").addEventListener("click", () => showCard("statsCard", "btnStats"));

// Initial Load
loadData();
setInterval(loadData, 5000);
