<template>
  <div>
    <h3>Optimization With Conditional</h3>
    <tree :data="data" :expanded-keys.sync="expandedKeys"></tree>
  </div>
</template>

<script>
import Tree from './v2/Tree';

export default {
  name: 'Demo1',
  components: {
    Tree,
  },
  data() {
    return {
      data: this.getRandomData(3, 20),
      expandedKeys: [],
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
  },
};
</script>
