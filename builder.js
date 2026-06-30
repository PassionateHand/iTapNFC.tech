const root = document.documentElement;
document.getElementById('themeToggle').addEventListener('click', function(){
  const isDark = root.getAttribute('data-theme') === 'dark';
  root.setAttribute('data-theme', isDark ? 'light' : 'dark');
  this.querySelector('.icon-sun').style.display = isDark ? 'block' : 'none';
  this.querySelector('.icon-moon').style.display = isDark ? 'none' : 'block';
  renderPreview();
});

const ICONS = {
  payment:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="13" rx="2"/><path d="M2 10h20M6 15h4"/></svg>',
  menu:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14l-3-2-3 2-3-2-3 2-2-1.4-2 1.4z"/><path d="M8 7h8M8 11h8M8 15h5"/></svg>',
  donation:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.8 12.6L12 21l-8.8-8.4a5 5 0 0 1 7.5-6.6L12 7l1.3-1a5 5 0 0 1 7.5 6.6z"/></svg>',
  review:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3 6 6.5.9-4.7 4.6 1.1 6.4-5.9-3.1-5.9 3.1 1.1-6.4L2 8.9 8.5 8z"/></svg>',
  card:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="11" r="2"/><path d="M15 9h3M15 13h3M6 17h12"/></svg>',
  attendance:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></svg>',
  visitor:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/><path d="M3 21v-1a5 5 0 0 1 5-5h2a5 5 0 0 1 5 5v1M16 11l2 2 4-4"/></svg>',
  asset:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.6 13.4 12 22l-9.6-9.6a3.5 3.5 0 0 1 0-5L8 2l3 3-5 5 6.6 6.6 5-5z"/><circle cx="17.5" cy="6.5" r="1"/></svg>'
};

const TYPES = [
  {id:'payment', name:'Payment Page', desc:'Customers tap and pay your bank details instantly.'},
  {id:'menu', name:'Restaurant Menu', desc:'A tap-to-browse digital menu for your tables.'},
  {id:'donation', name:'Church Donation', desc:'A fast, secure giving page for your congregation.'},
  {id:'review', name:'Google Review Card', desc:'Turn happy customers into 5-star reviews.'},
  {id:'card', name:'Business Card', desc:'Share contact info and socials with one tap.'},
  {id:'attendance', name:'Attendance', desc:'Staff tap in and out automatically.'},
  {id:'visitor', name:'Visitor Registration', desc:'Front-desk sign-in for guests and visitors.'},
  {id:'asset', name:'Asset Tracking', desc:'Tag equipment to see its history and location.'}
];

const FIELD_META = {
  businessName:{label:'Business Name', placeholder:'Grace Bistro', type:'text'},
  whatsapp:{label:'WhatsApp Number', placeholder:'+234 801 234 5678', type:'tel'},
  website:{label:'Website', placeholder:'https://yourbusiness.com', type:'url'},
  instagram:{label:'Instagram', placeholder:'@yourbusiness', type:'text'},
  facebook:{label:'Facebook', placeholder:'facebook.com/yourbusiness', type:'text'},
  bankName:{label:'Bank Name', placeholder:'Zenith Bank', type:'text'},
  accountNumber:{label:'Account Number', placeholder:'2210045871', type:'text'},
  accountName:{label:'Account Name', placeholder:'Grace Bistro Ltd', type:'text'},
  googleReviewUrl:{label:'Google Review URL', placeholder:'https://g.page/r/yourlink/review', type:'url'}
};

const FIELD_SETS = {
  payment:['businessName','bankName','accountNumber','accountName','whatsapp'],
  menu:['businessName','whatsapp','website','instagram','facebook'],
  donation:['businessName','bankName','accountNumber','accountName'],
  review:['businessName','googleReviewUrl'],
  card:['businessName','whatsapp','website','instagram','facebook'],
  attendance:['businessName'],
  visitor:['businessName'],
  asset:['businessName']
};

const COLORS = ['#6D5CFF','#3FD6C9','#F2B84B','#F2697A','#4F9DF2','#9097AA'];

