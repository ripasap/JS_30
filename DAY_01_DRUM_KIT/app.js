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
function detect(e){
    let code = e.keyCode;

    const audio = document.querySelector(`audio[data-key = "${code}"]`);
    const key = document.querySelector(`button[data-key="${code}"]`);
    if(!audio)return;
    audio.currentTime = 0;
    audio.play();
    key.classList.add("key-active");
    setTimeout(() => key.classList.remove("key-active"), 150);
}

window.addEventListener('keydown', detect);
