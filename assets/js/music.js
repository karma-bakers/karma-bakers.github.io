/**
 * KARMA WALA SWEETS AND BAKERS - AMBIENT BACKGROUND MUSIC CONTROLLER
 * Audio: assets/audio/karma.mp3
 */

const MusicPlayer = {
  audio: null,
  isPlaying: false,
  hasUserInteracted: false,
  targetVolume: 0.35,

  elements: {
    widget: null,
    headerBtn: null,
    statusText: null
  },

  init() {
    this.audio = document.getElementById('bgAudioElement');
    if (!this.audio) {
      this.audio = new Audio('assets/audio/karma.mp3');
      this.audio.id = 'bgAudioElement';
      this.audio.loop = true;
      this.audio.preload = 'auto';
      document.body.appendChild(this.audio);
    }

    this.audio.volume = this.targetVolume;

    this.elements.widget = document.getElementById('bgMusicWidget');
    this.elements.headerBtn = document.getElementById('headerMusicToggle');
    this.elements.statusText = document.getElementById('bgMusicStatusText');

    this.bindEvents();
    this.setupFirstInteractionAutoplay();
  },

  bindEvents() {
    if (this.elements.widget) {
      this.elements.widget.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggle();
      });
    }

    if (this.elements.headerBtn) {
      this.elements.headerBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggle();
      });
    }

    // Audio event listeners
    this.audio.addEventListener('play', () => {
      this.isPlaying = true;
      this.updateUI(true);
    });

    this.audio.addEventListener('pause', () => {
      this.isPlaying = false;
      this.updateUI(false);
    });

    this.audio.addEventListener('ended', () => {
      // Loop backup
      this.audio.currentTime = 0;
      this.audio.play();
    });
  },

  setupFirstInteractionAutoplay() {
    // Check if user previously muted
    const preference = localStorage.getItem('kw_music_enabled');
    if (preference === 'false') {
      this.updateUI(false);
      return;
    }

    const tryAutoplay = () => {
      if (this.hasUserInteracted || this.isPlaying) return;
      this.hasUserInteracted = true;

      // Only autoplay if user hasn't explicitly disabled it
      if (localStorage.getItem('kw_music_enabled') !== 'false') {
        this.play(true);
      }

      // Remove interaction listeners
      ['click', 'touchstart', 'keydown'].forEach(evt => {
        window.removeEventListener(evt, tryAutoplay);
      });
    };

    ['click', 'touchstart', 'keydown'].forEach(evt => {
      window.addEventListener(evt, tryAutoplay, { passive: true, once: true });
    });
  },

  play(withFade = false) {
    if (!this.audio) return;

    if (withFade) {
      this.audio.volume = 0.05;
      const playPromise = this.audio.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          this.fadeVolume(0.05, this.targetVolume, 1200);
          localStorage.setItem('kw_music_enabled', 'true');
        }).catch(err => {
          console.log('Autoplay deferred pending user interaction', err.message);
        });
      }
    } else {
      this.audio.volume = this.targetVolume;
      this.audio.play().then(() => {
        localStorage.setItem('kw_music_enabled', 'true');
      }).catch(err => console.log('Audio playback waiting for gesture', err));
    }
  },

  pause() {
    if (!this.audio) return;
    this.fadeVolume(this.audio.volume, 0, 400, () => {
      this.audio.pause();
      localStorage.setItem('kw_music_enabled', 'false');
    });
  },

  toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play(false);
    }
  },

  fadeVolume(from, to, duration, onComplete) {
    const steps = 15;
    const stepTime = duration / steps;
    const diff = (to - from) / steps;
    let current = from;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current += diff;
      if (step >= steps) {
        this.audio.volume = Math.max(0, Math.min(1, to));
        clearInterval(timer);
        if (onComplete) onComplete();
      } else {
        this.audio.volume = Math.max(0, Math.min(1, current));
      }
    }, stepTime);
  },

  updateUI(playing) {
    if (this.elements.widget) {
      this.elements.widget.classList.toggle('playing', playing);
      if (this.elements.statusText) {
        this.elements.statusText.textContent = playing ? 'Bakery Ambient Music' : 'Play Background Music';
      }
      this.elements.widget.title = playing ? 'Click to Pause Ambient Music' : 'Click to Play Ambient Music';
    }

    if (this.elements.headerBtn) {
      this.elements.headerBtn.classList.toggle('playing', playing);
      this.elements.headerBtn.innerHTML = playing ? '🔊' : '🎵';
      this.elements.headerBtn.title = playing ? 'Pause Background Music' : 'Play Background Music';
    }
  }
};

// Export and auto-boot
if (typeof window !== 'undefined') {
  window.MusicPlayer = MusicPlayer;
}
