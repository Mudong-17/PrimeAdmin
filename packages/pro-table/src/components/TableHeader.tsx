import { defineComponent } from "vue";

export default defineComponent({
  name: "TableHeader",
  setup(props, { slots }) {
    return () => (
      <thead class="[&_tr]:border-b box-border">{slots.default?.()}</thead>
    );
  },
});
