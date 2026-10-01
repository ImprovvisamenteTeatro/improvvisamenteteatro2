// Antonio bio hover
(function(){function initRobertaHover(){var card=document.getElementById(`roberta-card`),modal=document.getElementById(`roberta-modal`);if(!(!card||!modal)){var timer;card.addEventListener(`mouseenter`,function(){clearTimeout(timer),modal.style.setProperty(`display`,`flex`,`important`)}),card.addEventListener(`mouseleave`,function(e){
// Check if mouse moved to the modal
var rect=modal.getBoundingClientRect();e.clientX>=rect.left&&e.clientX<=rect.right&&e.clientY>=rect.top&&e.clientY<=rect.bottom||(timer=setTimeout(function(){modal.style.setProperty(`display`,`none`,`important`),document.body.style.overflow=``},150))}),modal.addEventListener(`mouseenter`,function(){clearTimeout(timer)}),modal.addEventListener(`mouseleave`,function(){timer=setTimeout(function(){modal.style.setProperty(`display`,`none`,`important`),document.body.style.overflow=``},150)})}}
// Init when DOM is ready
document.readyState===`loading`?document.addEventListener(`DOMContentLoaded`,initRobertaHover):initRobertaHover()})(),(function(){function initAntonioHover(){var card=document.getElementById(`antonio-card`),modal=document.getElementById(`antonio-modal`);if(!(!card||!modal)){var timer;card.addEventListener(`mouseenter`,function(){clearTimeout(timer),modal.style.setProperty(`display`,`flex`,`important`)}),card.addEventListener(`mouseleave`,function(e){var rect=modal.getBoundingClientRect();e.clientX>=rect.left&&e.clientX<=rect.right&&e.clientY>=rect.top&&e.clientY<=rect.bottom||(timer=setTimeout(function(){modal.style.setProperty(`display`,`none`,`important`)},150))}),modal.addEventListener(`mouseenter`,function(){clearTimeout(timer)}),modal.addEventListener(`mouseleave`,function(){timer=setTimeout(function(){modal.style.setProperty(`display`,`none`,`important`)},150)})}}document.readyState===`loading`?document.addEventListener(`DOMContentLoaded`,initAntonioHover):initAntonioHover()})();function openAntonioBio(){document.getElementById(`antonio-modal`).style.setProperty(`display`,`flex`,`important`)}function closeAntonioBio(){document.getElementById(`antonio-modal`).style.setProperty(`display`,`none`,`important`)}function openRobertaBio(){var m=document.getElementById(`roberta-modal`);m&&(m.style.setProperty(`display`,`flex`,`important`),document.body.style.overflow=`hidden`)}function closeRobertaBio(){var m=document.getElementById(`roberta-modal`);m&&(m.style.setProperty(`display`,`none`,`important`),document.body.style.overflow=``)}function showView(v){
// Overlay flash
var overlay=document.getElementById('view-overlay');
if(overlay){overlay.classList.add('active');setTimeout(function(){overlay.classList.remove('active');},250);}
// Hide ALL views
[`site-view`,`corsi-view`,`accademia-view`,`chisiamo-view`,`eventi-view`,`b2b-view`,`corso-view`,`corso-view-extra`,`pf-view`,`openday-view`,`contatti-view`,`gallery-view`,`metodo-view`].forEach(function(id){var el=document.getElementById(id);if(el){el.style.setProperty(`display`,`none`,`important`);el.classList.add(`spa-hidden`);}});
// Show target
var target=document.getElementById(v+`-view`);
if(target){target.style.setProperty(`display`,`block`,`important`);target.classList.remove(`spa-hidden`);}
if(v==='corso'){var extra=document.getElementById('corso-view-extra');if(extra){extra.style.setProperty('display','block','important');extra.classList.remove('spa-hidden');}}
// Urgency bar
[`urgency-bar`,`urgency-popup`].forEach(function(id){var el=document.getElementById(id);el&&(el.style.display=v===`site`?``:`none`)});
// Mobile menu close
var mm=document.getElementById(`mobileMenu`);mm&&(mm.style.display=`none`,mm.classList.remove(`open`));
var hb=document.getElementById(`hamburger`);hb&&(hb.classList.remove(`open`),hb.setAttribute(`aria-expanded`,`false`));
document.body.style.overflow=``;
// Nav active highlight
document.querySelectorAll(`.nav-links a`).forEach(function(a){
  a.classList.remove(`nav-active`);
  (a.getAttribute(`onclick`)||``).indexOf(`showView('`+v+`')`)>-1&&a.classList.add(`nav-active`);
});
window.scrollTo(0,0);
if (window.__triggerReveal) window.__triggerReveal();
// Deep link: aggiorna l'URL con la sezione corrente, così si può linkare
// o condividere direttamente una sezione (es. sito.it/#corsi) e il tasto
// indietro del browser torna alla sezione precedente.
if (!window.__spaSuppressPush) {
  try {
    var __hash = '#' + v;
    if (location.hash !== __hash) { history.pushState({view:v}, '', __hash); }
  } catch(e){}
}
}
// ── BOLLE DI SAPONE: decorazione fluttuante, si muove su/giù con lo scroll ──
(function(){
  var layer = document.getElementById('bubbles-layer');
  if (!layer) return;
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;
  var palette = [
    ['#78e08a55','#5cc9f522'],
    ['#f7615255','#78e08a22'],
    ['#5cc9f555','#f7615222'],
    ['#78e08a44','#8200e822']
  ];
  var n = window.innerWidth < 700 ? 7 : 13;
  var bubbles = [];
  for (var i = 0; i < n; i++) {
    var b = document.createElement('div');
    b.className = 'bubble';
    var size = 16 + Math.random() * 58;
    b.style.width = size + 'px';
    b.style.height = size + 'px';
    b.style.left = (Math.random() * 94) + 'vw';
    b.style.top = (Math.random() * 90) + 'vh';
    var c = palette[i % palette.length];
    b.style.setProperty('--bubble-c1', c[0]);
    b.style.setProperty('--bubble-c2', c[1]);
    layer.appendChild(b);
    bubbles.push({
      el: b,
      speed: (Math.random() * 0.6 + 0.2) * (i % 2 === 0 ? 1 : -1),
      bobAmp: 8 + Math.random() * 16,
      bobSpeed: 0.0004 + Math.random() * 0.0006,
      phase: Math.random() * Math.PI * 2
    });
  }
  function tick(t) {
    var y = window.scrollY || window.pageYOffset || 0;
    for (var i = 0; i < bubbles.length; i++) {
      var bub = bubbles[i];
      var bob = Math.sin(t * bub.bobSpeed + bub.phase) * bub.bobAmp;
      var parallax = -(y * bub.speed * 0.12);
      var drift = Math.cos(t * bub.bobSpeed * 0.7 + bub.phase) * 8;
      bub.el.style.transform = 'translate(' + drift + 'px,' + (bob + parallax) + 'px)';
    }
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
})();

function toggleMenu(){var menu=document.getElementById(`mobileMenu`),ham=document.getElementById(`hamburger`);!menu||!ham||(menu.style.display===`flex`?(menu.classList.remove(`open`),ham.classList.remove(`open`),ham.setAttribute(`aria-expanded`,`false`),document.body.style.overflow=``,setTimeout(function(){menu.style.display=`none`},280)):(menu.style.display=`flex`,requestAnimationFrame(function(){menu.classList.add(`open`)}),ham.classList.add(`open`),ham.setAttribute(`aria-expanded`,`true`),document.body.style.overflow=`hidden`))}
// Close menu when clicking outside
document.addEventListener(`click`,function(e){var nav=document.getElementById(`navLinks`),ham=document.getElementById(`hamburger`);!nav||!ham||nav.classList.contains(`open`)&&!nav.contains(e.target)&&!ham.contains(e.target)&&(nav.classList.remove(`open`),ham.classList.remove(`open`),document.body.style.overflow=``)});
;
(function(){var btn=document.getElementById(`pf-main-btn`),tip=document.getElementById(`pf-tooltip`),wrap=document.getElementById(`pf-btn-wrapper`);!btn||!tip||!wrap||(wrap.addEventListener(`mouseenter`,function(){var r=wrap.getBoundingClientRect(),margin=12,w=Math.min(320,window.innerWidth-margin*2);tip.style.width=w+`px`,tip.style.top=r.bottom+8+`px`,tip.style.left=window.innerWidth-w-margin+`px`,tip.style.display=`block`}),wrap.addEventListener(`mouseleave`,function(){tip.style.display=`none`}))})();
;
(function(){function animateCounters(){document.querySelectorAll(`#about-stats-box .about-num[data-target]`).forEach(function(el){var target=parseInt(el.getAttribute(`data-target`)),suffix=el.getAttribute(`data-suffix`)||``,duration=1800,start=null,startVal=0;function easeOut(t){return 1-(1-t)**3}function step(ts){start||=ts;var elapsed=ts-start,progress=Math.min(elapsed/duration,1);el.textContent=Math.round(startVal+easeOut(progress)*(target-startVal))+suffix,progress<1?requestAnimationFrame(step):el.textContent=target+suffix}requestAnimationFrame(step)})}
// Trigger when box enters viewport
var box=document.getElementById(`about-stats-box`);if(box){var triggered=!1,obs=new IntersectionObserver(function(entries){entries[0].isIntersecting&&!triggered&&(triggered=!0,animateCounters(),obs.disconnect())},{threshold:.3});obs.observe(box)}})();
;

// ── VIEW NAVIGATION ──────────────────────────────────
// showView is already defined earlier in the page
// This script handles reveal animations and nav active states

// ── REVEAL ANIMATION OBSERVER ────────────────────────
(function(){
  if(!window.IntersectionObserver){
    document.querySelectorAll('.reveal').forEach(function(el){ el.classList.add('visible'); });
    return;
  }
  var obs = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, {threshold:0.1});
  document.querySelectorAll('.reveal').forEach(function(el){ obs.observe(el); });
  // Ricontrollo manuale dopo un cambio di view (gli elementi appena mostrati
  // potrebbero già essere in viewport e l'observer non li ha ancora notificati)
  window.__triggerReveal = function(){
    document.querySelectorAll('.reveal:not(.visible)').forEach(function(el){
      var r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) {
        el.classList.add('visible');
        obs.unobserve(el);
      }
    });
  };
})();

