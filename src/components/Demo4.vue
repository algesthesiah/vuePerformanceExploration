<template>
  <div>
    <h3>Optimization With Object.freeze</h3>
    <tree
      :data="data"
      :default-expanded-keys="defaultExpandedKeys"
      @expanded-change="handleExpandedChange"
    >
    </tree>
  </div>
</template>

<script>
import Tree from './v4/Tree';

export default {
  name: 'Demo4',
  components: {
    Tree,
  },
  data() {
    return {
      data: this.getRandomData(3, 20),
      defaultExpandedKeys: [],
    };
  },
  methods: {
    getRandomData(layers, count, parent) {
      return Array.from({ length: count }, (v, i) => {
        const key = (parent ? `${parent.key}-` : '') + (i + 1);

        const node = {
          key,
          label: `节点 ${key}`,
        };

        if (layers > 1) {
          node.children = this.getRandomData(layers - 1, count, node);
        }

        return node;
      });
    },
    handleExpandedChange(node, expanded, expandedNodes) {
      // eslint-disable-next-line
      console.log(node, expanded, expandedNodes);
    },
  },
};
</script>
