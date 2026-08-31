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
      cfuId: "m1cfu"
    },
    {
      id: "m2", num: 2,
      title: "Strategic Communication Techniques",
      desc: "BLUF, storytelling for data, framing & anchoring, and the WIIFM lens for setting expectations.",
      path: "module-2.html",
      activities: ["storySeq","wiifmSort","deliverDataSim"],
      cfuId: "m2cfu"
    },
    {
      id: "m3", num: 3,
      title: "Navigating Conflict & Difficult Conversations",
      desc: "Reframe conflict as signal, classify difficult situations, and run the A-E-O-F framework live.",
      path: "module-3.html",
      activities: ["convoTypes","situationSort","aeofSeq","aeofSim"],
      cfuId: "m3cfu"
    },
    {
      id: "m4", num: 4,
      title: "Executive Presence & Influence",
      desc: "The SPARK model, the Pyramid Principle, and a live decision simulation under pressure.",
      path: "module-4.html",
      activities: ["sparkCards","pyramidSeq","billingSim"],
      cfuId: "m4cfu"
    },
    {
      id: "m5", num: 5,
      title: "Best Practices for Ongoing Client Communication",
      desc: "Feedback loops, the Pre-Call / In-Meeting / Post-Call rhythm, key terms, and your own commitment.",
      path: "module-5.html",
      activities: ["feedbackCards","followUpSort","glossaryCards"],
      cfuId: "m5cfu",
      hasReflection: true
    }
  ];

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
    }
  };
})();
