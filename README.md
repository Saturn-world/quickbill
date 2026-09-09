# QuickBill – Free Invoice Generator

A beautiful, modern **invoice generator** designed as a profitable micro-SaaS starter.

**Live demo idea**: Host on GitHub Pages for free → https://saturn-world.github.io/quickbill

![QuickBill](https://img.shields.io/badge/status-ready-brightgreen) ![License](https://img.shields.io/badge/license-MIT-blue)

## Why this can make money

| Feature              | Free Plan          | Pro ($9/mo)              | Agency ($29/mo)     |
|----------------------|--------------------|--------------------------|---------------------|
| Unlimited invoices   | ✅                 | ✅                       | ✅                  |
| PDF download         | ✅                 | ✅                       | ✅                  |
| Watermark            | Yes (small)        | Removed                  | Removed             |
| Custom logo & colors | ❌                 | ✅                       | ✅                  |
| Templates            | 1                  | 5+                       | Unlimited           |
| Invoice history      | ❌                 | ✅                       | ✅                  |
| Recurring invoices   | ❌                 | ✅                       | ✅                  |
| Team / Client portal | ❌                 | ❌                       | ✅                  |
| API                  | ❌                 | ❌                       | ✅                  |

### Monetization path
1. **Launch free** on GitHub Pages / Vercel / Netlify
2. Collect emails of people who download PDFs (add a soft email gate later)
3. Add Stripe Checkout for Pro
4. Add user accounts + database (Supabase / Firebase) for history & recurring
5. Sell Agency plan to freelancers who manage multiple clients

This exact model powers several $5k–$30k MRR indie products in the invoice/billing space.

## Features (current)

- Live preview that updates as you type
- Add / remove line items
- Tax calculation
- Multiple currencies (USD, EUR, GBP, ZAR, CAD…)
- Professional PDF download (html2canvas + jsPDF)
- Fully responsive
- Clean Tailwind design
- Zero backend required to start

## Quick start

Just open `index.html` in a browser, or:

```bash
# Serve locally
npx serve .
# or
python3 -m http.server 3000
```

## Deploy for free

### GitHub Pages
1. Go to repo **Settings → Pages**
2. Source: Deploy from branch `main` / root
3. Your site will be live at `https://saturn-world.github.io/quickbill`

### Vercel / Netlify
Drag & drop the folder or connect the GitHub repo — one-click deploy.

## Next steps to make it profitable

1. Add a soft email capture before PDF download
2. Integrate Stripe (Checkout or Payment Links)
3. Add localStorage / IndexedDB for “saved invoices”
4. Create 4–5 extra professional templates
5. Add logo upload + brand color picker (Pro feature)
6. Build simple auth + cloud sync with Supabase

## Tech

- Vanilla JS (no build step)
- Tailwind CSS (CDN)
- jsPDF + html2canvas for PDF generation
- Works offline once loaded

---

Built for **Saturn-world** as a ready-to-monetize starter.  
Feel free to fork, brand it, and ship.
