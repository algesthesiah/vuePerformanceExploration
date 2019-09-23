<template>
  <ul class="tree">
    <li
      v-for="node in nodes"
      v-show="status[node.key].visible"
      :key="node.key"
      class="tree-node"
      :style="{ 'padding-left': `${node.level * 16}px` }"
    >
      <i
        v-if="node.children"
        class="tree-node-arrow"
        :class="{ expanded: status[node.key].expanded }"
        @click="changeExpanded(node.key)"
      >
      </i>
      {{ node.label }}
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    data: Array,
    expandedKeys: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    nodes() {
      return this.getNodes(this.data);
    },
    status() {
      return this.getStatus(this.nodes);
    },
  },
  methods: {
    getNodes(data, level = 0, parent = null) {
      let nodes = [];

      data.forEach((item) => {
        const node = {
          level,
          parent,
          ...item,
        };
        nodes.push(node);

        if (item.children) {
          const children = this.getNodes(item.children, level + 1, node);

          nodes = [...nodes, ...children];
          node.children = children.filter(child => child.level === level + 1);
        }
      });

      return nodes;
    },
    getStatus(nodes) {
      const status = {};

      nodes.forEach((node) => {
        const parentStatus = status[node.parent && node.parent.key] || {};

        status[node.key] = {
          expanded: this.expandedKeys.includes(node.key),
          visible: node.level === 0 || (parentStatus.expanded && parentStatus.visible),
        };
      });

      return status;
    },
    changeExpanded(key) {
      const index = this.expandedKeys.indexOf(key);
      const expandedKeys = [...this.expandedKeys];

      if (index >= 0) {
        expandedKeys.splice(index, 1);
      } else {
        expandedKeys.push(key);
      }

      this.$emit('update:expandedKeys', expandedKeys);

      // eslint-disable-next-line
      console.time('expanded change');

      this.$nextTick(() => {
        // eslint-disable-next-line
        console.timeEnd('expanded change');
      });
    },
  },
  beforeCreate() {
    // eslint-disable-next-line
    console.time('first rendering');
  },
  mounted() {
    // eslint-disable-next-line
    console.timeEnd('first rendering');
  },
};
</script>

<style src="../../assets/tree.css"></style>
