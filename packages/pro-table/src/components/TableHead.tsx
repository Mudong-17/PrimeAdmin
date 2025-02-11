import { type CSSProperties, defineComponent, type PropType } from "vue";

export default defineComponent({
  name: "TableHead",
  props: {
    class: {
      type: String,
      default: "",
    },
    style: {
      type: Object as PropType<CSSProperties>,
      default: () => ({}),
    },
  },
  setup(props, { slots }) {
    return () => (
      <th
        // class="h-12 text-left align-middle font-medium text-muted-color bg-surface-50 [&:has([role=checkbox])]:pr-0 box-border px-4"
        class={["text-color  box-border !p-4 grid bg-surface-50", props.class]}
        style={{
          ...props.style,
        }}
      >
        <span>{slots.default?.()}</span>
      </th>
    );
  },
});
