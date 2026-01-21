document.addEventListener("DOMContentLoaded", () => {
  // 1. Fetch the JSON file
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      // Load all sections
      if (data.teams) loadTeams(data.teams);
      if (data.groupMatches) loadGroupMatches(data.groupMatches);
      // We load results after, in case there is a specific final score to overwrite the placeholder
      if (data.results) loadResults(data.results);
      if (data.schedule) loadSchedule(data.schedule);
      if (data.sponsors) loadSponsors(data.sponsors);
    })
    .catch((error) => console.error("Error loading JSON:", error));

  // 2. Global Click Listener (Closes popups when clicking empty space)
  document.addEventListener("click", function (event) {
    // A. Close Player AND Sponsor Popups
    document.querySelectorAll(".player-popup, .sponsor-popup").forEach((popup) => {
      popup.classList.remove("active", "mobile-center", "show-below");
      popup.style.display = ""; // Force hide/clear styles
    });

    // B. Close Schedule/Pitch Popup
    const pitchPopup = document.getElementById("match-hover-popup");
    if (pitchPopup) {
      pitchPopup.style.display = "none";
    }
  });
});

// --- TEAMS & PLAYERS FUNCTION ---
function loadTeams(teams) {
  const container = document.getElementById("teams-container");
  if (!container) return;
  container.innerHTML = "";

  teams.forEach((team) => {
    const card = document.createElement("div");
    card.className = "team-card";
    card.style.borderTopColor = team.color;

    // Header
    const header = document.createElement("div");
    header.className = "team-header";
    const link = document.createElement("a");
    link.className = "team-link";
    link.style.color = team.color;
    link.href = team.link || "#";

    const logoWrapper = document.createElement("div");
    logoWrapper.className = "team-logo-wrapper";
    logoWrapper.style.borderColor = team.color;
    const logoImg = document.createElement("img");
    logoImg.src = team.logo || "https://via.placeholder.com/50";
    logoImg.className = "team-logo-img";

    logoWrapper.appendChild(logoImg);
    link.appendChild(logoWrapper);
    const nameSpan = document.createElement("span");
    nameSpan.innerText = team.name;
    link.appendChild(nameSpan);
    header.appendChild(link);
    card.appendChild(header);

    // Players Grid
    const playerGrid = document.createElement("div");
    playerGrid.className = "players-list";

    team.players.forEach((player) => {
      const pDiv = document.createElement("div");
      pDiv.className = "player-item";

      pDiv.innerHTML = `
               <div class="img-wrapper">
                   <img src="${player.photo}"
                   onerror="this.src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'"
                   alt="${player.name}" class="player-img">
               </div>
               <span class="player-name">${player.name}</span>

               <div class="player-popup">
                   <div class="popup-img-container">
                      <a href="${player.photo}"><img src="${player.photo}" class="popup-photo"></a>
                   </div>
                   <div class="popup-name">${player.name}</div>
                   <div class="popup-team" style="color: ${team.color}">${team.name}</div>
                   <hr class="popup-divider">
                   <div class="stats-row">
                       <div class="stat-box">
                           <span class="stat-value">⚽ ${player.goals || 0}</span>
                           <span class="stat-value">👟 ${player.assist || 0}</span>
                       </div>
                       <div class="stat-box">
                           <div class="cards-container">
                               <span class="card yellow-card">${player.yellowCards || 0}</span>
                               <span class="card red-card">${player.redCards || 0}</span>
                           </div>
                       </div>
                   </div>
               </div>
           `;

      // Click Logic
      pDiv.addEventListener("click", function (e) {
        e.stopPropagation();
        handlePopupClick(this, ".player-popup");
      });

      playerGrid.appendChild(pDiv);
    });

    card.appendChild(playerGrid);
    container.appendChild(card);
  });
}

