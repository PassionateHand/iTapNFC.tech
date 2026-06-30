const root = document.documentElement;
document.getElementById('themeToggle').addEventListener('click', function(){
  const isDark = root.getAttribute('data-theme') === 'dark';
  root.setAttribute('data-theme', isDark ? 'light' : 'dark');
  this.querySelector('.icon-sun').style.display = isDark ? 'block' : 'none';
  this.querySelector('.icon-moon').style.display = isDark ? 'none' : 'block';
});
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
  root.setAttribute('data-theme','light');
  document.querySelector('#themeToggle .icon-sun').style.display='block';
  document.querySelector('#themeToggle .icon-moon').style.display='none';
}
function toggleSidebar(){ document.getElementById('sidebar').classList.toggle('open'); document.getElementById('overlay').classList.toggle('show'); }

const TITLES = {overview:'Overview', users:'Manage Users', products:'Manage Products', templates:'Manage Templates', subs:'Manage Subscriptions', analytics:'View Analytics', export:'Export Reports'};
function showSection(id, el){
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.getElementById('sec-'+id).classList.add('active');
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  if(el) el.classList.add('active');
  document.getElementById('tbTitle').textContent = TITLES[id];
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('overlay').classList.remove('show');
}

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
const EDIT_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>';
const BAN_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M5.5 5.5l13 13"/></svg>';
const EYE_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/><circle cx="12" cy="12" r="3"/></svg>';
const TRASH_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>';
const COPY_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>';
const REFRESH_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 2v6h-6M3 22v-6h6"/><path d="M3.5 9A9 9 0 0 1 21 8M20.5 15A9 9 0 0 1 3 16"/></svg>';
const X_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>';

const USERS = [
 {id:'u1', name:'Grace Adebayo', email:'grace@gracebistro.com', business:'Grace Bistro', plan:'Business', status:'active', joined:'Jan 14, 2026'},
 {id:'u2', name:'Tunde Okafor', email:'tunde@lagossalon.com', business:'Lagos Salon', plan:'Starter', status:'active', joined:'Feb 2, 2026'},
 {id:'u3', name:'Cathedral of Hope', email:'admin@cathedralofhope.org', business:'Cathedral of Hope', plan:'Enterprise', status:'active', joined:'Nov 8, 2025'},
 {id:'u4', name:'Ifeoma Chukwu', email:'ifeoma@suite4spa.com', business:'Suite 4 Spa', plan:'Starter', status:'suspended', joined:'Mar 20, 2026'},
 {id:'u5', name:'Hotel Aurora Ops', email:'ops@hotelaurora.com', business:'Hotel Aurora', plan:'Business', status:'active', joined:'Dec 1, 2025'},
 {id:'u6', name:'David Okon', email:'david@okonretail.com', business:'Okon Retail', plan:'Starter', status:'active', joined:'Apr 11, 2026'},
 {id:'u7', name:'Bright Future HR', email:'hr@brightfuturecorp.com', business:'Bright Future Corp', plan:'Enterprise', status:'active', joined:'Oct 19, 2025'},
 {id:'u8', name:'Amaka Eze', email:'amaka@amakarealtor.com', business:'Amaka E. — Realtor', plan:'Starter', status:'active', joined:'May 30, 2026'}
];
const PRODUCTS = [
 {name:'Payment Page — Grace Bistro', type:'payment', owner:'Grace Adebayo', taps:3210, status:'live', created:'Jan 16, 2026'},
 {name:'Smart Menu — Grace Bistro', type:'menu', owner:'Grace Adebayo', taps:2480, status:'live', created:'Jan 18, 2026'},
 {name:'Review Card — Suite 4', type:'review', owner:'Ifeoma Chukwu', taps:1340, status:'live', created:'Mar 22, 2026'},
 {name:'Donation Page — Cathedral', type:'donation', owner:'Cathedral of Hope', taps:980, status:'live', created:'Nov 10, 2025'},
 {name:'Business Card — Amaka E.', type:'card', owner:'Amaka Eze', taps:410, status:'draft', created:'May 31, 2026'},
 {name:'Front Desk Check-in', type:'visitor', owner:'Hotel Aurora', taps:2210, status:'live', created:'Dec 4, 2025'},
 {name:'HQ Attendance', type:'attendance', owner:'Bright Future Corp', taps:5120, status:'live', created:'Oct 22, 2025'},
 {name:'Projector A2 Tag', type:'asset', owner:'Bright Future Corp', taps:88, status:'live', created:'Nov 1, 2025'}
];
const SUBS = [
 {business:'Grace Bistro', plan:'Business', mrr:29, status:'active', renewal:'Aug 14, 2026'},
 {business:'Lagos Salon', plan:'Starter', mrr:9, status:'active', renewal:'Jul 2, 2026'},
 {business:'Cathedral of Hope', plan:'Enterprise', mrr:149, status:'active', renewal:'Sep 8, 2026'},
 {business:'Suite 4 Spa', plan:'Starter', mrr:9, status:'past_due', renewal:'Jun 20, 2026'},
 {business:'Hotel Aurora', plan:'Business', mrr:29, status:'active', renewal:'Jul 1, 2026'},
 {business:'Okon Retail', plan:'Starter', mrr:9, status:'active', renewal:'Jul 11, 2026'},
 {business:'Bright Future Corp', plan:'Enterprise', mrr:149, status:'active', renewal:'Oct 19, 2026'},
 {business:'Amaka E. — Realtor', plan:'Starter', mrr:9, status:'trialing', renewal:'Jun 30, 2026'}
];
const TEMPLATES = [
 {id:'payment', name:'Payment Page', usage:412}, {id:'menu', name:'Restaurant Menu', usage:298},
 {id:'donation', name:'Church Donation', usage:151}, {id:'review', name:'Google Review Card', usage:520},
 {id:'card', name:'Business Card', usage:684}, {id:'attendance', name:'Attendance', usage:97},
 {id:'visitor', name:'Visitor Registration', usage:144}, {id:'asset', name:'Asset Tracking', usage:62}
];
const COLOR_MAP = {payment:'#6D5CFF', menu:'#3FD6C9', donation:'#F2697A', review:'#F2B84B', card:'#8B7CFF', attendance:'#4F9DF2', visitor:'#3FD6C9', asset:'#9097AA'};

