(() => {
  const categories = window.CLUB_CATEGORIES || [];
  const root = (document.body.dataset.base || '.').replace(/\/$/, '');
  const link = (path) => `${root}${path}`;
  const iconArrow = '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none"><path d="M19 12H5m0 0 6 6m-6-6 6-6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const iconSpark = '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none"><path d="M12 2.7 14.4 9.6 21.3 12l-6.9 2.4L12 21.3l-2.4-6.9L2.7 12l6.9-2.4L12 2.7Z" stroke="currentColor" stroke-width="1.55" stroke-linejoin="round"/></svg>';
  const categoryHref = (slug) => link(`/categories/${slug}/`);

  function renderCategory() {
    const slug = document.body.dataset.category;
    const category = categories.find((item) => item.slug === slug);
    const host = document.querySelector('#category-view');
    if (!category || !host) return;
    host.style.setProperty('--category-tone', category.tone);
    host.style.setProperty('--category-accent', category.accent);
    document.title = `${category.title} | باشگاه دانش خرید عالی`;
    const numbered = category.topics.map((topic, index) => `
      <article class="topic-card" id="${topic.id}">
        <span class="topic-number" aria-hidden="true">${String(index + 1).padStart(2, '0')}</span>
        <h3>${topic.title}</h3><p>${topic.description}</p>
        <a class="text-link" href="${topic.href ? link(topic.href) : `#${topic.id}`}">مرور این موضوع ${iconArrow}</a>
      </article>`).join('');
    const guides = category.guides.length ? `
      <section class="guide-panel" aria-labelledby="guide-title">
        <div class="section-title"><span class="eyebrow">منبع‌های قابل اعتماد</span><h2 id="guide-title">از اینجا عمیق‌تر ببین</h2></div>
        <div class="guide-grid">${category.guides.map((guide) => `
          <a class="guide-card" href="${guide.href}" target="_blank" rel="noopener noreferrer">
            <span class="guide-mark">${iconSpark}</span><span><strong>${guide.title}</strong><small>${guide.desc}</small></span>
            <span class="guide-go">${guide.label} ${iconArrow}</span>
          </a>`).join('')}</div>
      </section>` : '';
    const related = categories.filter((item) => item.slug !== category.slug).slice(0, 3).map((item) => `
      <a class="related-link" href="${categoryHref(item.slug)}"><span>${item.shortTitle}</span>${iconArrow}</a>`).join('');
    host.innerHTML = `
      <div class="breadcrumbs"><a href="${link('/')}" class="text-link">خانه</a><span aria-hidden="true">/</span><span>${category.shortTitle}</span></div>
      <section class="category-hero" style="--category-tone:${category.tone};--category-accent:${category.accent}" aria-labelledby="category-title">
        <div class="category-copy"><span class="eyebrow">${category.kicker}</span><h1 id="category-title">${category.title}</h1>
          <p>${category.description}</p><a class="button button-dark" href="#topics">کاوش موضوع‌ها ${iconArrow}</a>
        </div><div class="category-art"><img src="${category.image}" alt="تصویرسازی ${category.title}" width="720" height="540" fetchpriority="high"></div>
        <span class="category-orbit" aria-hidden="true"></span>
      </section>
      <section class="topic-section" id="topics" aria-labelledby="topics-title">
        <div class="section-title"><span class="eyebrow">یک قدم کنجکاوتر</span><h2 id="topics-title">در این دنیا چه چیزهایی پیدا می‌کنی؟</h2>
          <p>هر موضوع، نقطهٔ شروعی برای پرسیدن و کشف‌کردن است.</p></div>
        <div class="topic-grid">${numbered}</div>
      </section>
      ${guides}
      <section class="related-section"><div class="section-title"><span class="eyebrow">راه‌های تازه</span><h2>از اینجا کجا برویم؟</h2></div><div class="related-list">${related}</div></section>`;
  }

  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.primary-nav');
  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const expanded = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!expanded));
      menuButton.setAttribute('aria-label', expanded ? 'بازکردن منو' : 'بستن منو');
      nav.classList.toggle('is-open', !expanded);
    });
    nav.querySelectorAll('a').forEach((anchor) => anchor.addEventListener('click', () => {
      nav.classList.remove('is-open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'بازکردن منو');
    }));
  }

  const reveal = document.querySelector('#reveal-answer');
  const answer = document.querySelector('#challenge-answer');
  if (reveal && answer) reveal.addEventListener('click', () => {
    const open = answer.hidden;
    answer.hidden = !open;
    reveal.setAttribute('aria-expanded', String(open));
    reveal.textContent = open ? 'پنهان‌کردن پاسخ' : 'دیدن پاسخ';
  });

  if (document.body.dataset.page === 'category') renderCategory();
})();
