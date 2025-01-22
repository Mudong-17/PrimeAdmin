import type { Table } from "@tanstack/vue-table";
import { TableProperties } from "lucide-vue-next";
import { Checkbox, Popover, TieredMenu } from "primevue";
import { computed, defineComponent, type PropType, ref } from "vue";

export default defineComponent({
  name: "ProTableViewOptions",
  props: {
    table: {
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      type: Object as PropType<Table<any>>,
      required: true,
    },
  },
  setup(props) {
    const op = ref();

    const columns = computed(() =>
      props.table
        .getAllColumns()
        .filter(
          (column) =>
            typeof column.accessorFn !== "undefined" && column.getCanHide()
        )
    );

    console.log(columns.value);
    return () => (
      <div>
        <div
          class="w-10 h-10 flex items-center justify-center cursor-pointer"
          onClick={(e) => op.value.toggle(e)}
        >
          <TableProperties class="text-muted-color" size={24} />
        </div>

        <Popover ref={op} appendTo="body">
          {columns.value.map((column) => (
            <div
              class="flex items-center gap-2 px-2 py-1.5 hover:bg-highlight "
              key={column.id}
            >
              <Checkbox
                binary
                size="small"
                inputId={`view-${column.id}`}
                modelValue={column.getIsVisible()}
                {...{
                  "onUpdate:modelValue": (value: boolean) =>
                    column.toggleVisibility(value),
                }}
              />
              <label for={`view-${column.id}`} class="cursor-pointer">
                {(column.columnDef.meta as { title?: string })?.title ||
                  column.id}
              </label>
            </div>
          ))}
        </Popover>
      </div>
    );
  },
});
