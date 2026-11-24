/* 首屏插画：等距分层平台 + 中央 AI 芯片 + 漂浮节点（纯 SVG，颜色取自主题变量） */
function heroArt() {
  const layer = (cy, fill, op) => `
    <g opacity="${op}">
      <polygon points="260,${cy - 44} 350,${cy} 260,${cy + 44} 170,${cy}" fill="${fill}" stroke="var(--accent)" stroke-opacity=".55"/>
      <polygon points="170,${cy} 260,${cy + 44} 260,${cy + 62} 170,${cy + 18}" fill="oklch(0.25 0.05 258)" stroke="var(--accent)" stroke-opacity=".3"/>
      <polygon points="260,${cy + 44} 350,${cy} 350,${cy + 18} 260,${cy + 62}" fill="oklch(0.21 0.045 258)" stroke="var(--accent)" stroke-opacity=".3"/>
    </g>`;
  return `
  <svg class="hero-art" viewBox="0 0 520 440" role="img" aria-label="AI 能力分层汇聚示意图">
    <defs>
      <linearGradient id="gA" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="var(--blue)"/><stop offset="1" stop-color="var(--accent)"/></linearGradient>
      <radialGradient id="gG" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="var(--accent)" stop-opacity=".38"/><stop offset="1" stop-color="var(--accent)" stop-opacity="0"/></radialGradient>
      <linearGradient id="gBeam" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="var(--accent)" stop-opacity=".9"/><stop offset="1" stop-color="var(--accent)" stop-opacity="0"/></linearGradient>
    </defs>
    <ellipse cx="260" cy="340" rx="236" ry="84" fill="url(#gG)"/>
    <g fill="none" stroke="var(--accent)" stroke-opacity=".28">
      <ellipse cx="260" cy="338" rx="228" ry="82" stroke-dasharray="3 7"/>
      <ellipse cx="260" cy="338" rx="186" ry="66"/>
    </g>
    ${layer(318, 'oklch(0.27 0.06 258)', 1)}
    ${layer(280, 'oklch(0.3 0.07 256)', 1)}
    ${layer(242, 'url(#gA)', .92)}
    <g fill="none" stroke="oklch(0.17 0.03 262)" stroke-opacity=".55" stroke-width="1.4">
      <polygon points="260,222 306,242 260,262 214,242"/><polygon points="260,232 288,242 260,252 232,242"/>
    </g>
    <rect x="246" y="150" width="28" height="92" fill="url(#gBeam)" opacity=".55"/>
    <g class="float">
      <g transform="translate(260 118) rotate(45)">
        <rect x="-34" y="-34" width="68" height="68" rx="14" fill="oklch(0.2 0.04 262)" stroke="var(--accent)" stroke-width="2"/>
        <rect x="-22" y="-22" width="44" height="44" rx="8" fill="none" stroke="var(--accent)" stroke-opacity=".5"/>
      </g>
      <text x="260" y="128" text-anchor="middle" font-size="28" font-weight="800" fill="var(--accent)" font-family="Inter, system-ui, sans-serif">AI</text>
    </g>
    <g stroke="var(--accent)" stroke-opacity=".35" fill="none" stroke-dasharray="2 5">
      <path d="M232 112 L96 96"/><path d="M288 112 L424 84"/><path d="M290 130 L452 170"/><path d="M230 132 L70 190"/>
    </g>
    <g class="float d2"><circle cx="96" cy="96" r="9" fill="oklch(0.21 0.035 262)" stroke="var(--blue)" stroke-width="2"/><circle cx="96" cy="96" r="3" fill="var(--blue)"/></g>
    <g class="float d3"><circle cx="424" cy="84" r="11" fill="oklch(0.21 0.035 262)" stroke="var(--accent)" stroke-width="2"/><circle cx="424" cy="84" r="3.5" fill="var(--accent)"/></g>
    <g class="float"><circle cx="452" cy="170" r="8" fill="oklch(0.21 0.035 262)" stroke="var(--blue)" stroke-width="2"/><circle cx="452" cy="170" r="2.6" fill="var(--blue)"/></g>
    <g class="float d2"><circle cx="70" cy="190" r="10" fill="oklch(0.21 0.035 262)" stroke="var(--accent)" stroke-width="2"/><circle cx="70" cy="190" r="3" fill="var(--accent)"/></g>
    <g fill="var(--accent)"><circle class="pulse" cx="150" cy="250" r="2.4"/><circle class="pulse" cx="390" cy="236" r="2.4" style="animation-delay:-1s"/><circle class="pulse" cx="330" cy="62" r="2.4" style="animation-delay:-2s"/><circle class="pulse" cx="196" cy="58" r="2.4" style="animation-delay:-.5s"/></g>
  </svg>`;
}

/* 子页面顶部 banner（物芯式：英文小标题 + 大标题 + 概述 + 右侧插画 + 底部页签槽） */
function pageBanner({ eyebrow, title, lead, meta = '', tabs = '' }) {
  return `
  <section class="page-banner">
    <div class="wrap">
      <div class="banner-inner">
        <div>
          <span class="eyebrow">${esc(eyebrow)}</span>
          <h1><span class="grad-text">${esc(title)}</span></h1>
          <p class="lead">${esc(lead)}</p>
          ${meta ? `<div class="banner-meta">${meta}</div>` : ''}
        </div>
        <div class="banner-art" aria-hidden="true">${heroArt()}</div>
      </div>
      ${tabs}
    </div>
  </section>`;
}
