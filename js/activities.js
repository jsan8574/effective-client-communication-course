/* ============================================================
   Activities — renderers for the interactive types used across
   modules. Each renderer:
     - restores partial progress from Storage on load
     - saves incrementally as the learner works (not just on
       full completion)
     - shows a "Coaching Key Points" callout once complete

   Design notes:
   - Matching uses tap-to-pair (select left, then right), never
     drawn connector lines, so it never breaks on narrow
     viewports.
   - Drag-and-drop bucket sort supports pointer-drag AND a
     tap-to-select / tap-bucket-to-place fallback, so it works
     on touch devices where native HTML5 DnD is unreliable.
   - Sequencing uses up/down controls rather than free drag, for
     the same cross-device reliability reason.
   ============================================================ */
(function(){

  function el(tag, cls, html){
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html !== undefined) e.innerHTML = html;
    return e;
  }
  function shuffle(arr){
    var a = arr.slice();
    for (var i=a.length-1;i>0;i--){
      var j = Math.floor(Math.random()*(i+1));
      var t=a[i]; a[i]=a[j]; a[j]=t;
    }
    return a;
  }
  function coachBox(points){
    var box = el("div","callout coach");
    box.innerHTML = "<h4>Coaching Key Points</h4>";
    var ul = el("ul");
    ul.style.margin = "0";
    ul.style.paddingLeft = "18px";
    points.forEach(function(p){
      var li = el("li", null, p);
      li.style.marginBottom = "4px";
      ul.appendChild(li);
    });
    box.appendChild(ul);
    return box;
  }

  var Activities = {};

  /* ---------------------------------------------------------
     FLIP CARDS — explore N independent concepts
     data: { moduleId, activityId, instructions, cards:[{label, back}], coachingPoints:[] }
  --------------------------------------------------------- */
  Activities.flipCards = function(container, data){
    var state = Storage.getActivityState(data.moduleId, data.activityId) || { seen: [], complete: false };

    container.innerHTML = "";
    var head = el("div","activity-head");
    head.appendChild(el("span","activity-type","Flip Cards"));
    var status = el("span","activity-status");
    head.appendChild(status);
    container.appendChild(head);
    if (data.instructions) container.appendChild(el("div","activity-instructions",data.instructions));

    var grid = el("div","flip-grid");
    container.appendChild(grid);

    function updateStatus(){
      status.textContent = state.seen.length + " / " + data.cards.length + " viewed";
      if (state.seen.length >= data.cards.length && !state.complete){
        state.complete = true;
        Storage.saveActivityState(data.moduleId, data.activityId, state);
        if (data.coachingPoints) container.appendChild(coachBox(data.coachingPoints));
      }
    }

    data.cards.forEach(function(card, idx){
      var wrap = el("div","flip-card" + (state.seen.indexOf(idx)>-1 ? " seen" : ""));
      var inner = el("div","flip-card-inner");
      var front = el("div","flip-face flip-front","<div><div class='flip-label'>"+card.label+"</div><div class='flip-hint'>Tap to reveal</div></div>");
      var back = el("div","flip-face flip-back", card.back);
      inner.appendChild(front); inner.appendChild(back);
      wrap.appendChild(inner);
      wrap.addEventListener("click", function(){
        wrap.classList.toggle("flipped");
        if (state.seen.indexOf(idx) === -1){
          state.seen.push(idx);
          wrap.classList.add("seen");
          Storage.saveActivityState(data.moduleId, data.activityId, state);
          updateStatus();
        }
      });
      grid.appendChild(wrap);
    });

    updateStatus();
    if (state.complete && data.coachingPoints) container.appendChild(coachBox(data.coachingPoints));
  };

  /* ---------------------------------------------------------
     MATCHING (tap-to-pair) — both sides genuinely 1:1 distinct
     data: { moduleId, activityId, instructions, pairs:[{left, right}], coachingPoints:[] }
  --------------------------------------------------------- */
  Activities.matching = function(container, data){
    var state = Storage.getActivityState(data.moduleId, data.activityId) || { matched: {}, complete: false };

    container.innerHTML = "";
    var head = el("div","activity-head");
    head.appendChild(el("span","activity-type","Matching"));
    var status = el("span","activity-status");
    head.appendChild(status);
    container.appendChild(head);
    if (data.instructions) container.appendChild(el("div","activity-instructions",data.instructions));

    var wrap = el("div","match-wrap");
    var leftCol = el("div","match-col");
    leftCol.appendChild(el("h4",null,"Scenario"));
    var rightCol = el("div","match-col");
    rightCol.appendChild(el("h4",null,"Best Response"));
    wrap.appendChild(leftCol); wrap.appendChild(rightCol);
    container.appendChild(wrap);

    var leftOrder = data.pairs.map(function(p,i){return i;});
    var rightOrder = shuffle(leftOrder);

    var selectedLeft = null;
    var leftEls = {}, rightEls = {};

    function updateStatus(){
      var n = Object.keys(state.matched).length;
      status.textContent = n + " / " + data.pairs.length + " matched";
      if (n >= data.pairs.length && !state.complete){
        state.complete = true;
        Storage.saveActivityState(data.moduleId, data.activityId, state);
        if (data.coachingPoints) container.appendChild(coachBox(data.coachingPoints));
      }
    }

    leftOrder.forEach(function(i){
      var item = el("div","match-item");
      item.dataset.pairIndex = i;
      if (state.matched[i] !== undefined) item.classList.add("matched");
      item.innerHTML = "<span class='match-badge'>"+(i+1)+"</span><span>"+data.pairs[i].left+"</span>";
      item.addEventListener("click", function(){
        if (item.classList.contains("matched")) return;
        Array.prototype.forEach.call(leftCol.querySelectorAll(".match-item"), function(x){x.classList.remove("selected");});
        selectedLeft = i;
        item.classList.add("selected");
      });
      leftEls[i] = item;
      leftCol.appendChild(item);
    });

    rightOrder.forEach(function(i){
      var item = el("div","match-item");
      item.dataset.pairIndex = i;
      if (state.matched[i] !== undefined) item.classList.add("matched");
      item.innerHTML = "<span>"+data.pairs[i].right+"</span>";
      item.addEventListener("click", function(){
        if (item.classList.contains("matched")) return;
        if (selectedLeft === null) return;
        if (selectedLeft === i){
          state.matched[i] = true;
          Storage.saveActivityState(data.moduleId, data.activityId, state);
          leftEls[i].classList.remove("selected");
          leftEls[i].classList.add("matched");
          item.classList.add("matched");
          selectedLeft = null;
          updateStatus();
        } else {
          item.classList.add("wrong-flash");
          leftEls[selectedLeft] && leftEls[selectedLeft].classList.add("wrong-flash");
          setTimeout(function(){
            item.classList.remove("wrong-flash");
            leftEls[selectedLeft] && leftEls[selectedLeft].classList.remove("wrong-flash");
          }, 400);
        }
      });
      rightEls[i] = item;
      rightCol.appendChild(item);
    });

    updateStatus();
    if (state.complete && data.coachingPoints) container.appendChild(coachBox(data.coachingPoints));
  };

  /* ---------------------------------------------------------
     DRAG-AND-DROP BUCKET SORT — sort N items into fixed buckets
     data: { moduleId, activityId, instructions, buckets:[{id,label}], items:[{id,text,bucket}], coachingPoints:[] }
     Interaction: tap an unplaced chip to select it, then tap a
     bucket to place it (works everywhere); pointer-drag is a
     progressive enhancement for desktop mouse users.
  --------------------------------------------------------- */
  Activities.bucketSort = function(container, data){
    var state = Storage.getActivityState(data.moduleId, data.activityId) || { placements: {}, checked:false, complete: false };

    container.innerHTML = "";
    var head = el("div","activity-head");
    head.appendChild(el("span","activity-type","Drag & Drop Sort"));
    var status = el("span","activity-status");
    head.appendChild(status);
    container.appendChild(head);
    if (data.instructions) container.appendChild(el("div","activity-instructions",data.instructions));
    container.appendChild(el("div","sort-hint","Tap a card to select it, then tap “+ Place selected card here” in the bucket where it belongs. (Mouse users can also drag.)"));

    var pool = el("div","sort-pool");
    container.appendChild(pool);

    var bucketRow = el("div","bucket-row");
    container.appendChild(bucketRow);

    var selectedChip = null;
    var chips = {}; // id -> element
    var bucketEls = {};
    var resultBox = null;

    var itemsShuffled = shuffle(data.items);

    function itemsInBucket(bucketId){
      return Object.keys(state.placements).filter(function(id){ return state.placements[id]===bucketId; });
    }
    function unplacedItems(){
      return data.items.filter(function(it){ return state.placements[it.id]===undefined; });
    }

    function makeChip(item){
      var chip = el("div","sort-chip",item.text);
      chip.dataset.id = item.id;
      chip.draggable = true;
      chip.addEventListener("click", function(){
        if (state.checked) return;
        Object.keys(chips).forEach(function(id){ chips[id].classList.remove("selected"); });
        selectedChip = item.id;
        chip.classList.add("selected");
      });
      chip.addEventListener("dragstart", function(e){
        selectedChip = item.id;
        chip.classList.add("dragging");
        e.dataTransfer.setData("text/plain", item.id);
      });
      chip.addEventListener("dragend", function(){ chip.classList.remove("dragging"); });
      chips[item.id] = chip;
      return chip;
    }

    function render(){
      pool.innerHTML = "";
      unplacedItems().forEach(function(it){ pool.appendChild(makeChip(it)); });
      if (unplacedItems().length === 0){
        pool.innerHTML = "<span style='color:var(--text-muted);font-size:.85rem;'>All cards placed — check your answers below.</span>";
      }

      bucketRow.innerHTML = "";
      data.buckets.forEach(function(b){
        var bEl = el("div","bucket");
        bEl.dataset.bucket = b.id;
        var h = el("h4");
        h.innerHTML = "<span>"+b.label+"</span><span class='count'>"+itemsInBucket(b.id).length+"</span>";
        bEl.appendChild(h);
        var itemsWrap = el("div","bucket-items");
        itemsInBucket(b.id).forEach(function(id){
          var it = data.items.filter(function(x){return x.id===id;})[0];
          var chip = el("div","sort-chip", it.text);
          chip.dataset.id = id;
          if (state.checked){
            chip.classList.add(it.bucket === b.id ? "correct" : "incorrect");
          }
          chip.addEventListener("click", function(e){
            if (state.checked) return;
            e.stopPropagation(); // don't let this bubble up and also trigger the bucket's place-here handler
            delete state.placements[id];
            Storage.saveActivityState(data.moduleId, data.activityId, state);
            render();
          });
          itemsWrap.appendChild(chip);
        });
        bEl.appendChild(itemsWrap);

        // Dedicated, always-present drop target: once a bucket already holds several
        // chips there may be very little empty surface left to tap, and a tap that lands
        // on an existing chip instead picks THAT chip back up (see its own handler above).
        // This button is never covered by placed chips, so it's always a reliable place to
        // tap "place the selected card here" regardless of how full the bucket gets.
        var placeBtn = el("button","btn small ghost","+ Place selected card here");
        placeBtn.type = "button";
        placeBtn.style.marginTop = "8px";
        placeBtn.style.width = "100%";
        placeBtn.addEventListener("click", function(){
          if (state.checked) return;
          placeInBucket(b.id);
        });
        bEl.appendChild(placeBtn);

        // Clicking anywhere else on the bucket (header, empty padding) is a bonus
        // shortcut when there's room — the button above is the guaranteed target.
        bEl.addEventListener("click", function(){
          if (state.checked) return;
          placeInBucket(b.id);
        });
        bEl.addEventListener("dragover", function(e){ e.preventDefault(); bEl.classList.add("drag-over"); });
        bEl.addEventListener("dragleave", function(){ bEl.classList.remove("drag-over"); });
        bEl.addEventListener("drop", function(e){
          e.preventDefault();
          bEl.classList.remove("drag-over");
          var id = e.dataTransfer.getData("text/plain");
          if (id) placeInBucketById(id, b.id);
        });

        bucketEls[b.id] = bEl;
        bucketRow.appendChild(bEl);
      });
      updateStatus();
    }

    function placeInBucket(bucketId){
      if (!selectedChip) return;
      placeInBucketById(selectedChip, bucketId);
      selectedChip = null;
    }
    function placeInBucketById(id, bucketId){
      state.placements[id] = bucketId;
      Storage.saveActivityState(data.moduleId, data.activityId, state);
      render();
    }

    function updateStatus(){
      var placed = Object.keys(state.placements).length;
      status.textContent = placed + " / " + data.items.length + " placed" + (state.checked ? (state.complete ? " — all correct!" : " — some need another look") : "");
    }

    var actionRow = el("div","btn-row");
    var checkBtn = el("button","btn","Check My Answers");
    var resetBtn = el("button","btn secondary","Reset");
    actionRow.appendChild(checkBtn); actionRow.appendChild(resetBtn);
    container.appendChild(actionRow);

    checkBtn.addEventListener("click", function(){
      if (Object.keys(state.placements).length < data.items.length){
        alert("Place every card in a bucket before checking your answers.");
        return;
      }
      var allCorrect = data.items.every(function(it){ return state.placements[it.id] === it.bucket; });
      state.checked = true;
      state.complete = allCorrect;
      Storage.saveActivityState(data.moduleId, data.activityId, state);
      render();
      if (resultBox) resultBox.remove();
      if (allCorrect){
        resultBox = coachBox(data.coachingPoints || []);
      } else {
        resultBox = el("div","callout","Not quite — the cards marked in red are in the wrong bucket. Tap them to pick them back up and try again.");
      }
      container.appendChild(resultBox);
    });

    resetBtn.addEventListener("click", function(){
      state = { placements:{}, checked:false, complete:false };
      Storage.saveActivityState(data.moduleId, data.activityId, state);
      if (resultBox){ resultBox.remove(); resultBox = null; }
      render();
    });

    render();
    if (state.complete && data.coachingPoints){
      resultBox = coachBox(data.coachingPoints);
      container.appendChild(resultBox);
    }
  };

  /* ---------------------------------------------------------
     SEQUENCE — put N unique steps in the right order
     data: { moduleId, activityId, instructions, steps:[{id,text,order}], coachingPoints:[] }
     Interaction: up/down controls (reliable on every device).
  --------------------------------------------------------- */
  Activities.sequence = function(container, data){
    var saved = Storage.getActivityState(data.moduleId, data.activityId);
    var order = saved && saved.order ? saved.order.slice() : shuffle(data.steps.map(function(s){return s.id;}));
    var state = { order: order, checked: saved ? saved.checked : false, complete: saved ? saved.complete : false };

    container.innerHTML = "";
    var head = el("div","activity-head");
    head.appendChild(el("span","activity-type","Sequence"));
    var status = el("span","activity-status");
    head.appendChild(status);
    container.appendChild(head);
    if (data.instructions) container.appendChild(el("div","activity-instructions",data.instructions));

    var list = el("div","seq-list");
    container.appendChild(list);
    var resultBox = null;

    function stepById(id){ return data.steps.filter(function(s){return s.id===id;})[0]; }

    function move(idx, dir){
      var newIdx = idx + dir;
      if (newIdx < 0 || newIdx >= state.order.length) return;
      var tmp = state.order[idx];
      state.order[idx] = state.order[newIdx];
      state.order[newIdx] = tmp;
      Storage.saveActivityState(data.moduleId, data.activityId, state);
      render();
    }

    function render(){
      list.innerHTML = "";
      state.order.forEach(function(id, idx){
        var step = stepById(id);
        var item = el("div","seq-item");
        item.dataset.id = id;
        if (state.checked){
          item.classList.add(step.order === idx+1 ? "correct" : "incorrect");
        }
        item.appendChild(el("div","seq-num", String(idx+1)));
        item.appendChild(el("div","seq-text", step.text));
        var controls = el("div","seq-controls");
        var up = el("button",null,"↑");
        up.disabled = idx===0 || state.checked;
        up.addEventListener("click", function(){ move(idx,-1); });
        var down = el("button",null,"↓");
        down.disabled = idx===state.order.length-1 || state.checked;
        down.addEventListener("click", function(){ move(idx,1); });
        controls.appendChild(up); controls.appendChild(down);
        item.appendChild(controls);
        list.appendChild(item);
      });
      status.textContent = state.checked ? (state.complete ? "Correct order!" : "Not quite right yet") : "Arrange, then check";
    }

    var actionRow = el("div","btn-row");
    var checkBtn = el("button","btn","Check Order");
    var resetBtn = el("button","btn secondary","Reset");
    actionRow.appendChild(checkBtn); actionRow.appendChild(resetBtn);
    container.appendChild(actionRow);

    checkBtn.addEventListener("click", function(){
      var allCorrect = state.order.every(function(id, idx){ return stepById(id).order === idx+1; });
      state.checked = true;
      state.complete = allCorrect;
      Storage.saveActivityState(data.moduleId, data.activityId, state);
      render();
      if (resultBox) resultBox.remove();
      resultBox = allCorrect ? coachBox(data.coachingPoints || []) : el("div","callout","Steps marked in red are out of place — use the arrows to fix the order and check again.");
      container.appendChild(resultBox);
    });
    resetBtn.addEventListener("click", function(){
      state = { order: shuffle(data.steps.map(function(s){return s.id;})), checked:false, complete:false };
      Storage.saveActivityState(data.moduleId, data.activityId, state);
      if (resultBox){ resultBox.remove(); resultBox=null; }
      render();
    });

    render();
    if (state.complete && data.coachingPoints){
      resultBox = coachBox(data.coachingPoints);
      container.appendChild(resultBox);
    }
  };

  /* ---------------------------------------------------------
     BRANCHING DECISION SIMULATION
     data: { moduleId, activityId, instructions, scenario, steps:[
       { id, prompt, choices:[{text, correct, feedback}] }
     ], coachingPoints:[] }
     Wrong choice -> feedback + retry same step.
     Correct choice -> feedback + continue to next step.
  --------------------------------------------------------- */
  Activities.branchingSim = function(container, data){
    var saved = Storage.getActivityState(data.moduleId, data.activityId);
    var state = saved || { stepIndex: 0, complete: false, log: [] };

    container.innerHTML = "";
    var head = el("div","activity-head");
    head.appendChild(el("span","activity-type","Decision Simulation"));
    var status = el("span","activity-status");
    head.appendChild(status);
    container.appendChild(head);
    if (data.instructions) container.appendChild(el("div","activity-instructions",data.instructions));
    if (data.scenario) container.appendChild(el("div","sim-scenario",data.scenario));

    var progressWrap = el("div","sim-progress");
    data.steps.forEach(function(){ progressWrap.appendChild(el("span")); });
    container.appendChild(progressWrap);

    var body = el("div");
    container.appendChild(body);

    function updateProgress(){
      Array.prototype.forEach.call(progressWrap.children, function(s, i){
        s.className = i < state.stepIndex ? "done" : (i === state.stepIndex ? "active" : "");
      });
      status.textContent = state.complete ? "Complete" : ("Step " + Math.min(state.stepIndex+1, data.steps.length) + " of " + data.steps.length);
    }

    function renderStep(){
      body.innerHTML = "";
      updateProgress();
      if (state.stepIndex >= data.steps.length){
        state.complete = true;
        Storage.saveActivityState(data.moduleId, data.activityId, state);
        var done = el("div","sim-complete");
        done.appendChild(el("h3",null,"Scenario complete"));
        done.appendChild(el("p",null,"You navigated every stage of this conversation successfully."));
        body.appendChild(done);
        if (data.coachingPoints) body.appendChild(coachBox(data.coachingPoints));
        return;
      }
      var step = data.steps[state.stepIndex];
      body.appendChild(el("div","sim-prompt", step.prompt));
      var choicesWrap = el("div","sim-choices");
      var order = shuffle(step.choices.map(function(c,i){return i;}));
      var feedbackBox = null;
      order.forEach(function(ci){
        var choice = step.choices[ci];
        var btn = el("button","sim-choice", choice.text);
        btn.addEventListener("click", function(){
          Array.prototype.forEach.call(choicesWrap.querySelectorAll("button"), function(b){ b.disabled = true; });
          if (feedbackBox) feedbackBox.remove();
          feedbackBox = el("div","sim-feedback " + (choice.correct ? "correct" : "incorrect"), choice.feedback);
          body.appendChild(feedbackBox);
          state.log.push({ step: step.id, choice: choice.text, correct: choice.correct });
          Storage.saveActivityState(data.moduleId, data.activityId, state);

          var nextRow = el("div","btn-row");
          if (choice.correct){
            var cont = el("button","btn","Continue →");
            cont.addEventListener("click", function(){
              state.stepIndex += 1;
              Storage.saveActivityState(data.moduleId, data.activityId, state);
              renderStep();
            });
            nextRow.appendChild(cont);
          } else {
            var retry = el("button","btn secondary","Try Again");
            retry.addEventListener("click", function(){ renderStep(); });
            nextRow.appendChild(retry);
          }
          body.appendChild(nextRow);
        });
        choicesWrap.appendChild(btn);
      });
      body.appendChild(choicesWrap);
    }

    renderStep();
  };

  window.Activities = Activities;
})();
