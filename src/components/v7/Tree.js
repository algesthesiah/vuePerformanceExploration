import Vue from 'vue';
import '../../assets/tree.css';

const tree = {
  props: {
    data: Array,
    defaultExpandedKeys: {
      type: Array,
      default: () => [],
    },
  },
  render(createElement) {
    const treeLi = [];
    this.data.forEach((v) => {
      let i = null;
      if (v.children) {
        let nodeClass = null;
        if (v.expanded) {
          nodeClass = 'tree-node-arrow expanded';
        } else {
          nodeClass = 'tree-node-arrow';
        }
        i = createElement('i', {
          class: nodeClass,
          on: {
            click: () => {
              // eslint-disable-next-line
              console.time('expanded change');
              this.$set(v, 'expanded', !v.expanded);
              this.$emit('expanded-change', v, v.expanded, this.data.filter(n => n.expanded));
              this.$nextTick(() => {
                // eslint-disable-next-line
                console.timeEnd('expanded change');
              });
            },
          },

        });
      }
      let sec = [i, v.label];
      if (v.children && v.expanded) {
        sec = [i, v.label, createElement(
          'tree',
          { props: { data: v.children } },
        )];
      }
      treeLi.push(createElement('li', { class: 'tree-node' }, sec));
    });
    return createElement('ul', { class: 'tree' }, treeLi);
  },
};
export default Vue.component('Tree', {
  render(createElement, context) {
    return createElement(
      tree,
      ...context.props,
      context.data,
      context.listeners,
      context.children,
    );
  },
  beforeCreate() {
    // eslint-disable-next-line
    console.time('first rendering')
  },
  mounted() {
    // eslint-disable-next-line
    console.timeEnd('first rendering')
  },
});
