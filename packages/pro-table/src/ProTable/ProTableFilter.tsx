import type { Table } from "@tanstack/vue-table";
import { Filter } from "lucide-vue-next";
import { FloatLabel, InputText, MultiSelect, Popover } from "primevue";
import { defineComponent, type PropType, ref } from "vue";
import type { FilterColumn } from "./index";

const generateInputFilter = (column: FilterColumn, table: Table<any>) => {
  if (column.type === "select") {
    return (
      <MultiSelect
        class="w-full"
        filter
        emptyFilterMessage="未找到结果"
        options={column.options}
        optionLabel="label"
        optionValue="value"
        size="small"
        showToggleAll={false}
        modelValue={
          (table.getColumn(column.key)?.getFilterValue() as string) ?? ""
        }
        {...{
          onValueChange: (value: string) => {
            const filterValues = Array.from(value);
            table
              .getColumn(column.key)
              ?.setFilterValue(filterValues.length ? filterValues : undefined);
          },
        }}
      />
    );
  }
  return (
    <InputText
      class="w-full"
      id={column.key}
      modelValue={
        (table.getColumn(column.key)?.getFilterValue() as string) ?? ""
      }
      size="small"
      autocomplete="off"
      {...{
        onValueChange: (value: string) => {
          table.getColumn(column.key)?.setFilterValue(value);
        },
      }}
    />
  );
};

export default defineComponent({
  name: "ProTableFilter",
  props: {
    column: {
      type: Object,
      required: true,
    },
    table: {
      type: Object as PropType<Table<any>>,
      required: true,
    },
  },
  setup(props) {
    const { filter, title } = props.column.columnDef.meta;
    const popoverRef = ref<InstanceType<typeof Popover> | null>(null);
    return () => (
      <div>
        <div
          class="cursor-pointer w-4 h-4"
          onClick={(e) => {
            popoverRef.value?.toggle(e);
          }}
        >
          <Filter size={16} />
        </div>
        <Popover ref={popoverRef}>
          <FloatLabel class="w-48 min-w-36" variant="on">
            {generateInputFilter(
              { ...filter, key: props.column.columnDef.accessorKey },
              props.table
            )}
            <label for={filter.key}>{title}</label>
          </FloatLabel>
        </Popover>
      </div>
    );
  },
});
