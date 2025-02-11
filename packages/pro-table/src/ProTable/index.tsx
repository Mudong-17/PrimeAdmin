import {
  computed,
  type CSSProperties,
  defineComponent,
  type PropType,
  ref,
  type VNode,
} from "vue";
import {
  FlexRender,
  getCoreRowModel,
  useVueTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  type ColumnDef,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
} from "@tanstack/vue-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components";
import ProTableColumnHeader from "./ProTableColumnHeader";
import ProTablePagination from "./ProTablePagination";
import ProTableToolbar from "./ProTableToolbar";
import { Checkbox } from "primevue";
import ProTableFilter from "./ProTableFilter";
import { useVirtualizer } from "@tanstack/vue-virtual";

export type Column = {
  key: string;
  title?: string;
  sorting?: boolean;
  size?: number;
  pin?: "left" | "right" | true;
  enableResizing?: boolean;
  export?: boolean;
  filter?:
    | boolean
    | {
        type: "text" | "select";
        options?: {
          label: string;
          value: string;
        }[];
      };
  hiding?: boolean;
  cell?: (row: any) => VNode;
};

export type FilterColumn = {
  key: string;
  title: string;
  type: "text" | "select";
  options?: { label: string; value: any }[];
};

const transformColumns = (simpleColumns: Column[]): ColumnDef<any>[] => {
  return simpleColumns.map((col) => {
    if (col.key === "select") {
      return {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            binary
            modelValue={table.getIsAllPageRowsSelected()}
            {...{
              onValueChange: (value: boolean) => {
                table.toggleAllPageRowsSelected(value);
              },
            }}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            binary
            modelValue={row.getIsSelected()}
            {...{
              onValueChange: (value: boolean) => {
                row.toggleSelected(value);
              },
            }}
          />
        ),
        enableSorting: false,
        enableHiding: false,
        size: col.size,
        enableResizing: col.enableResizing,
      };
    }

    return {
      id: col.key,
      accessorKey: col.key,
      header: ({ column }) => (
        <ProTableColumnHeader
          column={column}
          title={col.title ?? ""}
          filter={col.filter}
        />
      ),
      meta: {
        title: col.title,
        filter: col.filter,
      },
      cell: col.cell
        ? ({ row }) => col.cell?.({ row })
        : ({ getValue }) => getValue(),
      enableSorting: col.sorting,
      enableColumnFilter: !!col.filter,
      enableHiding: col.hiding,
      size: col.size ?? 0,
      enableResizing: col.enableResizing,
      filterFn: (row, columnId, filterValue: string[] | string) => {
        if (!filterValue?.length) return true;
        const value = row.getValue(columnId) as string;
        if (Array.isArray(filterValue)) {
          return filterValue.includes(value);
        }
        return value.toLowerCase().includes(filterValue.toLowerCase());
      },
    };
  });
};

const getFilterColumns = (columns: Column[]): FilterColumn[] => {
  return columns
    .filter(
      (col): col is Column & { filter: NonNullable<Column["filter"]> } =>
        !!col.filter
    )
    .map((col) => ({
      key: col.key,
      title: col.title ?? "",
      type: typeof col.filter === "object" ? col.filter.type : "text",
      options: typeof col.filter === "object" ? col.filter.options : undefined,
    }));
};

const getPinLeftColumns = (columns: Column[]): string[] => {
  return columns
    .filter((col) => col.pin === "left" || col.pin === true)
    .map((col) => col.key);
};

const getPinRightColumns = (columns: Column[]): string[] => {
  return columns.filter((col) => col.pin === "right").map((col) => col.key);
};

const getCommonPinningStyles = (column: any): CSSProperties => {
  const isPinned = column.getIsPinned();
  const isLastLeftPinnedColumn =
    isPinned === "left" && column.getIsLastColumn("left");
  const isFirstRightPinnedColumn =
    isPinned === "right" && column.getIsFirstColumn("right");

  return {
    boxShadow: isLastLeftPinnedColumn
      ? "-4px 0 4px -4px gray inset"
      : isFirstRightPinnedColumn
      ? "4px 0 4px -4px gray inset"
      : undefined,
    left: isPinned === "left" ? `${column.getStart("left")}px` : undefined,
    right: isPinned === "right" ? `${column.getAfter("right")}px` : undefined,
    opacity: isPinned ? 0.95 : 1,
    position: isPinned ? "sticky" : "relative",
    width: column.getSize() !== 0 ? `${column.getSize()}px` : "100%",
    minWidth: column.getSize() !== 0 ? `${column.getSize()}px` : undefined,
    maxWidth: column.getSize() !== 0 ? `${column.getSize()}px` : undefined,
    zIndex: isPinned ? 1 : 0,
  };
};

