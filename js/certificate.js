/* ============================================================
   Certificate — canvas-drawn certificate of completion.
   Draws learner name, total time invested, and knowledge-check
   score %, then exports as a PNG.
   ============================================================ */
(function(){
  var PALETTE = {
    white: "#ffffff", charcoal: "#373545", pale: "#cddbe6",
    tealBlue: "#3394ba", cyan: "#57b6c0", seaGreen: "#76bda7",
    slate: "#7a8c8f", dustyTeal: "#84acb6", primary: "#2683c6"
  };

  function draw(canvas, info){
    var W = canvas.width, H = canvas.height;
    var ctx = canvas.getContext("2d");

    // background
    ctx.fillStyle = PALETTE.white;
    ctx.fillRect(0,0,W,H);

    // gradient used for accent strokes/text below (corner panels removed per feedback)
    var grad = ctx.createLinearGradient(0,0,W,H);
    grad.addColorStop(0, PALETTE.primary);
    grad.addColorStop(0.5, PALETTE.tealBlue);
    grad.addColorStop(1, PALETTE.seaGreen);

    // outer border
    ctx.strokeStyle = PALETTE.charcoal;
    ctx.lineWidth = 3;
    ctx.strokeRect(28,28,W-56,H-56);
    ctx.strokeStyle = PALETTE.primary;
    ctx.lineWidth = 1.5;
    ctx.strokeRect(40,40,W-80,H-80);

    var cx = W/2, badgeY = 96;
    ctx.textAlign = "center"; ctx.textBaseline = "middle";

    ctx.fillStyle = PALETTE.slate;
    ctx.font = "700 15px Manrope, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("CERTIFICATE OF COMPLETION", cx, badgeY+90);

    ctx.fillStyle = PALETTE.charcoal;
    ctx.font = "800 34px Manrope, sans-serif";
    wrapText(ctx, info.courseTitle, cx, badgeY+140, W-260, 40);

    ctx.fillStyle = PALETTE.slate;
    ctx.font = "italic 17px Inter, sans-serif";
    ctx.fillText("This certifies that", cx, badgeY+220);

    ctx.fillStyle = PALETTE.primary;
    ctx.font = "800 46px Manrope, sans-serif";
    ctx.fillText(info.name || "Learner Name", cx, badgeY+275);
    // underline
    var nameWidth = ctx.measureText(info.name || "Learner Name").width;
    ctx.strokeStyle = PALETTE.dustyTeal;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx - nameWidth/2 - 10, badgeY+292);
    ctx.lineTo(cx + nameWidth/2 + 10, badgeY+292);
    ctx.stroke();

    ctx.fillStyle = PALETTE.charcoal;
    ctx.font = "16px Inter, sans-serif";
    ctx.fillText("has successfully completed all five modules of self-paced coursework,", cx, badgeY+330);
    ctx.fillText("including every knowledge check and the final graded assessment.", cx, badgeY+354);

    // stats row
    var statY = badgeY+420;
    drawStat(ctx, cx-220, statY, "TIME INVESTED", info.timeLabel);
    drawStat(ctx, cx, statY, "KNOWLEDGE CHECK SCORE", info.scoreLabel);
    drawStat(ctx, cx+220, statY, "DATE COMPLETED", info.dateLabel);

    ctx.fillStyle = PALETTE.slate;
    ctx.font = "12px Inter, sans-serif";
    ctx.fillText("Effective Client Communication Strategies — Self-Paced Course", cx, H-70);
  }

  function drawStat(ctx, x, y, label, value){
    ctx.textAlign = "center";
    ctx.fillStyle = PALETTE.slate;
    ctx.font = "700 11px Manrope, sans-serif";
    ctx.fillText(label, x, y);
    ctx.fillStyle = PALETTE.charcoal;
    ctx.font = "800 22px Manrope, sans-serif";
    ctx.fillText(value, x, y+28);
  }

  function wrapText(ctx, text, x, y, maxWidth, lineHeight){
    var words = text.split(" ");
    var line = "";
    var lines = [];
    for (var n=0;n<words.length;n++){
      var test = line + words[n] + " ";
      if (ctx.measureText(test).width > maxWidth && n>0){
        lines.push(line);
        line = words[n] + " ";
      } else {
        line = test;
      }
    }
    lines.push(line);
    var startY = y - ((lines.length-1)*lineHeight)/2;
    lines.forEach(function(l,i){ ctx.fillText(l.trim(), x, startY + i*lineHeight); });
  }

  window.CourseCertificate = { draw: draw };
})();
