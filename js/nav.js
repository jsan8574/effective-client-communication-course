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
        '<a class="brand" href="index.html"><span>' + window.COURSE.title + '</span></a>' +
        '<div class="header-timer"><span class="dot"></span><span id="hdr-timer-label">Time on course —</span></div>' +
      '</div>' +
      '<div class="header-progress-line"><span id="hdr-pct-bar" style="width:' + pct + '%"></span></div>';
  }

  /* ---------------------------------------------------------
     Name gate — captured once, the first time the learner lands
     on any page of the course, so the rest of the experience
     (coaching points, sim feedback, the certificate) can be
     addressed to them by name. Skippable — this is a self-paced,
     no-login course, so nothing should truly block access.
  --------------------------------------------------------- */
  function maybeShowNameGate(){
    if (Storage.getLearnerName().trim()) return; // already have it
    try{ if (sessionStorage.getItem("ecc_name_gate_skipped") === "1") return; }catch(e){}

    var overlay = el("div","name-gate-overlay");
    overlay.innerHTML =
      '<div class="name-gate-card">' +
        '<div class="name-gate-badge">👋</div>' +
        '<h2>Welcome to the course</h2>' +
        '<p>What should we call you? We\'ll use it to personalize your coaching notes along the way — and it\'s what will appear on your certificate.</p>' +
        '<input type="text" id="name-gate-input" placeholder="Your first name" autocomplete="given-name">' +
        '<div class="btn-row" style="justify-content:center;">' +
          '<button class="btn" id="name-gate-submit">Let\'s Begin</button>' +
          '<button class="btn ghost small" id="name-gate-skip" type="button">Skip for now</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(overlay);

    var input = overlay.querySelector("#name-gate-input");
    input.focus();

    function submit(){
      var val = input.value.trim();
      if (val){
        Storage.setLearnerName(val);
        // let any page listen and refresh name-dependent content immediately
        // (e.g. index.html's personalized hero welcome line) without a reload.
        document.dispatchEvent(new CustomEvent("ecc:name-set", { detail: { name: val } }));
      }
      overlay.remove();
      renderHeader();
    }
    overlay.querySelector("#name-gate-submit").addEventListener("click", submit);
    input.addEventListener("keydown", function(e){ if (e.key === "Enter") submit(); });
    overlay.querySelector("#name-gate-skip").addEventListener("click", function(){
      try{ sessionStorage.setItem("ecc_name_gate_skipped","1"); }catch(e){}
      overlay.remove();
    });
  }

  /* ---------------------------------------------------------
     Sidebar — sticky "YOUR PROGRESS" card shown on every module,
     knowledge-check, and certificate page: overall % + section
     count, then a row per module (numbered / checkmarked, current
     module highlighted), plus a Certificate row at the bottom.
  --------------------------------------------------------- */
  function renderProgressSidebar(currentModuleId){
    var mount = document.getElementById("progress-sidebar");
    if (!mount) return;
    var overall = Storage.courseSectionsProgress();
    var pct = Storage.courseProgressPct();

    var rows = window.COURSE.modules.map(function(m){
      var p = Storage.moduleSectionsProgress(m.id);
      var done = p.total > 0 && p.done >= p.total;
      var isCurrent = m.id === currentModuleId;
      var cls = "sidebar-row" + (done ? " done" : "") + (isCurrent ? " current" : "");
      return (
        '<a class="' + cls + '" href="' + m.path + '">' +
          '<span class="badge">' + (done ? "✓" : m.num) + '</span>' +
          '<span class="info">' +
            '<span class="title">' + m.title + '</span>' +
            '<span class="sub">' + p.done + '/' + p.total + ' sections</span>' +
          '</span>' +
        '</a>'
      );
    }).join("");

    var kcDone = !!Storage.getKc().complete;
    var onCertPage = window.location.pathname.indexOf(window.COURSE.certificatePath) !== -1;

    mount.innerHTML =
      '<span class="sidebar-eyebrow">Your Progress</span>' +
      '<div class="sidebar-pct" id="sb-pct">' + pct + '% complete</div>' +
      '<div class="sidebar-sub" id="sb-sub">' + overall.done + ' of ' + overall.total + ' sections done</div>' +
      '<div class="sidebar-list">' +
        rows +
        '<a class="sidebar-row cert' + (onCertPage ? " current" : "") + '" href="' + window.COURSE.certificatePath + '">' +
          '<span class="badge">🏆</span>' +
          '<span class="info">' +
            '<span class="title">Certificate</span>' +
            '<span class="sub">' + (kcDone ? "Ready to claim" : "Unlocks after Knowledge Check") + '</span>' +
          '</span>' +
        '</a>' +
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

  function refreshHeaderTimer(){
    if (!window.CourseTimer) return;
    var label = document.getElementById("hdr-timer-label");
    if (label) label.textContent = "Time on course " + CourseTimer.formatClock(CourseTimer.getLiveMs());
  }

  function refreshHeaderProgress(currentModuleId){
    var pct = Storage.courseProgressPct();
    var bar = document.getElementById("hdr-pct-bar");
    if (bar) bar.style.width = pct + "%";
    refreshHeaderTimer();
    // Cheap to fully re-render given the course only has a handful of
    // modules — keeps the sidebar's numbers/checkmarks live as the learner
    // completes sections on the current page, without hand-patching DOM.
    if (document.getElementById("progress-sidebar")) renderProgressSidebar(currentModuleId);
  }

  window.NAV = {
    init: function(moduleId){
      renderHeader();
      renderProgressSidebar(moduleId);
      if (moduleId) renderModuleFooter(moduleId);
      maybeShowNameGate();
      refreshHeaderTimer();
      // Time-on-course ticks every second; progress/sidebar re-render on a
      // lighter 3s cadence since they only change when the learner finishes
      // a section, not continuously.
      setInterval(refreshHeaderTimer, 1000);
      setInterval(function(){ refreshHeaderProgress(moduleId); }, 3000);
    },
    refreshHeaderProgress: refreshHeaderProgress,
    renderProgressSidebar: renderProgressSidebar
  };
})();
