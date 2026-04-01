// =============================================
//  AMAZON CLONE — script.js
// =============================================

// ── 1. BACK TO TOP ──────────────────────────
document.querySelector('.footer-panel').style.cursor = 'pointer';
document.querySelector('.footer-panel').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ── 2. SEARCH ───────────────────────────────
const searchInput = document.querySelector('.input-search');
const searchIcon  = document.querySelector('.search-icon');

function doSearch() {
  const query = searchInput.value.trim();
  if (query === '') {
    alert('Please enter something to search.');
    return;
  }
  // Opens real Amazon search in a new tab
  window.open(`https://www.amazon.in/s?k=${encodeURIComponent(query)}`, '_blank');
}

searchIcon.addEventListener('click', doSearch);
searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') doSearch();
});

// ── 3. CART COUNTER ─────────────────────────
let cartCount = 0;
const cartEl = document.querySelector('.nav-cart');

// Wrap the cart icon text with a badge span on load
cartEl.innerHTML = `<i class="fa-solid fa-cart-plus"></i> Cart <span id="cart-count" style="
  background:orange; color:black; border-radius:50%;
  padding:1px 6px; font-size:12px; font-weight:700;
  display:${cartCount > 0 ? 'inline' : 'none'};
">${cartCount}</span>`;

function updateCart(n = 1) {
  cartCount += n;
  const badge = document.getElementById('cart-count');
  badge.textContent = cartCount;
  badge.style.display = 'inline';
}

// ── 4. SHOP BOXES — "Add to Cart" on click ──
document.querySelectorAll('.box a').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    updateCart();
    showToast(`Added to cart! 🛒  (${link.closest('.box-content').querySelector('h2').textContent})`);
  });
});

// ── 5. BOOK THUMBNAILS — click to add ───────
document.querySelectorAll('.box-img1').forEach((img, i) => {
  img.style.cursor = 'pointer';
  img.addEventListener('click', () => {
    updateCart();
    showToast(`Book added to cart! 📚`);
  });
});

// ── 6. TOAST NOTIFICATION ───────────────────
function showToast(msg) {
  // Remove existing toast if any
  const old = document.getElementById('toast');
  if (old) old.remove();

  const toast = document.createElement('div');
  toast.id = 'toast';
  toast.textContent = msg;
  Object.assign(toast.style, {
    position:      'fixed',
    bottom:        '30px',
    right:         '30px',
    background:    '#232f3e',
    color:         'white',
    padding:       '12px 20px',
    borderRadius:  '6px',
    fontSize:      '14px',
    zIndex:        '9999',
    boxShadow:     '0 4px 12px rgba(0,0,0,0.3)',
    transition:    'opacity 0.4s',
    opacity:       '1',
  });
  document.body.appendChild(toast);

  setTimeout(() => { toast.style.opacity = '0'; }, 2000);
  setTimeout(() => { toast.remove(); }, 2400);
}

// ── 7. HERO SECTION — fade gradient overlay ─
const hero = document.querySelector('.hero-section');
Object.assign(hero.style, {
  position:   'relative',
  transition: 'opacity 0.5s',
});

// ── 8. PANEL LINKS — active highlight ───────
document.querySelectorAll('.panel-ops p').forEach(p => {
  p.style.cursor = 'pointer';
  p.addEventListener('click', () => {
    document.querySelectorAll('.panel-ops p').forEach(el => el.style.color = '');
    p.style.color = 'orange';
  });
});

// ── 9. FOOTER LINKS — prevent blank nav ─────
document.querySelectorAll('.footer a, .lastfooter-panel a').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    showToast(`"${a.textContent.trim()}" page coming soon!`);
  });
});

// ── 10. SIGN IN HOVER TEXT ───────────────────
const signin = document.querySelector('.nav-signin');
signin.style.cursor = 'pointer';
signin.addEventListener('click', () => {
  showToast('Sign-in page coming soon!');
});