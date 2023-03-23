/* Get Our Elements */
const player = document.querySelector('.player');
const myDocument = document.documentElement;
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullScreen = player.querySelector('.fullscreen');

/* Build out functions */
function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}
function updateButton() {
    const icon = this.paused ? "►" : "| |";
    toggle.textContent=icon;
    
}

function skip() {
    console.log(this.dataset.skip);
    video.currentTime += parseFloat(this.dataset.skip);
    
}

function haldleRangeUpdate() {
    video[this.name]=[this.value]
    
}
function haldleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;

}
function scrub(e){
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

function full(){
        const method =myDocument.requestFullscreen() ? 'click' : 'exit';
        myDocument[method]();
        

}
function exitfull(){
    document.exitFullscreen();
    console.log(exitfull);
    
}

/* Hook up the event listners */
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', haldleProgress);

toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button=> button.addEventListener('click', skip))
ranges.forEach(range=> range.addEventListener('change', haldleRangeUpdate))
ranges.forEach(range=> range.addEventListener('mousemove', haldleRangeUpdate))

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e)=> mousedown && scrub(e));
progress.addEventListener('mousedown', (e)=> mousedown = true);
progress.addEventListener('mouseup', (e)=> mousedown = false);

fullScreen.addEventListener('click', full)
// fullScreen.addEventListener('exit', exitfull)
// fullScreen.addEventListener('click', full)