import { defineComponent } from "vue";

export default defineComponent({
  name: "TableHead",
  setup(_, { slots }) {
    return () => (
      <th class="h-12 px-4 text-left align-middle font-medium text-muted-color bg-surface-50 [&:has([role=checkbox])]:pr-0">
        {slots.default?.()}
      </th>
    );
  },
});