let state = { type:null, businessName:'', logo:null, theme:'#6D5CFF', bankName:'', accountNumber:'', accountName:'', whatsapp:'', website:'', instagram:'', facebook:'', googleReviewUrl:'' };

// render type grid
const typeGrid = document.getElementById('typeGrid');
TYPES.forEach(t => {
  const card = document.createElement('div');
  card.className = 'type-card';
  card.dataset.id = t.id;
  card.innerHTML = `<div class="type-icon">${ICONS[t.id]}</div><h3>${t.name}</h3><p>${t.desc}</p>`;
  card.addEventListener('click', () => {
    document.querySelectorAll('.type-card').forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    state.type = t.id;
    document.getElementById('toStep2').disabled = false;
  });
  typeGrid.appendChild(card);
});

function setStep(n){
  [1,2,3].forEach(i => {
    document.getElementById('view-'+i).classList.toggle('active', i===n);
    const pill = document.getElementById('pill-'+i);
    pill.classList.toggle('active', i===n);
    pill.classList.toggle('done', i<n);
  });
  if(n===2){ buildFields(); renderPreview(); }
  if(n===3){ buildOutput(); }
}
document.getElementById('toStep2').addEventListener('click', () => setStep(2));
document.getElementById('toStep1Back').addEventListener('click', () => setStep(1));
document.getElementById('toStep3').addEventListener('click', () => setStep(3));
document.getElementById('createAnother').addEventListener('click', () => {
  state = { type:null, businessName:'', logo:null, theme:'#6D5CFF', bankName:'', accountNumber:'', accountName:'', whatsapp:'', website:'', instagram:'', facebook:'', googleReviewUrl:'' };
  document.querySelectorAll('.type-card').forEach(c => c.classList.remove('selected'));
  document.getElementById('toStep2').disabled = true;
  setStep(1);
});

function buildFields(){
  const wrap = document.getElementById('dynamicFields');
  wrap.innerHTML = '';
  // logo + theme always first
  const logoField = document.createElement('div');
  logoField.className = 'field';
  logoField.innerHTML = `<label>Logo</label><div class="logo-row"><div class="logo-preview" id="logoPreview">${initials(state.businessName)}</div><label class="upload-btn">Upload<input type="file" accept="image/*" style="display:none" id="logoInput"></label></div>`;
  wrap.appendChild(logoField);

  const themeField = document.createElement('div');
  themeField.className = 'field';
  themeField.innerHTML = `<label>Theme Color</label><div class="swatches" id="swatches"></div>`;
  wrap.appendChild(themeField);

  const swatchWrap = themeField.querySelector('#swatches');
  COLORS.forEach(c => {
    const sw = document.createElement('div');
    sw.className = 'swatch' + (c===state.theme ? ' active':'');
    sw.style.background = c;
    sw.addEventListener('click', () => { state.theme = c; document.querySelectorAll('.swatch').forEach(s=>s.classList.remove('active')); sw.classList.add('active'); renderPreview(); });
    swatchWrap.appendChild(sw);
  });
  const custom = document.createElement('label');
  custom.className = 'swatch-custom';
  custom.innerHTML = `<input type="color" value="${state.theme}">`;
  custom.querySelector('input').addEventListener('input', e => { state.theme = e.target.value; renderPreview(); });
  swatchWrap.appendChild(custom);

  FIELD_SETS[state.type].forEach(key => {
    const meta = FIELD_META[key];
    const f = document.createElement('div');
    f.className = 'field';
    f.innerHTML = `<label>${meta.label}</label><input type="${meta.type}" placeholder="${meta.placeholder}" value="${state[key]||''}">`;
    f.querySelector('input').addEventListener('input', e => { state[key] = e.target.value; renderPreview(); document.getElementById('logoPreview') && updateLogoInitials(); });
    wrap.appendChild(f);
  });

  document.getElementById('logoInput').addEventListener('change', e => {
    const file = e.target.files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = ev => { state.logo = ev.target.result; renderPreview(); };
    reader.readAsDataURL(file);
  });
}
function updateLogoInitials(){
  const lp = document.getElementById('logoPreview');
  if(lp && !state.logo) lp.textContent = initials(state.businessName);
}
function initials(name){
  if(!name) return '?';
  return name.trim().split(/\s+/).slice(0,2).map(w=>w[0].toUpperCase()).join('');
}

