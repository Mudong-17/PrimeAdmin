import { defineComponent } from "vue";

export default defineComponent({
  name: "TableHeader",
  setup(props, { slots }) {
    return () => (
      <thead class="[&_tr]:border-b box-border sticky top-0 z-10 grid">
        {slots.default?.()}
      </thead>
    );
  },
});
