class MusicPlayer {
  constructor() {
    this.ctx = null;
    this.nodes = [];
    this.playing = false;
  }

  init() {
    this.ctx = new (window.AudioContext || window.webkitAudioContext)();
  }

  playCalm() {
    this.stop();
    this.init();
    const notes = [261, 294, 329, 349, 392];
    notes.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.frequency.value = freq;
      osc.type = 'sine';
      gain.gain.value = 0.05;
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(this.ctx.currentTime + i * 0.5);
      this.nodes.push(osc);
    });
    this.playing = true;
  }

  playEnergetic() {
    this.stop();
    this.init();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.frequency.value = 140;
    osc.type = 'square';
    gain.gain.value = 0.03;
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    this.nodes.push(osc);
    this.playing = true;
  }

  playTech() {
    this.stop();
    this.init();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.frequency.value = 220;
    osc.type = 'sawtooth';
    gain.gain.value = 0.02;
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    this.nodes.push(osc);
    this.playing = true;
  }

  stop() {
    this.nodes.forEach(n => { try { n.stop(); } catch(e) {} });
    this.nodes = [];
    this.playing = false;
  }
}

window.musicPlayer = new MusicPlayer();