function avatarStyle(){
  return state.logo ? `background-image:url(${state.logo});` : `background:${state.theme};`;
}
function gradStyle(){
  return `background:linear-gradient(135deg, ${state.theme}, #3FD6C9);`;
}

function renderPreview(targetId){
  const el = document.getElementById(targetId || 'phoneScreen');
  if(!el) return;
  const name = state.businessName || 'Your Business';
  let body = '';
  if(state.type === 'payment'){
    body = `<div class="pv-heading">Pay to the Account Below</div>
    <div class="pv-card"><span class="k">Bank</span><span>${state.bankName||'—'}</span></div>
    <div class="pv-card"><span class="k">Account No.</span><span>${state.accountNumber||'—'}</span></div>
    <div class="pv-card"><span class="k">Account Name</span><span>${state.accountName||'—'}</span></div>
    <div class="pv-desc">Copy the account number and paste it into your bank app to complete payment.</div>
    <div class="pv-cta copy-acct-btn" style="margin-top:auto;${gradStyle()}" onclick="copyPreviewAccount()">Copy Account Number</div>`;
  } else if(state.type === 'donation'){
    body = `<div class="pv-amount">₦5,000</div>
    <div class="pv-card"><span class="k">Bank</span><span>${state.bankName||'—'}</span></div>
    <div class="pv-card"><span class="k">Account No.</span><span>${state.accountNumber||'—'}</span></div>
    <div class="pv-card"><span class="k">Account Name</span><span>${state.accountName||'—'}</span></div>
    <div class="pv-cta" style="${gradStyle()}">Give Now</div>`;
  } else if(state.type === 'review'){
    body = `<div class="pv-stars">${'<svg viewBox="0 0 24 24" fill="'+state.theme+'" stroke="none"><path d="M12 2l3 6 6.5.9-4.7 4.6 1.1 6.4-5.9-3.1-5.9 3.1 1.1-6.4L2 8.9 8.5 8z"/></svg>'.repeat(5)}</div>
    <div style="text-align:center;font-size:11px;color:var(--text-muted);margin-bottom:14px;">Loved your visit?</div>
    <div class="pv-cta" style="${gradStyle()}">Leave a Google Review</div>`;
  } else if(state.type === 'menu'){
    body = `<div class="pv-list">
      <div class="li"><span>Jollof Rice & Chicken</span><span>₦3,500</span></div>
      <div class="li"><span>Grilled Fish Platter</span><span>₦6,000</span></div>
      <div class="li"><span>Chapman</span><span>₦1,800</span></div>
    </div>
    <div class="pv-cta" style="margin-top:auto;${gradStyle()}">View Full Menu</div>`;
  } else if(state.type === 'card'){
    body = `<div style="font-size:11px;color:var(--text-muted);margin-bottom:14px;">${state.whatsapp||'+234 801 234 5678'}</div>
    <div class="pv-socials">
      <div class="s"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 13a11 11 0 0 1 14 0"/></svg></div>
      <div class="s"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="4"/></svg></div>
      <div class="s"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></div>
    </div>
    <div class="pv-cta" style="margin-top:auto;${gradStyle()}">Save Contact</div>`;
  } else if(state.type === 'attendance'){
    body = `<div style="text-align:center;margin:20px 0;"><div style="font-size:13px;color:var(--text-muted);">Tap to clock in</div></div>
    <div class="pv-cta" style="${gradStyle()}">Clock In</div>`;
  } else if(state.type === 'visitor'){
    body = `<div class="pv-card"><span class="k">Name</span><span>—</span></div>
    <div class="pv-card"><span class="k">Visiting</span><span>—</span></div>
    <div class="pv-cta" style="margin-top:auto;${gradStyle()}">Sign In</div>`;
  } else if(state.type === 'asset'){
    body = `<div class="pv-card"><span class="k">Asset</span><span>Projector A2</span></div>
    <div class="pv-card"><span class="k">Location</span><span>Main Hall</span></div>
    <div class="pv-cta" style="margin-top:auto;${gradStyle()}">View History</div>`;
  } else {
    body = `<div style="text-align:center;color:var(--text-faint);font-size:12.5px;margin-top:40px;">Choose a product type to preview</div>`;
  }
  el.innerHTML = `<div class="pv-row"><div class="pv-avatar" style="${avatarStyle()}">${state.logo?'':initials(name)}</div><div><div class="pv-biz">${name}</div><div class="pv-sub">Powered by iTapNFC</div></div></div>
  <div class="pv-body">${body}</div>
  <div class="pv-secure">SECURED BY ITAPNFC</div>`;
}

