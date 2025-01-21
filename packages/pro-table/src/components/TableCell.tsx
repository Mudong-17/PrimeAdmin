import { defineComponent } from "vue";

export default defineComponent({
  name: "TableCell",
  setup(props, { slots }) {
    return () => (
      <td class="p-4 align-middle [&:has([role=checkbox])]:pr-0 text-color">
        {slots.default?.()}
      </td>
    );
  },
});
