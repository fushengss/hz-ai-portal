/* 知识底座（#/knowledge）：智能问答（qa） / 政企诊断（diagnosis） */
const Knowledge = {
  title: '知识底座',
  sub: 'qa',
  render({ sub }) {
    this.sub = ['qa', 'diagnosis'].includes(sub) ? sub : 'qa';
    return '<section class="v3-empty-stage"></section>';
  },
  mount() {},
};
