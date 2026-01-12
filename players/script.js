async function loadData() {
    const response = await fetch("data.json");
    const data = await response.json();

    // 1. Render Current Players (Existing logic)
    document.getElementById("players").innerHTML = `
        <div class="container">
            <h2 class="section-title">Our Players</h2>
            <div class="players-grid">
                ${data.players.map(p => createPlayerCard(p)).join("")}
            </div>
        </div>
    `;

    // 2. Render Old Players (New Logic)
    // We check if 'oldPlayers' exists in the JSON before trying to map it
    if (data.oldPlayers) {
        document.getElementById("old-players").innerHTML = `
            <div class="container">
                <h2 class="section-title">Former Players</h2> <div class="players-grid">
                    ${data.oldPlayers.map(p => createPlayerCard(p)).join("")}
                </div>
            </div>
        `;
    }

    // 3. Enable Lightbox for ALL cards (Current + Old)
    enableLightbox();
}

// helper function to avoid repeating the long HTML string twice
function createPlayerCard(p) {
    return `
        <div class="players-card" 
                data-name="${p.name}" 
                data-img="${p.image}"
                data-number="${p.number}"
                data-position="${p.position}">
            <div class="players-image">
                <img src="${p.image}" alt="${p.name}">
            </div>
            <div class="players-info">
                <h3>${p.name}</h3>
                <p class="player-number">Number: ${p.number}</p>
                <p>Position: ${p.position}</p>
                <div class="social-links">
                    ${p.social.facebook ? `<a href="${p.social.facebook}" target="_blank"><i class="fa-brands fa-square-facebook"></i></a>` : ""}
                    ${p.social.instagram ? `<a href="${p.social.instagram}" target="_blank"><i class="fa-brands fa-instagram"></i></a>` : ""}
                    ${p.social.whatsapp ? `<a href="${p.social.whatsapp}" target="_blank"><i class="fa-brands fa-whatsapp"></i></a>` : ""}
                </div>
            </div>
        </div>
    `;
}

function enableLightbox() {
    // This will now select cards from BOTH 'players' and 'old-players' sections
    const cards = document.querySelectorAll(".players-card");
    const lightbox = document.getElementById("lightbox");
    const lbImg = document.getElementById("lightbox-img");
    const lbName = document.getElementById("lightbox-name");
    const lbNumber = document.getElementById("lightbox-number");
    const lbPosition = document.getElementById("lightbox-position");

    cards.forEach(card => {
        card.addEventListener("click", () => {
            lbImg.src = card.dataset.img;
            lbName.textContent = card.dataset.name;
            lbNumber.textContent = "Number: " + card.dataset.number;
            lbPosition.textContent = "Position: " + card.dataset.position;
            lightbox.style.display = "flex";
        });
    });

    lightbox.addEventListener("click", () => {
        lightbox.style.display = "none";
    });
}
loadData();