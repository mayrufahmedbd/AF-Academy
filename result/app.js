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

    // Update Match Timer from JSON (fully manual)
    document.getElementById("matchTimer").textContent = `⏱️ Match Time: ${data.matchTime}`;

    // Lineups
    document.getElementById("team1Name").textContent = data.team1;
    document.getElementById("team2Name").textContent = data.team2;

    let lineup1 = document.getElementById("lineup1");
    let lineup2 = document.getElementById("lineup2");
    lineup1.innerHTML = "";
    lineup2.innerHTML = "";

    data.lineup1.forEach(player => {
      let li = document.createElement("li");
      li.textContent = player;
      lineup1.appendChild(li);
    });

    data.lineup2.forEach(player => {
      let li = document.createElement("li");
      li.textContent = player;
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

  } catch(err) {
    console.error("Error loading data:", err);
  }
}

// Toggle Views
document.getElementById("btnTimeline").addEventListener("click", function() {
  document.getElementById("timelineCard").classList.remove("hidden");
  document.getElementById("lineupsCard").classList.add("hidden");
  this.classList.add("active");
  document.getElementById("btnLineups").classList.remove("active");
});

document.getElementById("btnLineups").addEventListener("click", function() {
  document.getElementById("lineupsCard").classList.remove("hidden");
  document.getElementById("timelineCard").classList.add("hidden");
  this.classList.add("active");
  document.getElementById("btnTimeline").classList.remove("active");
});

// Initial Load
loadData();
setInterval(loadData, 5000); // reload every 5 sec
