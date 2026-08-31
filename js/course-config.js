/* ============================================================
   Course configuration — single source of truth for course
   scope. Extend the course (e.g. add Module 2 in a future
   series) by appending to MODULES here; nothing else needs
   restructuring (see README).
   ============================================================ */
(function(){
  var MODULES = [
    {
      id: "m1", num: 1,
      title: "Reframing the Role of Communication",
      desc: "Why communication is how clients judge your reliability — and how to choose the right level and channel.",
      path: "module-1.html",
      activities: ["commLevels","channelMatch","defensiveSim"],
      cfuId: "m1cfu",
      estMinutes: 15
    },
    {
      id: "m2", num: 2,
      title: "Strategic Communication Techniques",
      desc: "BLUF, storytelling for data, framing & anchoring, and the WIIFM lens for setting expectations.",
      path: "module-2.html",
      activities: ["storySeq","wiifmSort","deliverDataSim"],
      cfuId: "m2cfu",
      estMinutes: 15
    },
    {
      id: "m3", num: 3,
      title: "Navigating Conflict & Difficult Conversations",
      desc: "Reframe conflict as signal, classify difficult situations, and run the A-E-O-F framework live.",
      path: "module-3.html",
      activities: ["convoTypes","situationSort","aeofSeq","aeofSim"],
      cfuId: "m3cfu",
      estMinutes: 18
    },
    {
      id: "m4", num: 4,
      title: "Executive Presence & Influence",
      desc: "The SPARK model, the Pyramid Principle, and a live decision simulation under pressure.",
      path: "module-4.html",
      activities: ["sparkCards","pyramidSeq","billingSim"],
      cfuId: "m4cfu",
      estMinutes: 18,
      hasVideo: true
    },
    {
      id: "m5", num: 5,
      title: "Best Practices for Ongoing Client Communication",
      desc: "Feedback loops, the Pre-Call / In-Meeting / Post-Call rhythm, key terms, and your own commitment.",
      path: "module-5.html",
      activities: ["feedbackCards","followUpSort","glossaryCards"],
      cfuId: "m5cfu",
      estMinutes: 12,
      hasReflection: true
    }
  ];

  // A module's "sections" = its hands-on activities, plus its video (if any),
  // its free-text reflection (if any), and its Check for Understanding — the
  // same units shown as progress in the sidebar and the dashboard cover card.
  function sectionsTotal(m){
    return m.activities.length + (m.hasVideo ? 1 : 0) + (m.hasReflection ? 1 : 0) + 1 /* CFU */;
  }
  function courseTotalMinutes(){
    return MODULES.reduce(function(sum,m){ return sum + (m.estMinutes||0); }, 0);
  }
  function formatMinutes(mins){
    if (mins < 60) return "~" + mins + " min";
    var h = Math.floor(mins/60), m = mins%60;
    return "~" + h + "h" + (m ? " " + m + "m" : "");
  }

  window.COURSE = {
    id: "ecc",
    storagePrefix: "ecc_",
    title: "Effective Client Communication Strategies",
    subtitle: "A self-paced course for client-facing team leaders and managers",
    version: "1.0",
    modules: MODULES,
    knowledgeCheckPath: "knowledge-check.html",
    certificatePath: "certificate.html",
    getModule: function(id){
      for (var i=0;i<MODULES.length;i++){ if (MODULES[i].id===id) return MODULES[i]; }
      return null;
    },
    moduleIndex: function(id){
      for (var i=0;i<MODULES.length;i++){ if (MODULES[i].id===id) return i; }
      return -1;
    },
    sectionsTotal: sectionsTotal,
    totalMinutes: courseTotalMinutes(),
    formatMinutes: formatMinutes,
    requiredVideoCount: MODULES.filter(function(m){ return m.hasVideo; }).length
  };
})();
