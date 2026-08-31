/* ============================================================
   Personalize — lightweight {name} token substitution used in
   instructions / coaching points / simulation feedback so the
   course reads like someone is walking alongside the learner,
   not just a static document. Falls back gracefully if no name
   has been captured yet (the name-gate modal in nav.js is the
   normal way a name gets set, but nothing here depends on it).
   ============================================================ */
(function(){
  function firstName(){
    var full = (window.Storage && Storage.getLearnerName() || "").trim();
    if (!full) return "";
    return full.split(/\s+/)[0];
  }

  function personalize(str){
    if (!str) return str;
    var name = firstName();
    if (name){
      return str.replace(/\{name\}/g, name);
    }
    // No name yet: drop the vocative gracefully rather than printing "{name}".
    return str
      .replace(/,\s*\{name\}\s*,/g, ",")
      .replace(/\{name\},\s*/g, "")
      .replace(/\{name\}/g, "you");
  }

  window.Personalize = { text: personalize, firstName: firstName };
})();
