async function loadData() {
    const response = await fetch("data.json");
    const data = await response.json();

    // Management
    document.getElementById("management").innerHTML = `
        <div class="container">
            <h2 class="section-title">Our Management Team</h2>
            <div class="menagers-grid">
                ${data.management.map(m => `
                    <div class="menagers-card" id="${m.id}">
                        <div class="menagers-image">
                            <img src="${m.image}" alt="${m.name}">
                        </div>
                        <div class="menagers-info">
                            <h3>${m.name}</h3>
                            <p class="menagers-role">${m.role}</p>
                            <p>${m.bio}</p>
                            <div class="social-links">
                                ${m.social.linkedin ? `<a href="${m.social.linkedin}"><i class="fab fa-linkedin-in"></i></a>` : ""}
                                ${m.social.twitter ? `<a href="${m.social.twitter}"><i class="fab fa-twitter"></i></a>` : ""}
                                ${m.social.email ? `<a href="${m.social.email}"><i class="fas fa-envelope"></i></a>` : ""}
                            </div>
                        </div>
                    </div>`).join("")}
            </div>
        </div>
    `;

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
