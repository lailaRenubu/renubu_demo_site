
// document.addEventListener('DOMContentLoaded', () => {
//   const wrap = document.querySelector('.new-resp .cards');
//   if (!wrap) return;

//   // 1) Duplicate the cards once for seamless looping
//   const children = Array.from(wrap.children);
//   children.forEach(node => wrap.appendChild(node.cloneNode(true)));

//   // 2) Set a sensible duration based on content width
//   const container = document.querySelector('.new-resp');
//   const pxPerSecond = 60; // tweak speed (higher = faster)
//   const trackWidth = wrap.scrollWidth / 2; // original (pre-dup) width
//   const dur = trackWidth / pxPerSecond;    // seconds to travel one "half"
//   wrap.style.setProperty('--dur', `${Math.max(20, Math.min(dur, 80))}s`);

//   // 3) Recompute on resize (debounced)
//   let t;
//   window.addEventListener('resize', () => {
//     clearTimeout(t);
//     t = setTimeout(() => {
//       const w = wrap.scrollWidth / 2;
//       const d = w / pxPerSecond;
//       wrap.style.setProperty('--dur', `${Math.max(20, Math.min(d, 80))}s`);
//     }, 150);
//   });
// });


document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('design-partner-form');
  const status = form.querySelector('.form-status');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        status.hidden = false;
        status.textContent = "Thanks! We’ve received your application.";
        form.reset();
      } else {
        status.hidden = false;
        status.textContent = "Hmm, something went wrong. Please try again.";
      }
    } catch {
      status.hidden = false;
      status.textContent = "Network error. Please try again.";
    }
  });
});


(function(){
  function setExpanded(btn, panel, expand){
    btn.setAttribute('aria-expanded', String(expand));
    if (expand){
      panel.hidden = false;
      panel.style.maxHeight = '0px';
      panel.style.maxHeight = panel.scrollHeight + 'px';
    } else {
      panel.style.maxHeight = panel.scrollHeight + 'px';
      requestAnimationFrame(()=>{ panel.style.maxHeight = '0px'; });
      panel.addEventListener('transitionend', function onEnd(){
        panel.hidden = true; panel.removeEventListener('transitionend', onEnd);
      });
    }
  }
  document.querySelectorAll('.collapsible__toggle').forEach(btn=>{
    const panel = document.querySelector(btn.getAttribute('data-target'));
    if (!panel) return;
    // collapsed by default (we only show these on mobile anyway)
    setExpanded(btn, panel, false);
    btn.addEventListener('click', ()=>{
      setExpanded(btn, panel, btn.getAttribute('aria-expanded') !== 'true');
    });
    // keep height synced (Calendly loads async)
    const ro = new ResizeObserver(()=>{
      if (btn.getAttribute('aria-expanded') === 'true'){
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
    ro.observe(panel);
  });
})();

