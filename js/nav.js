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
      maybeShowNameGate();
      // progress can change as the learner interacts with activities on this
      // page, so keep the header bar live without a reload.
      setInterval(refreshHeaderProgress, 3000);
    },
    refreshHeaderProgress: refreshHeaderProgress
  };
})();
