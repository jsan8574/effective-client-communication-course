(function(){
  window.MODULE_DATA = window.MODULE_DATA || {};

  window.MODULE_DATA.convoTypes = {
    moduleId: "m3", activityId: "convoTypes",
    instructions: "From Difficult Conversations (Stone, Patton & Heen — Harvard Negotiation Project): every hard conversation is really three conversations at once. Explore each.",
    cards: [
      {
        label: "“What Happened?”",
        back: "<strong>Focus:</strong> Facts, blame, and differing perspectives.<br><br><strong>B2B example:</strong> “Why was the deliverable delayed?” “Who is responsible for the SLA miss?”<br><br><strong>Manager challenge:</strong> Avoid defensiveness and shift to shared understanding."
      },
      {
        label: "The Feelings Conversation",
        back: "<strong>Focus:</strong> Emotions that are often unspoken but present.<br><br><strong>B2B example:</strong> Client frustration, loss of confidence; internal pressure or defensiveness.<br><br><strong>Manager challenge:</strong> Acknowledge emotions without losing professionalism."
      },
      {
        label: "The Identity Conversation",
        back: "<strong>Focus:</strong> What this situation means about you or your team.<br><br><strong>B2B example:</strong> “Are we a reliable partner?” “Is my team underperforming?”<br><br><strong>Manager challenge:</strong> Stay grounded and avoid taking it personally."
      }
    ],
    coachingPoints: [
      "Most managers only prepare for the “What Happened?” conversation — the facts. But the Feelings and Identity conversations are usually what's actually driving the tension.",
      "You can't skip straight to solutions when the unspoken conversation is about identity (“are we even good at this?”). Acknowledge that layer first, or your facts won't land."
    ]
  };

  window.MODULE_DATA.situationSort = {
    moduleId: "m3", activityId: "situationSort",
    instructions: "Difficult conversations tend to fall into three categories. Sort each example into the situation it belongs to.",
    buckets: [
      { id: "sla", label: "Delays or Missed SLAs" },
      { id: "scope", label: "Scope Creep or Pushback" },
      { id: "misalign", label: "Misalignment Between Teams" }
    ],
    items: [
      { id:"s1", text:"Missed project deadlines", bucket:"sla" },
      { id:"s2", text:"Delayed responses", bucket:"sla" },
      { id:"s3", text:"Incomplete deliverables", bucket:"sla" },
      { id:"s4", text:"Escalations due to turnaround time", bucket:"sla" },
      { id:"c1", text:"Additional requests outside the original scope", bucket:"scope" },
      { id:"c2", text:"Sudden priority changes", bucket:"scope" },
      { id:"c3", text:"Concerns about quality or delivery timelines", bucket:"scope" },
      { id:"m1", text:"Lack of clarity on ownership", bucket:"misalign" },
      { id:"m2", text:"Conflicting timelines between teams", bucket:"misalign" },
      { id:"m3", text:"Miscommunication during handoffs", bucket:"misalign" }
    ],
    coachingPoints: [
      "SLA/delay conversations need you to address the issue without creating blame or defensiveness.",
      "Scope creep conversations are really about expectation management, alignment, and collaborative problem-solving — not saying “no.”",
      "Misalignment conversations need shared understanding rebuilt first; jumping to “whose fault is it” only deepens the misalignment."
    ]
  };

  window.MODULE_DATA.aeofSeq = {
    moduleId: "m3", activityId: "aeofSeq",
    instructions: "Put the A-E-O-F framework back in order.",
    steps: [
      { id:"ack", text:"Acknowledge — Recognize the client's concern. “I understand the delay in the report is concerning.”", order:1 },
      { id:"exp", text:"Explain — Clarify the situation with facts. “The delay happened due to additional validation needed for the data.”", order:2 },
      { id:"off", text:"Offer — Provide a clear next step or solution. “We will complete the review and send the updated report by today.”", order:3 },
      { id:"fu", text:"Follow-Up — Confirm resolution and satisfaction. “Please let me know if this timeline works for you.”", order:4 }
    ],
    coachingPoints: [
      "A-E-O-F works in both verbal and written communication — the order matters more than the medium.",
      "The most common failure mode is skipping straight to Offer without Acknowledging first. A solution offered before the concern is recognized can land as dismissive, even when it's the right fix."
    ]
  };

  window.MODULE_DATA.aeofSim = {
    moduleId: "m3", activityId: "aeofSim",
    instructions: "Live roleplay from the workshop: a client escalates over repeated data issues. Use A-E-O-F in real time — pick the response that matches the current stage.",
    scenario: "This is the second month in a row your data delivery has had errors. The client opens the call visibly frustrated.",
    steps: [
      {
        id: "acknowledge",
        prompt: "Client: “This is the second month in a row our data has had errors. I'm starting to question your QA process.” — Stage: Acknowledge",
        choices: [
          { text: "“Our QA process is actually pretty solid — these things happen sometimes.”", correct: false, feedback: "This skips Acknowledge entirely and sounds dismissive of a legitimate, repeated concern. Try again." },
          { text: "“I hear you — two months of data errors in a row is a real concern, and I don't want to minimize that.”", correct: true, feedback: "This recognizes the client's concern directly, with no defensiveness. That's Acknowledge." }
        ]
      },
      {
        id: "explain",
        prompt: "Client: “So what's actually going on?” — Stage: Explain",
        choices: [
          { text: "“Honestly, I'm not totally sure yet — let me get back to you.”", correct: false, feedback: "This offers no facts at all. Explain means clarifying with what you actually know. Try again." },
          { text: "“Both months traced back to a manual data-entry step during handoff — that's where the errors originated.”", correct: true, feedback: "Clear, factual, no blame assigned. That's Explain." }
        ]
      },
      {
        id: "offer",
        prompt: "Client: “What are you going to do differently?” — Stage: Offer",
        choices: [
          { text: "“We'll try to be more careful going forward.”", correct: false, feedback: "Vague and unfalsifiable — not a real next step. Try again." },
          { text: "“We're automating that handoff step this week and adding a second QA review before data goes out.”", correct: true, feedback: "Specific and actionable. That's Offer." }
        ]
      },
      {
        id: "followup",
        prompt: "Client: “Okay. I'll wait and see.” — Stage: Follow-Up",
        choices: [
          { text: "“Great, talk soon!”", correct: false, feedback: "This doesn't confirm resolution or satisfaction — it just ends the call. Try again." },
          { text: "“I'll send you the first automated report by Friday so you can confirm the fix firsthand — does that work for you?”", correct: true, feedback: "Specific, verifiable, and invites confirmation. That's Follow-Up — the stage that actually rebuilds trust." }
        ]
      }
    ],
    coachingPoints: [
      "Notice each correct answer maps to exactly one A-E-O-F stage, in order. Reordering them — offering a fix before acknowledging the concern — is the most common way this framework gets misapplied under pressure.",
      "Emotional labeling (“I sense this has been frustrating for you”) and disarming with curiosity (“help me understand what success looks like on your end”) both work inside the Acknowledge stage to lower tension before you move to facts."
    ]
  };

  window.MODULE_DATA.m3cfu = {
    id: "m3cfu",
    questions: [
      {
        id: "q1",
        text: "According to the reframe in this module, conflict is best understood as:",
        options: [
          {id:"a", text:"A failure of leadership"},
          {id:"b", text:"A signal — often that people care and something important is at stake"},
          {id:"c", text:"Something to avoid at all costs"},
          {id:"d", text:"Proof the client relationship is ending"}
        ],
        correctId: "b",
        explain: "“Conflict is a signal, not a failure.” Avoided conflict tends to resurface later at a higher cost."
      },
      {
        id: "q2",
        text: "A client asks, “Are we even a reliable partner to you?” — which of the three difficult-conversation layers is this?",
        options: [
          {id:"a", text:"The “What Happened?” conversation"},
          {id:"b", text:"The Feelings conversation"},
          {id:"c", text:"The Identity conversation"},
          {id:"d", text:"None — this isn't a real layer"}
        ],
        correctId: "c",
        explain: "This question is about what the situation means about the relationship/team — the Identity conversation."
      },
      {
        id: "q3",
        text: "“Sudden priority changes” and “additional requests outside the original scope” are examples of:",
        options: [
          {id:"a", text:"Missed SLAs"},
          {id:"b", text:"Scope creep or client pushback"},
          {id:"c", text:"Team misalignment"},
          {id:"d", text:"Executive presence gaps"}
        ],
        correctId: "b",
        explain: "These both describe expectations expanding or being challenged beyond the original agreement — scope creep territory."
      },
      {
        id: "q4",
        text: "In the A-E-O-F framework, what comes right before “Offer”?",
        options: [
          {id:"a", text:"Follow-Up"},
          {id:"b", text:"Acknowledge"},
          {id:"c", text:"Explain"},
          {id:"d", text:"Nothing — Offer comes first"}
        ],
        correctId: "c",
        explain: "Acknowledge → Explain → Offer → Follow-Up. You clarify the facts before proposing the fix."
      }
    ]
  };
})();
