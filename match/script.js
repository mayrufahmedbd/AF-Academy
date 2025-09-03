async function loadData() {
    const response = await fetch("data.json");
    const data = await response.json();

    // Page Header
    document.querySelector(".page-header").innerHTML = `
        <div class="logo-section">
            <div class="logo"><img src="${data.club.logo}" alt="${data.club.name}"></div>
            <div>
                <div class="club-name">${data.club.name}</div>
                <div class="subtitle">${data.club.subtitle}</div>
            </div>
        </div>
        <div class="nav-buttons">
            ${data.navigation.map(nav => `
                <button class="nav-btn ${nav.active ? "active" : ""}" data-target="${nav.target}">
                    ${nav.label}
                </button>
            `).join("")}
        </div>
    `;

    // Next Matches
    document.getElementById("next-match").innerHTML = `
        <div class="upcoming-section">
            ${data.matches.map((match, index) => `
                <div class="upcoming-match" id="match-${index}">
                    <div class="team-section">
                        <span>${match.homeTeam.name}</span>
                        <span class="vs">vs</span>
                        <span>${match.awayTeam.name}</span>
                    </div>
                    <div class="match-datetime">${match.datetime}</div>
                    <a href="${match.resultPage}" class="result-btn">Match Result</a>
                </div>
            `).join("")}
        </div>
    `;

    // Squad
    document.getElementById("squad").innerHTML = `
        <div class="games-container">
            ${data.squad.map(player => `
                <div class="game-row">
                    <div class="team-section">
                        <span>${player.name} (${player.position})</span>
                    </div>
                </div>
            `).join("")}
        </div>
    `;

    // Injuries
    document.getElementById("transfers").innerHTML = `
        <div class="games-container">
            ${data.injuries.map(injury => `
                <div class="game-row">
                    <div class="team-section">
                        <div class="team-logo">${injury.short}</div>
                        <span>${injury.name}</span>
                    </div>
                    <div class="match-datetime">Return date: ${injury.returnDate}</div>
                </div>
            `).join("")}
        </div>
    `;

    // Navigation switching
    const navBtns = document.querySelectorAll(".nav-btn");
    const sections = document.querySelectorAll(".section");
    navBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            navBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            const target = btn.getAttribute("data-target");
            sections.forEach(sec => sec.classList.remove("active"));
            document.getElementById(target).classList.add("active");
        });
    });

    // Row click effect
    document.querySelectorAll(".game-row").forEach(row => {
        row.addEventListener("click", () => {
            row.style.background = "rgba(255, 215, 0, 0.1)";
            setTimeout(() => { row.style.background = ""; }, 200);
        });
    });
}

loadData();
