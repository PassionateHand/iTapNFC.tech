import { login } from "./api.js";

const root = document.documentElement;
document.getElementById("themeToggle").addEventListener("click", () => {
  root.setAttribute(
    "data-theme",
    root.getAttribute("data-theme") === "dark" ? "light" : "dark",
  );
});
if (
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: light)").matches
) {
  root.setAttribute("data-theme", "light");
}
const initialHash = window.location.hash.replace("#", "");
if (initialHash === "register" || initialHash === "forgot") {
  showView(initialHash);
}
const loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", async function (e) {
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPass").value.trim();
  if (!email || !password) return showToast("Email or password is incomplete!!");
  this.innerHTML = "Logging in..."
  const payload = { email, password };
  const { message } = await login(payload);
  if(message) showToast(message);
  this.innerHTML = "Log in";
})

function showToast(msg){
  const t = document.getElementById('toast');
  t.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M4 12l5 5L20 6"/></svg>' + msg;
  t.classList.add('show');
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => t.classList.remove('show'), 2400);
}

function showView(name) {
  console.log(name)
  document
    .querySelectorAll(".view")
    .forEach((v) => v.classList.remove("active"));
  const el = document.getElementById("view-" + name).classList.add("active");
  if (name === "forgot")  showForgotForm();
}
function showForgotSuccess() {
  document.getElementById("forgotForm").style.display = "none";
  document.getElementById("forgotSuccess").style.display = "block";
}
function showForgotForm() {
  document.getElementById("forgotForm").style.display = "block";
  document.getElementById("forgotSuccess").style.display = "none";
}
function toggleEye(id, btn) {
  const input = document.getElementById(id);
  input.type = input.type === "password" ? "text" : "password";
}


// count-up stats
function countUp(el, target, dur) {
  const start = performance.now();
  function step(now) {
    const p = Math.min(1, (now - start) / dur);
    el.textContent = Math.floor(p * target).toLocaleString();
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}
countUp(document.getElementById("statProducts"), 14, 1000);
countUp(document.getElementById("statTaps"), 8420, 1400);
countUp(document.getElementById("statToday"), 132, 1000);

// recent taps live feed
const products = [
  "Grace Bistro Menu",
  "Front Desk Check-in",
  "Cathedral Donation",
  "Lagos Salon Card",
  "HQ WiFi Tap",
  "Review Card — Suite 4",
];
const devices = [
  "iPhone 15 · Lagos",
  "Android · Abuja",
  "iPhone 13 · Lagos",
  "Android · Ibadan",
  "iPhone 14 · Lagos",
];
const tapList = document.getElementById("tapList");
let secs = 4;
function addRow() {
  const row = document.createElement("div");
  row.className = "tap-row";
  const name = products[Math.floor(Math.random() * products.length)];
  const meta = devices[Math.floor(Math.random() * devices.length)];
  row.innerHTML = `<div class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 16a7 7 0 0 1 7-7"/><path d="M2 13a10 10 0 0 1 10-10"/><circle cx="12" cy="16" r="1.4" fill="currentColor" stroke="none"/></svg></div>
  <div class="info"><div class="name">${name}</div><div class="meta">${meta}</div></div>
  <div class="time">now</div>`;
  tapList.prepend(row);
  document.querySelectorAll(".tap-row").forEach((r, i) => {
    if (i > 0) {
      const t = r.querySelector(".time");
      const cur = parseInt(t.dataset.s || 0) + (i === 1 ? secs : 5);
      t.dataset.s = cur;
      t.textContent = cur + "s ago";
    }
  });
  if (tapList.children.length > 4) tapList.removeChild(tapList.lastChild);
}
addRow();
addRow();
addRow();
addRow();
setInterval(addRow, 3400);


window.toggleEye = toggleEye;
window.addRow = addRow;
window.showForgotSuccess = showForgotSuccess;
window.countUp = countUp;
window.showForgotForm = showForgotForm;
window.showView = showView;
window.showToast = showToast;