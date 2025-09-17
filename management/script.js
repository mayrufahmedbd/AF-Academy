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
}

loadData();
