import { createProduct } from "./api.js";
import {
  initials,
  gradStyle,
  showToast,
  buildProductBody,
  exposeGlobals,
} from "./product-renderer.js";

exposeGlobals();
window.closeModal = closeModal;
window.copyPreviewAccount = copyPreviewAccount;

const root = document.documentElement;
document.getElementById("themeToggle").addEventListener("click", function () {
  const isDark = root.getAttribute("data-theme") === "dark";
  root.setAttribute("data-theme", isDark ? "light" : "dark");
  this.querySelector(".icon-sun").style.display = isDark ? "block" : "none";
  this.querySelector(".icon-moon").style.display = isDark ? "none" : "block";
  renderPreview();
});

const ICONS = {
  PAYMENT:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="13" rx="2"/><path d="M2 10h20M6 15h4"/></svg>',
  MENU: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14l-3-2-3 2-3-2-3 2-2-1.4-2 1.4z"/><path d="M8 7h8M8 11h8M8 15h5"/></svg>',
  DONATION:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.8 12.6L12 21l-8.8-8.4a5 5 0 0 1 7.5-6.6L12 7l1.3-1a5 5 0 0 1 7.5 6.6z"/></svg>',
  REVIEW:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3 6 6.5.9-4.7 4.6 1.1 6.4-5.9-3.1-5.9 3.1 1.1-6.4L2 8.9 8.5 8z"/></svg>',
  CARD: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="11" r="2"/><path d="M15 9h3M15 13h3M6 17h12"/></svg>',
  ATTENDANCE:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></svg>',
  VISITOR:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/><path d="M3 21v-1a5 5 0 0 1 5-5h2a5 5 0 0 1 5 5v1M16 11l2 2 4-4"/></svg>',
  ASSET:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.6 13.4 12 22l-9.6-9.6a3.5 3.5 0 0 1 0-5L8 2l3 3-5 5 6.6 6.6 5-5z"/><circle cx="17.5" cy="6.5" r="1"/></svg>',
};

const TYPES = [
  {
    id: "PAYMENT",
    name: "Payment Page",
    desc: "Customers tap and pay your bank details instantly.",
  },
  {
    id: "MENU",
    name: "Restaurant Menu",
    desc: "A tap-to-browse digital menu for your tables.",
  },
  {
    id: "DONATION",
    name: "Church Donation",
    desc: "A fast, secure giving page for your congregation.",
  },
  {
    id: "REVIEW",
    name: "Google Review Card",
    desc: "Turn happy customers into 5-star reviews.",
  },
  {
    id: "CARD",
    name: "Business Card",
    desc: "Share contact info and socials with one tap.",
  },
  {
    id: "ATTENDANCE",
    name: "Attendance",
    desc: "Staff tap in and out automatically.",
  },
  {
    id: "VISITOR",
    name: "Visitor Registration",
    desc: "Front-desk sign-in for guests and visitors.",
  },
  {
    id: "ASSET",
    name: "Asset Tracking",
    desc: "Tag equipment to see its history and location.",
  },
];

const FIELD_META = {
  businessName: {
    label: "Business Name",
    placeholder: "Grace Bistro",
    type: "text",
  },
  whatsapp: {
    label: "WhatsApp Number",
    placeholder: "+234 801 234 5678",
    type: "tel",
  },
  website: {
    label: "Website",
    placeholder: "https://yourbusiness.com",
    type: "url",
  },
  instagram: { label: "Instagram", placeholder: "@yourbusiness", type: "text" },
  facebook: {
    label: "Facebook",
    placeholder: "facebook.com/yourbusiness",
    type: "text",
  },
  bankName: { label: "Bank Name", placeholder: "Zenith Bank", type: "text" },
  accountNumber: {
    label: "Account Number",
    placeholder: "2210045871",
    type: "text",
  },
  accountName: {
    label: "Account Name",
    placeholder: "Grace Bistro Ltd",
    type: "text",
  },
  googleReviewUrl: {
    label: "Google Review URL",
    placeholder: "https://g.page/r/yourlink/review",
    type: "url",
  },
};

const FIELD_SETS = {
  PAYMENT: [
    "businessName",
    "bankName",
    "accountNumber",
    "accountName",
    "whatsapp",
  ],
  MENU: ["businessName", "whatsapp", "website", "instagram", "facebook"],
  DONATION: ["businessName", "bankName", "accountNumber", "accountName"],
  REVIEW: ["businessName", "googleReviewUrl"],
  CARD: ["businessName", "whatsapp", "website", "instagram", "facebook"],
  ATTENDANCE: ["businessName"],
  VISITOR: ["businessName"],
  ASSET: ["businessName"],
};