// ── HIGHLIGHT COURSE SECTION ─────────────────────────
function showCorsoAnchor(id){
  showView('corsi');
  setTimeout(function(){
    var el = document.getElementById(id);
    if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
  }, 200);
}

;
// ── STICKY NAV — scroll class ─────────────────
(function(){var nav=document.getElementById(`mainNav`);if(!nav)return;function upd(){nav.classList.toggle(`scrolled`,window.scrollY>60)}window.addEventListener(`scroll`,upd,{passive:!0}),upd()})();
;
(function(){
var popup = document.getElementById('b2b-popup');
var b2bTimer = null;
window.closeb2bPopup = function(){
  if(!popup) return;
  popup.style.opacity = '0';
  var d = popup.querySelector('div');
  if(d) d.style.transform = 'translateX(100%)';
  setTimeout(function(){ popup.style.display = 'none'; }, 400);
  sessionStorage.setItem('b2b_popup_dismissed','1');
};
var _origSV = window.showView;
window.showView = function(view){
  typeof _origSV === 'function' && _origSV(view);
  clearTimeout(b2bTimer);
  if(view === 'b2b' && popup && !sessionStorage.getItem('b2b_popup_dismissed')){
    b2bTimer = setTimeout(function(){
      popup.style.display = 'flex';
      popup.style.opacity = '0';
      var d = popup.querySelector('div');
      if(d) d.style.transform = 'translateX(100%)';
      requestAnimationFrame(function(){
        popup.style.opacity = '1';
        if(d) d.style.transform = 'translateX(0)';
      });
    }, 8000);
  } else if(popup) {
    popup.style.display = 'none';
  }
};
})();
;

