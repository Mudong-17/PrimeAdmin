import type { Table } from "@tanstack/vue-table";
import { TableProperties } from "lucide-vue-next";
import { Checkbox, Popover } from "primevue";
import { computed, defineComponent, type PropType, ref } from "vue";

export default defineComponent({
  name: "ProTableViewOptions",
  props: {
    table: {
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

    return () => (
      <div>
        <div
          class="w-8 h-8 flex items-center justify-center cursor-pointer"
          onClick={(e) => op.value.toggle(e)}
          v-tooltip="显示/隐藏列"
        >
          <TableProperties class="text-muted-color" size={18} />
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
