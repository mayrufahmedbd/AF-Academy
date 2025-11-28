async function loadData() {
    const response = await fetch("data.json");
    const data = await response.json();

    // Players
    document.getElementById("players").innerHTML = `
        <div class="container">
            <h2 class="section-title">Our Players</h2>
            <div class="players-grid">
                ${data.players.map(p => `
                    <div class="players-card" id="${p.id}">
                        <div class="players-image"><img src="${p.image}" alt="${p.name}"></div>
                        <div class="players-info">
                            <h3>${p.name}</h3>
                            <p class = "player-number">Number: ${p.number}</p>
                            <p>Position: ${p.position}</p>
                            <div class="social-links">
                                ${p.social.facebook ? `<a href="${p.social.facebook}" target="_blank"><i class="fa-brands fa-square-facebook"></i></a>` : ""}
                                ${p.social.instagram ? `<a href="${p.social.instagram}" target="_blank"><i class="fa-brands fa-instagram"></i></a>` : ""}
                                ${p.social.whatsapp ? `<a href="${p.social.whatsapp}" target="_blank"><i class="fa-brands fa-whatsapp"></i></a>` : ""}
                            </div>
                        </div>
                    </div>`).join("")}
            </div>
        </div>
    `;
}

loadData();
