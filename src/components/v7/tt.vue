<script>
import Tree from './tt';
import '../../assets/tree.css';

export default {
  functional: true,
  name: 'Tree',
  props: {
    data: Array,
    defaultExpandedKeys: {
      type: Array,
      default: () => [],
    },
  },
  render(h, c) {
    return (
      <ul class="tree">
        {c.props.data.map((v, i) => (
          <li class="tree-node" key={i}>
            {v.children ? (
              <i
                class={{ 'tree-node-arrow': true, expanded: v.expanded }}
                onClick={() => {
                  // eslint-disable-next-line no-param-reassign
                  v.expanded = !v.expanded;
                  // eslint-disable-next-line no-underscore-dangle
                  const ob = v.__ob__;
                  ob.dep.notify();
                  c.listeners['expanded-change'](
                    v,
                    v.expanded,
                    c.props.data.filter(n => n.expanded),
                  );
                }}
              />
            ) : null}
            {v.label}
            {v.children && v.expanded ? <Tree {...c.data} data={v.children} /> : null}
          </li>
        ))}
      </ul>
    );
  },
};
</script>
