import { defineComponent } from "vue";

export default defineComponent({
  name: "Block",
  props: {
    class: {
      type: String,
      default: "",
    },
    transparent: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { slots }) {
    return () => (
      <div
        class={[
          "p-5 rounded-border overflow-hidden",
          props.transparent ? "bg-transparent" : "bg-white",
          props.class,
        ]}
      >
        {slots.default?.()}
      </div>
    );
  },
});
