/* 智能体库（#/agents）：开发训练（train） / 场景落地（deploy） */
const Agents = {
  title: '智能体库',
  sub: 'train',
  render({ sub }) {
    this.sub = ['train', 'deploy'].includes(sub) ? sub : 'train';
    return '<section class="v3-empty-stage"></section>';
  },
  mount() {},
};
