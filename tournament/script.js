// Toggle sidebar
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  const btn = document.querySelector(".toggle-btn");
  sidebar.classList.toggle("hidden");
  btn.textContent = sidebar.classList.contains("hidden") ? "Show Subs" : "Hide Subs";
}

// Load players and substitutes dynamically from data.json
async function loadData() {
  const response = await fetch('data.json');
  const data = await response.json();

  const pitch = document.querySelector('.pitch');
  const sidebar = document.getElementById('sidebar');

  // Clear existing players/subs
  pitch.querySelectorAll('.player').forEach(el => el.remove());
  sidebar.innerHTML = '<h2>Substitutes</h2>';

  // Load players
  data.players.forEach(player => {
    const div = document.createElement('div');
    div.className = 'player';
    div.id = player.id;
    div.innerHTML = `
      <img src="${player.img}" alt="${player.name}">
      <div class="player-name">${player.name}</div>
      <div class="player-position">${player.position}</div>
    `;
    pitch.appendChild(div);
  });

  // Load substitutes
  data.substitutes.forEach(sub => {
    const div = document.createElement('div');
    div.className = 'substitute';
    div.innerHTML = `
      <img src="${sub.img}" alt="${sub.name}">
      <div><span class="substitute-name">${sub.name}</span><br><span class="substitute-position">${sub.position}</span></div>
    `;
    sidebar.appendChild(div);
  });
}

// Hide sidebar by default on mobile
if (window.innerWidth <= 768) {
  document.getElementById("sidebar").classList.add("hidden");
}

// Load data on page load
document.addEventListener('DOMContentLoaded', loadData);
