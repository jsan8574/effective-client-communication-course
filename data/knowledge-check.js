(function(){
  window.KC_DATA = {
    id: "kc",
    questions: [
      // Module 1
      { id:"k1", text:"When a project hits a problem, the client is silently evaluating three things. Which set is correct?", options:[
          {id:"a", text:"Budget, timeline, scope"},
          {id:"b", text:"Understanding, control, trust"},
          {id:"c", text:"Speed, accuracy, cost"},
          {id:"d", text:"Blame, cause, fix"}
        ], correctId:"b", explain:"Do they understand the situation? Do they have control over it? Can I trust them to manage this?" },
      { id:"k2", text:"“I trust them to lead this” is the client reaction the framework associates with which level?", options:[
          {id:"a", text:"Inform"},
          {id:"b", text:"Influence"},
          {id:"c", text:"Inspire"},
          {id:"d", text:"Escalate"}
        ], correctId:"c", explain:"Inspire elevates the situation toward confidence and partnership." },
      { id:"k3", text:"A message is low-urgency but low-sensitivity. Best channel?", options:[
          {id:"a", text:"Call or in-person"},
          {id:"b", text:"Asynchronous update"},
          {id:"c", text:"Emergency escalation"},
          {id:"d", text:"Skip communicating it"}
        ], correctId:"b", explain:"Low urgency + low sensitivity maps to an asynchronous update — no need for a live conversation." },
      { id:"k4", text:"What's wrong with responding to a client complaint with “Yes, but we've been really busy”?", options:[
          {id:"a", text:"Nothing, it's honest"},
          {id:"b", text:"It leads with justification instead of acknowledgment, which reads as defensive"},
          {id:"c", text:"It's too short"},
          {id:"d", text:"It uses too much jargon"}
        ], correctId:"b", explain:"“Yes, but…” language defends your position before acknowledging the client's concern." },
      // Module 2
      { id:"k5", text:"BLUF stands for:", options:[
          {id:"a", text:"Best Line Up Front"},
          {id:"b", text:"Bottom Line Up Front"},
          {id:"c", text:"Basic Layout Update Format"},
          {id:"d", text:"Building Long-term Understanding First"}
        ], correctId:"b", explain:"State the conclusion before the supporting detail." },
      { id:"k6", text:"In Problem → Insight → Action → Impact, “Impact” refers to:", options:[
          {id:"a", text:"What caused the problem"},
          {id:"b", text:"What you did about it"},
          {id:"c", text:"The result the audience actually experiences now"},
          {id:"d", text:"An apology for the delay"}
        ], correctId:"c", explain:"Impact is the payoff — the outcome the client feels as a result of the action taken." },
      { id:"k7", text:"“Frame → Anchor → Explain” — what does Anchor do?", options:[
          {id:"a", text:"Introduces the challenge"},
          {id:"b", text:"Highlights progress or success already made"},
          {id:"c", text:"Ends the conversation abruptly"},
          {id:"d", text:"Restates the client's complaint"}
        ], correctId:"b", explain:"Anchor comes after Frame and reinforces progress before Explain introduces the challenge." },
      { id:"k8", text:"“Fosters stronger relationships” and “builds reliability” are WIIFM benefits that land primarily with:", options:[
          {id:"a", text:"Clients"},
          {id:"b", text:"Leaders"},
          {id:"c", text:"Vendors"},
          {id:"d", text:"Neither party"}
        ], correctId:"b", explain:"These were listed on the leader side of the WIIFM benefit sort — the client-side equivalents were trust and confidence." },
      // Module 3
      { id:"k9", text:"Which is an example of healthy (task) conflict rather than unhealthy (relationship) conflict?", options:[
          {id:"a", text:"A personal attack on a teammate's competence"},
          {id:"b", text:"Two leaders disagreeing on the best approach to a problem"},
          {id:"c", text:"Ignoring an issue until it becomes an escalation"},
          {id:"d", text:"Assigning blame after a missed deadline"}
        ], correctId:"b", explain:"Task conflict — disagreement over ideas and approach — is healthy. Relationship conflict (ego, personal attacks) is not." },
      { id:"k10", text:"“Is my team underperforming?” is the kind of question that surfaces in which layer of a difficult conversation?", options:[
          {id:"a", text:"What Happened?"},
          {id:"b", text:"Feelings"},
          {id:"c", text:"Identity"},
          {id:"d", text:"Logistics"}
        ], correctId:"c", explain:"This question is about what the situation means about you or your team — the Identity conversation." },
      { id:"k11", text:"“Lack of clarity on ownership” and “conflicting timelines” are examples of which situation type?", options:[
          {id:"a", text:"Missed SLAs"},
          {id:"b", text:"Scope creep"},
          {id:"c", text:"Team misalignment"},
          {id:"d", text:"Executive escalation"}
        ], correctId:"c", explain:"These describe teams operating with different priorities or assumptions — misalignment." },
      { id:"k12", text:"In A-E-O-F, which stage is “We will complete the review and send the updated report by today”?", options:[
          {id:"a", text:"Acknowledge"},
          {id:"b", text:"Explain"},
          {id:"c", text:"Offer"},
          {id:"d", text:"Follow-Up"}
        ], correctId:"c", explain:"A concrete next step or solution is the Offer stage." },
      // Module 4
      { id:"k13", text:"Which SPARK trait is defined as staying confident and competent despite a difficult situation?", options:[
          {id:"a", text:"Preparedness"},
          {id:"b", text:"Resilience"},
          {id:"c", text:"Kindheartedness"},
          {id:"d", text:"Straightforwardness"}
        ], correctId:"b", explain:"Resilience is confidence and competence under adversity." },
      { id:"k14", text:"In the Pyramid Principle, evidence and data belong at:", options:[
          {id:"a", text:"The top level, before the conclusion"},
          {id:"b", text:"The bottom level, supporting the arguments above"},
          {id:"c", text:"Nowhere — the Pyramid Principle avoids data"},
          {id:"d", text:"Only in written reports, never spoken"}
        ], correctId:"b", explain:"Top: conclusion. Second: arguments. Third: data/evidence that substantiates the arguments." },
      { id:"k15", text:"In the billing crisis scenario (1,000 claims, 3 billers at 80/day), what was the real daily capacity?", options:[
          {id:"a", text:"1,000 claims"},
          {id:"b", text:"240 claims"},
          {id:"c", text:"80 claims"},
          {id:"d", text:"500 claims"}
        ], correctId:"b", explain:"3 billers × 80/day = 240/day — nowhere near the 1,000 needed, which is why an honest capacity check mattered before any promise." },
      { id:"k16", text:"“What's the biggest risk you see in this approach?” is an example of:", options:[
          {id:"a", text:"A filler phrase to avoid"},
          {id:"b", text:"A powerful, consultative question"},
          {id:"c", text:"An accusatory question to avoid"},
          {id:"d", text:"Small talk"}
        ], correctId:"b", explain:"It shifts the manager from “doing for the client” to “consulting the client.”" },
      // Module 5
      { id:"k17", text:"Which of the three feedback strategies is most often skipped, weakening the other two?", options:[
          {id:"a", text:"Solicit Strategically"},
          {id:"b", text:"Feedback-Friendly Culture"},
          {id:"c", text:"Act on Insights"},
          {id:"d", text:"None — all three are equally easy"}
        ], correctId:"c", explain:"Feedback that's never visibly acted on teaches clients their input doesn't matter." },
      { id:"k18", text:"“Scheduled Updates” and “Preparation” belong to which part of the client communication rhythm?", options:[
          {id:"a", text:"Pre-Call"},
          {id:"b", text:"In-Meeting"},
          {id:"c", text:"Post-Call"},
          {id:"d", text:"None of these phases"}
        ], correctId:"a", explain:"These are Pre-Call habits — setting up the conversation before it happens." },
      { id:"k19", text:"Which glossary term is defined as taking initiative to anticipate client needs before they arise?", options:[
          {id:"a", text:"Accountability"},
          {id:"b", text:"Proactive"},
          {id:"c", text:"Recap"},
          {id:"d", text:"Satisfaction"}
        ], correctId:"b", explain:"Proactive means forward-thinking and anticipating issues, not just responding after they surface." },
      { id:"k20", text:"Good client feedback, as defined in this course, should be specific, timely, and focused on:", options:[
          {id:"a", text:"Personal traits"},
          {id:"b", text:"Behaviors and outcomes"},
          {id:"c", text:"Team hierarchy"},
          {id:"d", text:"Past performance reviews only"}
        ], correctId:"b", explain:"Behavior- and outcome-focused feedback is actionable; personal-trait feedback rarely is." }
    ]
  };
})();