function renderUsers(list){
  document.querySelector('#usersTable tbody').innerHTML = list.map(u => `
    <tr><td><div class="cell-name">${u.name}</div>${u.email ? `<div class="cell-sub">${u.email}</div>` : ''}</td>
    <td>${u.business}</td><td>${u.plan}</td>
    <td><span class="pill ${u.status}">${u.status}</span></td>
    <td class="cell-sub">${u.joined}</td>
    <td style="text-align:right;">
      <span class="icon-action" title="Edit" onclick="openEditUserModal('${u.id}')">${EDIT_ICON}</span>
      <span class="icon-action danger" title="${u.status === 'suspended' ? 'Reactivate' : 'Suspend'}" onclick="toggleUserStatus('${u.id}')">${u.status === 'suspended' ? EYE_ICON : BAN_ICON}</span>
    </td></tr>
  `).join('');
}
function renderProducts(list){
  document.querySelector('#productsTable tbody').innerHTML = list.map(p => `
    <tr><td><div class="cell-name">${p.name}</div><span class="pill type">${p.type}</span></td>
    <td>${p.owner}</td><td class="mono">${p.taps.toLocaleString()}</td>
    <td><span class="pill ${p.status}">${p.status}</span></td>
    <td class="cell-sub">${p.created}</td>
    <td style="text-align:right;"><span class="icon-action" title="View">${EYE_ICON}</span><span class="icon-action danger" title="Disable">${BAN_ICON}</span></td></tr>
  `).join('');
}
function renderSubs(){
  document.querySelector('#subsTable tbody').innerHTML = SUBS.map(s => `
    <tr><td><div class="cell-name">${s.business}</div></td><td>${s.plan}</td>
    <td class="mono">$${s.mrr}/mo</td><td><span class="pill ${s.status}">${s.status.replace('_',' ')}</span></td>
    <td class="cell-sub">${s.renewal}</td>
    <td style="text-align:right;"><span class="icon-action" title="Change Plan">${REFRESH_ICON}</span><span class="icon-action danger" title="Cancel">${X_ICON}</span></td></tr>
  `).join('');
}
function renderTemplates(){
  document.getElementById('tplGrid').innerHTML = TEMPLATES.map(t => `
    <div class="tpl-card">
      <div class="tpl-head" style="background:linear-gradient(135deg, ${COLOR_MAP[t.id]}, #3FD6C9);">${ICONS[t.id].replace('currentColor','#fff')}</div>
      <div class="tpl-body">
        <h3>${t.name}</h3>
        <div class="usage">${t.usage} active products</div>
        <div class="tpl-actions">
          <span class="icon-action" title="Edit">${EDIT_ICON}</span>
          <span class="icon-action" title="Duplicate">${COPY_ICON}</span>
          <span class="icon-action danger" title="Delete">${TRASH_ICON}</span>
        </div>
      </div>
    </div>
  `).join('');
}
function renderRecentSignups(){
  const recent = USERS.slice(-4).reverse();
  document.getElementById('recentSignups').innerHTML = recent.map(u => `
    <div style="display:flex;align-items:center;gap:10px;padding:9px 0;border-bottom:1px solid var(--border);">
      <div style="width:32px;height:32px;border-radius:50%;background:var(--gradient);display:flex;align-items:center;justify-content:center;color:#fff;font-size:11px;font-weight:700;flex:none;">${u.name.split(' ').map(w=>w[0]).slice(0,2).join('')}</div>
      <div style="min-width:0;flex:1;"><div style="font-size:13px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${u.name}</div><div style="font-size:11px;color:var(--text-faint);">${u.plan} plan</div></div>
    </div>`).join('');
}

