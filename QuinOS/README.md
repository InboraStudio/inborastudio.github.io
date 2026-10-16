# Quin OS 2 — Showcase & Documentation Website

This directory contains the standalone static website for **Quin OS 2**, engineered to serve as both an interactive showcase and an exhaustive documentation hub with exceptional search engine optimization (SEO).

Designed and researched by **Dr Chamyoung (Alok)** at **Inbora Studio**.

---

## Structure

```
website/
├── index.html        # Showcase & documentation master single-page application
├── css/
│   └── style.css     # Dark glass design system, responsive styles, animations
├── js/
│   └── app.js        # Simulator engine, 100 Hz dock clock, search filter, theme swatches
├── assets/
│   ├── icons/        # Native Quin OS application icons (PNGs from tools/Icons)
│   └── wallpaper.jpg # High-resolution hero wallpaper
├── sitemap.xml       # Google Search Console sitemap
├── robots.txt        # Web crawler index permissions
└── README.md         # Deployment & hosting guide
```

---

## SEO & Discoverability Features

1. **Schema.org Structured Data (JSON-LD):**
   - Declares `SoftwareApplication` (Quin OS 2, 64-bit x86_64 OS, dateCreated: 2021, dateModified: 2026).
   - Declares `Organization` (Inbora Studio) and `Person` (Dr Chamyoung / Alok, Lead OS Researcher).
   - Declares `TechArticle` for search indexing of the 48-page technical architecture.
   - Declares `BreadcrumbList` connecting XuNet OS (32-bit) to Quin OS 2 (64-bit).

2. **OpenGraph & Twitter Cards:**
   - Pre-configured rich cards with title, description, and preview image for social sharing on Discord, Twitter/X, LinkedIn, and GitHub.

3. **Natural Search Snippets:**
   - Author, timeline, and studio metadata are formatted cleanly in meta tags, Schema.org objects, and semantic header/footer tags, enabling Google to index authorship and project history naturally without intrusive visual banners.

---

## Hosting on GitHub Pages (`github.io`)

You can deploy this website to GitHub Pages using any of the following 3 straightforward approaches:

### Approach A: Dedicated Repository (Recommended)
Host at `https://inborastudio.github.io/QuinOS/` (matching your `XuNetOS` structure):

```bash
# 1. Create a new repository on GitHub named "QuinOS" under InboraStudio
# 2. Inside this website directory:
cd website
git init
git add .
git commit -m "Initial release of Quin OS 2 showcase and documentation site"
git branch -M main
git remote add origin https://github.com/InboraStudio/QuinOS.git
git push -u origin main
```
In your GitHub repo settings: **Settings $\rightarrow$ Pages $\rightarrow$ Build and deployment: Deploy from a branch $\rightarrow$ Branch: main / root $\rightarrow$ Save**.

---

### Approach B: Using the `gh-pages` branch on your existing repo

```bash
git subtree push --prefix website origin gh-pages
```
Then select the `gh-pages` branch in repository settings.

---

### Approach C: Testing Locally

Run any local static server:

```bash
cd website
python3 -m http.server 8000
```
Open `http://localhost:8000` in your web browser.
