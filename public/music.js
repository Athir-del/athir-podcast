const tracks = {
  calm: [
    'https://assets.mixkit.co/music/preview/mixkit-dreaming-big-31.mp3',
    'https://assets.mixkit.co/music/preview/mixkit-a-very-happy-christmas-897.mp3',
    'https://assets.mixkit.co/music/preview/mixkit-serene-view-443.mp3'
  ],
  energetic: [
    'https://assets.mixkit.co/music/preview/mixkit-hip-hop-02-738.mp3',
    'https://assets.mixkit.co/music/preview/mixkit-driving-ambition-32.mp3'
  ],
  tech: [
    'https://assets.mixkit.co/music/preview/mixkit-tech-house-vibes-130.mp3',
    'https://assets.mixkit.co/music/preview/mixkit-hazy-after-hours-132.mp3'
  ]
};

let currentAudio = null;
let currentTrackIndex = 0;
let currentType = null;

function playMusic(type) {
  if (currentAudio) { currentAudio.pause(); currentAudio = null; }
  currentType = type;
  currentTrackIndex = 0;
  playTrack();
}

function playTrack() {
  const list = tracks[currentType];
  currentAudio = new Audio(list[currentTrackIndex]);
  currentAudio.volume = 0.2;
  currentAudio.play().then(() => {
    const s = document.getElementById('musicStatus');
    if (s) { s.style.display = 'block'; s.textContent = '🎵 الموسيقى تعزف... ▶️'; }
  }).catch(() => {});
  currentAudio.onended = () => {
    currentTrackIndex = (currentTrackIndex + 1) % list.length;
    playTrack();
  };
}

function stopMusic() {
  if (currentAudio) { currentAudio.pause(); currentAudio = null; }
  const s = document.getElementById('musicStatus');
  if (s) s.style.display = 'none';
}

window.playMusic = playMusic;
window.stopMusic = stopMusic;
