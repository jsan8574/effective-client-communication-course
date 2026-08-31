(function(){
  window.MODULE_DATA = window.MODULE_DATA || {};

  window.MODULE_DATA.feedbackCards = {
    moduleId: "m5", activityId: "feedbackCards",
    instructions: "Feedback is a relationship-building tool, not just a data source. Explore the three moves.",
    cards: [
      { label: "Solicit Strategically", back: "Choose optimal timing for requests. Use a mix of formal surveys and informal check-ins — don't rely on only one method." },
      { label: "Feedback-Friendly Culture", back: "Foster an environment where clients feel comfortable sharing honest opinions. Demonstrate openness to criticism, not just gratitude for praise." },
      { label: "Act on Insights", back: "Implement changes based on feedback, and communicate those improvements back to the client — so they see their input actually mattered." }
    ],
    coachingPoints: [
      "{name}, the loop only closes at “Act on Insights.” Soliciting feedback you never visibly act on is worse than not asking — it teaches clients their input doesn't matter.",
      "A feedback-friendly culture has to be demonstrated, not declared. Openly welcoming one piece of criticism does more than any number of “we value your feedback” lines."
    ]
  };

  window.MODULE_DATA.followUpSort = {
    moduleId: "m5", activityId: "followUpSort",
    instructions: "Ongoing client communication has a rhythm. Sort each habit into when it happens.",
    buckets: [
      { id: "pre", label: "Pre-Call" },
      { id: "in", label: "In-Meeting" },
      { id: "post", label: "Post-Call" }
    ],
    items: [
      { id:"p1", text:"Preparation", bucket:"pre" },
      { id:"p2", text:"Scheduled Updates", bucket:"pre" },
      { id:"i1", text:"Collaborative Communication", bucket:"in" },
      { id:"i2", text:"Effective Presentation", bucket:"in" },
      { id:"i3", text:"Managing Situations", bucket:"in" },
      { id:"i4", text:"Achieving a Win-Win Outcome", bucket:"in" },
      { id:"o1", text:"Proactive Reporting", bucket:"post" },
      { id:"o2", text:"Document Conversations", bucket:"post" },
      { id:"o3", text:"Adjust As Needed", bucket:"post" },
      { id:"o4", text:"Crisis Communication", bucket:"post" }
    ],
    coachingPoints: [
      "Most communication breakdowns happen because teams over-invest in In-Meeting polish and under-invest in Pre-Call preparation and Post-Call documentation.",
      "One to remember, {name}: “Document Conversations” isn't busywork — it's what lets you prove what was agreed to the next time expectations drift."
    ]
  };

  window.MODULE_DATA.glossaryCards = {
    moduleId: "m5", activityId: "glossaryCards",
    instructions: "{name}, ten terms that come up constantly in client communication — explore each definition.",
    cards: [
      { label:"Accountability", back:"Taking responsibility for one's actions and decisions in client interactions — being reliable, meeting commitments, and owning mistakes to build trust and credibility." },
      { label:"Proactive", back:"Taking initiative to anticipate and address client needs and potential issues before they arise, rather than only reacting once something breaks." },
      { label:"Communication", back:"The process of exchanging information, ideas, and feedback between clients and service providers — clear, consistent, and responsive." },
      { label:"Feedback", back:"Providing and receiving constructive comments to improve performance and client satisfaction — specific, timely, and focused on behaviors and outcomes, not personal attributes." },
      { label:"Recap", back:"Summarizing key points and decisions from client meetings so all parties have a clear, shared understanding — and misunderstandings don't compound later." },
      { label:"Progress", back:"Regularly updating clients on the status of their projects — milestones achieved, current activities, and next steps — to keep them informed and engaged." },
      { label:"Achievements", back:"Highlighting and celebrating successes and milestones reached, which builds a positive relationship and demonstrates the value being delivered." },
      { label:"Delays", back:"Communicating setbacks in a timely and transparent manner — the reason for the delay, its impact, and the steps being taken to get back on track." },
      { label:"Prioritize", back:"Identifying and focusing on the most important tasks and client needs, managing time and resources so critical issues are addressed promptly." },
      { label:"Satisfaction", back:"Ensuring clients are happy with the services provided — regularly seeking feedback, addressing concerns promptly, and continuously improving quality." }
    ],
    coachingPoints: [
      "Notice how many of these terms link back to earlier modules: Recap is A-E-O-F's Follow-Up, Delays is Module 1's Inform level, Proactive is the Pre-Call habit from this module.",
      "These aren't buzzwords, {name} — each one is a specific, observable behavior you can point to in a real conversation."
    ]
  };

  window.MODULE_DATA.m5cfu = {
    id: "m5cfu",
    questions: [
      {
        id: "q1",
        text: "Why is “Act on Insights” the most important of the three feedback strategies?",
        options: [
          {id:"a", text:"Because surveys are unreliable"},
          {id:"b", text:"Because feedback you never visibly act on teaches clients their input doesn't matter"},
          {id:"c", text:"Because it's the only strategy that costs nothing"},
          {id:"d", text:"It isn't — soliciting feedback matters more"}
        ],
        correctId: "b",
        explain: "Closing the loop is what makes the other two strategies worthwhile in the client's eyes."
      },
      {
        id: "q2",
        text: "“Document Conversations” belongs to which part of the client communication rhythm?",
        options: [
          {id:"a", text:"Pre-Call"},
          {id:"b", text:"In-Meeting"},
          {id:"c", text:"Post-Call"},
          {id:"d", text:"It doesn't belong to any specific phase"}
        ],
        correctId: "c",
        explain: "Documenting what was discussed and agreed happens after the call, alongside proactive reporting and adjusting as needed."
      },
      {
        id: "q3",
        text: "Which glossary term means summarizing key points and decisions so everyone shares an understanding?",
        options: [
          {id:"a", text:"Prioritize"},
          {id:"b", text:"Recap"},
          {id:"c", text:"Progress"},
          {id:"d", text:"Accountability"}
        ],
        correctId: "b",
        explain: "Recap closes out a conversation with a shared understanding — the same job Follow-Up does in A-E-O-F."
      },
      {
        id: "q4",
        text: "Good feedback, per this module, should be:",
        options: [
          {id:"a", text:"Vague, so it doesn't feel personal"},
          {id:"b", text:"Specific, timely, and focused on behaviors and outcomes"},
          {id:"c", text:"Delivered only during formal annual reviews"},
          {id:"d", text:"Focused on personal attributes rather than actions"}
        ],
        correctId: "b",
        explain: "Specific, timely, behavior-focused feedback is what actually changes outcomes — vague or personal feedback rarely does."
      }
    ]
  };
})();