const COLORS = [
  "#6D5CFF",
  "#3FD6C9",
  "#F2B84B",
  "#F2697A",
  "#4F9DF2",
  "#9097AA",
];

let state = {
  type: null,
  businessName: "",
  logo: null,
  theme: "#6D5CFF",
  bankName: "",
  accountNumber: "",
  accountName: "",
  whatsapp: "",
  website: "",
  instagram: "",
  facebook: "",
  googleReviewUrl: "",
};

// render type grid
const typeGrid = document.getElementById("typeGrid");
TYPES.forEach((t) => {
  const card = document.createElement("div");
  card.className = "type-card";
  card.dataset.id = t.id;
  card.innerHTML = `<div class="type-icon">${ICONS[t.id]}</div><h3>${t.name}</h3><p>${t.desc}</p>`;
  card.addEventListener("click", () => {
    document
      .querySelectorAll(".type-card")
      .forEach((c) => c.classList.remove("selected"));
    card.classList.add("selected");
    state.type = t.id; // already uppercase
    document.getElementById("toStep2").disabled = false;
  });
  typeGrid.appendChild(card);
});

function setStep(n) {
  [1, 2, 3].forEach((i) => {
    document.getElementById("view-" + i).classList.toggle("active", i === n);
    const pill = document.getElementById("pill-" + i);
    pill.classList.toggle("active", i === n);
    pill.classList.toggle("done", i < n);
  });
  if (n === 2) {
    buildFields();
    renderPreview();
  }
  if (n === 3) {
    buildOutput();
  }
}

document.getElementById("toStep2").addEventListener("click", () => setStep(2));
document
  .getElementById("toStep1Back")
  .addEventListener("click", () => setStep(1));
document.getElementById("toStep3").addEventListener("click", () => setStep(3));
document.getElementById("createAnother").addEventListener("click", () => {
  state = {
    type: null,
    businessName: "",
    logo: null,
    theme: "#6D5CFF",
    bankName: "",
    accountNumber: "",
    accountName: "",
    whatsapp: "",
    website: "",
    instagram: "",
    facebook: "",
    googleReviewUrl: "",
  };
  document
    .querySelectorAll(".type-card")
    .forEach((c) => c.classList.remove("selected"));
  document.getElementById("toStep2").disabled = true;
  setStep(1);
});

function buildFields() {
  const wrap = document.getElementById("dynamicFields");
  wrap.innerHTML = "";

  const logoField = document.createElement("div");
  logoField.className = "field";
  logoField.innerHTML = `<label>Logo</label><div class="logo-row"><div class="logo-preview" id="logoPreview">${initials(state.businessName)}</div><label class="upload-btn">Upload<input type="file" accept="image/*" style="display:none" id="logoInput"></label></div>`;
  wrap.appendChild(logoField);

  const themeField = document.createElement("div");
  themeField.className = "field";
  themeField.innerHTML = `<label>Theme Color</label><div class="swatches" id="swatches"></div>`;
  wrap.appendChild(themeField);

  const swatchWrap = themeField.querySelector("#swatches");
  COLORS.forEach((c) => {
    const sw = document.createElement("div");
    sw.className = "swatch" + (c === state.theme ? " active" : "");
    sw.style.background = c;
    sw.addEventListener("click", () => {
      state.theme = c;
      document
        .querySelectorAll(".swatch")
        .forEach((s) => s.classList.remove("active"));
      sw.classList.add("active");
      renderPreview();
    });
    swatchWrap.appendChild(sw);
  });

  const custom = document.createElement("label");
  custom.className = "swatch-custom";
  custom.innerHTML = `<input type="color" value="${state.theme}">`;
  custom.querySelector("input").addEventListener("input", (e) => {
    state.theme = e.target.value;
    renderPreview();
  });
  swatchWrap.appendChild(custom);

  FIELD_SETS[state.type].forEach((key) => {
    const meta = FIELD_META[key];
    const f = document.createElement("div");
    f.className = "field";
    f.innerHTML = `<label>${meta.label}</label><input type="${meta.type}" placeholder="${meta.placeholder}" value="${state[key] || ""}">`;
    f.querySelector("input").addEventListener("input", (e) => {
      state[key] = e.target.value;
      renderPreview();
      const lp = document.getElementById("logoPreview");
      if (lp && !state.logo) lp.textContent = initials(state.businessName);
    });
    wrap.appendChild(f);
  });

  document.getElementById("logoInput").addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      state.logo = ev.target.result;
      renderPreview();
    };
    reader.readAsDataURL(file);
  });
}

