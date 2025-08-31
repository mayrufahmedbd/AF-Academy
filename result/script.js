async function loadData() {
  const res = await fetch('data.json');
  const data = await res.json();

  // Match Info
  document.getElementById('match-info').innerHTML = `
                <h2>${data.match.home} vs ${data.match.away}</h2>
                    <p>Score: ${data.match.score}</p>
                      `;

  // Lineups
  document.getElementById('lineups').innerHTML = `
                              <h3>Lineups</h3>
                                  <p><b>${data.match.home}</b>: ${data.lineups.home.join(", ")}</p>
                                      <p><b>${data.match.away}</b>: ${data.lineups.away.join(", ")}</p>
                                        `;

  // Timeline
  let timelineHtml = "<h3>Match Timeline</h3><ul>";
  data.timeline.forEach(ev => {
    timelineHtml += `<li>${ev.minute} - ${ev.event}</li>`;
  });
  timelineHtml += "</ul>";
  document.getElementById('timeline').innerHTML = timelineHtml;
}

loadData();
