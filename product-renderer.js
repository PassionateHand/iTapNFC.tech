// product-renderer.js — shared between builder.js and p.html

export function initials(name) {
  if (!name) return "?";
  return name.trim().split(/\s+/).slice(0, 2).map(w => w[0].toUpperCase()).join("");
}

export function gradStyle(theme) {
  return `background:linear-gradient(135deg,${theme},#3FD6C9);`;
}

export function showToast(msg) {
  const t = document.getElementById("toast");
  if (!t) return;
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 2200);
}

export function copyAccount(number) {
  if (!number) return showToast("No account number found");
  navigator.clipboard.writeText(number).then(() => showToast("Account number copied!"));
}

export function clockIn() {
  showToast("Clocked in successfully!");
}

export function saveContact() {
  showToast("Contact saved!");
}

export function visitorSignIn() {
  const name = document.getElementById("visitorName")?.value.trim();
  if (!name) return showToast("Please enter your name");
  showToast(`Welcome, ${name}!`);
}

// Expose interactive functions globally so inline onclick attributes work
export function exposeGlobals() {
  window.copyAccount = copyAccount;
  window.clockIn = clockIn;
  window.saveContact = saveContact;
  window.visitorSignIn = visitorSignIn;
  window.showToast = showToast;
}

/**
 * Builds the inner body HTML for a product type.
 * Works for both the builder phone preview (pv-* classes)
 * and the public p.html page (row/cta/desc classes).
 * Pass mode = "preview" for builder, "page" for p.html.
 */
