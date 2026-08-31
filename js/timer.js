/* ============================================================
   Timer — tracks total time-on-course robustly.

   Design: instead of diffing wall-clock timestamps (which
   balloons wildly across a backgrounded/suspended tab, sleep,
   or an overnight-open laptop), we accumulate in small fixed
   ticks that only fire while the page is actually visible and
   the JS event loop is actively running. A throttled/suspended
   background tab simply stops ticking — no large gap is ever
   computed, so nothing needs to be "ignored" after the fact.
   ============================================================ */
(function(){
  var TICK_MS = 5000;
  var intervalHandle = null;

  function isVisible(){
    return document.visibilityState === "visible";
  }

  function tick(){
    if (!isVisible()) return;
    Storage.addTimeMs(TICK_MS);
  }

  function start(){
    if (intervalHandle) return;
    intervalHandle = setInterval(tick, TICK_MS);
  }
  function stop(){
    if (intervalHandle){ clearInterval(intervalHandle); intervalHandle = null; }
  }

  document.addEventListener("visibilitychange", function(){
    if (isVisible()) start(); else stop();
  });

  if (isVisible()) start();

  // Separate, finer-grained (1s) local counter purely for a live "Time on
  // course" readout in the header — decoupled from the 5s persistence tick
  // above so the on-screen number can update smoothly every second without
  // hitting localStorage that often. Same visibility gating, so it never
  // runs ahead of what actually gets saved.
  var loadTotalMs = Storage.getTotalTimeMs();
  var liveElapsedMs = 0;
  setInterval(function(){ if (isVisible()) liveElapsedMs += 1000; }, 1000);

  window.CourseTimer = {
    getTotalMs: function(){ return Storage.getTotalTimeMs(); },
    getLiveMs: function(){ return loadTotalMs + liveElapsedMs; },
    formatDuration: function(ms){
      var totalMin = Math.max(0, Math.round(ms / 60000));
      var h = Math.floor(totalMin / 60);
      var m = totalMin % 60;
      if (h <= 0) return m + " min";
      return h + "h " + m + "m";
    },
    // "Time on course" clock format: "47m 37s" / "1h 05m 12s" / "8s".
    formatClock: function(ms){
      var totalSec = Math.max(0, Math.round(ms / 1000));
      var h = Math.floor(totalSec / 3600);
      var m = Math.floor((totalSec % 3600) / 60);
      var s = totalSec % 60;
      var mm = (h > 0 && m < 10) ? "0" + m : String(m);
      var ss = s < 10 ? "0" + s : String(s);
      if (h > 0) return h + "h " + mm + "m " + ss + "s";
      if (m > 0) return m + "m " + ss + "s";
      return s + "s";
    }
  };
})();
