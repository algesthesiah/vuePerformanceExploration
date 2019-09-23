<template>
  <ul class="tree">
    <li v-for="node in nodes" :key="node.key" class="tree-node">
      <i
        v-if="node.children"
        class="tree-node-arrow"
        :class="{ expanded: !!node.expanded }"
        @click="changeExpanded(node)"
      ></i>
      {{ node.label }}
      <Tree
        v-if="node.children&&node.expanded"
        :data="node.children"
      ></Tree>
    </li>
  </ul>
</template>

<script>
import Tree from './Tree';

export default {
  name: 'Tree',
  props: {
    data: Array,
    defaultExpandedKeys: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      nodes: null,
    };
  },
  watch: {
    data: {
      handler() {
        this.nodes = Object.freeze(this.data);
      },
      immediate: true,
    },
  },
  components: {
    Tree,
  },
  methods: {
    changeExpanded(v) {
      // eslint-disable-next-line
      console.time('expanded change');
      this.$set(v, 'expanded', !v.expanded);
      this.$emit('expanded-change', v, v.expanded, this.data.filter(n => n.expanded));
      this.$nextTick(() => {
        // eslint-disable-next-line
        console.timeEnd('expanded change')
      });
    },
  },
  beforeCreate() {
    // eslint-disable-next-line
    console.time('first rendering')
  },
  mounted() {
    // eslint-disable-next-line
    console.timeEnd('first rendering')
  },
};
</script>

<style src="../../assets/tree.css"></style>
