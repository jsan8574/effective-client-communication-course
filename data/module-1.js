(function(){
  window.MODULE_DATA = window.MODULE_DATA || {};

  window.MODULE_DATA.commLevels = {
    moduleId: "m1", activityId: "commLevels",
    instructions: "Tap each level to see a real example, its purpose, and how the client reads it.",
    cards: [
      {
        label: "INFORM",
        back: "<strong>Example:</strong> “We experienced unforeseen challenges last week which caused a slight delay in our timeline.”<br><br><strong>Purpose:</strong> Transparent acknowledgment of the issue.<br><br><strong>Client hears:</strong> “They're being honest.”"
      },
      {
        label: "INFLUENCE",
        back: "<strong>Example:</strong> “The team has already addressed the root cause, adjusted responsibilities, and tightened checkpoints to prevent recurrence.”<br><br><strong>Purpose:</strong> Demonstrates control and corrective action.<br><br><strong>Client hears:</strong> “They're handling it.”"
      },
      {
        label: "INSPIRE",
        back: "<strong>Example:</strong> “While the delay is minimal, this adjustment strengthens our execution approach moving forward — our focus remains on delivering the remaining phases with stability and transparency.”<br><br><strong>Purpose:</strong> Elevates the situation toward confidence and partnership.<br><br><strong>Client hears:</strong> “I trust them to lead this.”"
      }
    ],
    coachingPoints: [
      "Inform, Influence, and Inspire aren't three unrelated tones — they're a ladder. A good update often climbs all three in one breath: acknowledge, show control, then anchor confidence.",
      "Notice none of the three examples hide the problem. Transparency is the floor, not something Inspire-level language replaces."
    ]
  };

  window.MODULE_DATA.channelMatch = {
    moduleId: "m1", activityId: "channelMatch",
    instructions: "Match each urgency/sensitivity combination to the channel the facilitator notes recommend.",
    pairs: [
      { left: "High urgency + High sensitivity", right: "Call or in-person" },
      { left: "High urgency + Low sensitivity", right: "Teams / Slack / chat" },
      { left: "Low urgency + High sensitivity", right: "Email with a clear summary" },
      { left: "Low urgency + Low sensitivity", right: "Asynchronous update" }
    ],
    coachingPoints: [
      "Sensitivity — not urgency — is usually what should push you toward a live conversation. A highly sensitive, low-urgency issue (e.g. a quiet scope disagreement) often deserves a call more than a fast-but-impersonal chat message.",
      "Defaulting everything to email or chat because it's fastest for you, not the client, is the single most common channel-choice mistake."
    ]
  };

  window.MODULE_DATA.defensiveSim = {
    moduleId: "m1", activityId: "defensiveSim",
    instructions: "This scenario is built from a live facilitator role-play: Round 1 used only “Yes, but…” language so the group could hear how defensive it sounds; Round 2 replaced it with acknowledgment language. Play both rounds below — pick the response that isn't defensive.",
    scenario: "You're on a call with a client who has just raised the same delivery issue for the third time.",
    steps: [
      {
        id: "s1",
        prompt: "Client: “This is the third time this has happened. I'm losing confidence in your team.”",
        choices: [
          { text: "“Yes, but we've been really busy this sprint — a lot has been going on.”", correct: false, feedback: "This is “Yes, but…” language. Even though it's true, leading with a justification tells the client you're defending yourself instead of hearing them. Try again." },
          { text: "“I understand — three delays in a row would concern me too.”", correct: true, feedback: "This acknowledges the client's concern without over-explaining or assigning blame. That's the first move in de-escalating any difficult conversation." }
        ]
      },
      {
        id: "s2",
        prompt: "Client: “Okay. So what are you actually going to do about it?”",
        choices: [
          { text: "“Yes, but it's not entirely on us — the requirements changed twice on your end too.”", correct: false, feedback: "Still defensive, and now it shifts blame onto the client. Even if true, this is the wrong moment to litigate fault. Try again." },
          { text: "“Let me explain how we can help: we're adding a dedicated QA checkpoint before every handoff, starting this week.”", correct: true, feedback: "Concrete, forward-looking, and free of blame language — exactly the “Let me explain how we can help…” reframe from Round 2 of the role-play." }
        ]
      },
      {
        id: "s3",
        prompt: "Client: “Alright... I need to see this doesn't happen a fourth time.”",
        choices: [
          { text: "“It won't — don't worry about it.”", correct: false, feedback: "This over-promises with no substance behind it, and dismisses a legitimate worry instead of closing the loop. Try again." },
          { text: "“I'll send you a short confirmation after Friday's checkpoint so you can see it firsthand.”", correct: true, feedback: "A specific, verifiable follow-up. This is the “Follow-Up” habit that turns a one-time save into rebuilt trust." }
        ]
      }
    ],
    coachingPoints: [
      "“Yes, but…” is defensive no matter how true the “but” is — it tells the client you're managing your own position, not theirs.",
      "Facilitator tips for these conversations: avoid filler words, pause 1–2 seconds before responding, don't over-explain, avoid blaming language (“we experienced a delay” instead of “the team missed it”), and slow your pace slightly.",
      "How you say something matters — but so does where. The channel you choose (Module 1's other activity) shapes how much of this language even lands."
    ]
  };

  window.MODULE_DATA.m1cfu = {
    id: "m1cfu",
    questions: [
      {
        id: "q1",
        text: "When something goes wrong on a project, what are clients silently evaluating — beyond the facts of what happened?",
        options: [
          {id:"a", text:"Whether the invoice will be adjusted"},
          {id:"b", text:"Whether the team understands the situation, has control over it, and can be trusted to manage it"},
          {id:"c", text:"Whether the project manager gets replaced"},
          {id:"d", text:"Nothing — clients only care about the facts"}
        ],
        correctId: "b",
        explain: "Clients are reading your communication for understanding, control, and trustworthiness — not just data."
      },
      {
        id: "q2",
        text: "Which Communication Level does this line represent? “The team has already addressed the root cause and tightened checkpoints to prevent recurrence.”",
        options: [
          {id:"a", text:"Inform"},
          {id:"b", text:"Influence"},
          {id:"c", text:"Inspire"},
          {id:"d", text:"Escalate"}
        ],
        correctId: "b",
        explain: "This demonstrates control and corrective action — the definition of the Influence level."
      },
      {
        id: "q3",
        text: "A topic is highly sensitive but not urgent. Which channel does the framework recommend?",
        options: [
          {id:"a", text:"An instant chat message"},
          {id:"b", text:"Wait for the next scheduled call, no matter how far off"},
          {id:"c", text:"Email with a clear summary"},
          {id:"d", text:"Post it in a shared status dashboard"}
        ],
        correctId: "c",
        explain: "Low urgency + high sensitivity maps to email with a clear, considered summary — fast enough, but not throwaway chat."
      },
      {
        id: "q4",
        text: "Which phrase best replaces defensive “Yes, but…” language in a difficult client conversation?",
        options: [
          {id:"a", text:"“That's not really our fault.”"},
          {id:"b", text:"“I understand — let me explain how we can help.”"},
          {id:"c", text:"“It won't happen again, don't worry about it.”"},
          {id:"d", text:"“Actually, basically, we were literally just about to fix that.”"}
        ],
        correctId: "b",
        explain: "Acknowledge first, then offer a concrete, forward-looking action — no blame, no filler words."
      }
    ]
  };
})();