export function buildProductBody(type, fields, theme, mode = "page") {
  const grad = gradStyle(theme);
  const star = `<svg viewBox="0 0 24 24" fill="${theme}" stroke="none"><path d="M12 2l3 6 6.5.9-4.7 4.6 1.1 6.4-5.9-3.1-5.9 3.1 1.1-6.4L2 8.9 8.5 8z"/></svg>`;

  // class names differ between preview (pv-*) and page
  const card  = mode === "preview" ? "pv-card" : "row";
  const k     = "k";
  const v     = mode === "preview" ? "" : "v";
  const cta   = mode === "preview" ? "pv-cta" : "cta";
  const stars = mode === "preview" ? "pv-stars" : "stars";
  const desc  = mode === "preview" ? `style="text-align:center;font-size:11px;color:var(--text-muted);margin-bottom:14px;"` : `class="desc"`;

  const row = (label, value) =>
    `<div class="${card}"><span class="${k}">${label}</span><span class="${v}">${value || "—"}</span></div>`;

  switch (type) {
    case "PAYMENT":
    case "payment":
      return `
        ${mode === "preview"
          ? `<div class="pv-heading">Pay to the Account Below</div>`
          : `<p class="desc">Copy the account number and paste it into your bank app to complete payment.</p>`}
        ${row("Bank", fields.bankName)}
        ${row("Account No.", fields.accountNumber)}
        ${row("Account Name", fields.accountName)}
        ${mode === "preview"
          ? `<div class="pv-desc">Copy the account number and paste it into your bank app.</div>`
          : ""}
        <${mode === "preview" ? "div" : "button"} class="${cta} copy-acct-btn"
          style="margin-top:auto;${grad}"
          onclick="copyAccount('${fields.accountNumber || ""}')">
          Copy Account Number
        </${mode === "preview" ? "div" : "button"}>
      `;

    case "DONATION":
    case "donation":
      return `
        ${mode === "preview" ? `<div class="pv-amount">₦5,000</div>` : `<p class="desc">Support us with your generous donation.</p>`}
        ${row("Bank", fields.bankName)}
        ${row("Account No.", fields.accountNumber)}
        ${row("Account Name", fields.accountName)}
        <${mode === "preview" ? "div" : "button"} class="${cta}" style="${grad}"
          onclick="copyAccount('${fields.accountNumber || ""}')">
          Give Now
        </${mode === "preview" ? "div" : "button"}>
      `;

    case "REVIEW":
    case "review":
      return `
        <div class="${stars}">${star.repeat(5)}</div>
        <p ${desc}>Loved your experience? Leave us a review.</p>
        <a class="${cta}" style="${grad}" href="${fields.googleReviewUrl || "#"}" target="_blank" rel="noopener">
          Leave a Google Review
        </a>
      `;

    case "MENU":
    case "menu":
      return mode === "preview"
        ? `<div class="pv-list">
            <div class="li"><span>Jollof Rice & Chicken</span><span>₦3,500</span></div>
            <div class="li"><span>Grilled Fish Platter</span><span>₦6,000</span></div>
            <div class="li"><span>Chapman</span><span>₦1,800</span></div>
           </div>
           <div class="${cta}" style="margin-top:auto;${grad}">View Full Menu</div>`
        : `<p class="desc">Tap below to browse our full menu.</p>
           <a class="${cta}" style="${grad}" href="${fields.website || "#"}" target="_blank">View Full Menu</a>
           ${fields.whatsapp
             ? `<a class="${cta}" style="background:var(--bg);border:1px solid var(--border);color:var(--text);"
                  href="https://wa.me/${fields.whatsapp.replace(/\D/g,"")}" target="_blank">Order on WhatsApp</a>`
             : ""}`;

    case "CARD":
    case "card":
      return mode === "preview"
        ? `<div style="font-size:11px;color:var(--text-muted);margin-bottom:14px;">${fields.whatsapp || "+234 801 234 5678"}</div>
           <div class="pv-socials">
             <div class="s"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 13a11 11 0 0 1 14 0"/></svg></div>
             <div class="s"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="4"/></svg></div>
             <div class="s"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></div>
           </div>
           <div class="${cta}" style="margin-top:auto;${grad}">Save Contact</div>`
        : `<p class="desc">${fields.whatsapp || ""}</p>
           <div class="socials">
             ${fields.whatsapp ? `<a class="social-btn" href="https://wa.me/${fields.whatsapp.replace(/\D/g,"")}" target="_blank"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 13a11 11 0 0 1 14 0"/></svg></a>` : ""}
             ${fields.instagram ? `<a class="social-btn" href="https://instagram.com/${fields.instagram.replace("@","")}" target="_blank"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="4"/></svg></a>` : ""}
             ${fields.facebook ? `<a class="social-btn" href="https://facebook.com/${fields.facebook}" target="_blank"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a>` : ""}
             ${fields.website ? `<a class="social-btn" href="${fields.website}" target="_blank"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/></svg></a>` : ""}
           </div>
           <button class="${cta}" style="${grad}" onclick="saveContact()">Save Contact</button>`;

    case "ATTENDANCE":
    case "attendance":
      return `
        <p ${desc}>Tap the button below to clock in.</p>
        <${mode === "preview" ? "div" : "button"} class="${cta}" style="${grad}" onclick="clockIn()">
          Clock In
        </${mode === "preview" ? "div" : "button"}>
      `;

    case "VISITOR":
    case "visitor":
      return mode === "preview"
        ? `${row("Name", "—")}${row("Visiting", "—")}
           <div class="${cta}" style="margin-top:auto;${grad}">Sign In</div>`
        : `<p class="desc">Please fill in your details to sign in.</p>
           <input type="text" id="visitorName" placeholder="Your name" style="width:100%;padding:12px 14px;border-radius:10px;border:1px solid var(--border);background:var(--bg);color:var(--text);font-size:14px;font-family:inherit;">
           <input type="text" id="visitorHost" placeholder="Who are you visiting?" style="width:100%;padding:12px 14px;border-radius:10px;border:1px solid var(--border);background:var(--bg);color:var(--text);font-size:14px;font-family:inherit;">
           <button class="${cta}" style="${grad}" onclick="visitorSignIn()">Sign In</button>`;

    case "ASSET":
    case "asset":
      return `
        <p ${desc}>This asset is tracked by iTapNFC.</p>
        ${row("Asset", fields.businessName || fields.name || "—")}
        <${mode === "preview" ? "div" : "button"} class="${cta}" style="${grad}"
          onclick="showToast('Tap logged successfully')">
          Log Tap
        </${mode === "preview" ? "div" : "button"}>
      `;

    default:
      return `<div style="text-align:center;color:var(--text-faint);font-size:12.5px;margin-top:40px;">Choose a product type to preview</div>`;
  }
}