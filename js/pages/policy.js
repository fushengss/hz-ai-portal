/* 政策服务（#/policy）：重大事项（events） / 政策直通（direct） */
const Policy = {
  title: '政策服务',
  sub: 'events',
  render({ sub }) {
    this.sub = ['events', 'direct'].includes(sub) ? sub : 'events';
    return '<section class="v3-empty-stage"></section>';
  },
  mount() {},
};
