// 为每个区县计算能完整放进自身轮廓的标注位置（文字外接矩形各采样点到边界的最小有向距离最大化）
global.window = {};
require('../../湖州市AI生产力服务中心/site/data/huzhou-map.js');
const M = window.__HUZHOU_MAP__;
const rings = d => d.path.split('M').filter(Boolean).map(s => s.replace('Z', '').split('L').map(p => p.split(',').map(Number)));
const inside = (pt, ring) => { let c = false; for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) { const [xi, yi] = ring[i], [xj, yj] = ring[j]; if ((yi > pt[1]) !== (yj > pt[1]) && pt[0] < (xj - xi) * (pt[1] - yi) / (yj - yi) + xi) c = !c; } return c; };
const segDist = (p, a, b) => { const dx = b[0] - a[0], dy = b[1] - a[1]; const t = Math.max(0, Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / (dx * dx + dy * dy || 1))); return Math.hypot(p[0] - a[0] - t * dx, p[1] - a[1] - t * dy); };
const sd = (p, rs) => { let d = Infinity, ins = false; for (const r of rs) { if (inside(p, r)) ins = !ins; for (let i = 0; i < r.length; i++) d = Math.min(d, segDist(p, r[i], r[(i + 1) % r.length])); } return ins ? d : -d; };
const out = {};
for (const d of M.districts) {
  const rs = rings(d); const w = d.name.length * 15 + 6, h = 18;
  let best = null;
  for (let x = 0; x < 600; x += 2) for (let y = 0; y < 460; y += 2) {
    const pts = []; for (const fx of [-.5, -.25, 0, .25, .5]) for (const fy of [-.5, 0, .5]) pts.push([x + fx * w, y + fy * h]);
    const s = Math.min(...pts.map(p => sd(p, rs)));
    if (!best || s > best.s) best = { s, x, y };
  }
  out[d.name] = [best.x, best.y + 1]; console.log(d.name, 'old', d.label, 'new', best.x, best.y, 'margin', best.s.toFixed(1));
}
console.log(JSON.stringify(out));