document.addEventListener('submit', function(e) {
  var f = e.target;
  var formId = f.id;
  var formName = f.getAttribute('name');

  // ── OPEN DAY ──
  if (formId === 'od-form' || formName === 'open-day-booking') {
    e.preventDefault();
    if (window.dataLayer) window.dataLayer.push({event:'generate_lead',lead_type:'open_day'});
    var el = document.getElementById('od-form'); if (el) el.style.display = 'none';
    var hdr = document.getElementById('form-box-header'); if (hdr) hdr.style.display = 'none';
    var suc = document.getElementById('od-success'); if (suc) suc.style.display = 'block';
    fetch('/', {method:'POST', headers:{'Content-Type':'application/x-www-form-urlencoded'}, body: new URLSearchParams(new FormData(f)).toString()}).catch(function(){});
  }

  // ── BROCHURE ──
  if (formId === 'brochure-form' || formName === 'brochure-request') {
    e.preventDefault();
    var nome = f.querySelector('[name=nome]');
    var email = f.querySelector('[name=email]');
    var err = document.getElementById('brochure-err');
    if (!nome || !nome.value.trim() || !email || !email.value.trim()) {
      if (err) { err.textContent = 'Nome e email sono obbligatori.'; err.style.display = 'block'; }
      return;
    }
    if (err) err.style.display = 'none';
    if (window.dataLayer) window.dataLayer.push({event:'generate_lead',lead_type:'brochure'});
    var hdr = document.getElementById('brochure-form-header'); if (hdr) hdr.style.display = 'none';
    f.style.display = 'none';
    var suc = document.getElementById('brochure-success'); if (suc) suc.style.display = 'block';
    setTimeout(function(){
      var a = document.createElement('a');
      a.href = '/brochure-improvvisamenteteatro.pdf';
      a.download = 'Brochure-Improvvisamente-Teatro-2026-27.pdf';
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
    }, 500);
    fetch('/', {method:'POST', headers:{'Content-Type':'application/x-www-form-urlencoded'}, body: new URLSearchParams(new FormData(f)).toString()}).catch(function(){});
  }

  // ── B2B ──
  if (formId === 'b2b-main-form' || formName === 'b2b-lead') {
    e.preventDefault();
    if (window.dataLayer) window.dataLayer.push({event:'generate_lead',lead_type:'b2b'});
    f.style.display = 'none';
    var suc = document.getElementById('b2b-form-success'); if (suc) suc.style.display = 'block';
    fetch('/', {method:'POST', headers:{'Content-Type':'application/x-www-form-urlencoded'}, body: new URLSearchParams(new FormData(f)).toString()}).catch(function(){});
  }
});