renderUsers(USERS); renderProducts(PRODUCTS); renderSubs(); renderTemplates(); renderRecentSignups();

function filterTable(tableId, query){
  const list = tableId === 'usersTable' ? USERS : PRODUCTS;
  const filtered = list.filter(item => JSON.stringify(item).toLowerCase().includes(query.toLowerCase()));
  if(tableId === 'usersTable') renderUsers(filtered); else renderProducts(filtered);
}
function filterUsersByPlan(plan){
  renderUsers(plan ? USERS.filter(u => u.plan === plan) : USERS);
}

let selectedReport = 'users';
function selectReport(id, el){
  selectedReport = id;
  document.querySelectorAll('.export-opt').forEach(o => o.classList.remove('selected'));
  el.classList.add('selected');
}
function toCSV(rows){
  if(!rows.length) return '';
  const headers = Object.keys(rows[0]);
  const lines = [headers.join(',')];
  rows.forEach(r => lines.push(headers.map(h => `"${String(r[h]).replace(/"/g,'""')}"`).join(',')));
  return lines.join('\\n');
}
function exportReport(){
  let data, filename;
  if(selectedReport === 'users'){ data = USERS; filename = 'itapnfc-users-report.csv'; }
  else if(selectedReport === 'products'){ data = PRODUCTS; filename = 'itapnfc-products-report.csv'; }
  else { data = SUBS; filename = 'itapnfc-revenue-report.csv'; }
  const csv = toCSV(data);
  const blob = new Blob([csv], {type:'text/csv;charset=utf-8;'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast(filename + ' downloaded');
}
let __userIdCounter = USERS.length;

function generateTempPassword(){
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
  let pass = '';
  for(let i = 0; i < 10; i++) pass += chars[Math.floor(Math.random() * chars.length)];
  return pass;
}

function openAddUserModal(){
  document.getElementById('addUserName').value = '';
  document.getElementById('addUserEmail').value = '';
  document.getElementById('addUserBusiness').value = '';
  document.getElementById('addUserPlan').value = 'Business';
  document.getElementById('addUserError').style.display = 'none';
  document.getElementById('addUserModal').classList.add('show');
}
function closeAddUserModal(){
  document.getElementById('addUserModal').classList.remove('show');
}
function submitAddUser(){
  const name = document.getElementById('addUserName').value.trim();
  const email = document.getElementById('addUserEmail').value.trim();
  const business = document.getElementById('addUserBusiness').value.trim();
  const plan = document.getElementById('addUserPlan').value;
  const errorBox = document.getElementById('addUserError');

  if(!name || !email || !business){
    errorBox.textContent = 'Please fill in name, email and business name.';
    errorBox.style.display = 'block';
    return;
  }
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
    errorBox.textContent = 'Please enter a valid email address.';
    errorBox.style.display = 'block';
    return;
  }
  if(USERS.some(u => u.email && u.email.toLowerCase() === email.toLowerCase())){
    errorBox.textContent = 'A user with this email already exists.';
    errorBox.style.display = 'block';
    return;
  }

  __userIdCounter++;
  const tempPassword = generateTempPassword();
  USERS.unshift({
    id: 'u' + __userIdCounter,
    name, email, business, plan, status: 'active',
    joined: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  });
  renderUsers(USERS);
  renderRecentSignups();
  closeAddUserModal();
  openCredentialsModal(email, tempPassword);
}

// ---------- Generated credentials confirmation ----------
function openCredentialsModal(email, password){
  document.getElementById('credEmail').textContent = email;
  document.getElementById('credPassword').textContent = password;
  document.getElementById('credentialsModal').classList.add('show');
}
function closeCredentialsModal(){
  document.getElementById('credentialsModal').classList.remove('show');
}
function copyCredentials(){
  const email = document.getElementById('credEmail').textContent;
  const password = document.getElementById('credPassword').textContent;
  const text = `iTapNFC login\nEmail: ${email}\nTemporary password: ${password}`;
  navigator.clipboard.writeText(text).then(() => showToast('Credentials copied'));
}

// ---------- Edit User ----------
function openEditUserModal(id){
  const user = USERS.find(u => u.id === id);
  if(!user) return;
  document.getElementById('editUserId').value = user.id;
  document.getElementById('editUserName').value = user.name;
  document.getElementById('editUserEmail').value = user.email || '';
  document.getElementById('editUserBusiness').value = user.business;
  document.getElementById('editUserPlan').value = user.plan;
  document.getElementById('editUserStatus').value = user.status;
  document.getElementById('editUserError').style.display = 'none';
  document.getElementById('editUserModal').classList.add('show');
}
function closeEditUserModal(){
  document.getElementById('editUserModal').classList.remove('show');
}
function submitEditUser(){
  const id = document.getElementById('editUserId').value;
  const name = document.getElementById('editUserName').value.trim();
  const email = document.getElementById('editUserEmail').value.trim();
  const business = document.getElementById('editUserBusiness').value.trim();
  const plan = document.getElementById('editUserPlan').value;
  const status = document.getElementById('editUserStatus').value;
  const errorBox = document.getElementById('editUserError');

  if(!name || !email || !business){
    errorBox.textContent = 'Please fill in name, email and business name.';
    errorBox.style.display = 'block';
    return;
  }
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
    errorBox.textContent = 'Please enter a valid email address.';
    errorBox.style.display = 'block';
    return;
  }
  if(USERS.some(u => u.id !== id && u.email && u.email.toLowerCase() === email.toLowerCase())){
    errorBox.textContent = 'Another user already uses this email.';
    errorBox.style.display = 'block';
    return;
  }

  const user = USERS.find(u => u.id === id);
  if(user){
    user.name = name; user.email = email; user.business = business;
    user.plan = plan; user.status = status;
  }
  renderUsers(USERS);
  closeEditUserModal();
  showToast(name + "'s account updated");
}

// ---------- Suspend / Reactivate ----------
function toggleUserStatus(id){
  const user = USERS.find(u => u.id === id);
  if(!user) return;
  user.status = user.status === 'suspended' ? 'active' : 'suspended';
  renderUsers(USERS);
  showToast(user.name + (user.status === 'suspended' ? ' suspended' : ' reactivated'));
}

function showToast(msg){
  const t = document.getElementById('toast');
  t.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M4 12l5 5L20 6"/></svg>' + msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2400);
}