import { Button, Tree, TreeSelectionKeys } from "primevue";
import type { TreeNode } from "primevue/treenode";
import { defineComponent, ref, type PropType } from "vue";

export default defineComponent({
  name: "Tree",
  props: {
    nodes: {
      type: Array as PropType<TreeNode[]>,
      default: () => [],
    },
    tools: {
      type: Function,
      required: false,
    },
  },
  emits: ["selected"],
  setup(props, { emit }) {
    const selectedKey = ref<TreeSelectionKeys | undefined>(undefined);

    return () => (
      <Tree
        filter
        filterMode="lenient"
        selectionMode="single"
        selectionKeys={selectedKey.value}
        value={props.nodes as TreeNode[]}
        {...{
          "onUpdate:selectionKeys": (keys: TreeSelectionKeys) => {
            selectedKey.value = keys;
          },
          onNodeSelect: (node: TreeNode) => {
            emit("selected", node);
          },
        }}
      >
        {{
          header: () => (
            <div class="flex items-center justify-end gap-2">
              {props.tools?.()}
            </div>
          ),
        }}
      </Tree>
    );
  },
});
