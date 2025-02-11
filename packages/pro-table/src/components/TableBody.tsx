import { defineComponent } from "vue";

export default defineComponent({
  name: "TableBody",
  props: {
    height: {
      type: Number,
      default: 0,
    },
  },
  setup(props, { slots }) {
    return () => (
      <tbody
        class="[&_tr:last-child]:border-0  box-border grid relative"
        style={{ height: `${props.height}px` }}
      >
        {slots.default?.()}
      </tbody>
    );
  },
});
