/**
 * KARMA WALA SWEETS AND BAKERS - VISITOR COUNTER CONFIGURATION
 * 
 * Supports two operational modes:
 * 
 * MODE A: ZERO-SETUP DEFAULT MODE (CountAPI)
 * - Requires no backend, no server, and no API key.
 * - Uses Miles Hilliard CountAPI (https://countapi.mileshilliard.com/api/v1) with client-side localStorage UUID deduplication.
 * - Tracks 4 core metrics honestly:
 *   1. Total Visitors (All-time unique browsers)
 *   2. Today's Visitors (Unique browsers today, resets at 00:00:00 Pakistan Standard Time - Asia/Karachi, UTC+5)
 *   3. Online Visitors (Active presence within a rolling 5-minute window)
 *   4. Total Page Views (Total catalog views)
 * 
 * MODE B: OPTIONAL FIREBASE REALTIME DATABASE
 * - Set `firebase.enabled: true` and add your Firebase credentials below.
 */

const VISITOR_COUNTER_CONFIG = {
  activeMode: 'default',

  // Timezone configuration for daily visitor resets
  timezone: {
    iana: 'Asia/Karachi',
    name: 'Pakistan Standard Time (PKT)',
    utcOffsetHours: 5,
    resetHour: 0, // 00:00:00 PKT
  },

  // Established bakery traffic baseline (Set to 0 to start counter from zero)
  trafficBaseline: {
    totalVisitors: 0,
    todayVisitors: 0,
    pageViews: 0,
  },

  // Online visitor presence threshold (5 minutes = 300,000 ms)
  onlinePresenceThresholdMs: 5 * 60 * 1000,

  // Heartbeat interval for active session presence
  heartbeatIntervalMs: 60 * 1000,

  // MODE A: Miles Hilliard CountAPI Configuration (Fresh v3 keys starting from zero)
  countApi: {
    apiBase: 'https://countapi.mileshilliard.com/api/v1',
    keys: {
      totalVisitors: 'kw_sweets_live_total_v3',
      todayVisitorsPrefix: 'kw_sweets_live_today_v3_',
      onlineSlotPrefix: 'kw_sweets_live_online_v3_',
      pageViews: 'kw_sweets_live_views_v3',
    },
    timeoutMs: 6000,
  },

  // MODE B: Firebase Realtime Database Configuration (Optional)
  firebase: {
    enabled: false,
    apiKey: "YOUR_FIREBASE_API_KEY",
    authDomain: "your-project-id.firebaseapp.com",
    databaseURL: "https://your-project-id-default-rtdb.firebaseio.com",
    projectId: "your-project-id",
    storageBucket: "your-project-id.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_FIREBASE_APP_ID",
    paths: {
      presence: 'stats/presence',
      daily: 'stats/daily',
      uniqueVisitors: 'stats/unique_visitors',
      pageViews: 'stats/page_views',
    }
  }
};

if (typeof window !== 'undefined') {
  window.VISITOR_COUNTER_CONFIG = VISITOR_COUNTER_CONFIG;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = VISITOR_COUNTER_CONFIG;
}
