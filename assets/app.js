const SHORT = {spring:'SPR', summer:'SUM', fall:'FAL', winter:'WIN'};
const STORAGE_KEY = 'master-angler-caught';
const TOTAL = ZONES.reduce((a,z)=>a+z.fish.length,0);

let caught = new Set();
let seasonFilter = new Set();

const $ = id => document.getElementById(id);
const slug = n => n.toLowerCase().replace(/[^a-z0-9]+/g,'-');

/* ---------- build ---------- */
function render(){
  const frag = document.createDocumentFragment();

  ZONES.forEach(zone=>{
    const sec = document.createElement('section');
    sec.className = 'zone';
    sec.dataset.zone = zone.id;

    const head = document.createElement('div');
    head.className = 'zone-head';
    head.innerHTML =
      '<span class="zone-name">'+zone.name+'</span>' +
      '<span class="zone-note">'+zone.note+'</span>' +
      '<span class="zone-count" data-count="'+zone.id+'"></span>';
    sec.appendChild(head);

    zone.fish.forEach(f=>{
      const id = slug(f.n);
      const row = document.createElement('div');
      row.className = 'row';
      row.dataset.id = id;
      row.dataset.name = f.n.toLowerCase();
      row.dataset.where = (f.where||'').toLowerCase();
      row.dataset.seasons = f.s.join(' ');
      row.dataset.bundle = f.b ? '1' : '0';

      const isAll = f.s.length === 4;
      const seasonHTML = isAll
        ? '<span class="s all">ALL YEAR</span>'
        : f.s.map(s=>'<span class="s '+s+'">'+SHORT[s]+'</span>').join('');

      const wxLabel = f.w === 'rain' ? 'Rain' : f.w === 'sun' ? 'Sun' : 'Any';
      const tags =
        (f.b ? '<span class="tag">'+(f.b==='Field'?'Bulletin':f.b==='CrabPot'?'Crab Pot':f.b)+'</span>' : '') +
        (f.lv ? '<span class="tag lv">'+f.lv+'</span>' : '');

      row.innerHTML =
        '<input class="box" type="checkbox" id="fish-'+id+'" aria-label="'+f.n+'">' +
        '<span class="namecell"><label class="name" for="fish-'+id+'">'+f.n+'</label>' +
        '<span class="where">'+(f.where||'')+'</span></span>' +
        '<span class="seasons">'+seasonHTML+'</span>' +
        '<span class="time">'+f.t+'</span>' +
        '<span class="wx '+f.w+'">'+wxLabel+'</span>' +
        '<span class="tagcell">'+tags+'</span>';

      sec.appendChild(row);
    });

    frag.appendChild(sec);
  });

  $('list').appendChild(frag);

  $('list').addEventListener('change', e=>{
    if(!e.target.classList.contains('box')) return;
    const id = e.target.closest('.row').dataset.id;
    if(e.target.checked) caught.add(id); else caught.delete(id);
    save();
    paint();
  });
}

/* ---------- bundles ---------- */
function renderBundles(){
  $('bundles').innerHTML = BUNDLES.map(b=>{
    const lis = b.items.map(n=>'<li data-fish="'+slug(n)+'">'+n+'</li>').join('');
    const req = b.need < b.items.length
      ? 'Any '+b.need+' of these '+b.items.length+' · '+b.room
      : b.room;
    return '<article class="bundle" data-bundle="'+b.key+'">' +
             '<h3>'+b.title+'<span data-bcount="'+b.key+'"></span></h3>' +
             '<p class="req">'+req+'</p>' +
             '<ul>'+lis+'</ul>' +
           '</article>';
  }).join('');
}

/* ---------- state paint ---------- */
function paint(){
  document.querySelectorAll('.row').forEach(r=>{
    const on = caught.has(r.dataset.id);
    r.classList.toggle('caught', on);
    const box = r.querySelector('.box');
    if(box.checked !== on) box.checked = on;
  });

  ZONES.forEach(z=>{
    const done = z.fish.filter(f=>caught.has(slug(f.n))).length;
    const el = document.querySelector('[data-count="'+z.id+'"]');
    if(el) el.innerHTML = '<b>'+done+'</b> / '+z.fish.length;
    const sec = document.querySelector('[data-zone="'+z.id+'"]');
    if(sec) sec.classList.toggle('done', done === z.fish.length);
  });

  BUNDLES.forEach(b=>{
    let have = 0;
    document.querySelectorAll('[data-bundle="'+b.key+'"] li').forEach(li=>{
      const got = caught.has(li.dataset.fish);
      li.classList.toggle('got', got);
      if(got) have++;
    });
    const cap = Math.min(have, b.need);
    const el = document.querySelector('[data-bcount="'+b.key+'"]');
    if(el) el.textContent = cap+'/'+b.need;
    const card = document.querySelector('[data-bundle="'+b.key+'"]');
    if(card) card.classList.toggle('done', cap >= b.need);
  });

  const n = caught.size;
  const pct = Math.round(n / TOTAL * 100);
  $('caught').textContent = n;
  $('pct').textContent = pct+'%';
  $('fill').style.width = pct+'%';
  document.body.classList.toggle('is-perfect', n === TOTAL);

  applyFilters();
}

