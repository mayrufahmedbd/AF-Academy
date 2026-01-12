async function loadData() {
    try {
        const response = await fetch("data.json");
        const data = await response.json();

        let htmlContent = "";

        // --- SECTION 1: CURRENT PLAYERS ---
        // Shows Number and Position
        htmlContent += `
            <div class="container">
                <h2 class="section-title">Our Players</h2>
                <div class="players-grid">
                    ${data.players.map(p => createCurrentPlayerCard(p)).join("")}
                </div>
            </div>
        `;

        // --- SECTION 2: OLD PLAYERS ---
        // Shows Country only
        if (data.oldPlayers) {
            htmlContent += `
                <div class="container" style="margin-top: 50px;">
                    <h2 class="section-title">Former Legends</h2>
                    <div class="players-grid">
                        ${data.oldPlayers.map(p => createOldPlayerCard(p)).join("")}
                    </div>
                </div>
            `;
        }

        // Inject into HTML
        document.getElementById("players").innerHTML = htmlContent;

        // Enable Lightbox
        enableLightbox();

    } catch (error) {
        console.error("Error loading data:", error);
    }
}

// Template for CURRENT Players
function createCurrentPlayerCard(p) {
    return `
        <div class="players-card" 
                data-type="current"
                data-name="${p.name}" 
                data-img="${p.image}"
                data-number="${p.number}"
                data-position="${p.position}">
            <div class="players-image">
                <img src="${p.image}" onerror="this.src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'" alt="${p.name}">
            </div>
            <div class="players-info">
                <h3>${p.name}</h3>
                <p class="player-number">Number: ${p.number}</p>
                <p>Position: ${p.position}</p>
                ${generateSocials(p.social)}
            </div>
        </div>
    `;
}

// Template for OLD Players
function createOldPlayerCard(p) {
    return `
        <div class="players-card" 
                data-type="old"
                data-name="${p.name}" 
                data-img="${p.image}"
                data-country="${p.country}">
            <div class="players-image">
                <img src="${p.image}" onerror="this.src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'" alt="${p.name}">
            </div>
            <div class="players-info">
                <h3>${p.name}</h3>
                <p style="font-weight: bold; margin-top: 5px;">Country: ${p.country}</p>
                ${generateSocials(p.social)}
            </div>
        </div>
    `;
}

// Helper for Social Icons
function generateSocials(social) {
    if (!social) return "";
    return `
        <div class="social-links">
            ${social.facebook ? `<a href="${social.facebook}" target="_blank"><i class="fa-brands fa-square-facebook"></i></a>` : ""}
            ${social.instagram ? `<a href="${social.instagram}" target="_blank"><i class="fa-brands fa-instagram"></i></a>` : ""}
            ${social.whatsapp ? `<a href="${social.whatsapp}" target="_blank"><i class="fa-brands fa-whatsapp"></i></a>` : ""}
        </div>
    `;
}

function enableLightbox() {
    const cards = document.querySelectorAll(".players-card");
    const lightbox = document.getElementById("lightbox");
    
    // Lightbox elements
    const lbImg = document.getElementById("lightbox-img");
    const lbName = document.getElementById("lightbox-name");
    const lbLine1 = document.getElementById("lightbox-number");   // We reuse this ID
    const lbLine2 = document.getElementById("lightbox-position"); // We reuse this ID

    cards.forEach(card => {
        card.addEventListener("click", () => {
            const type = card.dataset.type;

            // Set Image and Name (Same for both)
            lbImg.src = card.dataset.img;
            lbName.textContent = card.dataset.name;

            if (type === "current") {
                // If Current Player: Show Number and Position
                lbLine1.textContent = "Number: " + card.dataset.number;
                lbLine2.style.display = "block"; // Make sure it's visible
                lbLine2.textContent = "Position: " + card.dataset.position;
            } else {
                // If Old Player: Show Country and HIDE the second line
                lbLine1.textContent = "Country: " + card.dataset.country;
                lbLine2.style.display = "none"; // Hide the position line
            }

            lightbox.style.display = "flex";
        });
    });

    lightbox.addEventListener("click", (e) => {
        if (e.target !== lbImg) {
            lightbox.style.display = "none";
        }
    });
}

// Run the function
loadData();