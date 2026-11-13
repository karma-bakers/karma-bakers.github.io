/**
 * KARMA WALA SWEETS AND BAKERS - LIVE VISITOR STATISTICS SYSTEM
 * 
 * Tracks 4 metrics:
 * 1. Total Visitors (All-time unique browsers)
 * 2. Today's Visitors (Unique browsers today, resets 00:00 PKT)
 * 3. Online Visitors (Active in last 5 minutes)
 * 4. Total Page Views (Total catalog page views)
 * 
 * Supports Mode A (CountAPI with honest deduplication)
 * and Mode B (Optional Firebase Realtime Database).
 */

const VisitorCounter = {
  config: null,
  uuid: null,
  pktDate: null,
  currentSlot: null,
  heartbeatTimer: null,
  broadcastChannel: null,
  activeSessions: new Map(),

  elements: {
    totalVisitors: null,
    todayVisitors: null,
    onlineVisitors: null,
    pageViews: null,
    statusNotice: null,
    pktTimeDisplay: null
  },

  init() {
    this.config = window.VISITOR_COUNTER_CONFIG || {
      activeMode: 'default',
      timezone: { iana: 'Asia/Karachi', resetHour: 0 },
      onlinePresenceThresholdMs: 300000,
      heartbeatIntervalMs: 60000,
      countApi: {
        apiBase: 'https://countapi.mileshilliard.com/api/v1',
        keys: {
          totalVisitors: 'kw_sweets_total_visitors_v2',
          todayVisitorsPrefix: 'kw_sweets_today_',
          onlineSlotPrefix: 'kw_sweets_online_slot_',
          pageViews: 'kw_sweets_page_views_v2'
        },
        timeoutMs: 6000
      },
      firebase: { enabled: false }
    };

    this.uuid = this.getOrCreateUUID();
    this.pktDate = this.getPKTDateString();
    this.currentSlot = this.get5MinSlot();
    this.bindDomElements();
    this.startPKTClock();

    if (this.config.firebase && this.config.firebase.enabled && window.firebase) {
      this.initFirebaseMode();
    } else {
      this.initDefaultMode();
    }

    this.initPresenceTracking();
  },

  bindDomElements() {
    this.elements.totalVisitors = document.getElementById('statTotalVisitors');
    this.elements.todayVisitors = document.getElementById('statTodayVisitors');
    this.elements.onlineVisitors = document.getElementById('statOnlineVisitors');
    this.elements.pageViews = document.getElementById('statPageViews');
    this.elements.statusNotice = document.getElementById('statStatusNotice');
    this.elements.pktTimeDisplay = document.getElementById('statPktTime');
  },

  getOrCreateUUID() {
    const key = 'kw_visitor_uuid_v3';
    let id = localStorage.getItem(key);
    if (!id) {
      if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        id = crypto.randomUUID();
      } else {
        id = 'kw-' + Date.now() + '-' + Math.random().toString(36).substring(2, 10);
      }
      try {
        localStorage.setItem(key, id);
      } catch (e) {}
    }
    return id;
  },

  getPKTDateString() {
    try {
      const formatter = new Intl.DateTimeFormat('en-CA', {
        timeZone: 'Asia/Karachi',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });
      return formatter.format(new Date());
    } catch (e) {
      const now = new Date();
      const pkt = new Date(now.getTime() + (5 * 60 + now.getTimezoneOffset()) * 60000);
      return pkt.toISOString().split('T')[0];
    }
  },

  getPKTTimeString() {
    try {
      return new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Karachi',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      }).format(new Date());
    } catch (e) {
      return new Date().toLocaleTimeString();
    }
  },

  get5MinSlot() {
    return Math.floor(Date.now() / 300000);
  },

  startPKTClock() {
    const updateTime = () => {
      const timeStr = this.getPKTTimeString();
      const dateStr = this.getPKTDateString();
      if (this.elements.pktTimeDisplay) {
        this.elements.pktTimeDisplay.textContent = `${timeStr} PKT (${dateStr})`;
      }

      // Check if day changed in PKT
      if (dateStr !== this.pktDate) {
        this.pktDate = dateStr;
        this.handlePKTDayRollover();
      }
    };
    updateTime();
    setInterval(updateTime, 1000);
  },

  handlePKTDayRollover() {
    console.info('PKT midnight reached. Rolling over daily visitor counter.');
    localStorage.removeItem('kw_counted_today_date');
    if (this.elements.todayVisitors) {
      this.elements.todayVisitors.textContent = '1';
    }
  },

  /**
   * Helper to fetch from Miles Hilliard CountAPI with timeout & 404 auto-handling
   */
  async fetchCountApi(endpoint, timeoutMs = 6000) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const res = await fetch(endpoint, {
        signal: controller.signal,
        headers: { 'Accept': 'application/json' }
      });
      clearTimeout(timer);

      if (res.status === 404) {
        return { value: 0 };
      }
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      const data = await res.json();
      return typeof data.value === 'number' ? data : { value: 1 };
    } catch (err) {
      clearTimeout(timer);
      throw err;
    }
  },

  /**
   * MODE A: ZERO-SETUP DEFAULT MODE (CountAPI with honest deduplication)
   * Freshly reset to start from zero
   */
  async initDefaultMode() {
    const isNewVisitor = !localStorage.getItem('kw_counted_alltime_v3');
    const lastVisitedDate = localStorage.getItem('kw_counted_today_date_v3');
    const isNewToday = lastVisitedDate !== this.pktDate;
    const base = this.config.trafficBaseline || { totalVisitors: 0, todayVisitors: 0, pageViews: 0 };

    // Track local session metrics as honest fallback
    let localPageViews = Number(localStorage.getItem('kw_local_pageviews_v3') || '0') + 1;
    localStorage.setItem('kw_local_pageviews_v3', String(localPageViews));

    let fallbackTotal = Number(localStorage.getItem('kw_local_total_visitors_v3') || '0');
    if (isNewVisitor) {
      fallbackTotal += 1;
      localStorage.setItem('kw_local_total_visitors_v3', String(fallbackTotal));
    }

    let fallbackToday = Number(localStorage.getItem('kw_local_today_visitors_v3') || '0');
    if (isNewToday) {
      fallbackToday = 1;
      localStorage.setItem('kw_local_today_visitors_v3', String(fallbackToday));
    }

    // Immediately display initial numbers starting from fresh counts
    this.displayStats({
      total: (base.totalVisitors || 0) + fallbackTotal,
      today: (base.todayVisitors || 0) + fallbackToday,
      online: this.getLocalOnlineCount(),
      views: (base.pageViews || 0) + localPageViews
    });

    try {
      const { apiBase, keys, timeoutMs } = this.config.countApi;
      const todayKey = `${keys.todayVisitorsPrefix}${this.pktDate}`;
      const onlineKey = `${keys.onlineSlotPrefix}${this.currentSlot}`;

      // 1. Page views: Always hit
      const viewPromise = this.fetchCountApi(`${apiBase}/hit/${keys.pageViews}`, timeoutMs)
        .catch(() => ({ value: 1 }));

      // 2. Total Visitors: Hit if new, otherwise get
      let totalPromise;
      if (isNewVisitor) {
        totalPromise = this.fetchCountApi(`${apiBase}/hit/${keys.totalVisitors}`, timeoutMs)
          .then(res => {
            localStorage.setItem('kw_counted_alltime_v3', 'true');
            return res;
          })
          .catch(() => ({ value: 1 }));
      } else {
        totalPromise = this.fetchCountApi(`${apiBase}/get/${keys.totalVisitors}`, timeoutMs)
          .then(res => (res.value === 0 ? this.fetchCountApi(`${apiBase}/hit/${keys.totalVisitors}`, timeoutMs) : res))
          .catch(() => ({ value: 1 }));
      }

      // 3. Today's Visitors: Hit if new today in PKT, otherwise get
      let todayPromise;
      if (isNewToday) {
        todayPromise = this.fetchCountApi(`${apiBase}/hit/${todayKey}`, timeoutMs)
          .then(res => {
            localStorage.setItem('kw_counted_today_date_v3', this.pktDate);
            return res;
          })
          .catch(() => ({ value: 1 }));
      } else {
        todayPromise = this.fetchCountApi(`${apiBase}/get/${todayKey}`, timeoutMs)
          .then(res => (res.value === 0 ? this.fetchCountApi(`${apiBase}/hit/${todayKey}`, timeoutMs) : res))
          .catch(() => ({ value: 1 }));
      }

      // 4. Online Visitors (5-minute rolling window)
      const lastRecordedSlot = sessionStorage.getItem('kw_checked_online_slot_v3');
      let onlinePromise;
      if (lastRecordedSlot !== String(this.currentSlot)) {
        onlinePromise = this.fetchCountApi(`${apiBase}/hit/${onlineKey}`, timeoutMs)
          .then(res => {
            sessionStorage.setItem('kw_checked_online_slot_v3', String(this.currentSlot));
            return res;
          })
          .catch(() => ({ value: this.getLocalOnlineCount() }));
      } else {
        onlinePromise = this.fetchCountApi(`${apiBase}/get/${onlineKey}`, timeoutMs)
          .catch(() => ({ value: this.getLocalOnlineCount() }));
      }

      const [viewRes, totalRes, todayRes, onlineRes] = await Promise.all([
        viewPromise,
        totalPromise,
        todayPromise,
        onlinePromise
      ]);

      const onlineCount = Math.max(1, (onlineRes && onlineRes.value) ? onlineRes.value : this.getLocalOnlineCount());
      const syncedTotal = (base.totalVisitors || 0) + ((totalRes && totalRes.value) ? totalRes.value : 1);
      const syncedToday = (base.todayVisitors || 0) + ((todayRes && todayRes.value) ? todayRes.value : 1);
      const syncedViews = (base.pageViews || 0) + ((viewRes && viewRes.value) ? viewRes.value : 1);

      this.displayStats({
        total: syncedTotal,
        today: syncedToday,
        online: onlineCount,
        views: syncedViews
      });

      if (this.elements.statusNotice) {
        this.elements.statusNotice.innerHTML = `<span>🟢 Live telemetry active via CountAPI (Asia/Karachi PKT)</span>`;
      }
    } catch (err) {
      console.warn('CountAPI offline or blocked by adblock. Falling back to session metrics.', err);
      this.displayStats({
        total: (base.totalVisitors || 0) + fallbackTotal,
        today: (base.todayVisitors || 0) + fallbackToday,
        online: this.getLocalOnlineCount(),
        views: (base.pageViews || 0) + localPageViews
      });

      if (this.elements.statusNotice) {
        this.elements.statusNotice.innerHTML = `<span>⚡ Local Session Active (API Offline)</span>`;
      }
    }
  },

  /**
   * PRESENCE HEARTBEAT (Refreshes Online Count)
   */
  initPresenceTracking() {
    const interval = this.config.heartbeatIntervalMs || 60000;

    const recordActive = () => {
      const now = Date.now();
      try {
        localStorage.setItem('kw_presence_ts', String(now));
      } catch (e) {}

      if (this.broadcastChannel) {
        try {
          this.broadcastChannel.postMessage({
            type: 'heartbeat',
            uuid: this.uuid,
            timestamp: now
          });
        } catch (e) {}
      }
    };

    if (typeof BroadcastChannel !== 'undefined') {
      try {
        this.broadcastChannel = new BroadcastChannel('kw_bakery_presence_v2');
        this.broadcastChannel.onmessage = (event) => {
          if (event.data && event.data.uuid) {
            this.activeSessions.set(event.data.uuid, event.data.timestamp);
            this.cleanExpiredSessions();
            this.updateOnlineDisplay();
          }
        };
      } catch (e) {}
    }

    recordActive();
    this.activeSessions.set(this.uuid, Date.now());

    // Recurring heartbeat checks 5-minute rolling window
    this.heartbeatTimer = setInterval(async () => {
      recordActive();
      this.cleanExpiredSessions();

      const newSlot = this.get5MinSlot();
      if (newSlot !== this.currentSlot) {
        this.currentSlot = newSlot;
        // Check into new 5-minute online slot
        try {
          const { apiBase, keys } = this.config.countApi;
          const onlineKey = `${keys.onlineSlotPrefix}${this.currentSlot}`;
          const res = await this.fetchCountApi(`${apiBase}/hit/${onlineKey}`, 4000);
          sessionStorage.setItem('kw_checked_online_slot', String(this.currentSlot));
          if (res && res.value && this.elements.onlineVisitors) {
            this.animateValue(this.elements.onlineVisitors, Math.max(1, res.value));
          }
        } catch (e) {
          this.updateOnlineDisplay();
        }
      } else {
        this.updateOnlineDisplay();
      }
    }, interval);

    if (typeof window !== 'undefined' && typeof window.addEventListener === 'function') {
      ['click', 'touchstart', 'scroll', 'keydown'].forEach(evt => {
        window.addEventListener(evt, () => recordActive(), { passive: true, once: false });
      });
    }
  },

  cleanExpiredSessions() {
    const threshold = this.config.onlinePresenceThresholdMs || 300000;
    const now = Date.now();
    for (const [id, ts] of this.activeSessions.entries()) {
      if (now - ts > threshold) {
        this.activeSessions.delete(id);
      }
    }
  },

  getLocalOnlineCount() {
    this.cleanExpiredSessions();
    return Math.max(1, this.activeSessions.size);
  },

  updateOnlineDisplay() {
    if (this.elements.onlineVisitors) {
      const count = this.getLocalOnlineCount();
      this.animateValue(this.elements.onlineVisitors, count);
    }
  },

  /**
   * MODE B: FIREBASE REALTIME DATABASE (OPTIONAL)
   */
  initFirebaseMode() {
    try {
      const fbConfig = this.config.firebase;
      if (!window.firebase.apps.length) {
        window.firebase.initializeApp(fbConfig);
      }
      const db = window.firebase.database();

      const presenceRef = db.ref(`${fbConfig.paths.presence}/${this.uuid}`);
      const connectedRef = db.ref('.info/connected');

      connectedRef.on('value', (snap) => {
        if (snap.val() === true) {
          presenceRef.onDisconnect().remove();
          presenceRef.set({
            active: true,
            lastSeen: window.firebase.database.ServerValue.TIMESTAMP
          });
        }
      });

      const allPresenceRef = db.ref(fbConfig.paths.presence);
      allPresenceRef.on('value', (snap) => {
        const val = snap.val() || {};
        const count = Object.keys(val).length;
        if (this.elements.onlineVisitors) {
          this.animateValue(this.elements.onlineVisitors, Math.max(1, count));
        }
      });

      const visitorRef = db.ref(`${fbConfig.paths.uniqueVisitors}/${this.uuid}`);
      visitorRef.transaction((curr) => (curr || 0) + 1);

      const dailyRef = db.ref(`${fbConfig.paths.daily}/${this.pktDate}/visitors/${this.uuid}`);
      dailyRef.set(true);

      const pageViewsRef = db.ref(fbConfig.paths.pageViews);
      pageViewsRef.transaction((curr) => (curr || 0) + 1);

      pageViewsRef.on('value', (snap) => {
        if (this.elements.pageViews && snap.val() !== null) {
          this.animateValue(this.elements.pageViews, snap.val());
        }
      });

      const todayRef = db.ref(`${fbConfig.paths.daily}/${this.pktDate}/visitors`);
      todayRef.on('value', (snap) => {
        const count = snap.val() ? Object.keys(snap.val()).length : 1;
        if (this.elements.todayVisitors) {
          this.animateValue(this.elements.todayVisitors, count);
        }
      });

      const allVisitorsRef = db.ref(fbConfig.paths.uniqueVisitors);
      allVisitorsRef.on('value', (snap) => {
        const count = snap.val() ? Object.keys(snap.val()).length : 1;
        if (this.elements.totalVisitors) {
          this.animateValue(this.elements.totalVisitors, count);
        }
      });

      if (this.elements.statusNotice) {
        this.elements.statusNotice.innerHTML = `<span>🟢 Live telemetry active via Firebase Realtime Database (PKT)</span>`;
      }
    } catch (err) {
      console.error('Firebase Mode failed, falling back to CountAPI', err);
      this.initDefaultMode();
    }
  },

  displayStats({ total, today, online, views }) {
    if (this.elements.totalVisitors) this.animateValue(this.elements.totalVisitors, total);
    if (this.elements.todayVisitors) this.animateValue(this.elements.todayVisitors, today);
    if (this.elements.onlineVisitors) this.animateValue(this.elements.onlineVisitors, online);
    if (this.elements.pageViews) this.animateValue(this.elements.pageViews, views);
  },

  animateValue(element, target) {
    if (!element) return;
    const end = Math.max(0, Number(target) || 0);
    const current = Number(element.textContent.replace(/[^0-9]/g, '')) || 0;
    if (current === end) {
      element.textContent = end.toLocaleString('en-US');
      return;
    }

    const duration = 900;
    const startTimestamp = performance.now();

    const step = (timestamp) => {
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const val = Math.floor(current + (end - current) * easeProgress);
      element.textContent = val.toLocaleString('en-US');
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        element.textContent = end.toLocaleString('en-US');
      }
    };

    requestAnimationFrame(step);
  }
};

if (typeof window !== 'undefined') {
  window.VisitorCounter = VisitorCounter;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = VisitorCounter;
}
