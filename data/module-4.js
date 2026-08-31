(function(){
  window.MODULE_DATA = window.MODULE_DATA || {};

  window.MODULE_DATA.sparkCards = {
    moduleId: "m4", activityId: "sparkCards",
    instructions: "“Skills get you results. SPARK earns you trust.” Explore each trait the interview scene demonstrates.",
    cards: [
      { label: "S — Straightforwardness", back: "<strong>Authenticity.</strong> Being honest about your situation, even when it's uncomfortable, builds trust and credibility faster than a polished story would." },
      { label: "P — Preparedness", back: "<strong>Preparation.</strong> Knowledge and understanding of the subject shine through even in an unplanned, imperfect moment — because the prep happened long before this conversation." },
      { label: "A — Adaptability", back: "<strong>Thinking on your feet.</strong> Quickly adjusting to an unexpected situation, rather than freezing or over-apologizing, is a core communication skill under pressure." },
      { label: "R — Resilience", back: "<strong>Confidence under adversity.</strong> Answering clearly and competently despite a difficult situation conveys reliability and strength, not arrogance." },
      { label: "K — Kindheartedness", back: "<strong>Positivity.</strong> A genuinely positive, engaging attitude leaves a lasting impression and makes it easier for the other person to connect with you." }
    ],
    coachingPoints: [
      "SPARK isn't about hiding a bad situation, {name} — it's about how you show up inside it. Every trait here is about behavior under pressure, not about avoiding pressure.",
      "Notice that “Straightforwardness” comes first. Every other trait in SPARK only builds trust if the client already believes you're being honest with them."
    ]
  };

  window.MODULE_DATA.pyramidSeq = {
    moduleId: "m4", activityId: "pyramidSeq",
    instructions: "Put the three levels of the Pyramid Principle in the order you should present them.",
    steps: [
      { id:"top", text:"Top Level: The central message or conclusion you want to convey.", order:1 },
      { id:"second", text:"Second Level: Key arguments or reasons that support the main conclusion.", order:2 },
      { id:"third", text:"Third Level: Data, facts, or evidence that substantiate each argument.", order:3 }
    ],
    coachingPoints: [
      "The Pyramid Principle and BLUF (Module 2) are the same instinct applied at different scales: lead with the conclusion, then let the structure — not the audience — do the work of finding supporting detail.",
      "Executives skim from the top down, {name}. If your conclusion is buried under Level 2 and Level 3 detail, most of your audience never reaches it."
    ]
  };

  window.MODULE_DATA.billingSim = {
    moduleId: "m4", activityId: "billingSim",
    instructions: "The client starts an unannounced meeting to discuss an URGENT item. Use the facilitator's guide questions — understand urgency, assess capacity honestly, then communicate transparently — to work through it.",
    scenario: "Given facts: 1,000 claims nearing their timely-filing deadline must be billed out today. There are only 3 billers. Average completion is 80 claims per biller per day — that's 240/day against a need of 1,000.",
    steps: [
      {
        id: "urgency",
        prompt: "The client wants everything billed today. What's your first move?",
        choices: [
          { text: "“No problem — we'll get it all done today.”", correct: false, feedback: "3 billers × 80/day = 240 claims. Promising all 1,000 today isn't realistic, and an over-promise you can't keep damages trust more than an honest constraint does. Try again." },
          { text: "“Before we react, let's confirm the hard deadline and what happens if even a portion of these claims slips past it.”", correct: true, feedback: "This is the “Understanding the Urgency” step — confirm the real deadline and real consequences before committing to anything." }
        ]
      },
      {
        id: "capacity",
        prompt: "With the deadline confirmed, how do you close the gap between 240/day capacity and 1,000 claims?",
        choices: [
          { text: "“The 3 billers will just have to work faster.”", correct: false, feedback: "This ignores the math — even a heroic effort from 3 people can't triple in a day without risking accuracy. Try again." },
          { text: "“Let me pull in additional billers from other teams for today and prioritize the claims closest to their filing deadline.”", correct: true, feedback: "This is “Assessing Capacity & Exploring Additional Resources” — an honest look at the gap, followed by a real plan to close it." }
        ]
      },
      {
        id: "communicate",
        prompt: "How do you report back to the client?",
        choices: [
          { text: "“Don't worry, it'll all get done.”", correct: false, feedback: "Same over-promise as step one, just later in the conversation. It sets up a broken commitment the moment reality doesn't cooperate. Try again." },
          { text: "“Here's what's realistic today: with additional support, we'll prioritize the claims closest to filing risk first, and give you a clear count of completed vs. in-progress by end of day.”", correct: true, feedback: "That's the whole sequence handled well, {name} — specific, honest, and it gives the client something concrete to plan around." }
        ]
      }
    ],
    coachingPoints: [
      "Under pressure, the instinct is to say yes to make the urgency go away. The stronger move is 30 seconds of honest math before you commit to anything.",
      "A transparent “here's what's realistic” answer, backed by a real plan, builds more executive presence than an over-promise you can't control."
    ]
  };

  window.MODULE_DATA.m4cfu = {
    id: "m4cfu",
    questions: [
      {
        id: "q1",
        text: "In the SPARK model, which trait is specifically about thinking on your feet in an unexpected situation?",
        options: [
          {id:"a", text:"Straightforwardness"},
          {id:"b", text:"Adaptability"},
          {id:"c", text:"Kindheartedness"},
          {id:"d", text:"Preparedness"}
        ],
        correctId: "b",
        explain: "Adaptability is about handling unforeseen challenges by adjusting quickly, not by avoiding them."
      },
      {
        id: "q2",
        text: "In the Pyramid Principle, what goes at the very top?",
        options: [
          {id:"a", text:"Supporting data and evidence"},
          {id:"b", text:"The central message or conclusion"},
          {id:"c", text:"A list of every argument, unranked"},
          {id:"d", text:"An apology for any delays"}
        ],
        correctId: "b",
        explain: "The conclusion goes first — arguments and evidence support it underneath, not the other way around."
      },
      {
        id: "q3",
        text: "In the billing crisis scenario, why is “we'll get it all done today” the wrong first response?",
        options: [
          {id:"a", text:"It's too polite"},
          {id:"b", text:"3 billers at 80/day is 240/day capacity — nowhere near the 1,000 claims needed"},
          {id:"c", text:"Clients never want reassurance"},
          {id:"d", text:"It should have been said in writing instead"}
        ],
        correctId: "b",
        explain: "An over-promise that ignores real capacity sets up a broken commitment — the honest move is to confirm urgency and assess capacity first."
      },
      {
        id: "q4",
        text: "The \"Consult, Don't Just Deliver\" mindset means shifting from:",
        options: [
          {id:"a", text:"“Doing for the client” to “suggesting to the client”"},
          {id:"b", text:"Weekly updates to monthly updates"},
          {id:"c", text:"Email to phone calls exclusively"},
          {id:"d", text:"Formal language to casual language"}
        ],
        correctId: "a",
        explain: "It's about asking powerful questions and offering perspective, not just executing tasks handed down."
      }
    ]
  };
})();