/* ---------- filters ---------- */
function applyFilters(){
  const q = $('search').value.trim().toLowerCase();
  const hide = $('hideCaught').checked;
  const bOnly = $('bundleOnly').checked;
  let shown = 0;

  document.querySelectorAll('.zone').forEach(zone=>{
    let visible = 0;
    zone.querySelectorAll('.row').forEach(row=>{
      let ok = true;
      if(seasonFilter.size){
        const rs = row.dataset.seasons.split(' ');
        ok = [...seasonFilter].some(s=>rs.includes(s));
      }
      if(ok && q) ok = row.dataset.name.includes(q) || row.dataset.where.includes(q);
      if(ok && hide && caught.has(row.dataset.id)) ok = false;
      if(ok && bOnly && row.dataset.bundle !== '1') ok = false;
      row.hidden = !ok;
      if(ok) visible++;
    });
    zone.hidden = visible === 0;
    shown += visible;
  });

  $('empty').classList.toggle('on', shown === 0);
}

/* ---------- storage ---------- */
/* ---------- storage ----------
   Inside a Claude artifact we use window.storage (follows your account).
   On GitHub Pages or a local file we fall back to localStorage, which is
   per-browser — use the backup buttons to move progress between devices. */
const hasStorage = typeof window !== 'undefined'
  && window.storage && typeof window.storage.set === 'function';

function say(msg){ $('status').textContent = msg; }

async function save(){
  const payload = JSON.stringify([...caught]);
  try{
    if(hasStorage){
      const ok = await window.storage.set(STORAGE_KEY, payload);
      say(ok ? 'Saved' : 'Not saved — check your connection');
      return;
    }
    window.localStorage.setItem(STORAGE_KEY, payload);
    say('Saved');
  }catch(e){
    say('Not saved — this session only');
  }
}

async function load(){
  try{
    if(hasStorage){
      const res = await window.storage.get(STORAGE_KEY);
      if(res && res.value) caught = new Set(JSON.parse(res.value));
      return;
    }
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if(raw) caught = new Set(JSON.parse(raw));
  }catch(e){
    /* nothing stored yet — start fresh */
  }
}

/* ---------- backup ---------- */
function backupCode(){
  return 'angler:' + btoa(JSON.stringify([...caught].sort()));
}

function readBackup(code){
  const trimmed = String(code).trim();
  if(!trimmed.startsWith('angler:')) return null;
  try{
    const ids = JSON.parse(atob(trimmed.slice(7)));
    if(!Array.isArray(ids)) return null;
    const valid = new Set(ZONES.flatMap(z => z.fish.map(f => slug(f.n))));
    return ids.filter(id => valid.has(id));
  }catch(e){ return null; }
}

async function copyBackup(){
  const code = backupCode();
  try{
    await navigator.clipboard.writeText(code);
    say('Backup copied — paste it somewhere safe');
  }catch(e){
    window.prompt('Copy this backup code:', code);
    say('Backup ready');
  }
}

async function restoreBackup(){
  const input = window.prompt('Paste a backup code:');
  if(input === null) return;
  const ids = readBackup(input);
  if(!ids){ say("That code didn't scan — it should start with angler:"); return; }
  caught = new Set(ids);
  await save();
  paint();
  say('Restored ' + ids.length + ' fish');
}

/* ---------- wire up ---------- */
$('seasonFilters').addEventListener('click', e=>{
  const btn = e.target.closest('.chip');
  if(!btn) return;
  const s = btn.dataset.season;
  const on = btn.getAttribute('aria-pressed') === 'true';
  btn.setAttribute('aria-pressed', String(!on));
  if(on) seasonFilter.delete(s); else seasonFilter.add(s);
  applyFilters();
});
$('search').addEventListener('input', applyFilters);
$('hideCaught').addEventListener('change', applyFilters);
$('bundleOnly').addEventListener('change', applyFilters);

$('export').addEventListener('click', copyBackup);
$('import').addEventListener('click', restoreBackup);

$('reset').addEventListener('click', async ()=>{
  if(!confirm('Uncheck all '+TOTAL+' fish? This cannot be undone.')) return;
  caught.clear();
  await save();
  paint();
});

(async function init(){
  render();
  renderBundles();
  await load();
  paint();
})();
