/* 标杆案例（#/cases）：定期发布（release） / 成果转化（transform） */
const Cases = {
  title: '标杆案例',
  sub: 'release',
  render({ sub }) {
    this.sub = ['release', 'transform'].includes(sub) ? sub : 'release';
    return '<section class="v3-empty-stage"></section>';
  },
  mount() {},
};
