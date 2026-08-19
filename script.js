function renderCards(artists) {
  const container = document.querySelector(".artists");
  container.innerHTML = ""; // clear out the hardcoded roster before rendering

  artists.forEach((artist) => {
    const card = document.createElement("div");

    const name = document.createElement("h2");
    name.textContent = artist.name;
    card.appendChild(name);

    const details = document.createElement("h2");
    details.className = "song-runtime";
    details.textContent = `${artist.genre.toUpperCase()} — ${artist.total} TOTAL RUNTIME`;
    card.appendChild(details);

    container.appendChild(card);
  });
}

fetch("artists.json")
  .then((response) => response.json())
  .then((artists) => renderCards(artists));

fetch("artists.json")
  .then((response) => response.json())
  .then((artists) => renderCards(artists));
