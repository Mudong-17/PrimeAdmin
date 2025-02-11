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
      <table class="caption-bottom text-sm box-border grid">
        {slots.default?.()}
      </table>
    );
  },
});
