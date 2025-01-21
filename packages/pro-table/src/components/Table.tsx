import { defineComponent } from "vue";

export default defineComponent({
  name: "Table",
  setup(_, { slots }) {
    return () => (
      <div class="relative w-full overflow-auto">
        <table class="w-full caption-bottom text-sm">{slots.default?.()}</table>
      </div>
    );
  },
});
