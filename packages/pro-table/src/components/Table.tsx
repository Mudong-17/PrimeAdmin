import { defineComponent } from "vue";

export default defineComponent({
  name: "Table",
  props: {
    width: {
      type: Number,
      default: 0,
    },
  },
  setup(props, { slots }) {
    return () => (
      <table
        class="w-full caption-bottom text-sm box-border grid"
        style={{ width: `${props.width && props.width}px` }}
      >
        {slots.default?.()}
      </table>
    );
  },
});
