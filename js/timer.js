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

  window.CourseTimer = {
    getTotalMs: function(){ return Storage.getTotalTimeMs(); },
    formatDuration: function(ms){
      var totalMin = Math.max(0, Math.round(ms / 60000));
      var h = Math.floor(totalMin / 60);
      var m = totalMin % 60;
      if (h <= 0) return m + " min";
      return h + "h " + m + "m";
    }
  };
})();
