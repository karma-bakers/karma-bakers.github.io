/**
 * KARMA WALA SWEETS AND BAKERS - AMBIENT BACKGROUND MUSIC CONTROLLER
 * Ensures audio plays automatically when page opens and on any first customer gesture.
 * Audio Source: assets/audio/karma.mp3
 */

const MusicPlayer = {
  audio: null,
  isPlaying: false,
  isUnlocked: false,
  targetVolume: 0.40, // 40% ambient volume

  elements: {
    widget: null,
    headerBtn: null,
    statusText: null,
    banner: null
  },

  init() {
    this.audio = document.getElementById('bgAudioElement');
    if (!this.audio) {
      this.audio = new Audio();
      this.audio.id = 'bgAudioElement';
      this.audio.loop = true;
      this.audio.preload = 'auto';
      this.audio.setAttribute('playsinline', '');
      this.audio.setAttribute('autoplay', '');
      this.audio.src = 'assets/audio/karma.mp3';
      document.body.appendChild(this.audio);
    } else {
      this.audio.setAttribute('playsinline', '');
      this.audio.setAttribute('autoplay', '');
    }

    this.audio.volume = this.targetVolume;

    this.elements.widget = document.getElementById('bgMusicWidget');
    this.elements.headerBtn = document.getElementById('headerMusicToggle');
    this.elements.statusText = document.getElementById('bgMusicStatusText');
    this.elements.banner = document.getElementById('bgMusicPromptBanner');

    this.bindEvents();

    // 1. Attempt immediate autoplay as soon as page opens
    this.attemptImmediateAutoplay();

    // 2. Set up comprehensive gesture unlockers on window, document and body
    this.setupGestureUnlock();
  },

  bindEvents() {
    // Floating Widget click toggle
    if (this.elements.widget) {
      this.elements.widget.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.toggle();
      });
    }

    // Header Button click toggle
    if (this.elements.headerBtn) {
      this.elements.headerBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.toggle();
      });
    }

    // Banner click starts music immediately
    if (this.elements.banner) {
      this.elements.banner.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.play();
        this.hidePromptBanner();
      });
    }

    // Native audio state events
    this.audio.addEventListener('play', () => {
      this.isPlaying = true;
      this.isUnlocked = true;
      this.updateUI(true);
      this.hidePromptBanner();
    });

    this.audio.addEventListener('playing', () => {
      this.isPlaying = true;
      this.isUnlocked = true;
      this.updateUI(true);
      this.hidePromptBanner();
    });

    this.audio.addEventListener('pause', () => {
      this.isPlaying = false;
      this.updateUI(false);
    });

    this.audio.addEventListener('ended', () => {
      this.audio.currentTime = 0;
      this.audio.play().catch(() => {});
    });

    // Fallback if audio error occurs (e.g. resolve absolute path)
    this.audio.addEventListener('error', (e) => {
      console.warn('Audio source reload attempt with absolute origin path', e);
      if (!this.audio.src.includes(window.location.origin)) {
        this.audio.src = window.location.origin + '/assets/audio/karma.mp3';
        this.audio.load();
        this.play();
      }
    });
  },

  /**
   * Attempt immediate playback as soon as the page opens
   */
  attemptImmediateAutoplay() {
    this.audio.volume = this.targetVolume;

    const promise = this.audio.play();
    if (promise !== undefined) {
      promise
        .then(() => {
          console.info('✓ Audio autoplay succeeded immediately on page open.');
          this.isPlaying = true;
          this.isUnlocked = true;
          this.updateUI(true);
          this.hidePromptBanner();
        })
        .catch((err) => {
          console.info('Browser policy deferred unmuted audio until customer interaction:', err.message);
          this.isPlaying = false;
          this.updateUI(false);
          this.showPromptBanner();
        });
    }
  },

  /**
   * Comprehensive unlock listeners on EVERY customer gesture:
   * click, touchstart, touchend, pointerdown, mousedown, scroll, wheel, keydown
   */
  setupGestureUnlock() {
    const gestureEvents = [
      'click',
      'touchstart',
      'touchend',
      'pointerdown',
      'mousedown',
      'scroll',
      'wheel',
      'keydown'
    ];

    const unlockHandler = () => {
      if (this.isPlaying || this.isUnlocked) return;

      this.audio.volume = this.targetVolume;
      const playPromise = this.audio.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.info('✓ Audio unlocked via customer interaction gesture.');
            this.isPlaying = true;
            this.isUnlocked = true;
            this.updateUI(true);
            this.hidePromptBanner();
            cleanup();
          })
          .catch(() => {});
      }
    };

    const cleanup = () => {
      gestureEvents.forEach(evt => {
        window.removeEventListener(evt, unlockHandler, { capture: true });
        document.removeEventListener(evt, unlockHandler, { capture: true });
      });
    };

    gestureEvents.forEach(evt => {
      window.addEventListener(evt, unlockHandler, { capture: true, passive: true, once: false });
      document.addEventListener(evt, unlockHandler, { capture: true, passive: true, once: false });
    });
  },

  play() {
    if (!this.audio) return;
    this.audio.volume = this.targetVolume;
    this.audio.play()
      .then(() => {
        this.isPlaying = true;
        this.isUnlocked = true;
        this.updateUI(true);
        this.hidePromptBanner();
      })
      .catch((err) => console.log('Playback error:', err.message));
  },

  pause() {
    if (!this.audio) return;
    this.audio.pause();
    this.isPlaying = false;
    this.updateUI(false);
  },

  toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  },

  showPromptBanner() {
    if (this.elements.banner && !this.isPlaying) {
      this.elements.banner.classList.add('visible');
    }
  },

  hidePromptBanner() {
    if (this.elements.banner) {
      this.elements.banner.classList.remove('visible');
    }
  },

  updateUI(playing) {
    if (this.elements.widget) {
      this.elements.widget.classList.toggle('playing', playing);
      if (this.elements.statusText) {
        this.elements.statusText.textContent = playing ? 'Ambient Music Playing' : 'Play Background Music';
      }
      this.elements.widget.title = playing ? 'Click to Pause Music' : 'Click to Play Music';
    }

    if (this.elements.headerBtn) {
      this.elements.headerBtn.classList.toggle('playing', playing);
      this.elements.headerBtn.innerHTML = playing ? '🔊' : '🎵';
      this.elements.headerBtn.title = playing ? 'Pause Background Music' : 'Play Background Music';
    }
  }
};

if (typeof window !== 'undefined') {
  window.MusicPlayer = MusicPlayer;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = MusicPlayer;
}
