(function () {
  const doc = document;
  const config = window.SITE_CONFIG || {};

  function setTextById(id, value, hideIfEmpty = true) {
    const el = doc.getElementById(id);
    if (!el) return;
    if (value) {
      el.textContent = value;
      el.style.display = '';
    } else if (hideIfEmpty) {
      el.style.display = 'none';
    }
  }

  function iconId(name) {
    const key = (name || '').toLowerCase();
    switch (key) {
      case 'instagram': return 'icon-instagram';
      case 'tiktok': return 'icon-tiktok';
      case 'youtube': return 'icon-youtube';
      case 'twitter':
      case 'x': return 'icon-twitter';
      case 'github': return 'icon-github';
      case 'mail':
      case 'email': return 'icon-mail';
      case 'website':
      case 'globe': return 'icon-globe';
      case 'link':
      default: return 'icon-link';
    }
  }

  function createLinkNode(link) {
    const a = doc.createElement('a');
    a.className = 'link';
    a.href = link.href;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';

    const icon = doc.createElement('span');
    icon.className = 'link-icon';
    icon.innerHTML = `<svg width="20" height="20"><use href="#${iconId(link.icon)}"/></svg>`;

    const title = doc.createElement('span');
    title.className = 'link-title';
    title.textContent = link.title || link.href;

    const ext = doc.createElement('span');
    ext.className = 'link-ext';
    ext.innerHTML = '<svg width="16" height="16"><use href="#icon-external"/></svg>';

    a.appendChild(icon);
    a.appendChild(title);
    a.appendChild(ext);
    return a;
  }

  let toastTimeout;
  function showToast(message) {
    const t = doc.getElementById('toast');
    if (!t) return;
    t.textContent = message;
    t.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => t.classList.remove('show'), 2000);
  }

  doc.addEventListener('DOMContentLoaded', () => {
    // Allow color override
    if (config.theme && config.theme.primary) {
      document.documentElement.style.setProperty('--primary-500', config.theme.primary);
    }

    // Title
    if (config.seoTitle) {
      document.title = config.seoTitle;
    } else if (config.name) {
      document.title = `${config.name} | Links`;
    }

    // Avatar
    const avatarEl = doc.getElementById('avatar');
    if (avatarEl) {
      avatarEl.src = config.avatarUrl || 'assets/avatar.svg';
      avatarEl.alt = config.name ? `Avatar ${config.name}` : 'Avatar';
    }

    // Text content
    setTextById('displayName', config.name || 'Numele Tău');
    const usernameEl = doc.getElementById('username');
    if (usernameEl) {
      if (config.username) {
        usernameEl.textContent = `@${config.username}`;
        usernameEl.style.display = '';
      } else {
        usernameEl.style.display = 'none';
      }
    }
    setTextById('bio', config.bio || '', true);

    // Badges
    const badgesWrap = doc.getElementById('badges');
    if (badgesWrap) {
      badgesWrap.innerHTML = '';
      (config.badges || []).forEach((text) => {
        const span = doc.createElement('span');
        span.className = 'badge';
        span.textContent = text;
        badgesWrap.appendChild(span);
      });
    }

    // Links
    const linksWrap = doc.getElementById('links');
    if (linksWrap) {
      linksWrap.innerHTML = '';
      (config.links || []).forEach((l) => linksWrap.appendChild(createLinkNode(l)));
    }

    // Copy
    const copyBtn = doc.getElementById('copyBtn');
    if (copyBtn) {
      copyBtn.addEventListener('click', async () => {
        const toCopy = config.primaryLink || window.location.href;
        try {
          await navigator.clipboard.writeText(toCopy);
          showToast('Link copiat!');
        } catch (e) {
          showToast('Nu s-a putut copia');
        }
      });
    }

    // Share
    const shareBtn = doc.getElementById('shareBtn');
    if (shareBtn) {
      shareBtn.addEventListener('click', async () => {
        const data = {
          title: config.name || document.title,
          text: config.bio || '',
          url: config.primaryLink || window.location.href,
        };
        if (navigator.share) {
          try { await navigator.share(data); } catch (_) {}
        } else {
          try {
            await navigator.clipboard.writeText(data.url);
            showToast('Link copiat pentru share');
          } catch (_) {
            showToast('Deschide pe mobil pentru share');
          }
        }
      });
    }
  });
})();