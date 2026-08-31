(function(){
  window.MODULE_DATA = window.MODULE_DATA || {};

  window.MODULE_DATA.storySeq = {
    moduleId: "m2", activityId: "storySeq",
    instructions: "Put these four lines back in Problem → Insight → Action → Impact order.",
    steps: [
      { id: "p", text: "Problem: “I noticed I was always tired in the afternoon.”", order: 1 },
      { id: "i", text: "Insight: “I realized I was skipping breakfast.”", order: 2 },
      { id: "a", text: "Action: “I started eating breakfast every morning.”", order: 3 },
      { id: "im", text: "Impact: “Now I have better energy throughout the day.”", order: 4 },
    ],
    coachingPoints: [
      "The same shape works for status updates: name the problem plainly, show the insight that explains it, state the action already taken, then land on the impact the client will actually feel.",
      "Skipping straight to Action without naming the Insight is the most common version of this mistake — it reads as a fix with no diagnosis behind it, which erodes confidence rather than building it."
    ]
  };

  window.MODULE_DATA.wiifmSort = {
    moduleId: "m2", activityId: "wiifmSort",
    instructions: "Setting clear expectations creates value on both sides of the relationship. Sort each benefit phrase into who it primarily benefits.",
    buckets: [
      { id: "leaders", label: "Benefits to Leaders" },
      { id: "clients", label: "Benefits to Clients" }
    ],
    items: [
      { id:"l1", text:"Reduces uncertainties", bucket:"leaders" },
      { id:"l2", text:"Streamlines processes", bucket:"leaders" },
      { id:"l3", text:"Provides a roadmap for execution", bucket:"leaders" },
      { id:"l4", text:"Fosters stronger relationships", bucket:"leaders" },
      { id:"l5", text:"Builds reliability", bucket:"leaders" },
      { id:"l6", text:"Increases goal attainment", bucket:"leaders" },
      { id:"l7", text:"Facilitates improvement", bucket:"leaders" },
      { id:"l8", text:"Ensures optimal resource use", bucket:"leaders" },
      { id:"c1", text:"Lowers anxiety", bucket:"clients" },
      { id:"c2", text:"Receives timely service", bucket:"clients" },
      { id:"c3", text:"Ensures understanding of outcomes", bucket:"clients" },
      { id:"c4", text:"Develops trust", bucket:"clients" },
      { id:"c5", text:"Gains confidence", bucket:"clients" },
      { id:"c6", text:"Ensures needs are met", bucket:"clients" },
      { id:"c7", text:"Allows voicing concerns", bucket:"clients" },
      { id:"c8", text:"Maximizes value", bucket:"clients" }
    ],
    coachingPoints: [
      "WIIFM (“What's In It For Me?”) reminds us that people support what benefits them. Clear expectations aren't a compliance exercise — they create real value for leaders and clients alike.",
      "If a client is anxious, frustrated, or escalating, the root cause is very often unclear expectations, not the underlying work itself. Unclear expectations create confusion; clear expectations create confidence."
    ]
  };

  window.MODULE_DATA.deliverDataSim = {
    moduleId: "m2", activityId: "deliverDataSim",
    instructions: "You're delivering a 60–90 second live update on this Week 4 status. Clients want three things from every update: Performance, Risk, and Action. Choose the strongest line at each stage of the call.",
    scenario: "Week 4 Project Status: Tasks Completed 28/25 (above target) · Open Issues 12 (target ≤10) · Testing 95% (target 100%) · Bugs Fixed 18/15 (above target) · Deployment: Delayed.",
    steps: [
      {
        id: "open",
        prompt: "How do you open the call?",
        choices: [
          { text: "“So this week we worked on the accounts, productivity improved, QA was strong, but a few things increased slightly…”", correct: false, feedback: "This is a raw data recitation with no bottom line. The client is left thinking “is this good or bad?” Try again." },
          { text: "“The overall project remains stable, with strong progress in task completion and bug resolution. A few items still need attention, and we have active mitigation plans in place.”", correct: true, feedback: "This is BLUF — Bottom Line Up Front. The client immediately knows where things stand before any detail follows." }
        ]
      },
      {
        id: "narrate",
        prompt: "Client: “Can you walk me through what actually happened this week?”",
        choices: [
          { text: "“Tasks completed was 28 versus a target of 25, open issues were 12 versus a target of 10, testing completion was 95%…”", correct: false, feedback: "This just re-reads the table. It's accurate, but it doesn't help the client understand the story behind the numbers. Try again." },
          { text: "“The team maintained strong development momentum while managing testing and deployment activities. A few validation items are still ongoing, but collaboration across Dev, QA, and Product kept issue resolution on track.”", correct: true, feedback: "This is storytelling for data — a narrative that connects the numbers to what actually happened and why it matters." }
        ]
      },
      {
        id: "close",
        prompt: "Client: “Okay — what should I take away from this call?”",
        choices: [
          { text: "“I guess we'll see how next week goes.”", correct: false, feedback: "Vague and non-committal — it leaves the client anchored on uncertainty instead of progress. Try again." },
          { text: "“The key takeaway is that delivery momentum remains strong, with tasks and bug resolution exceeding target. The remaining focus is final validation and documentation, already being addressed through daily alignment sessions.”", correct: true, feedback: "Framing + Anchoring: frame the overall message, then anchor on progress already made — exactly how to close a status call." }
        ]
      }
    ],
    coachingPoints: [
      "BLUF, storytelling, and framing + anchoring aren't competing techniques — a single strong update typically opens BLUF, narrates with storytelling, and closes with framing + anchoring.",
      "Every version of this update was factually accurate. The difference was entirely in structure — which is why technique matters as much as substance."
    ]
  };

  window.MODULE_DATA.m2cfu = {
    id: "m2cfu",
    questions: [
      {
        id: "q1",
        text: "“Bottom Line Up Front” (BLUF) means you should:",
        options: [
          {id:"a", text:"List every data point before stating your conclusion"},
          {id:"b", text:"State the overall conclusion first, then support it with detail"},
          {id:"c", text:"Only communicate bad news at the end of a call"},
          {id:"d", text:"Avoid giving a conclusion so the client can decide for themselves"}
        ],
        correctId: "b",
        explain: "BLUF puts the takeaway first so the client isn't left wondering “is this good or bad?” while you work through the details."
      },
      {
        id: "q2",
        text: "In the Storytelling for Data structure, what comes immediately after “Problem”?",
        options: [
          {id:"a", text:"Impact"},
          {id:"b", text:"Action"},
          {id:"c", text:"Insight"},
          {id:"d", text:"Apology"}
        ],
        correctId: "c",
        explain: "Problem → Insight → Action → Impact: the Insight explains *why* the problem happened, before any action is described."
      },
      {
        id: "q3",
        text: "“Develops trust” and “Gains confidence” are benefits of setting clear expectations that primarily land with:",
        options: [
          {id:"a", text:"Leaders"},
          {id:"b", text:"Clients"},
          {id:"c", text:"Neither — they're generic filler"},
          {id:"d", text:"Only new clients"}
        ],
        correctId: "b",
        explain: "In the WIIFM framework, these are client-side benefits — the leader-side equivalents were things like “builds reliability” and “fosters stronger relationships.”"
      },
      {
        id: "q4",
        text: "Framing + Anchoring, used to close the “Deliver This Data” update, does what?",
        options: [
          {id:"a", text:"Sets the overall context, then highlights progress or success already made"},
          {id:"b", text:"Buries the main risk so the client doesn't ask follow-up questions"},
          {id:"c", text:"Replaces the need for a BLUF opening"},
          {id:"d", text:"Is only appropriate for written email updates"}
        ],
        correctId: "a",
        explain: "Frame the message, then anchor the client on the progress and goals already achieved — that's what makes a close land with confidence instead of uncertainty."
      }
    ]
  };
})();
