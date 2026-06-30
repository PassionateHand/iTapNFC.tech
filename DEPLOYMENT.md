# Deploying iTapNFC to itapnfc.tech

You own the domain — here's exactly how to get everything live. This assumes
no prior DevOps experience. Total time: ~30–45 minutes.

There are two pieces to deploy separately:
1. **Frontend** (the 5 HTML files) → a static host
2. **Backend** (Express + Prisma API) → a Node host + Postgres database

Recommended pair for the easiest setup: **Vercel** (frontend) + **Railway**
(backend + database). Both have free tiers and both make custom domains a
2-minute job. Alternatives (Netlify, Render, Cloudflare Pages) work the same
way — swap in their equivalent screens.

---

## Part A — Deploy the frontend (Vercel)

1. Unzip `itapnfc-site.zip` into its own folder.
2. Go to [vercel.com](https://vercel.com) → sign up (GitHub login is easiest).
3. Click **Add New → Project**.
4. Either:
   - Push the unzipped folder to a new GitHub repo and import it, **or**
   - Drag the folder straight onto Vercel's "Import" screen if it offers a
     direct upload option (no build step needed — this is a static site, no
     framework, no build command).
5. Deploy. You'll get a temporary URL like `itapnfc.vercel.app` — confirm the
   site loads and the pages link to each other correctly.
6. Go to the project's **Settings → Domains**.
7. Add `itapnfc.tech` (and optionally `www.itapnfc.tech`, then set one as the
   redirect target for the other).
8. Vercel will show you DNS records to add (see Part C below).

---

## Part B — Deploy the backend (Railway)

1. Go to [railway.app](https://railway.app) → sign up.
2. **New Project → Deploy from GitHub repo** → push the `itapnfc-backend`
   folder to its own GitHub repo first, then select it. (Railway can also
   deploy from a local folder via their CLI if you'd rather skip GitHub.)
3. **Add a database**: in the same project, click **New → Database →
   PostgreSQL**. Railway provisions it and gives you a `DATABASE_URL`
   automatically.
4. Go to your backend service's **Variables** tab and set:
   - `DATABASE_URL` → reference the Postgres variable Railway just created
     (Railway lets you link it directly, no copy-paste needed)
   - `JWT_SECRET` → generate a long random string (e.g. run
     `openssl rand -hex 32` locally and paste the output)
   - `JWT_EXPIRES_IN` → `7d`
   - `CLIENT_URL` → `https://itapnfc.tech`
   - `NODE_ENV` → `production`
   - `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` →
     from your Cloudinary dashboard (free tier is fine) — only needed once
     logo uploads matter; the app runs without them otherwise.
5. Set the **Start Command** to `npm run migrate:deploy && npm run seed && npm start`
   for the first deploy only (this creates tables and seeds demo data).
   After that first successful deploy, change it back to just `npm start` so
   you don't reseed on every redeploy.
6. Deploy. Railway gives you a temporary URL like
   `itapnfc-backend.up.railway.app` — confirm `/health` returns
   `{"status":"ok"}`.
7. Go to **Settings → Networking → Custom Domain**, add `api.itapnfc.tech`.
   Railway will show you a CNAME record to add (see Part C).

---

## Part C — DNS records (at your domain registrar)

Log into wherever you bought `itapnfc.tech` (Namecheap, GoDaddy, Cloudflare,
etc.) and find **DNS settings** / **Manage DNS**. Add the records your hosts
showed you in Parts A and B — they'll look like this:

| Type  | Host / Name      | Value (example — use what Vercel/Railway actually show you) |
|-------|-------------------|----------------------------------------------------------------|
| A     | `@`               | `76.76.21.21` (Vercel's IP — confirm in their dashboard)       |
| CNAME | `www`             | `cname.vercel-dns.com`                                         |
| CNAME | `api`             | `<your-service>.up.railway.app`                                |

Notes:
- Always copy the **exact** values from your hosting dashboard rather than
  this table — these change over time and per-account.
- DNS propagation can take anywhere from 2 minutes to a few hours.
- Both Vercel and Railway issue free SSL certificates automatically once DNS
  is pointed correctly — no extra step needed for HTTPS.

---

## Part D — Connect frontend to backend

Right now the 5 HTML files use **hardcoded demo data** — the dashboard
numbers, charts, and tables are not actually coming from your new API yet.
That wiring (replacing the static arrays with real `fetch('https://api.itapnfc.tech/...')`
calls, storing the JWT after login, attaching it to authenticated requests)
is the next real piece of work — happy to do that next if you'd like.

Until that's done, what you'll have live at `itapnfc.tech` is a fully
functional, navigable **demo/prototype** of the product, and a fully
functional **API** at `api.itapnfc.tech` that you can test directly (e.g. with
Postman or `curl`) — they just aren't talking to each other yet.

---

## Quick checklist

- [ ] Frontend deployed, loads at the Vercel-given URL
- [ ] `itapnfc.tech` added as a domain in Vercel
- [ ] Backend deployed, `/health` returns ok
- [ ] Postgres connected, migration + seed ran once
- [ ] `api.itapnfc.tech` added as a domain in Railway
- [ ] DNS records added at your registrar
- [ ] `https://itapnfc.tech` resolves to the site
- [ ] `https://api.itapnfc.tech/health` resolves to the API
- [ ] (Next step) Frontend wired to real API calls instead of demo data
