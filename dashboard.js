import { changePasswordInApp } from "./api.js";

const getUser = () => JSON.parse(localStorage.getItem("user")) ?? null;
const user = getUser();

console.log(getUser(), "user details");


const firstName = document.getElementsByClassName("first-name");
const fullName = document.getElementsByClassName("full-name");
console.log(fullName)
console.log(firstName)
Array.from(fullName).forEach(el => {

  el.innerHTML = user?.name ?? "User"
})
Array.from(firstName).forEach(el => {
  el.innerHTML = user?.name?.split(" ")?.[0] ?? "User";
})

document.getElementById('logoutBtn').addEventListener('click', () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('user');
  window.location.href = 'auth.html';
});

document.getElementById('logoutLink').addEventListener('click', (e) => {
  e.preventDefault();
  localStorage.removeItem('access_token');
  localStorage.removeItem('user');
  window.location.href = 'auth.html';
});

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
function toggleSidebar(){
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('overlay').classList.toggle('show');
}



function toggleDrop(id, e) {
  if (e) e.stopPropagation();
  const el = document.getElementById(id);
  const wasOpen = el.classList.contains('open');
  document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('open'));
  if (!wasOpen) el.classList.add('open');
}

document.addEventListener('click', function(e){
  if (!e.target.closest('.icon-btn') && !e.target.closest('.profile-btn') && !e.target.closest('.dropdown')) {
    document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('open'));
  }
});

// ---------- Section switching ----------
function showDashSection(name, navEl){
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.getElementById('sec-' + name).classList.add('active');
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const targetNav = navEl || document.getElementById('nav' + name.charAt(0).toUpperCase() + name.slice(1));
  if (targetNav) targetNav.classList.add('active');
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('overlay').classList.remove('show');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
function comingSoon(name){
  showToast(name + ' is coming soon');
}

// ---------- Toast ----------
function showToast(msg){
  const t = document.getElementById('toast');
  t.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M4 12l5 5L20 6"/></svg>' + msg;
  t.classList.add('show');
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => t.classList.remove('show'), 2400);
}

// ---------- Profile ----------
function pickThemeSwatch(el){
  document.querySelectorAll('.theme-swatch').forEach(s => s.classList.remove('active'));
  el.classList.add('active');
}
function saveProfile(){
  const name = document.getElementById('profileName').value.trim();
  if (!name) { showToast('Please enter your name'); return; }
  document.querySelector('.sidebar-foot .nm').textContent = name;
  document.querySelectorAll('.profile-btn .nm').forEach(el => el.textContent = name.split(' ')[0]);
  showToast('Profile saved');
}

// ---------- Settings ----------
function saveNotifications(){ showToast('Notification preferences saved'); }
async function changePassword(){
  const currentPassword = document.getElementById("currentPassword").value.trim();
  const newPassword = document.getElementById("newPassword").value.trim();
  const confirmNewPassword = document.getElementById("confirmNewPassword").value.trim();

  if(!currentPassword) showToast("Current password is required!");
  if(!newPassword) showToast("New password is required!");
  if(!confirmNewPassword) showToast("Confirmed new password is required!");

  const submitBtn = document.getElementById("updatePassword");
  submitBtn.textContent = "Updating..."

  const payload = {
    newPassword,
    currentPassword
  }

  const {message} = await changePasswordInApp(payload);
  submitBtn.textContent = "Update Password"
  if(message) return showToast(message ?? "Something went wrong");
  // showToast('Password updated'); 

}
function deleteAccount(){
  if (confirm('This will permanently delete your account, products and analytics. Are you sure?')) {
    showToast('Account scheduled for deletion');
  }
}

// ---------- Billing ----------
function togglePlanPicker(){
  const picker = document.getElementById('planPicker');
  picker.style.display = picker.style.display === 'none' ? 'block' : 'none';
}
function switchPlan(el){
  document.querySelectorAll('.plan-pick').forEach(p => p.classList.remove('current'));
  el.classList.add('current');
  const plan = el.dataset.plan;
  const price = el.dataset.price;
  document.getElementById('billingPlanBadge').innerHTML = '<span class="d"></span>' + plan.toUpperCase() + ' · ACTIVE';
  document.getElementById('billingPlanPrice').innerHTML = price + (price === 'Custom' ? '' : '<span style="font-size:13px;color:var(--text-muted);font-weight:500;">/mo</span>');
  document.querySelector('.sidebar-foot .pl').textContent = plan + ' Plan';
  document.getElementById('planPicker').style.display = 'none';
  showToast('Switched to the ' + plan + ' plan');
}
function cancelSubscription(){
  if (confirm('Cancel your subscription? Your products will stop accepting taps at the end of the billing period.')) {
    document.getElementById('billingPlanBadge').innerHTML = '<span class="d" style="background:var(--red);"></span>CANCELED';
    showToast('Subscription canceled');
  }
}

const INVOICES = [
  { id: 'INV-1042', date: 'Jun 1, 2026', amount: '₦35,000' },
  { id: 'INV-1031', date: 'May 1, 2026', amount: '₦35,000' },
  { id: 'INV-1019', date: 'Apr 1, 2026', amount: '₦35,000' },
  { id: 'INV-1005', date: 'Mar 1, 2026', amount: '₦15,000' }
];
function renderInvoices(){
  document.getElementById('invoiceList').innerHTML = INVOICES.map(inv => `
    <div class="invoice-row">
      <div><div class="inv-id">${inv.id}</div><div class="inv-date">${inv.date}</div></div>
      <div class="inv-amount">${inv.amount}</div>
      <span class="pill-paid">Paid</span>
      <button class="btn btn-ghost btn-sm" onclick="downloadInvoice('${inv.id}','${inv.date}','${inv.amount}')">Download</button>
    </div>`).join('');
}
function downloadInvoice(id, date, amount){
  const content = `iTapNFC — Invoice ${id}\nBilled to: Grace Bistro\nDate: ${date}\nAmount: ${amount}\nStatus: Paid\n\nThank you for using iTapNFC.`;
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'itapnfc-' + id.toLowerCase() + '.txt';
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast(id + ' downloaded');
}
renderInvoices();

window.toggleDrop = toggleDrop;
window.showDashSection = showDashSection;
window.comingSoon = comingSoon;
window.toggleSidebar = toggleSidebar;
window.saveProfile = saveProfile;
window.saveNotifications = saveNotifications;
window.changePassword = changePassword;
window.deleteAccount = deleteAccount;
window.togglePlanPicker = togglePlanPicker;
window.switchPlan = switchPlan;
window.cancelSubscription = cancelSubscription;
window.downloadInvoice = downloadInvoice;
window.pickThemeSwatch = pickThemeSwatch;