async function loadData() {
      const res = await fetch("data.json");
        const data = await res.json();

          // Fill header
            document.getElementById("homeName").textContent = data.match.home;
              document.getElementById("awayName").textContent = data.match.away;
                document.getElementById("score").textContent = data.match.score;
                  document.getElementById("matchMeta").textContent =
                      `${data.match.competition} • ${data.match.date}`;
                        document.getElementById("goals").textContent = data.match.goals;
                          document.getElementById("formationLabel").textContent =
                              `${data.match.home} ${data.match.homeFormation} • ${data.match.away} ${data.match.awayFormation}`;
                                document.getElementById("mgrHome").textContent = data.match.managers.home;
                                  document.getElementById("mgrAway").textContent = data.match.managers.away;

                                    // Render players
                                      const pitch = document.getElementById("pitch");
                                        const homeX = 25, awayX = 75; // rough positions
                                          data.starters.home.forEach((p, i) => addPlayer(pitch, p, homeX, (i+1)*8, "home"));
                                            data.starters.away.forEach((p, i) => addPlayer(pitch, p, awayX, (i+1)*8, "away"));

                                              // Render subs
                                                const subsHome = document.getElementById("subsHome");
                                                  const subsAway = document.getElementById("subsAway");
                                                    data.subs.home.forEach(s => addSub(subsHome, s));
                                                      data.subs.away.forEach(s => addSub(subsAway, s));
                                                      }

                                                      function addPlayer(pitch, player, x, y, side) {
                                                        const div = document.createElement("div");
                                                          div.className = `pl ${side}`;
                                                            div.style.left = x + "%";
                                                              div.style.top = y + "%";

                                                                const av = document.createElement("div");
                                                                  av.className = "av";
                                                                    av.textContent = player.name[0];
                                                                      div.appendChild(av);

                                                                        const nm = document.createElement("div");
                                                                          nm.className = "nm";
                                                                            nm.textContent = player.name;
                                                                              div.appendChild(nm);

                                                                                if (player.rating) {
                                                                                    const r = document.createElement("div");
                                                                                        r.className = "rating";
                                                                                            r.textContent = player.rating.toFixed(1);
                                                                                                div.appendChild(r);
                                                                                                  }

                                                                                                    pitch.appendChild(div);
                                                                                                    }

                                                                                                    function addSub(container, sub) {
                                                                                                      const row = document.createElement("div");
                                                                                                        row.className = "sub";
                                                                                                          row.innerHTML = `<span>${sub.name}</span><span>${sub.info}</span>`;
                                                                                                            container.appendChild(row);
                                                                                                            }

                                                                                                            loadData();
}