function slugify(s){ return (s||'business').toLowerCase().trim().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,''); }

function copyPreviewAccount(){
  if(!state.accountNumber) return;
  navigator.clipboard.writeText(state.accountNumber).then(() => {
    document.querySelectorAll('.copy-acct-btn').forEach(btn => {
      btn.textContent = 'Copied!';
      setTimeout(() => { btn.textContent = 'Copy Account Number'; }, 1500);
    });
  });
}

function buildOutput(){
  const code = Math.random().toString(36).substring(2,7);
  const url = `https://itapnfc.tech/p/${slugify(state.businessName)}-${code}`;
  document.getElementById('genUrl').textContent = url;
  generateQR(url);
  renderPreview('phoneScreenFinal');
}

function generateQR(seed){
  const grid = document.getElementById('qrGrid');
  grid.innerHTML = '';
  let h = 0; for(let i=0;i<seed.length;i++){ h = (h*31 + seed.charCodeAt(i)) >>> 0; }
  function rnd(){ h = (h*1664525 + 1013904223) >>> 0; return h / 4294967295; }
  const size = 15;
  const cells = Array.from({length:size*size}, () => rnd() > 0.55);
  function setBlock(r,c,sz,val){ for(let i=0;i<sz;i++) for(let j=0;j<sz;j++) cells[(r+i)*size+(c+j)] = val; }
  // finder patterns (corners)
  [[0,0],[0,size-4],[size-4,0]].forEach(([r,c]) => { setBlock(r,c,4,true); setBlock(r+1,c+1,2,false); });
  for(let i=0;i<size*size;i++){
    const cell = document.createElement('div');
    cell.className = 'qr-cell' + (cells[i] ? ' on' : '');
    grid.appendChild(cell);
  }
}

document.getElementById('copyBtn').addEventListener('click', () => {
  const text = document.getElementById('genUrl').textContent;
  navigator.clipboard.writeText(text).then(() => showToast('Link copied to clipboard'));
  const btn = document.getElementById('copyBtn');
  btn.textContent = 'Copied!';
  setTimeout(() => btn.textContent = 'Copy', 1500);
});

document.getElementById('writeNfcBtn').addEventListener('click', () => {
  document.getElementById('nfcModal').classList.add('show');
  document.getElementById('nfcWriting').style.display = 'block';
  document.getElementById('nfcDone').style.display = 'none';
  const bar = document.getElementById('modalBar');
  bar.style.width = '0%';
  requestAnimationFrame(() => requestAnimationFrame(() => bar.style.width = '100%'));
  setTimeout(() => {
    document.getElementById('nfcWriting').style.display = 'none';
    document.getElementById('nfcDone').style.display = 'block';
  }, 2300);
});
function closeModal(){ document.getElementById('nfcModal').classList.remove('show'); }

function showToast(msg){
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2200);
}

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
  root.setAttribute('data-theme','light');
  document.querySelector('#themeToggle .icon-sun').style.display='block';
  document.querySelector('#themeToggle .icon-moon').style.display='none';
}
renderPreview();