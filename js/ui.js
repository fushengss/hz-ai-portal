/* =========================================================
   公共工具：站点常量 / DOM / 转义 / 图标 / 智能体卡片 / 详情抽屉 / 需求表单抽屉 / 页头页脚
   ========================================================= */
const SITE = {
  name: '湖州市人工智能赋能平台',
  en: 'Huzhou AI City Mall',
  sub: 'Huzhou AI City Mall · 全市 AI 公共服务底座',
  slogan: '统一归集算力、数据、模型、智能体与服务队伍，提供供需一体化、要素一体化、安全一体化三项服务，把 AI 能力送进湖州的每条产线。',
  copyright: '© 2026 湖州市人工智能赋能平台',
};

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const safeImg = s => (/^(assets\/|data:image\/)/.test(String(s || '')) ? esc(s) : '');
const cssId = s => (window.CSS && CSS.escape ? CSS.escape(s) : String(s).replace(/["\\]/g, '\\$&'));
const safeLink = value => {
  try { const u = new URL(value); return ['https:', 'http:'].includes(u.protocol) && !u.username && !u.password ? u.href : ''; }
  catch { return ''; }
};
const fmt = n => n >= 10000 ? (n / 10000).toFixed(1).replace('.0', '') + '万' : Number(n).toLocaleString('zh-CN');
const fmtDate = s => (s || '').slice(0, 10);
const reduceMotion = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

/* 数据状态标签（platform 实时 | target 目标） */
const SOURCE_META = {
  platform: { label: '实时', title: '平台统计数据' },
  target: { label: '2028 目标', short: '目标', title: '2028 年建设目标' },
};
function sourceBadge(src, useShort = true) {
  const m = SOURCE_META[src];
  if (!m) return '';
  const txt = useShort && m.short ? m.short : m.label;
  return `<span class="src-badge src-${esc(src)}" title="${esc(m.title)}">${esc(txt)}</span>`;
}

/* ---------- 图标（24px 描边风格） ---------- */
const ICONS = {
  search: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  chevron: '<path d="m6 9 6 6 6-6"/>',
  heart: '<path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7z"/>',
  play: '<path d="M7 4.5v15l12-7.5z"/>',
  chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
  close: '<path d="M18 6 6 18M6 6l12 12"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  cpu: '<rect x="5" y="5" width="14" height="14" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3"/>',
  bot: '<rect x="4" y="8" width="16" height="12" rx="3"/><path d="M12 8V5M9 14v1.5M15 14v1.5"/><circle cx="12" cy="3.6" r="1.2"/>',
  box: '<path d="M21 8 12 3 3 8v8l9 5 9-5z"/><path d="m3 8 9 5 9-5M12 13v8"/>',
  layers: '<path d="m12 3 9 5-9 5-9-5z"/><path d="m3 13 9 5 9-5"/><path d="m3 17.5 9 5 9-5" opacity=".5"/>',
  map: '<path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2z"/><path d="M9 4v14M15 6v14"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6"/><path d="M16 4.6a3.5 3.5 0 0 1 0 6.8M18 14.3c2.2.7 3.5 2.6 3.5 5.7"/>',
  shield: '<path d="M12 3 4 6v6c0 4.5 3.2 7.8 8 9 4.8-1.2 8-4.5 8-9V6z"/><path d="m9 12 2 2 4-4"/>',
  spark: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 16l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z"/>',
  building: '<rect x="5" y="3" width="14" height="18" rx="1"/><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2"/>',
  cap: '<path d="M2 9 12 4l10 5-10 5z"/><path d="M6 11.5V16c0 1.5 3 3 6 3s6-1.5 6-3v-4.5"/>',
  download: '<path d="M12 4v12M7 11l5 5 5-5M4 20h16"/>',
  file: '<path d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
  external: '<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
  link: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3A4 4 0 0 0 11 18.7l1-1"/>',
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
  compass: '<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5z"/>',
  briefcase: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M3 13h18"/>',
  message: '<path d="M4 5h16v11H9l-5 4z"/>',
  code: '<path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 5l-4 14"/>',
  language: '<path d="M4 6h10M9 4v2M6 6c.5 3 3 6 6 7M12 6c-.5 3-3 6-7 8"/><path d="m13 20 4-9 4 9M14.5 17h5"/>',
  table: '<rect x="3" y="4" width="18" height="16" rx="1.5"/><path d="M3 10h18M3 15h18M9 4v16"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  factory: '<path d="M3 21V10l6 4V10l6 4V6h6v15z"/><path d="M7 17h2M12 17h2M17 17h2"/>',
  scale: '<path d="M12 4v16M6 20h12M5 7h14"/><path d="M5 7l-3 7a3.5 3.5 0 0 0 6 0zM19 7l-3 7a3.5 3.5 0 0 0 6 0z"/>',
  receipt: '<path d="M6 3h12v18l-3-2-3 2-3-2-3 2z"/><path d="M9 8h6M9 12h6"/>',
  presentation: '<rect x="3" y="4" width="18" height="12" rx="1.5"/><path d="M12 16v4M8 20h8M7 12l3-3 3 2 4-4"/>',
  pen: '<path d="M4 20l1-4L16.5 4.5a2.1 2.1 0 0 1 3 3L8 19z"/><path d="m14 7 3 3"/>',
  mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5"/>',
  flask: '<path d="M9 3h6M10 3v6L4.5 19a1.5 1.5 0 0 0 1.3 2.2h12.4A1.5 1.5 0 0 0 19.5 19L14 9V3"/><path d="M7.5 15h9"/>',
  rocket: '<path d="M5 15c-1.5 1.5-2 5-2 5s3.5-.5 5-2M14 4c3-1.5 6-1.2 6-1.2s.3 3-1.2 6L12 16l-4-4z"/><circle cx="15" cy="9" r="1.5"/>',
  phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
};
const icon = (name, extra = '') => `<svg class="ic ${extra}" viewBox="0 0 24 24" aria-hidden="true">${ICONS[name] || ''}</svg>`;

/* ---------- Toast ---------- */
function toast(msg) {
  const t = $('#toast');
  if (!t) return;
  t.innerHTML = `${icon('check')}<span>${esc(msg)}</span>`;
  t.classList.add('show');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => t.classList.remove('show'), 2800);
}

/* ---------- 数据 / 收藏 ---------- */
const DB = window.__AGENT_DB__;
const FAVS = (() => {
  try { const v = JSON.parse(localStorage.getItem('hzaip_favs') || '[]'); return new Set(Array.isArray(v) ? v.map(String) : []); }
  catch { return new Set(); }
})();
const saveFavs = () => { try { localStorage.setItem('hzaip_favs', JSON.stringify([...FAVS])); } catch { /* 隐私模式忽略 */ } };
const agentById = id => DB.agents.find(a => a.id === id);
const hotAgents = n => [...DB.agents].sort((a, b) => b.visits - a.visits).slice(0, n);

/* ---------- 试用入口 ---------- */
const trialLink = a => a.trialKind === 'direct' ? safeLink(a.trialUrl) : '';
function trialAction(a) {
  const url = trialLink(a);
  if (url) return `<a class="try-online" href="${esc(url)}" target="_blank" rel="noopener noreferrer" aria-label="在线试用：${esc(a.title)}（新窗口）">${icon('play')}在线试用</a>`;
  return '';
}

/* ---------- 智能体卡片 ---------- */
function featuredMarkup(a, i) {
  return `
  <article class="featured-card ${i === 0 ? 'primary' : ''}" data-agent="${esc(a.id)}">
    <div class="featured-cover">
      <img src="${safeImg(a.image)}" alt="${esc(a.title)}" loading="lazy" decoding="async" />
      ${i === 0 ? '<span class="featured-flag">本周主推</span>' : ''}
    </div>
    <div class="featured-body">
      <div class="badge-row">
        ${a.industries.slice(0, 2).map(n => `<span class="badge">${esc(n)}</span>`).join('')}
        ${a.online ? '<span class="badge accent">有试用入口</span>' : ''}
      </div>
      <h4><button type="button" class="name-btn" data-agent-link="${esc(a.id)}">${esc(a.title)}</button></h4>
      <p class="featured-desc">${esc(a.solution)}</p>
      <p class="featured-value">${icon('check')}<span>${esc(a.value)}</span></p>
      <div class="card-actions">
        <span class="card-heat">${icon('chart')} 热度 ${fmt(a.visits)}</span>
        <span class="spacer"></span>
        <button type="button" class="detail-link" data-detail="${esc(a.id)}">详情${icon('arrow')}</button>
        ${trialAction(a)}
      </div>
    </div>
  </article>`;
}

function agentCard(a) {
  const fav = FAVS.has(a.id);
  return `
  <article class="agent-card" data-agent="${esc(a.id)}">
    <div class="card-cover">
      <img src="${safeImg(a.image)}" alt="" loading="lazy" decoding="async" />
      ${a.online ? '<span class="cover-online">有试用入口</span>' : ''}
      <button type="button" class="fav-btn ${fav ? 'on' : ''}" data-fav="${esc(a.id)}" aria-label="收藏 ${esc(a.title)}" aria-pressed="${fav}">${icon('heart')}</button>
    </div>
    <div class="card-body">
      <div class="badge-row">${a.industries.slice(0, 2).map(n => `<span class="badge">${esc(n)}</span>`).join('')}</div>
      <h4 class="agent-name"><button type="button" class="name-btn" data-agent-link="${esc(a.id)}" title="${a.online ? '直接在线体验' : '查看详情'}">${esc(a.title)}</button></h4>
      <p class="agent-desc">${esc(a.solution)}</p>
      <p class="agent-value" title="${esc(a.value)}">${icon('check')}<span>${esc(a.value)}</span></p>
      <div class="agent-tags">${a.tags.slice(0, 3).map(t => `<span class="tag">${esc(t)}</span>`).join('')}</div>
      <div class="card-actions">
        <span class="card-heat">${icon('chart')} 热度 ${fmt(a.visits)}</span>
        <span class="spacer"></span>
        <button type="button" class="detail-link" data-detail="${esc(a.id)}">详情${icon('arrow')}</button>
        ${trialAction(a)}
      </div>
    </div>
  </article>`;
}

/* ---------- 详情抽屉 ---------- */
const VALUE_DIMS = ['效率提升', '降本增效', '风险管控', '体验优化'];
const Drawer = {
  active: null,
  lastFocus: null,
  tabs: {
    intro: a => `
      <div><div class="d-label">业务痛点</div><p class="d-text">${esc(a.painPoint)}</p></div>
      <div><div class="d-label">Agent 解决方案</div><p class="d-text">${esc(a.solution)}</p></div>
      <div><div class="d-label">核心价值</div><p class="d-text value-text">${esc(a.value)}</p></div>
      <div><div class="d-label">适用行业与标签</div>
        <div class="agent-tags">${a.industries.map(n => `<span class="badge">${esc(n)}</span>`).join('')}${a.tags.map(t => `<span class="tag">${esc(t)}</span>`).join('')}</div></div>`,
    effect: a => `
      <div><div class="d-label">实测成效</div><div class="effect-card"><span class="effect-ic">${icon('chart')}</span><p>${esc(a.value)}</p></div></div>
      <div><div class="d-label">价值维度</div><div class="effect-chips">${VALUE_DIMS.map(x => `<span class="effect-chip ${a.tags.some(t => t.includes(x.slice(0, 2))) ? 'on' : ''}">${x}</span>`).join('')}</div></div>
      <div><div class="d-label">可复用的关键标签</div><div class="agent-tags">${a.tags.map(t => `<span class="tag">${esc(t)}</span>`).join('')}</div></div>
      <p class="d-note">实际应用成效将结合企业业务流程、数据基础与部署方案进一步评估优化。</p>`,
    demo: a => {
      const url = trialLink(a);
      if (url) return `
        <div><div class="d-label">${esc(a.title)} · 在线试用</div>
        <p class="d-text">点击进入此智能体对应的在线试用环境，将在新窗口打开。</p>
        <p class="d-text" style="margin-top:12px">${trialAction(a)}</p>
        <p class="d-note" style="margin-top:12px">${esc(a.trialNotice || '访问及登录要求以试用环境为准；如需企业知识库接入或私有化部署，可提交定制需求。')}</p></div>`;
      return `<div><div class="d-label">预约开通体验</div><p class="d-text">该智能体支持按企业场景专属部署或开通测试账号，可点击下方「定制需求」提交业务场景，平台顾问与 FDE 团队将在 2 个工作日内协助对接。</p></div>`;
    },
    source: a => `
      <div><div class="d-label">能力档案</div><ul class="d-list">
        <li><span>智能体编号</span><b>${esc(a.id)}</b></li>
        <li><span>所属行业</span><b>${esc(a.industries.join(' / '))}</b></li>
        <li><span>浏览热度</span><b>${fmt(a.visits)}</b></li>
        <li><span>最近更新</span><b>${esc(fmtDate(a.updatedAt)) || '—'}</b></li>
        <li><span>接入方式</span><b>${a.online ? '在线试用 / 私有化部署' : '企业接入 / 私有化部署'}</b></li>
        <li><span>服务归属</span><b>${esc(SITE.name)}</b></li>
      </ul></div>
      <div><div class="d-label">服务保障</div>
        <p class="d-note">该智能体已通过平台统一编目与安全准入审核，支持企业知识库对接、业务系统集成及数据不出域私有化交付。</p></div>`,
  },
  bg: () => [$('#siteHeader'), $('#app'), $('#siteFooter'), $('.skip-link')].filter(Boolean),
  open(id) {
    const a = agentById(id);
    if (!a) return;
    if (DemandDrawer.isOpen()) DemandDrawer.close(false);
    const el = $('#drawer');
    clearTimeout(this._t);
    if (!el.classList.contains('open')) this.lastFocus = document.activeElement;
    this.active = a;
    el.setAttribute('aria-label', `${a.title} 详情`);
    $('#drawerCover').innerHTML = `<img src="${safeImg(a.image)}" alt="" />`;
    $('#drawerHero').innerHTML = `
      <h3>${esc(a.title)}</h3>
      <div class="dev"><span>${esc(a.industries.join(' · '))}</span><span class="dev-dot"></span><span>热度 ${fmt(a.visits)}</span><span class="dev-dot"></span><span>更新于 ${esc(fmtDate(a.updatedAt)) || '—'}</span></div>
      <div class="badge-row"><span class="badge">${esc(a.id)}</span>${a.online ? '<span class="badge accent">有试用入口</span>' : '<span class="badge">暂无独立试用入口</span>'}</div>`;
    this.tab('intro');
    this.syncFav();
    const tryBtn = $('#drawerTry'), url = trialLink(a);
    tryBtn.textContent = url ? '在线试用' : '预约体验';
    if (url) { tryBtn.href = url; tryBtn.removeAttribute('aria-disabled'); }
    else { tryBtn.removeAttribute('href'); tryBtn.setAttribute('aria-disabled', 'true'); }
    el.classList.add('open');
    el.setAttribute('aria-hidden', 'false');
    $('#backdrop').hidden = false;
    requestAnimationFrame(() => $('#backdrop').classList.add('show'));
    document.body.style.overflow = 'hidden';
    this.bg().forEach(n => n.setAttribute('inert', ''));
    setTimeout(() => $('#drawerClose').focus(), 30);
  },
  tab(name) {
    const a = this.active;
    if (!a || !this.tabs[name]) return;
    $$('#drawerTabs [role="tab"]').forEach(b => {
      const on = b.dataset.tab === name;
      b.classList.toggle('active', on);
      b.setAttribute('aria-selected', String(on));
      b.tabIndex = on ? 0 : -1;
    });
    $('#drawerBody').innerHTML = this.tabs[name](a);
    $('#drawerBody').scrollTop = 0;
  },
  close(restore = true) {
    const el = $('#drawer');
    if (!el || !el.classList.contains('open')) return;
    el.classList.remove('open');
    el.setAttribute('aria-hidden', 'true');
    $('#backdrop').classList.remove('show');
    clearTimeout(this._t);
    this._t = setTimeout(() => { if (!DemandDrawer.isOpen()) $('#backdrop').hidden = true; }, 260);
    this.active = null;
    document.body.style.overflow = '';
    this.bg().forEach(n => n.removeAttribute('inert'));
    if (restore && this.lastFocus && document.contains(this.lastFocus)) this.lastFocus.focus();
  },
  syncFav() {
    const a = this.active;
    if (!a) return;
    const on = FAVS.has(a.id);
    const b = $('#drawerFav');
    b.classList.toggle('on', on);
    b.setAttribute('aria-pressed', String(on));
    b.setAttribute('aria-label', on ? '取消收藏' : '收藏');
  },
};

/* ---------- 需求发布 / 方案咨询表单抽屉（2.2.4 规范 9 字段 + 实时字数统计 + 校验） ---------- */
const DISTRICT_IND_HINT = {
  '吴兴区': { recommend: '制造业', tip: '推荐：童装纺织、美妆日化、智能物流装备' },
  '南浔区': { recommend: '制造业', tip: '推荐：木业家居、智能电梯、智能电机' },
  '德清县': { recommend: 'IT运维', tip: '推荐：地理信息、生物医药、通用航空' },
  '长兴县': { recommend: '制造业', tip: '推荐：新能源电池、智能汽车零部件、绿色建材' },
  '安吉县': { recommend: '制造业', tip: '推荐：绿色家居（椅业）、竹产业、白茶与现代农业' },
  '市本级': { recommend: '政务', tip: '推荐：数字政府、公共数据授权运营、市域治理' },
};

const DemandDrawer = {
  lastFocus: null,
  onSuccess: null,
  seq: 128,
  isOpen() {
    const el = $('#demandDrawer');
    return Boolean(el && el.classList.contains('open'));
  },
  open(prefill = {}, onSuccess = null) {
    if ($('#drawer').classList.contains('open')) Drawer.close(false);
    const el = $('#demandDrawer');
    if (!el) return;
    this.lastFocus = document.activeElement;
    this.onSuccess = onSuccess;

    const f = $('#demandForm', el);
    if (f) {
      f.reset();
      if (prefill.title) f.elements.title.value = prefill.title;
      if (prefill.district) f.elements.district.value = prefill.district;
      if (prefill.industry) f.elements.industry.value = prefill.industry;
      if (prefill.pain) f.elements.pain.value = prefill.pain;
      if (prefill.expect) f.elements.expect.value = prefill.expect;
      this.syncHint();
      this.syncCounts();
      $('#demandFormError', el).hidden = true;
    }

    el.classList.add('open');
    el.setAttribute('aria-hidden', 'false');
    $('#backdrop').hidden = false;
    requestAnimationFrame(() => $('#backdrop').classList.add('show'));
    document.body.style.overflow = 'hidden';
    Drawer.bg().forEach(n => n.setAttribute('inert', ''));
    setTimeout(() => {
      const firstInput = $('#demandForm input[name="title"]', el) || $('#demandDrawerClose', el);
      if (firstInput) firstInput.focus();
    }, 30);
  },
  close(restore = true) {
    const el = $('#demandDrawer');
    if (!el || !el.classList.contains('open')) return;
    el.classList.remove('open');
    el.setAttribute('aria-hidden', 'true');
    $('#backdrop').classList.remove('show');
    setTimeout(() => { if (!$('#drawer').classList.contains('open')) $('#backdrop').hidden = true; }, 260);
    document.body.style.overflow = '';
    Drawer.bg().forEach(n => n.removeAttribute('inert'));
    if (restore && this.lastFocus && document.contains(this.lastFocus)) this.lastFocus.focus();
  },
  syncHint() {
    const f = $('#demandForm');
    if (!f) return;
    const d = f.elements.district.value;
    const h = DISTRICT_IND_HINT[d];
    const hintEl = $('#districtIndHint');
    if (hintEl) hintEl.textContent = h ? h.tip : '将按所属区县匹配属地承接平台与行业伙伴';
  },
  syncCounts() {
    const f = $('#demandForm');
    if (!f) return;
    const painLen = (f.elements.pain.value || '').trim().length;
    const expLen = (f.elements.expect.value || '').trim().length;
    const pEl = $('#painCount'), eEl = $('#expectCount');
    if (pEl) {
      pEl.textContent = `${painLen} / 300 字（需 20—300 字）`;
      pEl.classList.toggle('warn', painLen > 0 && (painLen < 20 || painLen > 300));
    }
    if (eEl) {
      eEl.textContent = `${expLen} / 200 字（需 10—200 字）`;
      eEl.classList.toggle('warn', expLen > 0 && (expLen < 10 || expLen > 200));
    }
  },
  bind() {
    const el = $('#demandDrawer');
    if (!el) return;
    const f = $('#demandForm', el);
    $('#demandDrawerClose', el).addEventListener('click', () => this.close());
    $('#demandCancelBtn', el).addEventListener('click', () => this.close());

    f.elements.district.addEventListener('change', () => {
      const h = DISTRICT_IND_HINT[f.elements.district.value];
      if (h && !f.elements.industry.dataset.touched) f.elements.industry.value = h.recommend;
      this.syncHint();
    });
    f.elements.industry.addEventListener('change', () => { f.elements.industry.dataset.touched = '1'; });
    f.elements.pain.addEventListener('input', () => this.syncCounts());
    f.elements.expect.addEventListener('input', () => this.syncCounts());

    f.addEventListener('submit', e => {
      e.preventDefault();
      const errEl = $('#demandFormError', el);
      const showErr = msg => {
        errEl.textContent = msg;
        errEl.hidden = false;
        errEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      };

      const title = f.elements.title.value.trim();
      const district = f.elements.district.value;
      const industry = f.elements.industry.value;
      const pain = f.elements.pain.value.trim();
      const expect = f.elements.expect.value.trim();
      const budget = f.elements.budget.value;
      const deadline = f.elements.deadline.value;
      const acceptPoc = f.elements.acceptPoc.value;
      const org = f.elements.org.value.trim();
      const contact = f.elements.contact.value.trim();
      const phone = f.elements.phone.value.trim();

      if (title.length < 4 || title.length > 30) return showErr('请填写需求名称（4—30 字）');
      if (!district) return showErr('请选择所属区县');
      if (!industry) return showErr('请选择所属行业 / 产业');
      if (pain.length < 20 || pain.length > 300) return showErr(`现状与痛点需 20—300 字（当前 ${pain.length} 字）`);
      if (expect.length < 10 || expect.length > 200) return showErr(`期望效果需 10—200 字（当前 ${expect.length} 字）`);
      if (!budget) return showErr('请选择预算区间');
      if (deadline && deadline < '2026-11') return showErr('期望上线时间不能早于当前月份（2026-11）');
      if (!org) return showErr('请填写单位名称');
      if (!contact) return showErr('请填写联系人姓名');
      if (!/^1\d{10}$/.test(phone)) return showErr('请填写 11 位有效手机号（1 开头）');

      errEl.hidden = true;
      const id = `DEM-2026-${String(this.seq++).padStart(4, '0')}`;
      const newDemand = {
        id,
        title,
        district,
        industry,
        pain,
        expect,
        budget,
        deadline: deadline || '待定',
        acceptPoc,
        org: org.length > 4 ? `${org.slice(0, 4)}***（已脱敏）` : `${org}（已脱敏）`,
        contact: `${contact.slice(0, 1)}**`,
        phone: `${phone.slice(0, 3)}****${phone.slice(-4)}`,
        status: 'open',
        statusLabel: '待撮合',
        responses: 0,
        createdAt: '2026-11-22',
        isNew: true,
      };

      const M = window.__MARKET_DATA__;
      if (M) {
        M.demands.unshift(newDemand);
        M.stats.demands += 1;
        M.matches.unshift({
          id: 'MAT-' + id,
          demandId: id,
          title,
          district,
          industry,
          budget,
          stage: 'pending',
          candidates: [
            { capId: 'CAP-2026-0312', name: '平台智能匹配候选中…', score: 86 },
          ],
        });
      }

      this.close();
      toast(`需求已提交，编号 ${id}，平台将在 2 个工作日内反馈`);
      if (typeof this.onSuccess === 'function') this.onSuccess(newDemand);
    });
  },
};

function toggleFav(id) {
  if (FAVS.has(id)) FAVS.delete(id); else FAVS.add(id);
  saveFavs();
  $$(`[data-fav="${cssId(id)}"]`).forEach(b => { const on = FAVS.has(id); b.classList.toggle('on', on); b.setAttribute('aria-pressed', String(on)); });
  Drawer.syncFav();
  toast(FAVS.has(id) ? '已加入收藏' : '已取消收藏');
}

/* ---------- 路由辅助 ---------- */
const go = path => { location.hash = '#' + path; };

/* ---------- 页头 / 页脚（首页 + 六大核心模块，支持二级下拉导航） ---------- */
const NAV_ITEMS = [
  { path: '/', label: '首页' },
  {
    path: '/agents', label: '智能体库',
    children: [
      { path: '/agents/train', label: '开发训练', desc: '开发平台与模型微调' },
      { path: '/agents/deploy', label: '场景落地', desc: '企业级智能体应用库' },
    ],
  },
  {
    path: '/data', label: '数据要素',
    children: [
      { path: '/data/governance', label: '汇聚治理', desc: '高质量数据集与合规底座' },
      { path: '/data/sharing', label: '开放共享', desc: '授权运营与接口流通' },
    ],
  },
  {
    path: '/talent', label: '人才培育',
    children: [
      { path: '/talent/training', label: '实训培养', desc: '分层课程与 FDE 实训' },
      { path: '/talent/certification', label: '认证评价', desc: '分级考核与持证入库' },
    ],
  },
  {
    path: '/cases', label: '标杆案例',
    children: [
      { path: '/cases/release', label: '定期发布', desc: '三县两区标杆榜单' },
      { path: '/cases/transform', label: '成果转化', desc: '标准化方案复制推广' },
    ],
  },
  {
    path: '/policy', label: '政策服务',
    children: [
      { path: '/policy/events', label: '重大事项', desc: '专项行动与揭榜挂帅' },
      { path: '/policy/direct', label: '政策直通', desc: '算力券与精准政策匹配' },
    ],
  },
  {
    path: '/knowledge', label: '知识底座',
    children: [
      { path: '/knowledge/qa', label: '智能问答', desc: '全库检索与智能咨询' },
      { path: '/knowledge/diagnosis', label: '政企诊断', desc: '成熟度评估与路径规划' },
    ],
  },
];

const LOGO_SVG = '<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linejoin="round"><path d="M20 6 32 13v14L20 34 8 27V13z"/><circle cx="20" cy="20" r="3.4" fill="currentColor" stroke="none"/></svg>';

function renderChrome() {
  $('#siteHeader').innerHTML = `
    <div class="wrap header-inner">
      <a class="brand" href="#/" aria-label="${esc(SITE.name)} 首页">
        <span class="brand-mark" aria-hidden="true">${LOGO_SVG}</span>
        <span class="brand-text"><strong>${esc(SITE.name)}</strong><em>${esc(SITE.sub)}</em></span>
      </a>
      <nav class="nav" id="mainNav" aria-label="主导航">
        ${NAV_ITEMS.map(n => n.children ? `
        <div class="nav-item has-sub" data-nav-group="${n.path}">
          <a href="#${n.path}" data-nav="${n.path}" class="nav-link">${n.label}${icon('chevron', 'chevron')}</a>
          <div class="nav-dropdown" role="menu" aria-label="${esc(n.label)}子菜单">
            ${n.children.map(c => `
            <a role="menuitem" href="#${c.path}" data-subnav="${c.path}">
              <strong>${esc(c.label)}</strong>
              <span>${esc(c.desc)}</span>
            </a>`).join('')}
          </div>
        </div>` : `<a href="#${n.path}" data-nav="${n.path}" class="nav-link">${n.label}</a>`).join('')}
      </nav>
      <div class="header-actions">
        <button type="button" class="text-btn" data-toast="请通过“浙里”统一身份认证登录平台">登录</button>
        <button type="button" class="btn btn-primary btn-sm" data-open-demand="1" data-demand-title="申请企业入驻与账号开通">企业注册</button>
      </div>
      <button type="button" class="menu-btn" id="menuBtn" aria-label="打开菜单" aria-expanded="false" aria-controls="mainNav">${icon('menu')}</button>
    </div>`;

  $('#siteFooter').innerHTML = `
    <div class="wrap footer-grid">
      <div class="footer-col footer-brand">
        <a class="brand" href="#/"><span class="brand-mark" aria-hidden="true">${LOGO_SVG}</span><span class="brand-text"><strong>${esc(SITE.name)}</strong><em>${esc(SITE.en)}</em></span></a>
        <p>${esc(SITE.slogan)}</p>
      </div>
      <div class="footer-col"><h4>平台导航</h4>${NAV_ITEMS.map(n => `<a href="#${n.path}">${n.label}</a>`).join('')}</div>
      <div class="footer-col"><h4>相关链接</h4>
        <a href="https://www.huzhou.gov.cn/" target="_blank" rel="noopener noreferrer">湖州市人民政府</a>
        <a href="https://www.zjzwfw.gov.cn/" target="_blank" rel="noopener noreferrer">浙江政务服务网（“浙里”入口）</a>
        <a href="https://www.miit.gov.cn/" target="_blank" rel="noopener noreferrer">工业和信息化部</a>
      </div>
      <div class="footer-col"><h4>建设与运营</h4>
        <p>运营主体：湖州市数据科技集团</p>
        <p>线下载体：湖州市 AI 生产力服务中心</p>
        <p>服务时间：工作日 9:00–17:30（线上需求全天候受理）</p>
      </div>
    </div>
    <div class="footer-bottom"><div class="wrap">
      <span>${esc(SITE.copyright)}</span><span>主办：湖州市数据科技集团</span><span>全市 AI 公共服务底座</span>
    </div></div>`;

  bindNavDropdowns();
  DemandDrawer.bind();
}

/* 顶部二级下拉交互：桌面端悬停平滑展开、键盘聚焦支持、点击子项自动收起 */
function bindNavDropdowns() {
  const groups = $$('#mainNav .nav-item.has-sub');
  const closeAll = () => groups.forEach(g => g.classList.remove('open'));
  groups.forEach(g => {
    let leaveT = null;
    g.addEventListener('mouseenter', () => {
      if (window.innerWidth <= 1080) return;
      clearTimeout(leaveT);
      closeAll();
      g.classList.add('open');
    });
    g.addEventListener('mouseleave', () => {
      if (window.innerWidth <= 1080) return;
      leaveT = setTimeout(() => g.classList.remove('open'), 140);
    });
    g.addEventListener('click', e => {
      if (e.target.closest('a[data-subnav]')) closeAll();
    });
  });
  $('#mainNav')._closeAll = closeAll;
}
