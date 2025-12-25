async function loadData() {
    const response = await fetch("data.json");
    const data = await response.json();

    /* ================= PAGE HEADER ================= */
    document.querySelector(".page-header").innerHTML = `
        <div class="logo-section">
            <div class="logo">
                <img src="${data.club.logo}" alt="${data.club.name}">
            </div>
            <div>
                <div class="club-name">${data.club.name}</div>
                <div class="subtitle">${data.club.subtitle}</div>
            </div>
        </div>
        <div class="nav-buttons">
            ${data.navigation.map(nav => `
                <button 
                    class="nav-btn ${nav.active ? "active" : ""}" 
                    data-target="${nav.target}">
                    ${nav.label}
                </button>
            `).join("")}
        </div>
    `;

    /* ================= NEXT MATCH ================= */
    document.getElementById("next-match").innerHTML = `
        <div class="upcoming-section">
            ${data.matches.map(match => `
                <a href="${match.resultPage}" class="game-row">
                    <div class="team-section">
                        <div>
                            <span>${match.homeTeam.name}</span>
                            <span class="match-result">${match.homeTeam.matchResult}</span>
                        </div>
                        <br>
                        <span>${match.awayTeam.name}</span>
                        <span class="match-result">${match.awayTeam.matchResult}</span>
                    </div>
                    <div class="match-datetime">${match.datetime}</div>
                </a>
            `).join("")}
        </div>
    `;

    /* ================= SQUAD ================= */
    document.getElementById("squad").innerHTML = `
        <div class="games-container">
            ${data.squad.map(player => `
                <div class="game-row player-row">
                    <div class="team-section">
                        <span>
                            ${player.name} 
                            <span class="player-position">${player.position}</span>
                        </span>
                    </div>
                </div>
            `).join("")}
        </div>
    `;

    /* ================= INJURIES ================= */
    document.getElementById("transfers").innerHTML = `
        <div class="games-container">
            ${data.injuries.map(injury => `
                <div class="game-row">
                    <div class="team-section">
                        <div class="team-logo">${injury.short}</div>
                        <span>${injury.name}</span>
                    </div>
                    <div class="match-datetime">
                        Return date: ${injury.returnDate}
                    </div>
                </div>
            `).join("")}
        </div>
    `;

    /* ================= TAB SYSTEM (URL SYNC) ================= */

    function activateTab(targetId) {
        const navBtns = document.querySelectorAll(".nav-btn");
        const sections = document.querySelectorAll(".section");

        navBtns.forEach(btn => {
            btn.classList.toggle(
                "active",
                btn.getAttribute("data-target") === targetId
            );
        });

        sections.forEach(sec => {
            sec.classList.toggle("active", sec.id === targetId);
        });
    }

    // Click → change URL + activate tab OR redirect
    document.querySelectorAll(".nav-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const target = btn.getAttribute("data-target");

            // 🔥 Redirect if player/squad tab clicked
            if (target === "squad") {
                window.location.href = "/players/";
                return;
            }

            history.pushState(null, "", `#${target}`);
            activateTab(target);
        });
    });

    // Load correct tab on reload
    const hash = window.location.hash.replace("#", "");

    if (hash && document.getElementById(hash)) {
        activateTab(hash);
    } else {
        activateTab("next-match");
    }

    // Browser back / forward
    window.addEventListener("popstate", () => {
        const hash = window.location.hash.replace("#", "");
        if (hash && document.getElementById(hash)) {
            activateTab(hash);
        }
    });
}

/* ================= INIT ================= */
loadData();
