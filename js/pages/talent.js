/* 人才培育（#/talent）：实训培养（training） / 认证评价（certification） */
const Talent = {
  title: '人才培育',
  sub: 'training',
  render({ sub }) {
    this.sub = ['training', 'certification'].includes(sub) ? sub : 'training';
    return '<section class="v3-empty-stage"></section>';
  },
  mount() {},
};