export default defineComponent({
  name: "ProTable",
  props: {
    title: {
      type: String,
      default: "",
    },
    titleRender: {
      type: [Function, null, Boolean] as PropType<(() => VNode) | null | false>,
      default: null,
    },
    toolbar: {
      type: Function as PropType<() => VNode[]>,
      default: () => <></>,
    },
    columns: {
      type: Array as PropType<Column[]>,
      required: true,
    },
    dataSource: {
      type: Array as PropType<Record<string, unknown>[]>,
      default: () => [],
    },
    tools: {
      type: Object as PropType<{
        export: boolean;
      }>,
      default: () => ({
        export: true,
      }),
    },
  },
  emits: ["export", "changePage"],
  setup(props, { emit }) {
    const columns = transformColumns(props.columns);
    const filterColumns = getFilterColumns(props.columns);

    const dataSource = ref(props.dataSource);

    const table = useVueTable({
      initialState: {
        columnPinning: {
          left: getPinLeftColumns(props.columns),
          right: getPinRightColumns(props.columns),
        },
      },
      defaultColumn: {
        minSize: 0,
        size: 0,
      },
      get data() {
        return dataSource.value;
      },
      columns,
      enableRowSelection: true,
      enableMultiRowSelection: true,
      enableColumnResizing: true,
      getCoreRowModel: getCoreRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getFacetedRowModel: getFacetedRowModel(),
      getFacetedUniqueValues: getFacetedUniqueValues(),
      getFacetedMinMaxValues: getFacetedMinMaxValues(),
    });

    const rows = computed(() => table.getRowModel().rows);

    const tableContainerRef = ref<HTMLDivElement | null>(null);

    const rowVirtualizerOptions = computed(() => {
      return {
        count: rows.value.length,
        estimateSize: () => 67, //estimate row height for accurate scrollbar dragging
        getScrollElement: () => tableContainerRef.value,
        overscan: 5,
      };
    });

    const rowVirtualizer = useVirtualizer(rowVirtualizerOptions);

    const virtualRows = computed(() => rowVirtualizer.value.getVirtualItems());
    const totalSize = computed(() => rowVirtualizer.value.getTotalSize());

    const measureElement = (el?: Element) => {
      if (!el) {
        return;
      }

      rowVirtualizer.value.measureElement(el);

      return undefined;
    };

    const handleExport = () => {
      emit("export");
    };

    return () => (
      <div class="box-border flex flex-col gap-4 h-full">
        <ProTableToolbar
          title={props.title}
          titleRender={props.titleRender}
          tools={props.tools}
          table={table}
          columns={filterColumns}
          toolbar={props.toolbar}
          onExport={handleExport}
        />
        <div
          class="rounded-md border box-border flex-1 overflow-y-auto"
          ref={tableContainerRef}
        >
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow class="flex w-full" key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      style={getCommonPinningStyles(header.column)}
                    >
                      <div class="flex items-center gap-2 justify-between box-border">
                        <FlexRender
                          render={header.column.columnDef.header}
                          props={header.getContext()}
                        />
                        {header.column.getCanFilter() && (
                          <ProTableFilter
                            column={header.column}
                            table={table}
                          />
                        )}
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody height={totalSize.value}>
              {virtualRows.value.map((vRow) => (
                <TableRow
                  key={rows.value[vRow.index].id}
                  class="flex absolute w-full"
                  index={vRow.index}
                  style={{
                    transform: `translateY(${vRow.start}px)`,
                  }}
                  measureElement={measureElement}
                >
                  {rows.value[vRow.index].getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      style={getCommonPinningStyles(cell.column)}
                    >
                      <FlexRender
                        render={cell.column.columnDef.cell}
                        props={cell.getContext()}
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <ProTablePagination
          table={table}
          totalRecords={dataSource.value.length}
          onChange={(e) => {
            emit("changePage", {
              page: e.page,
              pageSize: e.pageSize,
            });
          }}
        />
      </div>
    );
  },
});
