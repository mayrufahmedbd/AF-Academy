async function loadManagement() {
    const response = await fetch("data.json");
    const data = await response.json();

    // Management section
    document.getElementById("management").innerHTML = `
        <div class="container">
            <h2 class="section-title">Our Management Team</h2>
            <div class="menagers-grid">
                ${data.management.map(m => `
                    <div class="menagers-card"
                        data-name="${m.name}"
                        data-img="${m.image}"
                        data-role="${m.role}">
                        
                        <div class="menagers-image">
                            <img src="${m.image}" alt="${m.name}">
                        </div>

                        <div class="menagers-info">
                            <h3>${m.name}</h3>
                            <p class="menagers-role">${m.role}</p>

                            <div class="social-links">
                                ${m.social.linkedin ? `<a href="${m.social.linkedin}"><i class="fab fa-linkedin-in"></i></a>` : ""}
                                ${m.social.twitter ? `<a href="${m.social.twitter}"><i class="fab fa-twitter"></i></a>` : ""}
                                ${m.social.email ? `<a href="${m.social.email}"><i class="fas fa-envelope"></i></a>` : ""}
                            </div>
                        </div>
                    </div>
                `).join("")}
            </div>
        </div>
    `;

    enableManagementLightbox();
}

function enableManagementLightbox() {
    const cards = document.querySelectorAll(".menagers-card");
    const lightbox = document.getElementById("lightbox");

    const lbImg = document.getElementById("lightbox-img");
    const lbName = document.getElementById("lightbox-name");
    const lbRole = document.getElementById("lightbox-role");

    // Bio removed — no lbBio

    cards.forEach(card => {
        card.addEventListener("click", () => {
            lbImg.src = card.dataset.img;
            lbName.textContent = card.dataset.name;
            lbRole.innerHTML = "Role: <span>" + card.dataset.role + "</span>";

            lightbox.style.display = "flex";
        });
    });

    lightbox.addEventListener("click", () => {
        lightbox.style.display = "none";
    });
}

loadManagement();
