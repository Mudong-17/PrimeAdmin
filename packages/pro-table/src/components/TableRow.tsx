import { defineComponent } from "vue";

export default defineComponent({
  name: "TableRow",
  setup(props, { slots }) {
    return () => (
      <tr class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted box-border">
        {slots.default?.()}
      </tr>
    );
  },
});
