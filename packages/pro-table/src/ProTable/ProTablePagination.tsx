import { defineComponent, type PropType } from "vue";
import type { Table } from "@tanstack/vue-table";
import { Button, Paginator } from "primevue";

export default defineComponent({
  name: "ProTablePagination",
  props: {
    table: {
      type: Object as PropType<Table<any>>,
      required: true,
    },
    totalRecords: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    return () => (
      <Paginator
        rows={10}
        totalRecords={props.totalRecords}
        rowsPerPageOptions={[10, 20, 30, 40, 50, 100]}
        template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown JumpToPageInput"
        {...{
          onPage: (e: { page: number; rows: number }) => {
            props.table.setPageIndex(e.page);
            props.table.setPageSize(e.rows);
          },
        }}
      >
        {{
          start: () => {
            return (
              <div>
                {props.table.getFilteredSelectedRowModel().rows.length > 0 && (
                  <>
                    <span>
                      已选择{" "}
                      {props.table.getFilteredSelectedRowModel().rows.length} 行
                    </span>
                    <Button label="清空" variant="text" />
                  </>
                )}
              </div>
            );
          },
        }}
      </Paginator>
    );
  },
});
