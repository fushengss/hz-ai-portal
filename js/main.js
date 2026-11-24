/* 哈希路由（#/path/sub?query）：首页 + 六大核心模块（智能体库 / 数据要素 / 人才培育 / 标杆案例 / 政策服务 / 知识底座） */
const ROUTES = {
  '': Home,
  agents: Agents,
  data: DataElements,
  talent: Talent,
  cases: Cases,
  policy: Policy,
  knowledge: Knowledge,
};

/* 旧路由平滑兼容映射 */
const LEGACY_REDIRECTS = {
  plaza: '#/agents/deploy',
  market: '#/cases/transform',
  industry: '#/cases/release',
  alliance: '#/talent/training',
  fde: '#/talent/training',
  packages: '#/policy/direct',
  security: '#/data/governance',
};

function parseHash() {
  const raw = location.hash.replace(/^#/, '') || '/';
  const [p, qs = ''] = raw.split('?');
  const segs = p.split('/').filter(Boolean);
  return { key: segs[0] || '', sub: segs[1] || '', query: Object.fromEntries(new URLSearchParams(qs)) };
}

let currentKey = null;
function route() {
  const { key, sub, query } = parseHash();
  if (LEGACY_REDIRECTS[key]) {
    if (key === 'industry' && query.tab === 'base') { location.replace('#/data/governance'); return; }
    location.replace(LEGACY_REDIRECTS[key]);
    return;
  }
  const page = ROUTES[key];
  if (!page) { location.replace('#/'); return; }
  Drawer.close(false);
  DemandDrawer.close(false);

  const app = $('#app');
  const el = document.createElement('div');
  el.className = key !== currentKey ? 'page' : '';
  el.id = 'page';
  el.innerHTML = page.render({ sub, query });
  app.replaceChildren(el);
  page.mount(el, { sub, query });

  document.title = `${page.title} · ${SITE.name}`;
  const pathKey = '/' + key;
  const activeSub = page.sub ? `${pathKey}/${page.sub}` : '';

  $$('#mainNav a[data-nav]').forEach(a => {
    const on = a.dataset.nav === pathKey;
    a.classList.toggle('active', on);
    if (on) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
  });
  $$('#mainNav a[data-subnav]').forEach(a => {
    a.classList.toggle('active', Boolean(activeSub && a.dataset.subnav === activeSub));
  });

  if ($('#mainNav')?._closeAll) $('#mainNav')._closeAll();
  setMenu(false);

  // 换模块回到顶部；同一模块内切换页签保持合理位置
  if (key !== currentKey) {
    window.scrollTo({ top: 0, behavior: 'instant' });
  } else if (sub) {
    const b = $('.page-banner');
    if (b) window.scrollTo({ top: Math.max(0, b.offsetHeight - 120), behavior: 'instant' });
  }
  currentKey = key;
}

function setMenu(open) {
  const nav = $('#mainNav'), btn = $('#menuBtn');
  if (!nav || !btn) return;
  nav.classList.toggle('open', open);
  btn.setAttribute('aria-expanded', String(open));
  btn.setAttribute('aria-label', open ? '关闭菜单' : '打开菜单');
}

function bindGlobal() {
  document.addEventListener('click', e => {
    const page = $('#page');
    if (page && page._outside) page._outside(e);
    const t = e.target;

    if (t.closest('#menuBtn')) { setMenu(!$('#mainNav').classList.contains('open')); return; }
    if (!t.closest('.nav, #menuBtn')) setMenu(false);
    if (!t.closest('.nav-item.has-sub') && $('#mainNav')?._closeAll) $('#mainNav')._closeAll();

    // 打开“发布需求 / 申请对接”表单抽屉
    const openDemand = t.closest('[data-open-demand]');
    if (openDemand) {
      e.preventDefault();
      const prefill = {
        title: openDemand.dataset.demandTitle || '',
        district: openDemand.dataset.demandDistrict || (currentKey === 'cases' && Cases.district ? Cases.district : ''),
        industry: openDemand.dataset.demandIndustry || '',
        pain: openDemand.dataset.demandPain || '',
        expect: openDemand.dataset.demandExpect || '',
      };
      DemandDrawer.open(prefill);
      return;
    }

    const fav = t.closest('[data-fav]');
    if (fav) { e.stopPropagation(); toggleFav(fav.dataset.fav); return; }
    const detail = t.closest('[data-detail]');
    if (detail) { Drawer.open(detail.dataset.detail); return; }
    const link = t.closest('[data-agent-link]');
    if (link) {
      const a = agentById(link.dataset.agentLink);
      if (a && trialLink(a)) window.open(trialLink(a), '_blank', 'noopener,noreferrer');
      else if (a) Drawer.open(a.id);
      return;
    }
    const msg = t.closest('[data-toast]');
    if (msg) { e.preventDefault(); toast(msg.dataset.toast); return; }
    // 智能体卡片空白处点击 → 详情
    const card = t.closest('[data-agent]');
    if (card && card.dataset.agent && !t.closest('button, a')) Drawer.open(card.dataset.agent);
  });

  // 智能体详情抽屉与背景遮罩
  $('#drawerTabs').addEventListener('click', e => { const b = e.target.closest('[data-tab]'); if (b) Drawer.tab(b.dataset.tab); });
  $('#drawerClose').addEventListener('click', () => Drawer.close());
  $('#backdrop').addEventListener('click', () => {
    if (DemandDrawer.isOpen()) DemandDrawer.close();
    else Drawer.close();
  });
  $('#drawerTry').addEventListener('click', e => {
    if ($('#drawerTry').getAttribute('aria-disabled') === 'true') {
      e.preventDefault();
      Drawer.tab('demo');
      toast('该智能体支持预约开通体验，可点击「定制需求」提交业务场景');
    }
  });
  $('#drawerFav').addEventListener('click', () => { if (Drawer.active) toggleFav(Drawer.active.id); });
  $('#drawerCustom').addEventListener('click', () => {
    const a = Drawer.active;
    Drawer.close(false);
    DemandDrawer.open({
      title: a ? `申请定制/接入：${a.title.slice(0, 18)}` : '',
      industry: a && a.industries[0] ? a.industries[0] : '制造业',
    });
  });

  // Esc 逐层关闭
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    if (DemandDrawer.isOpen()) { DemandDrawer.close(); return; }
    if ($('#drawer').classList.contains('open')) { Drawer.close(); return; }
    if ($('#mainNav')?._closeAll) $('#mainNav')._closeAll();
    const page = $('#page');
    if (page && page._esc && page._esc()) return;
    setMenu(false);
  });

  window.addEventListener('hashchange', route);
}

document.addEventListener('DOMContentLoaded', () => {
  if (!DB) { document.body.insertAdjacentHTML('beforeend', '<div class="load-error">数据加载失败：未找到智能体数据</div>'); return; }
  renderChrome();
  bindGlobal();
  route();
});
