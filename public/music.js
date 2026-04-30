const tracks = {
  calm: 'https://assets.mixkit.co/music/preview/mixkit-dreaming-big-31.mp3',
  energetic: 'https://assets.mixkit.co/music/preview/mixkit-hip-hop-02-738.mp3',
  tech: 'https://assets.mixkit.co/music/preview/mixkit-tech-house-vibes-130.mp3'
};

let current = null;

window.musicPlayer = {
  play(type) {
    if (current) { current.pause(); current = null; }
    current = new Audio(tracks[type]);
    current.loop = true;
    current.volume = 0.3;
    current.play();
  },
  stop() {
    if (current) { current.pause(); current = null; }
  }
};
