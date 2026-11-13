/**
 * KARMA WALA SWEETS AND BAKERS - AMBIENT BACKGROUND MUSIC CONTROLLER
 * 
 * Ensures ambient music plays automatically when the website opens,
 * complying with modern browser autoplay policies with zero friction.
 * 
 * Strategy:
 * 1. Attempt unmuted playback immediately when page opens.
 * 2. If browser requires user activation, immediately start stream in muted mode
 *    and seamlessly unmute with full volume on first customer touch / tap / click.
 * 3. Provide floating interactive music controls (widget, header toggle, prompt banner).
 * 
 * Audio Sources:
 * - Primary:  assets/audio/karma.mp3
 * - Fallback: karma.mp3
 */

const MusicPlayer = {
  audio: null,
  isPlaying: false,
  isUnlocked: false,
  targetVolume: 0.40, // 40% ambient bakery volume
  primarySrc: 'assets/audio/karma.mp3',
  fallbackSrc: 'karma.mp3',
  cleanupListeners: null,

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
      document.body.appendChild(this.audio);
    }

    // Ensure audio configuration
    if (!this.audio.src || this.audio.src === '' || this.audio.src === window.location.href) {
      this.audio.src = this.primarySrc;
    }

    this.audio.loop = true;
    this.audio.preload = 'auto';
    this.audio.setAttribute('playsinline', '');
    this.audio.setAttribute('webkit-playsinline', '');
    this.audio.setAttribute('autoplay', '');
    this.audio.volume = this.targetVolume;

    // Cache UI elements
    this.elements.widget = document.getElementById('bgMusicWidget');
    this.elements.headerBtn = document.getElementById('headerMusicToggle');
    this.elements.statusText = document.getElementById('bgMusicStatusText');
    this.elements.banner = document.getElementById('bgMusicPromptBanner');

    this.bindEvents();

    // 1. Attempt immediate playback as soon as the page opens
    this.attemptImmediateAutoplay();

    // 2. Set up universal gesture unlock for touch, click, pointer
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

    // Prompt Banner click to play immediately
    if (this.elements.banner) {
      this.elements.banner.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.forcePlay();
      });
    }

    // Native audio state events
    this.audio.addEventListener('play', () => {
      if (!this.audio.muted) {
        this.isPlaying = true;
        this.isUnlocked = true;
        this.updateUI(true);
        this.hidePromptBanner();
      }
    });

    this.audio.addEventListener('playing', () => {
      if (!this.audio.muted) {
        this.isPlaying = true;
        this.isUnlocked = true;
        this.updateUI(true);
        this.hidePromptBanner();
      }
    });

    this.audio.addEventListener('pause', () => {
      if (!this.audio.muted) {
        this.isPlaying = false;
        this.updateUI(false);
      }
    });

    this.audio.addEventListener('ended', () => {
      this.audio.currentTime = 0;
      this.audio.play().catch(() => {});
    });

    // Fallback if primary source network fails
    let fallbackTried = false;
    this.audio.addEventListener('error', () => {
      if (!fallbackTried) {
        fallbackTried = true;
        console.warn('Primary audio failed, switching to root fallback:', this.fallbackSrc);
        this.audio.src = this.fallbackSrc;
        this.audio.load();
        this.attemptImmediateAutoplay();
      }
    });
  },

  /**
   * Attempt immediate playback when the page opens
   */
  attemptImmediateAutoplay() {
    this.audio.muted = false;
    this.audio.volume = this.targetVolume;

    const promise = this.audio.play();
    if (promise !== undefined) {
      promise
        .then(() => {
          // Autoplay unmuted succeeded!
          console.info('✓ Bakery music started unmuted automatically on page open');
          this.isPlaying = true;
          this.isUnlocked = true;
          this.updateUI(true);
          this.hidePromptBanner();
        })
        .catch((err) => {
          console.info('Browser autoplay policy deferred unmuted sound:', err.message);
          // Start playing MUTED so audio preloads and buffer is ready
          this.audio.muted = true;
          this.audio.play()
            .then(() => {
              console.info('✓ Audio streaming in background; ready to unmute on first gesture');
            })
            .catch(() => {});

          this.isPlaying = false;
          this.updateUI(false);
          this.showPromptBanner();
        });
    }
  },

  /**
   * Unmutes and plays music on the VERY FIRST customer touch / click anywhere on the page
   */
  setupGestureUnlock() {
    const activationEvents = ['pointerdown', 'touchstart', 'click', 'keydown'];

    const unlockHandler = () => {
      if (this.isUnlocked && this.isPlaying && !this.audio.muted) return;
      this.forcePlay();
      if (this.cleanupListeners) this.cleanupListeners();
    };

    this.cleanupListeners = () => {
      activationEvents.forEach((evt) => {
        window.removeEventListener(evt, unlockHandler, { capture: true });
        document.removeEventListener(evt, unlockHandler, { capture: true });
        if (document.body) {
          document.body.removeEventListener(evt, unlockHandler, { capture: true });
        }
      });
    };

    activationEvents.forEach((evt) => {
      window.addEventListener(evt, unlockHandler, { capture: true, passive: true });
      document.addEventListener(evt, unlockHandler, { capture: true, passive: true });
      if (document.body) {
        document.body.addEventListener(evt, unlockHandler, { capture: true, passive: true });
      }
    });
  },

  /**
   * Force unmuted playback
   */
  forcePlay() {
    if (!this.audio) return;
    this.audio.muted = false;
    this.audio.volume = this.targetVolume;

    const promise = this.audio.play();
    if (promise !== undefined) {
      promise
        .then(() => {
          this.isPlaying = true;
          this.isUnlocked = true;
          this.updateUI(true);
          this.hidePromptBanner();
        })
        .catch((err) => {
          console.warn('Playback gesture retry needed:', err.message);
        });
    }
  },

  play() {
    this.forcePlay();
  },

  pause() {
    if (!this.audio) return;
    this.audio.pause();
    this.isPlaying = false;
    this.updateUI(false);
  },

  toggle() {
    if (this.isPlaying && !this.audio.muted) {
      this.pause();
    } else {
      this.forcePlay();
    }
  },

  showPromptBanner() {
    if (this.elements.banner && (!this.isPlaying || this.audio.muted)) {
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

// Global export for inline and module scripts
if (typeof window !== 'undefined') {
  window.MusicPlayer = MusicPlayer;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = MusicPlayer;
}
