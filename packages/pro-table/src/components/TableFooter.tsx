import { defineComponent } from "vue";

export default defineComponent({
  name: "TableFooter",
  setup(props, { slots }) {
    return () => (
      <tfoot class="border-t bg-muted/50 font-medium [&>tr]:last:border-b-0">
        {slots.default?.()}
      </tfoot>
    );
  },
});
