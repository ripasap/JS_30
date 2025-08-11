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
const beat = [
    68, 83, 83, 83, // 1
    74, 83, 83, 83, // 2
    68, 83, 83, 83, // 3
    74, 83, 83, 83  // 4
];
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



let index = 0;
const bpm = 77;
const interval = (60 / bpm) * 1000 / 4; // 16th notes

let beatInterval = null;
const noteDuration = interval * 0.9; // 90% of beat length
document.documentElement.style.setProperty('--drumHitDuration', `${noteDuration}ms`);
function startBeat() {
    if (!beatInterval) {
        index = 0;
        beatInterval = setInterval(() => {
            playSoundByKey(beat[index]);
            index = (index + 1) % beat.length;
        }, interval);
    }
}

function stopBeat() {
    clearInterval(beatInterval);
    beatInterval = null;
}
document.getElementById("help-btn").addEventListener("click", function () {
    const popup = document.getElementById("help-popup");
    popup.style.display = popup.style.display === "block" ? "none" : "block";
});
