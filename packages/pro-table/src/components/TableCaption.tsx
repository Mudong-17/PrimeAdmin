import { defineComponent } from "vue";

export default defineComponent({
  name: "TableCaption",
  setup(props, { slots }) {
    return () => (
      <caption class="mt-4 text-sm text-muted-color-emphasis">
        {slots.default?.()}
      </caption>
    );
  },
});
