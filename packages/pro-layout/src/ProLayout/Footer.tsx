import { defineComponent } from "vue";

export default defineComponent({
  name: "Footer",
  props: {
    render: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    return () => (
      <div class="p-[var(--content-padding)] box-border">{props.render()}</div>
    );
  },
});
