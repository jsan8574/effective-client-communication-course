/* ============================================================
   PDF Export — compiles every free-text reflection and activity
   result into one downloadable document via jsPDF (CDN).
   Call window.exportAnswersPdf() from a button handler.
   ============================================================ */
(function(){
  function fmtActivityLabel(id){
    var LABELS = {
      commLevels: "Client Communication Levels (flip cards)",
      channelMatch: "Choosing the Right Channel (matching)",
      defensiveSim: "Defensive Language Reframe (decision simulation)",
      storySeq: "Storytelling for Data (sequence)",
      wiifmSort: "WIIFM Benefits (drag & drop sort)",
      deliverDataSim: "Deliver This Data (decision simulation)",
      convoTypes: "3 Types of Difficult Conversations (flip cards)",
      situationSort: "Classify the Situation (drag & drop sort)",
      aeofSeq: "A-E-O-F Framework (sequence)",
      aeofSim: "A-E-O-F Live Roleplay (decision simulation)",
      sparkCards: "The SPARK Model (flip cards)",
      pyramidSeq: "The Pyramid Principle (sequence)",
      billingSim: "What Would You Do? Billing Crisis (decision simulation)",
      feedbackCards: "Client Feedback Strategy (flip cards)",
      followUpSort: "Pre-Call / In-Meeting / Post-Call (drag & drop sort)",
      glossaryCards: "Key Terms Glossary (flip cards)"
    };
    return LABELS[id] || id;
  }

  function activitySummary(state){
    if (!state) return "Not started";
    if (state.log){ // branching sim
      var correct = state.log.filter(function(l){return l.correct;}).length;
      return (state.complete ? "Completed" : "In progress") + " — " + correct + "/" + state.log.length + " correct choices logged";
    }
    if (state.order){ // sequence
      return state.complete ? "Completed — correct order" : (state.checked ? "Attempted — order not yet correct" : "In progress");
    }
    if (state.placements){ // bucket sort
      var placed = Object.keys(state.placements).length;
      return state.complete ? "Completed — all items correctly sorted" : ("In progress — " + placed + " item(s) placed");
    }
    if (state.matched){
      var n = Object.keys(state.matched).length;
      return state.complete ? "Completed — all pairs matched" : ("In progress — " + n + " pair(s) matched");
    }
    if (state.seen){
      return state.complete ? "Completed — all cards viewed" : ("In progress — " + state.seen.length + " card(s) viewed");
    }
    return state.complete ? "Completed" : "In progress";
  }

  window.exportAnswersPdf = function(){
    if (Storage.flush) Storage.flush();
    var jsPDFCtor = (window.jspdf && window.jspdf.jsPDF) ? window.jspdf.jsPDF : null;
    if (!jsPDFCtor){
      alert("PDF export needs an internet connection to load the PDF library. Please check your connection and try again.");
      return;
    }
    var doc = new jsPDFCtor({ unit: "pt", format: "a4" });
    var pageW = doc.internal.pageSize.getWidth();
    var margin = 48;
    var y = margin;
    var lineH = 15;

    function ensureRoom(h){
      if (y + h > doc.internal.pageSize.getHeight() - margin){
        doc.addPage();
        y = margin;
      }
    }
    function heading(text, size){
      ensureRoom(size + 14);
      doc.setFont("helvetica","bold");
      doc.setFontSize(size);
      doc.setTextColor(55,53,69);
      doc.text(text, margin, y);
      y += size + 10;
    }
    function body(text, opts){
      opts = opts || {};
      doc.setFont("helvetica", opts.bold ? "bold" : "normal");
      doc.setFontSize(opts.size || 10.5);
      doc.setTextColor.apply(doc, opts.color || [40,40,40]);
      var lines = doc.splitTextToSize(text, pageW - margin*2);
      lines.forEach(function(l){
        ensureRoom(lineH);
        doc.text(l, margin, y);
        y += lineH;
      });
      y += 4;
    }
    function rule(){
      ensureRoom(14);
      doc.setDrawColor(219,230,234);
      doc.line(margin, y, pageW-margin, y);
      y += 14;
    }

    var name = Storage.getLearnerName() || "Learner";
    heading(window.COURSE.title + " — My Answers & Progress", 17);
    body("Learner: " + name, {bold:true});
    body("Exported: " + new Date().toLocaleString());
    body("Total time invested: " + CourseTimer.formatDuration(Storage.getTotalTimeMs()));
    rule();

    window.COURSE.modules.forEach(function(mod){
      heading("Module " + mod.num + " — " + mod.title, 13);

      mod.activities.forEach(function(aid){
        var st = Storage.getActivityState(mod.id, aid);
        body(fmtActivityLabel(aid) + ": " + activitySummary(st), {bold:true, size:10.5});
        if (st && st.log && st.log.length){
          st.log.forEach(function(entry){
            body("  • Chose: \"" + entry.choice + "\" — " + (entry.correct ? "correct" : "revised after feedback"), {size:9.5, color:[91,102,112]});
          });
        }
      });

      var cfu = Storage.getCfu(mod.id);
      if (cfu && cfu.complete){
        body("Check for Understanding quiz: " + cfu.score + " / " + cfu.total + " correct.", {bold:true, size:10.5});
      } else {
        body("Check for Understanding quiz: not completed.", {size:10.5, color:[91,102,112]});
      }

      // reflections belonging to this module
      var refl = Storage.allReflections();
      Object.keys(refl).forEach(function(key){
        if (key.indexOf(mod.id + "_") === 0 && refl[key] && refl[key].trim()){
          body("Reflection — " + key.replace(mod.id + "_", "").replace(/_/g," ") + ":", {bold:true, size:10.5});
          body("\"" + refl[key].trim() + "\"", {size:10, color:[34,38,43]});
        }
      });

      rule();
    });

    var kc = Storage.getKc();
    heading("Final Knowledge Check", 13);
    if (kc.complete){
      body("Score: " + kc.score + " / " + kc.total + " (" + Math.round((kc.score/kc.total)*100) + "%)", {bold:true});
    } else {
      body("Not yet completed.", {color:[91,102,112]});
    }

    doc.save((name.replace(/[^a-z0-9]+/gi,"_") || "learner") + "_ECC_answers.pdf");
  };
})();
