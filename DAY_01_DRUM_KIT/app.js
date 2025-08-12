// audio.forEach(console.log());
const button = document.querySelectorAll('button');
// button.addEventListener('click', active);
// function active(b){
//     let code = b.data-key;
//     const audio = document.querySelector(`audio[data-key = "${code}"]`);
//     audio.currentTime = 0;
//     audio.play();
//     b.classList.add("key-active");
//     setTimeout(() => key.classList.remove("key-active"), 150);
// }

document.querySelectorAll(".button").forEach(btn => {
    btn.addEventListener("click", () => {
        btn.blur(); // removes focus so key press animations still work
        let code = btn.dataset.key;
        console.log(code);
        const audio = document.querySelector(`audio[data-key = "${code}"]`);
        audio.currentTime = 0;
        audio.play();
        const key = document.querySelector(`button[data-key="${code}"]`);
        key.classList.remove("key-active");
        void key.offsetWidth;
        key.classList.add("key-active");
        setTimeout(() => key.classList.remove("key-active"), 150);
    });
});
// const bton = document.querySelectorAll('button');
let spaceClick = false;
function detect(e) {
    let code = e.keyCode;
    if (code === 32) {
        spaceClick = !spaceClick;
        if (!spaceClick) {
            stopBeat();
        } else {
            startBeat();
        }
    }
    const audio = document.querySelector(`audio[data-key = "${code}"]`);
    const key = document.querySelector(`button[data-key="${code}"]`);
    if (!audio) return;
    audio.currentTime = 0;
    audio.play();
    key.classList.remove("key-active");
    void key.offsetWidth;
    key.classList.add("key-active");
    setTimeout(() => key.classList.remove("key-active"), 150);
}

window.addEventListener('keydown', detect);

function playSoundByKey(keyCode) {
    const audio = document.querySelector(`audio[data-key="${keyCode}"]`);
    const key = document.querySelector(`button[data-key="${keyCode}"]`);
    if (audio) {
        audio.currentTime = 0;
        audio.play();
        key.classList.remove("key-active");
        void key.offsetWidth;
        key.classList.add("key-active");
        setTimeout(() => key.classList.remove("key-active"), 150);
    }
}
const beat = [
  [83, 68], // Step 1: Kick + Hat
  [],     // Step 2: Hat
  [83], // Step 3: Snare + Hat
  [],     // Step 4: Hat
  [83, 74],     // Step 5: Hat
  [],     // Step 6: Hat
  [83], // Step 7: Kick + Hat
  [],       // Step 8: Rest
  [83, 68], // Step 1: Kick + Hat
  [],     // Step 2: Hat
  [83], // Step 3: Snare + Hat
  [],     // Step 4: Hat
  [83, 74],     // Step 5: Hat
  [],     // Step 6: Hat
  [83], // Step 7: Kick + Hat
  []    // Step 8: Rest
];

// BPM & timing
const bpm = 90; // change if needed
const interval = (60 / bpm) * 1000 / 4; // 16th notes

let index = 0;
let beatInterval = null;

// --- New play function that supports arrays ---
function playStep(step) {
  const keys = Array.isArray(step) ? step : [step];
  keys.forEach(code => {
    const audio = document.querySelector(`audio[data-key="${code}"]`);
    const key = document.querySelector(`button[data-key="${code}"]`);
    if (!audio) return;
    audio.currentTime = 0;
    audio.play();
    if (key) {
      key.classList.remove("key-active");
      void key.offsetWidth;
      key.classList.add("key-active");
      setTimeout(() => key.classList.remove("key-active"), 150);
    }
  });
}

// --- Button clicks ---
document.querySelectorAll(".button").forEach(btn => {
  btn.addEventListener("click", () => {
    btn.blur();
    const code = parseInt(btn.dataset.key, 10);
    playStep(code);
  });
});

// --- Spacebar start/stop ---
// let spaceClick = false;
function detect(e) {
  let code = e.keyCode;
  if (code === 32) {
    e.preventDefault();
    spaceClick = !spaceClick;
    if (spaceClick) {
      startBeat();
    } else {
      stopBeat();
    }
    return;
  }
  playStep(code);
}
window.addEventListener('keydown', detect);

// --- Beat control ---
function startBeat() {
  if (!beatInterval) {
    index = 0;
    beatInterval = setInterval(() => {
      playStep(beat[index]);
      index = (index + 1) % beat.length;
    }, interval);
  }
}

function stopBeat() {
  clearInterval(beatInterval);
  beatInterval = null;
}

// --- Help popup ---
document.getElementById("help-btn").addEventListener("click", function () {
  const popup = document.getElementById("help-popup");
  popup.style.display = popup.style.display === "block" ? "none" : "block";
});