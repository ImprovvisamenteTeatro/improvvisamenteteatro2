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
var mm=document.getElementById(`mobileMenu`);mm&&(mm.style.display=`none`);
var hb=document.getElementById(`hamburger`);hb&&hb.classList.remove(`open`);
document.body.style.overflow=``;
// Nav active highlight
document.querySelectorAll(`.nav-links a`).forEach(function(a){
  a.classList.remove(`nav-active`);
  (a.getAttribute(`onclick`)||``).indexOf(`showView('`+v+`')`)>-1&&a.classList.add(`nav-active`);
});
window.scrollTo(0,0);
}function toggleMenu(){var menu=document.getElementById(`mobileMenu`),ham=document.getElementById(`hamburger`);!menu||!ham||(menu.style.display===`flex`?(menu.style.display=`none`,ham.classList.remove(`open`),document.body.style.overflow=``):(menu.style.display=`flex`,ham.classList.add(`open`),document.body.style.overflow=`hidden`))}
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
  if(!window.IntersectionObserver) return;
  var obs = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){
        e.target.classList.add('revealed');
        obs.unobserve(e.target);
      }
    });
  }, {threshold:0.1});
  document.querySelectorAll('.reveal').forEach(function(el){ obs.observe(el); });
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
