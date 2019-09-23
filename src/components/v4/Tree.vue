<template>
  <ul class="tree">
    <li
      v-for="node in nodes"
      v-if="status[node.key].visible"
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
    defaultExpandedKeys: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      status: null,
      nodes: null,
    };
  },
  watch: {
    data: {
      handler() {
        this.nodes = Object.freeze(this.getNodes(this.data));
        this.status = this.getStatus(this.nodes);
      },
      immediate: true,
    },
    defaultExpandedKeys() {
      this.status = this.getStatus(this.nodes);
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
          expanded: this.defaultExpandedKeys.includes(node.key),
          visible: node.level === 0 || (parentStatus.expanded && parentStatus.visible),
        };
      });

      return status;
    },
    changeExpanded(key) {
      // eslint-disable-next-line
      console.time('expanded change');

      const node = this.nodes.find(n => n.key === key);
      const newExpanded = !this.status[key].expanded;
      const updateVisible = (n, visible) => {
        n.children.forEach((child) => {
          this.status[child.key].visible = visible && this.status[n.key].expanded;
          if (child.children) updateVisible(child, visible);
        });
      };

      this.status[key].expanded = newExpanded;

      updateVisible(node, newExpanded);

      this.$emit('expanded-change', node, newExpanded, this.nodes.filter(n => this.status[n.key].expanded));

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
