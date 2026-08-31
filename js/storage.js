/* ============================================================
   Storage — single JSON blob in localStorage holding all
   progress, activity state, quiz answers and reflections.
   Every write is synchronous and defensive (private-browsing /
   quota errors never crash the page).
   ============================================================ */
(function(){
  var KEY = window.COURSE.storagePrefix + "state_v1";

  function blank(){
    return {
      learnerName: "",
      totalTimeMs: 0,
      modules: {},     // moduleId -> { activities: {activityId: {...state}}, cfu: {answers:{}, score:null, total:0, complete:false} }
      reflections: {}, // key -> text
      kc: { answers: {}, score: null, total: 0, complete: false, completedAt: null },
      certIssued: false,
      createdAt: Date.now()
    };
  }

  function load(){
    try{
      var raw = localStorage.getItem(KEY);
      if (!raw) return blank();
      var parsed = JSON.parse(raw);
      // shallow-merge with blank() so new fields added later never break old saves
      var base = blank();
      for (var k in parsed){ base[k] = parsed[k]; }
      base.modules = base.modules || {};
      base.reflections = base.reflections || {};
      base.kc = base.kc || blank().kc;
      return base;
    }catch(e){
      console.warn("Storage load failed, starting fresh:", e);
      return blank();
    }
  }

  var state = load();
  var saveTimer = null;

  function persist(){
    try{ localStorage.setItem(KEY, JSON.stringify(state)); }
    catch(e){ console.warn("Storage persist failed (quota/private mode?):", e); }
  }

  function persistSoon(){
    // debounce rapid successive writes (e.g. drag moves) without losing data —
    // still fires quickly enough that a refresh mid-activity keeps the work.
    if (saveTimer) clearTimeout(saveTimer);
    saveTimer = setTimeout(persist, 200);
  }

  function ensureModule(moduleId){
    if (!state.modules[moduleId]){
      state.modules[moduleId] = { activities: {}, cfu: { answers:{}, score:null, total:0, complete:false } };
    }
    if (!state.modules[moduleId].cfu){
      state.modules[moduleId].cfu = { answers:{}, score:null, total:0, complete:false };
    }
    return state.modules[moduleId];
  }

  window.Storage = {
    raw: function(){ return state; },

    getLearnerName: function(){ return state.learnerName || ""; },
    setLearnerName: function(name){ state.learnerName = name; persist(); },

    getTotalTimeMs: function(){ return state.totalTimeMs || 0; },
    addTimeMs: function(ms){ state.totalTimeMs = (state.totalTimeMs||0) + ms; persistSoon(); },

    // ---- activity state (incremental save as learner works) ----
    getActivityState: function(moduleId, activityId){
      var m = ensureModule(moduleId);
      return m.activities[activityId] || null;
    },
    saveActivityState: function(moduleId, activityId, stateObj){
      var m = ensureModule(moduleId);
      m.activities[activityId] = stateObj;
      persistSoon();
    },
    isActivityComplete: function(moduleId, activityId){
      var s = this.getActivityState(moduleId, activityId);
      return !!(s && s.complete);
    },

    // ---- module CFU quiz ----
    getCfu: function(moduleId){
      return ensureModule(moduleId).cfu;
    },
    saveCfu: function(moduleId, cfuObj){
      ensureModule(moduleId).cfu = cfuObj;
      persistSoon();
    },

    // ---- reflections (free text) ----
    getReflection: function(key){ return state.reflections[key] || ""; },
    saveReflection: function(key, text){ state.reflections[key] = text; persistSoon(); },
    allReflections: function(){ return state.reflections; },

    // ---- knowledge check ----
    getKc: function(){ return state.kc; },
    saveKc: function(kcObj){ state.kc = kcObj; persist(); },

    // ---- certificate ----
    setCertIssued: function(v){ state.certIssued = v; persist(); },
    isCertIssued: function(){ return !!state.certIssued; },

    // ---- module completion / progress % ----
    moduleActivityIds: function(moduleId){
      var mod = window.COURSE.getModule(moduleId);
      return mod ? mod.activities : [];
    },
    // { done, total } across a module's hands-on activities, its video and
    // reflection (when it has them), and its Check for Understanding — the
    // same "sections" unit shown in the sidebar and the dashboard cover card.
    moduleSectionsProgress: function(moduleId){
      var mod = window.COURSE.getModule(moduleId);
      if (!mod) return { done:0, total:0 };
      var m = ensureModule(moduleId);
      var total = window.COURSE.sectionsTotal(mod);
      var done = 0;
      mod.activities.forEach(function(aid){
        if (m.activities[aid] && m.activities[aid].complete) done++;
      });
      if (mod.hasVideo){
        var v = m.activities.sparkVideo;
        if (v && (v.watched || v.optOut || v.watchedElsewhere)) done++;
      }
      if (mod.hasReflection){
        // assumes the "<moduleId>_habit_reflection" key convention used by m5's
        // reflection textarea; if a future module's reflection uses a different
        // key, update this lookup (or move the key into course-config.js).
        if ((state.reflections[moduleId + "_habit_reflection"] || "").trim()) done++;
      }
      if (m.cfu && m.cfu.complete) done++;
      return { done: done, total: total };
    },
    moduleProgressPct: function(moduleId){
      var p = this.moduleSectionsProgress(moduleId);
      if (!p.total) return 0;
      return Math.round((p.done/p.total)*100);
    },
    isModuleComplete: function(moduleId){
      return this.moduleProgressPct(moduleId) >= 100;
    },
    // { done, total } across every module's sections plus the final Knowledge Check.
    courseSectionsProgress: function(){
      var self = this;
      var total = 1; // knowledge check
      var done = self.getKc().complete ? 1 : 0;
      window.COURSE.modules.forEach(function(m){
        var p = self.moduleSectionsProgress(m.id);
        total += p.total;
        done += p.done;
      });
      return { done: done, total: total };
    },
    courseProgressPct: function(){
      var p = this.courseSectionsProgress();
      if (!p.total) return 0;
      return Math.round((p.done/p.total)*100);
    },

    // ---- flush immediately (call before navigating away / exporting) ----
    flush: function(){ persist(); },

    // ---- danger zone ----
    resetAll: function(){
      state = blank();
      persist();
    }
  };

  window.addEventListener("beforeunload", function(){ persist(); });
  document.addEventListener("visibilitychange", function(){
    if (document.visibilityState === "hidden") persist();
  });
})();
