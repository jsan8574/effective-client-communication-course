/* ============================================================
   Nav — shared header (with live course-progress bar) and the
   prev/next footer used on module pages. Call NAV.init() near
   the bottom of every page's <body>.
   ============================================================ */
(function(){
  function el(tag, cls, html){
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html !== undefined) e.innerHTML = html;
    return e;
  }

  function renderHeader(){
    var mount = document.getElementById("site-header");
    if (!mount) return;
    var pct = Storage.courseProgressPct();
    mount.innerHTML =
      '<div class="container">' +
        '<a class="brand" href="index.html"><span class="brand-mark">ECC</span><span>' + window.COURSE.title + '</span></a>' +
        '<div class="header-progress">' +
          '<span id="hdr-pct-label">' + pct + '% complete</span>' +
          '<span class="bar"><span id="hdr-pct-bar" style="width:' + pct + '%"></span></span>' +
        '</div>' +
        '<div class="header-links">' +
          '<a href="index.html">Dashboard</a>' +
          '<a href="' + window.COURSE.knowledgeCheckPath + '">Knowledge Check</a>' +
          '<a href="' + window.COURSE.certificatePath + '">Certificate</a>' +
        '</div>' +
      '</div>';
  }

  function renderModuleFooter(moduleId){
    var mount = document.getElementById("module-footer");
    if (!mount) return;
    var idx = window.COURSE.moduleIndex(moduleId);
    var mods = window.COURSE.modules;
    var prev = idx > 0 ? mods[idx-1] : null;
    var next = idx < mods.length-1 ? mods[idx+1] : null;

    mount.innerHTML = "";
    var left = prev ? ('<a class="btn ghost" href="'+prev.path+'">← Module '+prev.num+'</a>') : '<a class="btn ghost" href="index.html">← Dashboard</a>';
    var right = next ? ('<a class="btn" href="'+next.path+'">Module '+next.num+' →</a>') : ('<a class="btn" href="'+window.COURSE.knowledgeCheckPath+'">Final Knowledge Check →</a>');
    mount.innerHTML = '<div>'+left+'</div><div>'+right+'</div>';
  }

  function refreshHeaderProgress(){
    var pct = Storage.courseProgressPct();
    var bar = document.getElementById("hdr-pct-bar");
    var label = document.getElementById("hdr-pct-label");
    if (bar) bar.style.width = pct + "%";
    if (label) label.textContent = pct + "% complete";
  }

  window.NAV = {
    init: function(moduleId){
      renderHeader();
      if (moduleId) renderModuleFooter(moduleId);
      // progress can change as the learner interacts with activities on this
      // page, so keep the header bar live without a reload.
      setInterval(refreshHeaderProgress, 3000);
    },
    refreshHeaderProgress: refreshHeaderProgress
  };
})();
