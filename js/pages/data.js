/* 数据要素（#/data）：汇聚治理（governance） / 开放共享（sharing） */
const DataElements = {
  title: '数据要素',
  sub: 'governance',
  render({ sub }) {
    this.sub = ['governance', 'sharing'].includes(sub) ? sub : 'governance';
    return '<section class="v3-empty-stage"></section>';
  },
  mount() {},
};
