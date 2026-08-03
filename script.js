function renderCards(artists) {
  const cardArea = document.querySelector(".cards");

  for (const artist of artists) {
    const card = document.createElement("article");
    const title = document.createElement("h3");
    title.textContent = artist.name;
    const line = document.createElement("p");
    line.textContent = `${artist.genre}, ${artist.total} of music`;
    card.append(title, line);
    cardArea.append(card);
  }
}

fetch("artists.json")
  .then((response) => response.json())
  .then((artists) => renderCards(artists));

fetch("artists.json")
  .then((response) => response.json())
  .then((artists) => renderCards(artists));
