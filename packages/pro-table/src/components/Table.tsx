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
      <div class="relative w-full overflow-x-auto max-w-full box-border">
        <table
          class="w-full caption-bottom text-sm box-border"
          style={{ width: `${props.width && props.width}px` }}
        >
          {slots.default?.()}
        </table>
      </div>
    );
  },
});
