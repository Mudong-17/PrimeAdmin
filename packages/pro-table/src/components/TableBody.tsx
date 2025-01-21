import { defineComponent } from "vue";

export default defineComponent({
  name: "TableBody",
  setup(_, { slots }) {
    return () => (
      <tbody class="[&_tr:last-child]:border-0">{slots.default?.()}</tbody>
    );
  },
});
