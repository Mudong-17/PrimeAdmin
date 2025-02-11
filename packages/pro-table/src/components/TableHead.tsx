import { type CSSProperties, defineComponent, type PropType } from "vue";

export default defineComponent({
  name: "TableHead",
  props: {
    size: {
      type: Number,
      default: 0,
    },
    style: {
      type: Object as PropType<CSSProperties>,
      default: () => ({}),
    },
  },
  setup(props, { slots }) {
    return () => (
      <th
        class="h-12 text-left align-middle font-medium text-muted-color bg-surface-50 [&:has([role=checkbox])]:pr-0 box-border px-4"
        style={{
          ...props.style,
          width: `${props.size}px`,
        }}
      >
        {slots.default?.()}
      </th>
    );
  },
});