// ── MASTERCLASS TABS (Cinema / Teatro / Comunicazione) ──
function showMasterclassCat(cat) {
  ['cinema', 'teatro', 'comunicazione'].forEach(function (c) {
    var panel = document.getElementById('masterclass-panel-' + c);
    var tab = document.getElementById('masterclass-tab-' + c);
    if (panel) panel.style.display = (c === cat ? 'grid' : 'none');
    if (tab) tab.classList.toggle('active', c === cat);
  });
  if (window.__triggerReveal) requestAnimationFrame(function(){ window.__triggerReveal(); });
}

// ── LINK DIRETTI ALLE SEZIONI (deep link) ───────────────
// Permette di condividere/aprire un link tipo sito.it/#corsi e arrivare
// direttamente a quella sezione, invece che sempre alla home. Gestisce
// anche il tasto Indietro/Avanti del browser.
(function(){
  var validViews = ['site','corsi','accademia','chisiamo','eventi','b2b','corso','pf','openday','contatti','gallery','metodo'];

  function viewFromHash(){
    var h = (location.hash || '').replace('#', '');
    return validViews.indexOf(h) > -1 ? h : null;
  }

  // Richiama showView senza far scattare un nuovo pushState (lo gestiamo
  // già qui separatamente con replaceState, per non "sporcare" la history
  // con doppie voci quando sincronizziamo invece di navigare).
  function goTo(v){
    if (typeof showView !== 'function') return;
    window.__spaSuppressPush = true;
    try { showView(v); } finally { window.__spaSuppressPush = false; }
  }

  function init(){
    var v = viewFromHash();
    if (v) {
      goTo(v);
      history.replaceState({view:v}, '', '#' + v);
    } else {
      history.replaceState({view:'site'}, '', location.pathname + location.search);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.addEventListener('popstate', function(e){
    var v = (e.state && e.state.view) || viewFromHash() || 'site';
    goTo(v);
  });
})();
