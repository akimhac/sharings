/* Lightweight availability calendar (inline, no deps) */
(function () {
  const css = `
  .cal{--c:#ff385c;--b:#e5e7eb;--t:#222;--m:#717}
  .cal{font:14px system-ui,-apple-system,Segoe UI,Roboto,sans-serif;color:var(--t)}
  .cal .row{display:grid;grid-template-columns:repeat(7,1fr);gap:6px}
  .cal .head{display:flex;align-items:center;justify-content:space-between;margin:8px 0}
  .cal .btn{background:#fff;border:1px solid var(--b);padding:6px 10px;border-radius:8px;cursor:pointer}
  .cal .btn:hover{border-color:var(--c)}
  .cal .day{padding:10px;border:1px solid var(--b);border-radius:10px;text-align:center;cursor:pointer;user-select:none}
  .cal .day.dis{opacity:.35;cursor:not-allowed}
  .cal .day.sel{background:linear-gradient(135deg,var(--c),#e31c5f);color:#fff;border-color:transparent}
  `;
  const style = document.createElement('style'); style.innerText = css; document.head.appendChild(style);

  function build(root, opts) {
    const today = new Date(); today.setHours(0,0,0,0);
    let start = null, end = null;
    let view = new Date(); view.setDate(1);

    function render() {
      root.innerHTML = '';
      const head = document.createElement('div');
      head.className='head';
      const prev = btn('‹', ()=>{ view.setMonth(view.getMonth()-1); render(); });
      const next = btn('›', ()=>{ view.setMonth(view.getMonth()+1); render(); });
      const title = document.createElement('div'); title.style.fontWeight='700';
      title.textContent = view.toLocaleString('fr-FR',{ month:'long', year:'numeric' });
      head.append(prev,title,next);
      root.append(head);

      const rowH = document.createElement('div'); rowH.className='row';
      ['Lun','Mar','Mer','Jeu','Ven','Sam','Dim'].forEach(d=>{
        const el=document.createElement('div'); el.style.fontWeight='600'; el.style.textAlign='center'; el.textContent=d; rowH.appendChild(el);
      });
      root.append(rowH);

      const row = document.createElement('div'); row.className='row';
      const firstDay = (view.getDay()+6)%7; // Monday=0
      const daysInMonth = new Date(view.getFullYear(), view.getMonth()+1, 0).getDate();
      for (let i=0;i<firstDay;i++){ const s=document.createElement('div'); row.appendChild(s); }

      for (let d=1; d<=daysInMonth; d++){
        const date = new Date(view.getFullYear(), view.getMonth(), d);
        const el = document.createElement('div'); el.className='day'; el.textContent=String(d);
        if (opts.min && date < opts.min) el.classList.add('dis');
        el.onclick = ()=>{
          if (el.classList.contains('dis')) return;
          if (!start || (start && end)) { start = date; end=null; }
          else if (date < start) { end = start; start = date; }
          else { end = date; }
          opts.onChange?.({ start, end });
          highlight();
        };
        row.appendChild(el);
      }
      root.append(row);
      highlight();

      function highlight(){
        document.querySelectorAll('.day', row).forEach(el=>el.classList.remove('sel'));
        if (!start) return;
        const s = new Date(start); s.setHours(0,0,0,0);
        const e = end ? new Date(end) : s;
        for (let d=start.getDate(); d<= (end? end.getDate(): start.getDate()); d++){
          if (view.getMonth()!==s.getMonth()) break;
          const idx = d + firstDay -1;
          const el = row.children[idx];
          if (el) el.classList.add('sel');
        }
      }
    }
    function btn(txt, on){ const b=document.createElement('button'); b.className='btn'; b.textContent=txt; b.onclick=on; return b; }
    render();
  }

  window.SharingsCalendar = { mount: (selector, opts={})=>{
    const root = (typeof selector==='string') ? document.querySelector(selector): selector;
    if (!root) return;
    const wrap = document.createElement('div'); wrap.className='cal';
    root.appendChild(wrap);
    build(wrap, opts);
  }};
})();
