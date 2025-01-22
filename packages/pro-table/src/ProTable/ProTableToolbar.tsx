import type { Table } from "@tanstack/vue-table";
import { FloatLabel, InputText, MultiSelect } from "primevue";
import { defineComponent, type PropType } from "vue";
import type { FilterColumn } from "./index";
import ProTableViewOptions from "./ProTableViewOptions";
import { RotateCcw } from "lucide-vue-next";

export default defineComponent({
  name: "ProTableToolbar",
  props: {
    toolbar: {
      type: Function,
      default: () => <></>,
    },
    table: {
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      type: Object as PropType<Table<any>>,
      required: true,
    },
    columns: {
      type: Array as PropType<FilterColumn[]>,
      required: true,
    },
  },
  setup(props) {
    console.log(props.columns);

    const generateInputFilter = (column: FilterColumn, table: Table<any>) => {
      return (
        <FloatLabel variant="on" key={column.key}>
          <InputText
            id={column.key}
            modelValue={
              (props.table.getColumn(column.key)?.getFilterValue() as string) ??
              ""
            }
            autocomplete="off"
            {...{
              onValueChange: (value: string) => {
                props.table.getColumn(column.key)?.setFilterValue(value);
              },
            }}
          />
          <label for={column.key}>{column.title}</label>
        </FloatLabel>
      );
    };

    const generateSelectFilter = (column: FilterColumn, table: Table<any>) => {
      return (
        <FloatLabel variant="on" key={column.key}>
          <MultiSelect
            class="w-56"
            filter
            emptyFilterMessage="未找到结果"
            options={column.options}
            optionLabel="label"
            optionValue="value"
            display="chip"
            showToggleAll={false}
            modelValue={
              (props.table.getColumn(column.key)?.getFilterValue() as string) ??
              ""
            }
            {...{
              onValueChange: (value: string) => {
                const filterValues = Array.from(value);
                props.table
                  .getColumn(column.key)
                  ?.setFilterValue(
                    filterValues.length ? filterValues : undefined
                  );
              },
            }}
          />
          <label for={column.key}>{column.title}</label>
        </FloatLabel>
      );
    };

    return () => (
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          {props.columns.map((column) => {
            if (column.type === "select") {
              return generateSelectFilter(column, props.table);
            }
            return generateInputFilter(column, props.table);
          })}
        </div>
        <div class="flex items-center">
          <div class="flex items-center gap-2">{props.toolbar()}</div>

          <div class="flex items-center">
            <ProTableViewOptions table={props.table} />
            <div class="w-10 h-10 flex items-center justify-center cursor-pointer">
              <RotateCcw class="text-muted-color" size={24} />
            </div>
          </div>
        </div>
      </div>
    );
  },
});
