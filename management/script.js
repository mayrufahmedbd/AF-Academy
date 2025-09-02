async function loadData() {
    const response = await fetch("data.json");
    const data = await response.json();

    // Header
    const nav = data.navigation.map(item =>
        `<li id="${item.id}"><a href="${item.link}" ${item.active ? 'class="active"' : ''}>${item.name}</a></li>`
    ).join("");

    document.getElementById("header").innerHTML = `
        <div class="container header-container">
            <div class="logo"><a href="index.html">${data.site.name}</a></div>
            <div class="menu-toggle" id="menuToggle"><i class="fas fa-bars"></i></div>
            <ul class="nav-menu" id="navMenu">${nav}</ul>
        </div>
    `;

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
                                ${p.social.facebook ? `<a href="${p.social.facebook}"><i class="fa-brands fa-square-facebook"></i></a>` : ""}
                                ${p.social.instagram ? `<a href="${p.social.instagram}"><i class="fa-brands fa-instagram"></i></a>` : ""}
                                ${p.social.whatsapp ? `<a href="${p.social.whatsapp}"><i class="fa-brands fa-whatsapp"></i></a>` : ""}
                            </div>
                        </div>
                    </div>`).join("")}
            </div>
        </div>
    `;

    // Footer
    document.getElementById("footer").innerHTML = `
        <div class="container">
            <div class="footer-container">
                <div class="footer-section">
                    <h3><a href="/">${data.site.name}</a></h3>
                    <p>${data.footer.about}</p>
                </div>
                <div class="footer-section">
                    <h3>Quick Links</h3>
                    <ul class="footer-links">
                        ${data.footer.quickLinks.map(q => `<li id="${q.id}"><a href="${q.link}">${q.name}</a></li>`).join("")}
                    </ul>
                </div>
                <div class="footer-section">
                    <h3>Programs</h3>
                    <ul class="footer-links">
                        ${data.footer.programs.map(p => `<li id="${p.id}"><a href="${p.link}">${p.name}</a></li>`).join("")}
                    </ul>
                </div>
                <div class="footer-section">
                    <h3>Connect With Us</h3>
                    <div class="social-links">
                        <a href="${data.footer.social.facebook}" target="_blank"><i class="fab fa-facebook-f"></i></a>
                        <a href="${data.footer.social.youtube}" target="_blank"><i class="fab fa-youtube"></i></a>
                    </div>
                </div>
            </div>
            <div class="copyright"><p>${data.footer.copyright}</p></div>
        </div>
    `;
}

loadData();