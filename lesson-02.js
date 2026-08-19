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

//Freeze the UI for 5 seconds when the button is clicked
document.querySelector("#freeze").addEventListener("click", () => {
  const until = Date.now() + 5000;
  while (Date.now() < until) {
    // spin for five seconds
  }
  console.log("done");
});

// Nothing could be selected from the DOM while the UI is frozen.
// The browser could not respond to user input till after 5 seconds.

function prepare(artist) {
  return "Now playing " + format(artist);
}
function format(artist) {
  throw new Error("Intentional Stack Trace Error");
  return artist.name.toUpperCase();
}
console.log(prepare({ name: "Asake" }));

console.log("one");
setTimeout(() => console.log("two"), 0);
console.log("three");

//one, three ,two
/*
"one" runs first because it a synchronous function in the call stack.
"three": runs second after the first synchronous code so that the call stack empties to accept queued tasks.
"two": `setTimeout` runs last because it is a callback function  hence only runs when the call stack is empty.
*/

/*
CALL STACK TRACE DIAGRAM:
   # Push
   main() / Global Execution Context is created.
   console.log(prepare({ name: "Asake" }))
   prepare({ name: "Asake" })
   format({ name: "Asake" })

    # Pop
   format returns "ASAKE"
   prepare returns "Now playing ASAKE"
   console.log finishes printing to console
   main() / Global Context finishes

   Stack trace error:
   When `throw new Error(...)` is executed inside `format()`, the console prints:
     Uncaught Error: Intentional Stack Trace Error
       at format (lesson-02.js:34)
       at prepare (lesson-02.js:30)
       at lesson-02.js:39
   This confirms the stack trace displays innermost.
*/

let count = 10;

const intervalId = setInterval(() => {
  console.log(count);

  if (count === 0) {
    clearInterval(intervalId);
    console.log("Countdown finished. Timer cleared.");
  }

  count--;
}, 1000);

//JavaScript uses a single thread with a continuous Event Loop to delegate asynchronous tasks to background browser APIs,
// executing callbacks from queues only when the main Call Stack is empty.

//statusBox.textContent = "Loading artists...";

setTimeout(() => {
  fetch("artists.json")
    .then((response) => response.json())
    .then((artists) => {
      statusBox.textContent = "";
      renderCards(artists);
    });
}, 2000);
