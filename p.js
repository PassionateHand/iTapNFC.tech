import {
  initials,
  showToast,
  buildProductBody,
  gradStyle,
  exposeGlobals,
} from "./product-renderer.js";

exposeGlobals();

const API_URL = "https://itapnfc-tech-backend.onrender.com";

function avatarHtml(product) {
  if (product.logoUrl) {
    return `<div class="avatar" style="background-image:url(${product.logoUrl});background-size:cover;background-position:center;"></div>`;
  }
  return `<div class="avatar" style="background:${product.themeColor || "#6D5CFF"};">${initials(product.name)}</div>`;
}

function renderProduct(product) {
  const fields = product.fields || {};
  const theme = product.themeColor || "#6D5CFF";
  const name = product.name || "Business";
  const body = buildProductBody(product.type, fields, theme, "page");

  document.getElementById("page").innerHTML = `
      <div class="header">
        ${avatarHtml(product)}
        <div>
          <div class="biz-name">${name}</div>
          <div class="powered">Powered by iTapNFC</div>
        </div>
      </div>
      <div class="card">${body}</div>
      <div class="secure">SECURED BY ITAPNFC</div>
    `;
}

async function init() {
  const slug = window.location.pathname.split("/p/")[1];

  if (!slug) {
    document.getElementById("page").innerHTML = `
        <div class="error"><h2>Page not found</h2><p>This link doesn't point to a valid product.</p></div>
      `;
    return;
  }

  try {
    const response = await fetch(`${API_URL}/api/p/${slug}`);
    const data = await response.json();

    if (!response.ok || !data.product) {
      document.getElementById("page").innerHTML = `
          <div class="error"><h2>Page not found</h2><p>This product may have been removed or the link is invalid.</p></div>
        `;
      return;
    }

    document.title = `${data.product.name} — iTapNFC`;
    renderProduct(data.product);
  } catch (err) {
    document.getElementById("page").innerHTML = `
        <div class="error"><h2>Something went wrong</h2><p>Please try again later.</p></div>
      `;
  }
}

init();

window.init = init;
