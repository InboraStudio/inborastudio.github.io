/**
 * Quin OS 2 — Research Paper Interactive Reader & Search Engine
 * Formatted for Inbora Studio & Dr Chamyoung (Alok)
 */

document.addEventListener('DOMContentLoaded', () => {
  initSearch();
  initCopyButtons();
});

/* ── Live In-Paper Keyword Search ─────────────────────────────────────────── */
function initSearch() {
  const input = document.getElementById('paper-search');
  if (!input) return;

  const sections = document.querySelectorAll('article.paper-section');

  input.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase().trim();

    sections.forEach(sec => {
      if (!q) {
        sec.style.display = 'block';
        return;
      }
      const text = sec.textContent.toLowerCase();
      if (text.includes(q)) {
        sec.style.display = 'block';
      } else {
        sec.style.display = 'none';
      }
    });
  });
}

/* ── Code & BibTeX Copy Functionality ─────────────────────────────────────── */
function initCopyButtons() {
  const btns = document.querySelectorAll('.copy-trigger');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.target;
      const el = document.getElementById(targetId);
      if (el) {
        navigator.clipboard.writeText(el.innerText).then(() => {
          const original = btn.innerText;
          btn.innerText = 'Copied!';
          setTimeout(() => {
            btn.innerText = original;
          }, 1800);
        });
      }
    });
  });
}