// --- SPONSORS FUNCTION ---
function loadSponsors(sponsors) {
  const sponsorsContainer = document.getElementById('sponsors-container');
  if (!sponsorsContainer) return;

  sponsorsContainer.innerHTML = '';

  sponsors.forEach(sponsor => {
    const sDiv = document.createElement('div');
    sDiv.className = 'sponsor-item';
    const tierClass = sponsor.tier ? `tier-${sponsor.tier.toLowerCase()}` : '';

    sDiv.innerHTML = `
          <div class="sponsor-img-wrapper" style="border-color: ${getTierColor(sponsor.tier)}">
              <img src="${sponsor.logo}" class="sponsor-img" alt="${sponsor.name}">
          </div>
          <span class="sponsor-name">${sponsor.name}</span>
          <span class="sponsor-country">Country: ${sponsor.country}</span>

          <div class="sponsor-popup">
              <div class="popup-img-container">
                  <a href="${sponsor.logo}"><img src="${sponsor.logo}" class="popup-photo"></a>
              </div>
              <div class="popup-name">${sponsor.name}</div>
              <div style="color:red" class="popup-tier ${tierClass}">${sponsor.tier || 'Official Sponsor'}</div>
              <hr class="popup-divider">
              ${sponsor.website ? `<a href="${sponsor.website}" target="_blank" class="sponsor-website-btn">Visit Website</a>` : ''}
          </div>
      `;

    sDiv.addEventListener("click", function (e) {
      e.stopPropagation();
      handlePopupClick(this, ".sponsor-popup");
    });

    sponsorsContainer.appendChild(sDiv);
  });
}

// --- SHARED HELPER FUNCTIONS ---

function getTierColor(tier) {
  if (!tier) return '#ddd';
  switch (tier.toLowerCase()) {
    case 'gold': return '#d4af37';
    case 'silver': return '#a0a0a0';
    case 'bronze': return '#cd7f32';
    default: return '#ddd';
  }
}

function handlePopupClick(element, popupSelector) {
  const popup = element.querySelector(popupSelector);
  const wasActive = popup.classList.contains("active");

  document.querySelectorAll(".player-popup, .sponsor-popup").forEach((p) => {
    p.classList.remove("active", "mobile-center", "show-below");
    p.style.display = "";
  });

  if (!wasActive) {
    popup.classList.add("active");
    popup.style.display = "block";

    const rect = element.getBoundingClientRect();
    if (window.innerWidth < 768) {
      popup.classList.add("mobile-center");
    } else if (rect.top < 300) {
      popup.classList.add("show-below");
    }
  }
}

// --- GROUP MATCHES & AUTO FINAL ---

function loadGroupMatches(matches) {
  const tableBody = document.getElementById("group-stage-body");
  if (!tableBody) return;
  tableBody.innerHTML = "";

  // 1. Calculate Points
  const processedMatches = matches.map((team) => {
    return { ...team, mp: team.W + team.D + team.L, pts: team.W * 3 + team.D * 1 };
  });

  // 2. Sort (Highest Points first, then Wins)
  processedMatches.sort((a, b) => {
    if (b.pts !== a.pts) return b.pts - a.pts;
    else return b.W - a.W;
  });

  // 3. Render Table
  processedMatches.forEach((team, index) => {
    const row = document.createElement("tr");
    if (index < 4) row.classList.add("top-team");
    row.innerHTML = `
           <td class="position-cell">${index + 1}</td>
           <td class="team-col"><div class="team-info"><span>${team.teamA}</span></div></td>
           <td>${team.mp}</td>
           <td>${team.W}</td>
           <td>${team.D}</td>
           <td>${team.L}</td>
           <td>${team.TG}</td>
           <td>${team.dif}</td>
           <td class="points-cell">${team.pts}</td>
       `;
    tableBody.appendChild(row);
  });

  // 4. AUTO-POPULATE FINAL WITH TOP 2 TEAMS
  if (processedMatches.length >= 2) {
    const grandFinal = document.getElementById("grand-final");
    if (grandFinal) {
      const top1 = processedMatches[0].teamA;
      const top2 = processedMatches[1].teamA;

      // We overwrite content to ensure we display the table leaders
      // Note: If you want to show a specific score from JSON later, 
      // loadResults() will handle that if data.results.final exists.
      grandFinal.innerHTML = `
         <div class="team-row"><span>${top1}</span><span class="score">-</span></div>
         <div class="team-row"><span>${top2}</span><span class="score">-</span></div>
      `;
    }
  }
}

