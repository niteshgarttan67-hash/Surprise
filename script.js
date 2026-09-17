(function(){
  "use strict";
  var TARGET = new Date(2026, 8, 19, 0, 0, 0); // 19 September 2026
  var NAME = "Arsh";

  /* ---------- floating hearts ---------- */
  (function hearts(){
    var box = document.getElementById('hearts'), glyphs=['❤','💗','🤍','💕'];
    for(var i=0;i<16;i++){
      var h=document.createElement('i');
      h.textContent=glyphs[i%glyphs.length];
      h.style.left=(Math.random()*96)+'%';
      h.style.fontSize=(12+Math.random()*26)+'px';
      h.style.animationDuration=(11+Math.random()*12)+'s';
      h.style.animationDelay=(-Math.random()*20)+'s';
      box.appendChild(h);
    }
  })();

  /* ---------- countdown ---------- */
  var clocks = document.querySelectorAll('[data-clock]');
  function two(n){return n<10?'0'+n:''+n;}
  function tick(){
    var ms = TARGET - new Date();
    var html;
    if(ms<=0){
      html = '<div class="unit" style="min-width:auto"><b style="font-size:24px">Our day is here 🤍</b></div>';
    } else {
      var s=Math.floor(ms/1000), d=Math.floor(s/86400), h=Math.floor(s%86400/3600),
          m=Math.floor(s%3600/60), sec=s%60;
      html = '<div class="unit"><b>'+two(d)+'</b><small>DAYS</small></div><span class="sep">:</span>'
           + '<div class="unit"><b>'+two(h)+'</b><small>HRS</small></div><span class="sep">:</span>'
           + '<div class="unit"><b>'+two(m)+'</b><small>MIN</small></div><span class="sep">:</span>'
           + '<div class="unit"><b>'+two(sec)+'</b><small>SEC</small></div>';
    }
    for(var i=0;i<clocks.length;i++) clocks[i].innerHTML=html;
  }
  tick(); setInterval(tick,1000);

  /* ---------- confetti ---------- */
  var cv=document.getElementById('confetti'), cx=cv.getContext('2d'), bits=[], raf=null;
  function size(){ cv.width=cv.offsetWidth; cv.height=cv.offsetHeight; }
  size(); window.addEventListener('resize',size);
  var COLORS=['#E8467C','#FF8FB1','#FFD36E','#FFFFFF','#F4A6C0','#D31E62'];
  function confetti(n){
    n=n||90;
    for(var i=0;i<n;i++) bits.push({
      x:Math.random()*cv.width, y:-20-Math.random()*cv.height*.4,
      w:5+Math.random()*7, h:7+Math.random()*9,
      c:COLORS[(Math.random()*COLORS.length)|0],
      vy:1.6+Math.random()*2.8, vx:-1+Math.random()*2,
      r:Math.random()*6, vr:-.15+Math.random()*.3, heart:Math.random()<.28
    });
    if(!raf) raf=requestAnimationFrame(draw);
  }
  function draw(){
    cx.clearRect(0,0,cv.width,cv.height);
    for(var i=bits.length-1;i>=0;i--){
      var b=bits[i]; b.x+=b.vx; b.y+=b.vy; b.r+=b.vr;
      cx.save(); cx.translate(b.x,b.y); cx.rotate(b.r); cx.fillStyle=b.c;
      if(b.heart){ cx.font=b.w*2.2+'px serif'; cx.fillText('♥',0,0); }
      else cx.fillRect(-b.w/2,-b.h/2,b.w,b.h);
      cx.restore();
      if(b.y>cv.height+30) bits.splice(i,1);
    }
    raf = bits.length ? requestAnimationFrame(draw) : null;
    if(!raf) cx.clearRect(0,0,cv.width,cv.height);
  }

  /* ---------- navigation ---------- */
  var screens=document.querySelectorAll('.screen'), cur=0;
  var backBtn=document.getElementById('backBtn');
  function go(i){
    if(i<0||i>=screens.length) return;
    screens[cur].classList.remove('active');
    cur=i; screens[cur].classList.add('active');
    screens[cur].scrollTop=0;
    backBtn.hidden = (cur===0);
    if(cur===6) revealPromises();
  }
  backBtn.addEventListener('click',function(){ go(cur-1); });
  Array.prototype.forEach.call(document.querySelectorAll('[data-next]'),function(b){
    b.addEventListener('click',function(){ go(cur+1); });
  });

  /* ---------- landing: the runaway "No" ---------- */
  var noBtn=document.getElementById('noBtn'), yesBtn=document.getElementById('yesBtn');
  function dodge(){
    var box=noBtn.parentElement.getBoundingClientRect();
    var maxL=Math.max(0, box.width - noBtn.offsetWidth - 6);
    noBtn.style.left = (Math.random()*maxL) + 'px';
    noBtn.style.top  = (Math.random()*22) + 'px';
  }
  noBtn.addEventListener('mouseenter',dodge);
  noBtn.addEventListener('touchstart',function(e){ e.preventDefault(); dodge(); },{passive:false});
  noBtn.addEventListener('click',function(e){ e.preventDefault(); dodge(); });
  yesBtn.addEventListener('click',function(){ confetti(70); go(1); });

  /* ---------- love meter ---------- */
  var meter=document.getElementById('meter'), fill=document.getElementById('meterFill'),
      pct=document.getElementById('meterPct'), hand=document.getElementById('meterHand'),
      msg=document.getElementById('meterMsg'), mNext=document.getElementById('meterNext'), val=0;
  function bump(){
    if(val>=100) return;
    val=Math.min(100,val+8);
    fill.style.height=val+'%'; pct.textContent=val+'%';
    if(val>55) meter.classList.add('hot');
    if(val>=100){
      hand.style.display='none';
      msg.textContent='100% yours.';
      confetti(140); mNext.style.display='';
    }
  }
  meter.addEventListener('click',bump);
  meter.addEventListener('keydown',function(e){ if(e.key==='Enter'||e.key===' '){e.preventDefault();bump();} });

  /* ---------- pinky promise ---------- */
  var pad=document.getElementById('touchpad'), pNext=document.getElementById('pinkyNext'), held=null;
  function promise(){
    if(held) return;
    held=true; pad.style.opacity='0';
    confetti(120); pNext.style.display='';
    var art=pad.parentElement.querySelector('.art');
    art.animate([{transform:'scale(1)'},{transform:'scale(1.16)'},{transform:'scale(1)'}],{duration:600,easing:'ease'});
  }
  pad.addEventListener('click',promise);
  pad.addEventListener('touchstart',promise,{passive:true});

  /* ---------- cake ---------- */
  var candle=document.getElementById('candle'), card=document.getElementById('cakecard'),
      veil=document.getElementById('wishveil'), cNext=document.getElementById('cakeNext'), blown=null;
  function blowOut(){
    if(blown) return; blown=true;
    card.classList.add('out');
    veil.classList.add('show');
    setTimeout(function(){ confetti(110); cNext.style.display=''; },900);
  }
  card.addEventListener('click',blowOut);
  // optional: real mic blow detection
  function listen(){
    if(!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) return;
    navigator.mediaDevices.getUserMedia({audio:true}).then(function(stream){
      var AC=window.AudioContext||window.webkitAudioContext; if(!AC) return;
      var ac=new AC(), src=ac.createMediaStreamSource(stream), an=ac.createAnalyser();
      an.fftSize=512; src.connect(an);
      var buf=new Uint8Array(an.frequencyBinCount), loud=0;
      (function poll(){
        if(blown){ stream.getTracks().forEach(function(t){t.stop();}); return; }
        an.getByteFrequencyData(buf);
        var sum=0; for(var i=0;i<buf.length;i++) sum+=buf[i];
        loud = (sum/buf.length > 42) ? loud+1 : 0;
        if(loud>7) blowOut();
        requestAnimationFrame(poll);
      })();
    }).catch(function(){});
  }
  candle.addEventListener('click',function(e){ e.stopPropagation(); listen(); blowOut(); });
  document.querySelector('[data-i="3"] .btn')&&0;

  /* ---------- letter ---------- */
  var LETTER =
"Dear "+NAME+",\n\n"+
"It's our day again \u2014 19 September.\n\n"+
"From the very first day, you have been my favourite chapter \u2014 the one I keep re-reading.\n\n"+
"Thank you for the small things. The morning glances. The shared silences. The way you say my name like it matters.\n\n"+
"Here's to us \u2014 and to every ordinary day you quietly make beautiful.\n\n"+
"Always yours \u2764\ufe0f";
  var env=document.getElementById('envelope'), envWrap=document.getElementById('envWrap'),
      paper=document.getElementById('paper'), out=document.getElementById('letterText'),
      lNext=document.getElementById('letterNext'), opened=null;
  function openLetter(){
    if(opened) return; opened=true;
    envWrap.style.display='none'; paper.style.display='';
    var i=0;
    (function type(){
      out.textContent = LETTER.slice(0,i++);
      paper.scrollTop = paper.scrollHeight;
      if(i<=LETTER.length) setTimeout(type,22);
      else lNext.style.display='';
    })();
  }
  env.addEventListener('click',openLetter);
  env.addEventListener('keydown',function(e){ if(e.key==='Enter'||e.key===' '){e.preventDefault();openLetter();} });

  /* ---------- promises reveal ---------- */
  var revealed=null;
  function revealPromises(){
    if(revealed) return; revealed=true;
    var bubs=document.querySelectorAll('#promisewrap .bub');
    Array.prototype.forEach.call(bubs,function(b,i){ setTimeout(function(){ b.classList.add('in'); }, 260*i); });
  }

  /* ---------- gift ---------- */
  var gift=document.getElementById('gift'), taps=0,
      giftStage=document.getElementById('giftStage'), finalStage=document.getElementById('finalStage');
  function tapGift(){
    taps++;
    gift.classList.remove('shake'); void gift.offsetWidth; gift.classList.add('shake');
    confetti(30);
    if(taps>=3){
      setTimeout(function(){
        giftStage.style.display='none'; finalStage.style.display='';
        confetti(200);
        setTimeout(function(){ confetti(140); },700);
      },380);
    }
  }
  gift.addEventListener('click',tapGift);
  gift.addEventListener('keydown',function(e){ if(e.key==='Enter'||e.key===' '){e.preventDefault();tapGift();} });

  document.getElementById('replay').addEventListener('click',function(){ location.reload(); });

  /* ---------- music ---------- */
  var mBtn=document.getElementById('musicBtn'), ac=null, gain=null, timer=null, on=false;
  var MELODY=[523.25,659.25,783.99,659.25,587.33,698.46,880.00,698.46,
              493.88,587.33,739.99,587.33,523.25,659.25,783.99,1046.50];
  function note(f,t,dur){
    var o=ac.createOscillator(), g=ac.createGain();
    o.type='triangle'; o.frequency.value=f;
    g.gain.setValueAtTime(0,t);
    g.gain.linearRampToValueAtTime(.22,t+.03);
    g.gain.exponentialRampToValueAtTime(.001,t+dur);
    o.connect(g); g.connect(gain); o.start(t); o.stop(t+dur+.05);
  }
  function play(){
    var t=ac.currentTime+.05;
    for(var i=0;i<MELODY.length;i++) note(MELODY[i], t+i*.42, .85);
  }
  mBtn.addEventListener('click',function(){
    var AC=window.AudioContext||window.webkitAudioContext;
    if(!AC){ return; }
    if(!ac){ ac=new AC(); gain=ac.createGain(); gain.gain.value=.16; gain.connect(ac.destination); }
    if(ac.state==='suspended') ac.resume();
    on=!on;
    mBtn.textContent = on ? '🔊' : '🔈';
    if(on){ play(); timer=setInterval(play, MELODY.length*420); }
    else { clearInterval(timer); timer=null; gain.gain.value=0; setTimeout(function(){ gain.gain.value=.16; },10); }
  });
})();
