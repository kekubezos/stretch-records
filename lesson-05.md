# Auditing my own system

## 2. Single point of failure- Stopping the json server.

- Steps: stopped json-server, page was open, reloaded.
- What the visitor saw: lesson-04.js:10 GET http://localhost:3000/artists net::ERR_CONNECTION_REFUSED loadArtists@lesson-04.js:10 (anonymous)@lesson-04.js:18
- Single point of failure: The json-server was not running on port 3000
- Redundancy would mean: A second json server running on a different port the website should access when the first is not responding

## 3. Latency

- Throttle preset used: [e.g. "Slow 3G" — check Network tab > throttling dropdown]
- Load time observed: 8000ms or 8.29s
- What held the screen while waiting: "Loading"
- Named: this delay is latency — time between request and response.

## 4. Caching

- Reload 1 cache disabled — 35000ms or 34.26s
- Reload 2 (cache enabled): 83000ms 8.27s[size/time transferred — look for "(disk cache)" or "(memory cache)" in the Size column]
- Difference measured: 26s 5.6KB to 1.5MB
- Named: this is caching.

## 5. System layers

- Presentation: the cards, the form, the loading messages
- Application: loadArtists(),renderArtists(), loadArtistsandLabel()
- Data: artists.json and label.json served by json-server
- Honest middle-layer note: no validation beyond HTML especially with the forms — since json-server has no server-side logic

## 6. One request's journey

- Trace one GET (e.g. loading artists) end to end using only what you observed:
  1. Address bar / fetch URL: http://localhost:3000/artists
  2. Network tab: 200 OK
     access-control-allow-headers:content-type
     access-control-allow-methods:GET, HEAD, PUT, PATCH, POST, DELETE
     access-control-allow-origin:\*
     connection:keep-alive
     content-length:1047
     content-type:application/json
  3. Server terminal output: Static files:
     Serving ./public directory if it exists

  Endpoints: http://localhost:3000/artists 5. Rendered result: [
  {
  "name": "Pinkfong",
  "genre": "Children's music",
  "total": "11:31",
  "id": "wFQ8ynhnFsY"
  },
  {
  "name": "Adriano Celentano",
  "genre": "Italian pop",
  "total": "20:52",
  "id": "qc9OY4UZN-4"
  },
  {
  "name": "Asake",
  "genre": "Afrobeats",
  "total": "14:08",
  "id": "Ojw25y1bny0"
  },
  {
  "name": "Miyagi and Andy Panda",
  "genre": "Hip-hop",
  "total": "16:21",
  "id": "ab4ddFv1F2c"
  },
  {
  "name": "Johnny Cash",
  "genre": "Country",
  "total": "15:40",
  "id": "DdvoHinxUeM"
  },
  {
  "name": "Sarkodie",
  "genre": "Rap",
  "total": "5:03",
  "id": "hJAAs_BlqQo"
  },
  {
  "name": "Kwesi Arthur",
  "genre": "Cools",
  "total": "6:33",
  "id": "iS-xA-bDT4g"
  },
  {
  "name": "KEKELI NORGBEY",
  "genre": "Pop",
  "id": "elAA1RETqO0"
  },
  {
  "name": "Nadia Sarpong",
  "genre": "Skelewu",
  "total": {

      },
      "id": "LiQTRv9pO0M"

  },
  {
  "name": "Chef Manefski",
  "genre": "Dancehall",
  "total": {

      },
      "id": "LBZ-2_G3EgI"

  }
  ]
