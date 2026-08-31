/* ============================================================
   Quiz — used for per-module "Check for Understanding" (CFU)
   quizzes and the final graded Knowledge Check. Single-answer
   multiple choice, saved incrementally, scored on submit.
   ============================================================ */
(function(){
  function el(tag, cls, html){
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html !== undefined) e.innerHTML = html;
    return e;
  }

  /*
    data: {
      id, title, questions:[{ id, text, options:[{id,text}], correctId, explain }]
    }
    getState()/saveState(obj) let the caller point this at either a
    per-module CFU slot (Storage.getCfu/saveCfu) or the course-wide
    knowledge check slot (Storage.getKc/saveKc).
  */
  window.renderQuiz = function(container, data, getState, saveState, opts){
    opts = opts || {};
    var state = getState() || { answers: {}, score: null, total: data.questions.length, complete: false };
    if (state.total === undefined) state.total = data.questions.length;

    container.innerHTML = "";

    if (state.complete){
      renderResults();
    } else {
      renderForm();
    }

    function renderForm(){
      container.innerHTML = "";
      if (opts.introText) container.appendChild(el("p","activity-instructions", opts.introText));

      data.questions.forEach(function(q, qi){
        var qWrap = el("div","quiz-q");
        qWrap.appendChild(el("div","quiz-q-text",(qi+1)+". "+q.text));
        var optsWrap = el("div","quiz-opts");
        q.options.forEach(function(o){
          var label = el("label","quiz-opt");
          var input = document.createElement("input");
          input.type = "radio";
          input.name = "q_" + q.id;
          input.value = o.id;
          if (state.answers[q.id] === o.id) input.checked = true;
          input.addEventListener("change", function(){
            state.answers[q.id] = o.id;
            saveState(state);
          });
          label.appendChild(input);
          label.appendChild(document.createTextNode(o.text));
          optsWrap.appendChild(label);
        });
        qWrap.appendChild(optsWrap);
        container.appendChild(qWrap);
      });

      var btnRow = el("div","btn-row");
      var submitBtn = el("button","btn", opts.submitLabel || "Submit Answers");
      submitBtn.addEventListener("click", function(){
        var answered = data.questions.every(function(q){ return state.answers[q.id] !== undefined; });
        if (!answered){
          alert("Please answer every question before submitting — an empty question won't be scored.");
          return;
        }
        var correct = 0;
        data.questions.forEach(function(q){
          if (state.answers[q.id] === q.correctId) correct++;
        });
        state.score = correct;
        state.total = data.questions.length;
        state.complete = true;
        state.completedAt = Date.now();
        saveState(state);
        renderResults();
        if (opts.onComplete) opts.onComplete(state);
      });
      btnRow.appendChild(submitBtn);
      container.appendChild(btnRow);
    }

    function renderResults(){
      container.innerHTML = "";
      var pct = Math.round((state.score / state.total) * 100);
      var banner = el("div","quiz-score-banner");
      banner.appendChild(el("div","big", state.score + " / " + state.total));
      banner.appendChild(el("div",null, pct + "% correct"));
      container.appendChild(banner);

      data.questions.forEach(function(q, qi){
        var qWrap = el("div","quiz-q");
        qWrap.appendChild(el("div","quiz-q-text",(qi+1)+". "+q.text));
        var optsWrap = el("div","quiz-opts");
        q.options.forEach(function(o){
          var label = el("label","quiz-opt");
          if (o.id === q.correctId) label.classList.add("correct");
          else if (o.id === state.answers[q.id]) label.classList.add("incorrect");
          label.style.cursor = "default";
          var marker = o.id === q.correctId ? "✓ " : (o.id === state.answers[q.id] ? "✗ " : "");
          label.appendChild(document.createTextNode(marker + o.text));
          optsWrap.appendChild(label);
        });
        qWrap.appendChild(optsWrap);
        if (q.explain) qWrap.appendChild(el("div","quiz-explain", q.explain));
        container.appendChild(qWrap);
      });

      var btnRow = el("div","btn-row");
      var retakeBtn = el("button","btn secondary","Retake Quiz");
      retakeBtn.addEventListener("click", function(){
        state = { answers:{}, score:null, total:data.questions.length, complete:false };
        saveState(state);
        renderForm();
      });
      btnRow.appendChild(retakeBtn);
      container.appendChild(btnRow);
    }
  };
})();
