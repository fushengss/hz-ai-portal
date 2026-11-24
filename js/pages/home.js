/* =========================================================
   首页（#/）：首屏 Hero（左侧精简文案 + 右侧同层级「三县两区地图 + 智能体」轮播） + 通栏数据条
   ========================================================= */
const HOME_STATS = [
  { n: 78, u: '个', l: '上架智能体与 Skill', src: 'platform' },
  { n: 1000, u: 'P', l: '统筹纳管算力', src: 'platform' },
  { n: 36, u: '个', l: '在线试用入口', src: 'platform' },
  { n: 5, u: '地', l: '三县两区全覆盖', src: 'platform' },
];

const HOME_DISTRICT_TIPS = {
  '吴兴区': '童装 · 美妆 · 物流装备',
  '南浔区': '木业家居 · 智能电梯 · 智能电机',
  '德清县': '地理信息 · 生物医药 · 通航',
  '长兴县': '新能源电池 · 汽配 · 绿色建材',
  '安吉县': '绿色家居 · 竹产业 · 安吉白茶',
};

const Home = {
  title: '首页',
  slideIdx: 0,
  district: '',

  slides() {
    const featured = hotAgents(4);
    return [
      { type: 'map', short: '三县两区地图' },
      ...featured.map(a => ({ type: 'agent', short: a.title.replace(/Agent|智能体/g, '').slice(0, 6) || a.title.slice(0, 6), agent: a })),
    ];
  },

  renderMapSlide() {
    const M = window.__HUZHOU_MAP__;
    const tip = this.district ? `${this.district} · ${HOME_DISTRICT_TIPS[this.district]}` : '吴兴 · 南浔 · 德清 · 长兴 · 安吉';
    return `
      <div class="hc-slide-inner hc-map-slide">
        <div class="hc-slide-head">
          <div>
            <span class="badge accent">全域覆盖</span>
            <strong>湖州三县两区产业赋能地图</strong>
          </div>
          <a class="link-btn" href="#/cases/release">查看标杆案例 ${icon('arrow')}</a>
        </div>
        <div class="hc-map-box" id="hvMapStage">
          ${M ? `
          <svg class="hz-map hc-map-svg" viewBox="${M.viewBox}" preserveAspectRatio="xMidYMid meet" role="group" aria-label="湖州市三县两区地图">
            <g>${M.districts.map(d => `<path class="district-area ${this.district === d.name ? 'active' : ''}" d="${d.path}" data-home-district="${esc(d.name)}" role="button" tabindex="0" aria-label="${esc(d.name)}" aria-pressed="${this.district === d.name}"></path>`).join('')}</g>
            <path class="city-outline" d="${M.outline}" aria-hidden="true" />
            <g aria-hidden="true">${M.districts.map(d => `<text class="district-label ${this.district === d.name ? 'active' : ''}" x="${d.label[0]}" y="${d.label[1]}" data-home-for="${esc(d.name)}">${esc(d.name)}</text>`).join('')}</g>
          </svg>` : ''}
        </div>
        <div class="hc-slide-foot">
          <span class="note" id="hvMapTip">${esc(tip)}</span>
          <span class="note">点击区县查看主导产业</span>
        </div>
      </div>`;
  },

  renderAgentSlide(a) {
    return `
      <div class="hc-slide-inner hc-agent-slide" data-agent="${esc(a.id)}">
        <div class="hc-agent-media">
          <img src="${safeImg(a.image)}" alt="${esc(a.title)}" loading="eager" decoding="async" />
          <div class="hc-agent-badges">
            ${a.industries.slice(0, 2).map(n => `<span class="badge">${esc(n)}</span>`).join('')}
            ${a.online ? '<span class="badge accent">在线试用</span>' : ''}
          </div>
        </div>
        <div class="hc-agent-body">
          <div class="hc-agent-top">
            <strong>${esc(a.title)}</strong>
            <span class="note">${icon('chart')} 热度 ${fmt(a.visits)}</span>
          </div>
          <p class="hc-agent-val">${icon('check')}<span>${esc(a.value)}</span></p>
          <div class="hc-slide-foot">
            <button type="button" class="link-btn" data-detail="${esc(a.id)}">查看详情 ${icon('arrow')}</button>
            ${trialAction(a) || `<a class="link-btn" href="#/agents/deploy">进入智能体库</a>`}
          </div>
        </div>
      </div>`;
  },

  render() {
    const list = this.slides();
    this.slideIdx = this.slideIdx % list.length;

    return `
    <section class="hero">
      <div class="wrap hero-inner">
        <div>
          <p class="hero-eyebrow">HUZHOU AI CITY MALL</p>
          <h1><span class="grad-text">湖州市人工智能赋能平台</span></h1>
          <p class="hero-lead">让每一家湖州企业都用得上、用得起、用得好 AI</p>
          <p class="hero-sub">汇聚智能体、数据要素、人才与政策服务，打造全市 AI 公共服务底座。</p>
          <div class="hero-actions">
            <a class="btn btn-primary" href="#/agents/deploy">探索智能体库 ${icon('arrow')}</a>
            <a class="btn btn-ghost" href="#/knowledge/diagnosis">政企在线诊断</a>
          </div>
        </div>

        <div class="card hero-carousel" id="heroCarousel" aria-roledescription="carousel" aria-label="湖州三县两区地图与精选智能体轮播">
          <div class="hc-viewport">
            <div class="hc-track" id="hcTrack">
              ${list.map((s, i) => `
              <div class="hc-slide ${i === this.slideIdx ? 'active' : ''}" data-slide="${i}" aria-hidden="${i !== this.slideIdx}">
                ${s.type === 'map' ? this.renderMapSlide() : this.renderAgentSlide(s.agent)}
              </div>`).join('')}
            </div>
            <button type="button" class="hc-nav hc-prev" id="hcPrev" aria-label="上一张">${icon('chevron')}</button>
            <button type="button" class="hc-nav hc-next" id="hcNext" aria-label="下一张">${icon('chevron')}</button>
          </div>
        </div>
      </div>
    </section>

    <div class="wrap home-stats-wrap">
      <div class="card stats-card">
        <div class="stats-grid">
          ${HOME_STATS.map(s => `<div class="stat"><b><span data-count="${s.n}">0</span><em>${esc(s.u)}</em></b><span>${esc(s.l)} ${sourceBadge(s.src)}</span></div>`).join('')}
        </div>
      </div>
    </div>`;
  },

  mount(root) {
    const carousel = $('#heroCarousel', root);
    const track = $('#hcTrack', root);
    const slides = $$('.hc-slide', root);
    const total = slides.length;

    const goTo = idx => {
      this.slideIdx = (idx + total) % total;
      if (track) track.style.transform = `translateX(-${this.slideIdx * 100}%)`;
      slides.forEach((el, i) => {
        el.classList.toggle('active', i === this.slideIdx);
        el.setAttribute('aria-hidden', String(i !== this.slideIdx));
      });
    };
    goTo(this.slideIdx);

    let paused = false;
    let timer = null;
    const startAuto = () => {
      if (reduceMotion) return;
      clearInterval(timer);
      timer = setInterval(() => {
        if (!root.isConnected) { clearInterval(timer); return; }
        if (!paused) goTo(this.slideIdx + 1);
      }, 4800);
    };
    startAuto();

    carousel?.addEventListener('mouseenter', () => { paused = true; });
    carousel?.addEventListener('mouseleave', () => { paused = false; });
    carousel?.addEventListener('focusin', () => { paused = true; });
    carousel?.addEventListener('focusout', () => { paused = false; });

    $('#hcPrev', root)?.addEventListener('click', () => { goTo(this.slideIdx - 1); startAuto(); });
    $('#hcNext', root)?.addEventListener('click', () => { goTo(this.slideIdx + 1); startAuto(); });

    // 地图帧交互
    const stage = $('#hvMapStage', root);
    const toggleDistrict = name => {
      this.district = this.district === name ? '' : name;
      $$('#hvMapStage [data-home-district]', root).forEach(el => {
        const on = el.dataset.homeDistrict === this.district;
        el.classList.toggle('active', on);
        el.setAttribute('aria-pressed', String(on));
      });
      $$('#hvMapStage [data-home-for]', root).forEach(t => t.classList.toggle('active', t.dataset.homeFor === this.district));
      const tipEl = $('#hvMapTip', root);
      if (tipEl) tipEl.textContent = this.district ? `${this.district} · ${HOME_DISTRICT_TIPS[this.district]}` : '吴兴 · 南浔 · 德清 · 长兴 · 安吉';
    };
    stage?.addEventListener('click', e => {
      const el = e.target.closest('[data-home-district]');
      if (el) toggleDistrict(el.dataset.homeDistrict);
    });
    stage?.addEventListener('keydown', e => {
      const el = e.target.closest('[data-home-district]');
      if (el && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); toggleDistrict(el.dataset.homeDistrict); }
    });

    $$('[data-count]', root).forEach(el => {
      const target = Number(el.dataset.count);
      if (reduceMotion) { el.textContent = target; return; }
      const t0 = performance.now();
      const tick = now => {
        const p = Math.min(1, (now - t0) / 1100);
        el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
        if (p < 1 && el.isConnected) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  },
};