function loadResults(results) {
  // If specific final results exist in JSON, this will append/update them
  // If you only want the table to determine the final, ensure your JSON "results.final" is empty or null.
  if (!results || !results.final) return;

  const createMatchHTML = (match) => `
       <div class="team-row"><span>${match.teamA}</span><span class="score">${match.scoreA}</span></div>
       <div class="team-row"><span>${match.teamB}</span><span class="score">${match.scoreB}</span></div>
   `;
  const grandFinal = document.getElementById("grand-final");
  // Only overwrite if we actually have data in results.final
  if (grandFinal && results.final && results.final.teamA) {
    grandFinal.innerHTML = createMatchHTML(results.final);
  }
}

function loadSchedule(schedule) {
  const container = document.getElementById("schedule-container");
  if (!container) return;
  container.innerHTML = "";
  let pitchPopup = document.getElementById("match-hover-popup");
  if (!pitchPopup) {
    pitchPopup = document.createElement("div");
    pitchPopup.id = "match-hover-popup";
    pitchPopup.className = "match-hover-popup";
    pitchPopup.addEventListener("click", (e) => e.stopPropagation());
    document.body.appendChild(pitchPopup);
  }
  schedule.forEach((round) => {
    const roundDiv = document.createElement("div");
    roundDiv.className = "round-section";
    roundDiv.innerHTML = `<div class="round-header"><h3>Day ${round.round}</h3><span class="round-date">${round.date}</span></div>`;
    round.matches.forEach((match) => {
      const matchCard = document.createElement("div");
      matchCard.className = "match-card-creative";
      let centerContent = (match.scoreA !== undefined) ? `${match.scoreA} : ${match.scoreB}` : match.time;
      let centerClass = (match.scoreA !== undefined) ? "match-score-badge" : "match-time-badge";
      matchCard.innerHTML = `
               <div class="team-side left"><span class="team-name">${match.teamA}</span></div>
               <div class="match-center"><div class="${centerClass}">${centerContent}</div></div>
               <div class="team-side right"><span class="team-name">${match.teamB}</span></div>
           `;
      matchCard.addEventListener("click", (e) => {
        e.stopPropagation();
        let motmHTML = match.motm ? `<div class="motm-badge"><span class="motm-icon">⭐</span><span>${match.motm}</span></div>` : "";
        pitchPopup.innerHTML = `
                   <div class="pitch-teams">
                       <div class="pitch-team">${match.teamA || ""}<h6>${match.goalByA || ""}</h6><h6>${match.assistA || ""}</h6><h6>${match.yellowCardsA || ""}</h6></div>
                       <div class="pitch-vs">${match.score || "VS"}</div>
                       <div class="pitch-team">${match.teamB || ""}<h6>${match.goalByB || ""}</h6><h6>${match.assistB || ""}</h6><h6>${match.yellowCardsB || ""}</h6></div>
                   </div>${motmHTML}`;
        const rect = matchCard.getBoundingClientRect();
        let topPos = rect.top - 190;
        let leftPos = rect.left + rect.width / 2 - 150;
        if (topPos < 10) topPos = rect.bottom + 10;
        pitchPopup.style.top = `${topPos}px`;
        pitchPopup.style.left = `${leftPos}px`;
        pitchPopup.style.display = "flex";
      });
      roundDiv.appendChild(matchCard);
    });
    container.appendChild(roundDiv);
  });
}