import { type CSSProperties, defineComponent, type PropType } from "vue";

export default defineComponent({
  name: "TableCell",
  props: {
    class: {
      type: String,
      default: "",
    },
    colspan: {
      type: Number,
      default: 1,
    },
    style: {
      type: Object as PropType<CSSProperties>,
      default: () => ({}),
    },
  },
  setup(props, { slots }) {
    return () => (
      <td
        class={[
          "align-middle [&:has([role=checkbox])]:pr-0 text-color bg-white box-border  !p-4",
          props.class,
        ]}
        style={{
          ...props.style,
        }}
        colspan={props.colspan}
      >
        {slots.default?.()}
      </td>
    );
  },
});
