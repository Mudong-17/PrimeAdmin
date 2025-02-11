import { defineComponent } from "vue";

export default defineComponent({
  name: "Block",
  props: {
    transparent: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { slots }) {
    return () => (
      <div
        class={[
          "p-5 rounded-border",
          props.transparent ? "bg-transparent" : "bg-white",
        ]}
      >
        {slots.default?.()}
      </div>
    );
  },
});
