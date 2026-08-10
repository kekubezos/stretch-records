// Step 2: json-server observations
// GET http://localhost:3000/artists
//   status: 200
//   content-type: application/json; charset=utf-8
// GET http://localhost:3000/artistss  (wrong path)
//   status: 404
//   content-type: application/json; charset=utf-8

async function loadArtists() {
  const response = await fetch("http://localhost:3000/artists");

  if (!response.ok) {
    throw new Error("Request failed with status" + response.status);
  }
  return response.json();
}

loadArtists().then((artists) => console.log(artists));

// Step 3: Response object observations
// ok: true
// status: 200
// Access-Control-Allow-Origin: *

// Step 4: proving fetch doesn't reject on HTTP errors
fetch("http://localhost:3000/wrongpath").then((res) => {
  console.log("Promise fulfilled anyway:", res.status, res.ok);
  // fulfilled: true, status: 404, ok: false
  // fetch() only rejects on network failure, not on HTTP error status —
  // that's why the ok check + explicit throw below is required.
});

async function renderArtists() {
  const loadingElement = document.querySelector("#loading");
  const errorElement = document.querySelector("#error");
  const listElement = document.querySelector("#artist-list");

  loadingElement.hidden = false;
  errorElement.hidden = true;

  try {
    const artists = await loadArtists();
    listElement.innerHTML = artists.map(buildArtistCard).join("");
  } catch (err) {
    errorElement.textContent = "Couldn't load artists: " + err.message;
    errorElement.hidden = false;
  } finally {
    loadingElement.hidden = true;
  }
}

renderArtists();

const totalInput = document.querySelector('input[name="total"]');

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const newArtist = {
    name: nameInput.value,
    genre: genreInput.value,
    total: totalInput.value,
  };

  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newArtist),
  };

  const response = await fetch("http://localhost:3000/artists", options);
  console.log(response.status); // confirm 201
  form.reset();
  renderArtists();
});

// Step 6: POST confirmation
// console.log(response.status) -> 201
// Refreshed page: new artist present in list
// Opened second tab, refreshed: new artist present there too (json-server persists to artists.json on disk)

async function loadArtistsAndLabel() {
  const [artistsRes, labelRes] = await Promise.all([
    fetch("http://localhost:3000/artists"),
    fetch("http://localhost:3001/label"),
  ]);

  if (!artistsRes.ok)
    throw new Error("Artists request failed: " + artistsRes.status);
  if (!labelRes.ok) throw new Error("Label request failed: " + labelRes.status);

  const [artists, label] = await Promise.all([
    artistsRes.json(),
    labelRes.json(),
  ]);
  return { artists, label };
}

loadArtistsAndLabel().then(({ artists, label }) => {
  // render only once both have arrived
  document.querySelector("#label-name").textContent = label.name;
  document.querySelector("#artist-list").innerHTML = artists
    .map(buildArtistCard)
    .join("");
});

// Step 8: [API name] documentation notes
// Endpoint: [full URL]
// Method: GET
// One parameter: [param name] - [what it does]
// Response shape: { ... } // sketch the JSON keys you'd code against
// Stated limit: [rate limit / auth requirement / etc., as documented]

/*
const form = document.querySelector("form");
const nameInput = document.querySelector('input[name="name"]');
const genreInput = document.querySelector('input[name="genre"]');

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const newArtist = {
    name: nameInput.value,
    genre: genreInput.value,
    total: totalInput,
  };

  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newArtist),
  };
  console.log(options);

  const response = await fetch("http://localhost:3000/artists", options);
  console.log(response.status);
});
*/
