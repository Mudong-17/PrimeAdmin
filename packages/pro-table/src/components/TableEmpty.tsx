import { computed, defineComponent, type HTMLAttributes } from "vue";
import TableRow from "./TableRow";
import TableCell from "./TableCell";

interface TableEmptyProps {
  class?: HTMLAttributes["class"];
  colspan?: number;
}

export default defineComponent<TableEmptyProps>({
  name: "TableEmpty",
  props: {
    class: {
      type: String,
      default: "",
    },
    colspan: {
      type: Number,
      default: 1,
    },
  },
  setup(props, { slots }) {
    const delegatedProps = computed(() => {
      const { class: _, ...delegated } = props;

      return delegated;
    });

    return () => (
      <TableRow>
        <TableCell
          class="p-4 whitespace-nowrap align-middle text-sm text-color"
          {...delegatedProps}
        >
          <div class="flex items-center justify-center py-10">
            {slots.default?.()}
          </div>
        </TableCell>
      </TableRow>
    );
  },
});