function avatarStyle() {
  return state.logo
    ? `background-image:url(${state.logo});background-size:cover;background-position:center;`
    : `background:${state.theme};`;
}

function renderPreview(targetId) {
  const el = document.getElementById(targetId || "phoneScreen");
  if (!el) return;
  const name = state.businessName || "Your Business";
  const body = buildProductBody(state.type, state, state.theme, "preview");
  el.innerHTML = `
    <div class="pv-row">
      <div class="pv-avatar" style="${avatarStyle()}">${state.logo ? "" : initials(name)}</div>
      <div><div class="pv-biz">${name}</div><div class="pv-sub">Powered by iTapNFC</div></div>
    </div>
    <div class="pv-body">${body}</div>
    <div class="pv-secure">SECURED BY ITAPNFC</div>
  `;
}

function copyPreviewAccount() {
  if (!state.accountNumber) return;
  navigator.clipboard.writeText(state.accountNumber).then(() => {
    document.querySelectorAll(".copy-acct-btn").forEach((btn) => {
      btn.textContent = "Copied!";
      setTimeout(() => {
        btn.textContent = "Copy Account Number";
      }, 1500);
    });
  });
}

async function buildOutput() {
  const result = await createProduct({
    type: state.type,
    name: state.businessName || "My Product",
    themeColor: state.theme,
    status: "LIVE",
    fields: {
      bankName: state.bankName,
      accountNumber: state.accountNumber,
      accountName: state.accountName,
      whatsapp: state.whatsapp,
      website: state.website,
      instagram: state.instagram,
      facebook: state.facebook,
      googleReviewUrl: state.googleReviewUrl,
      logo: state.logo,
    },
  });

  if (result.message) {
    showToast(result.message);
    return;
  }

  const url = `https://www.itapnfc.tech/p/${result.product.slug}`;
  document.getElementById("genUrl").textContent = url;
  generateQR(url);
  renderPreview("phoneScreenFinal");
}

function generateQR(seed) {
  const grid = document.getElementById("qrGrid");
  grid.innerHTML = "";
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  function rnd() {
    h = (h * 1664525 + 1013904223) >>> 0;
    return h / 4294967295;
  }
  const size = 15;
  const cells = Array.from({ length: size * size }, () => rnd() > 0.55);
  function setBlock(r, c, sz, val) {
    for (let i = 0; i < sz; i++)
      for (let j = 0; j < sz; j++) cells[(r + i) * size + (c + j)] = val;
  }
  [
    [0, 0],
    [0, size - 4],
    [size - 4, 0],
  ].forEach(([r, c]) => {
    setBlock(r, c, 4, true);
    setBlock(r + 1, c + 1, 2, false);
  });
  for (let i = 0; i < size * size; i++) {
    const cell = document.createElement("div");
    cell.className = "qr-cell" + (cells[i] ? " on" : "");
    grid.appendChild(cell);
  }
}

document.getElementById("copyBtn").addEventListener("click", () => {
  const text = document.getElementById("genUrl").textContent;
  navigator.clipboard
    .writeText(text)
    .then(() => showToast("Link copied to clipboard"));
  const btn = document.getElementById("copyBtn");
  btn.textContent = "Copied!";
  setTimeout(() => (btn.textContent = "Copy"), 1500);
});

document.getElementById("writeNfcBtn").addEventListener("click", () => {
  document.getElementById("nfcModal").classList.add("show");
  document.getElementById("nfcWriting").style.display = "block";
  document.getElementById("nfcDone").style.display = "none";
  const bar = document.getElementById("modalBar");
  bar.style.width = "0%";
  requestAnimationFrame(() =>
    requestAnimationFrame(() => (bar.style.width = "100%")),
  );
  setTimeout(() => {
    document.getElementById("nfcWriting").style.display = "none";
    document.getElementById("nfcDone").style.display = "block";
  }, 2300);
});

function closeModal() {
  document.getElementById("nfcModal").classList.remove("show");
}

if (window.matchMedia?.("(prefers-color-scheme: light)").matches) {
  root.setAttribute("data-theme", "light");
  document.querySelector("#themeToggle .icon-sun").style.display = "block";
  document.querySelector("#themeToggle .icon-moon").style.display = "none";
}

renderPreview();
