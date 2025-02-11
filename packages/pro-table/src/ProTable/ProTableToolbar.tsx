import type { Table } from "@tanstack/vue-table";
import { defineComponent, type VNode, type PropType } from "vue";
import type { FilterColumn } from "./index";
import ProTableViewOptions from "./ProTableViewOptions";
import { Download } from "lucide-vue-next";

export default defineComponent({
  name: "ProTableToolbar",
  props: {
    title: {
      type: String,
      default: "",
    },
    titleRender: {
      type: [Function, null, Boolean] as PropType<(() => VNode) | null | false>,
      default: null,
    },
    tools: {
      type: Object as PropType<{
        export: boolean;
      }>,
      default: () => ({
        export: true,
      }),
    },
    filter: {
      type: Boolean,
      default: true,
    },
    toolbar: {
      type: Function,
      default: () => <></>,
    },
    table: {
      type: Object as PropType<Table<any>>,
      required: true,
    },
    columns: {
      type: Array as PropType<FilterColumn[]>,
      required: true,
    },
  },
  emits: ["export"],
  setup(props, { emit }) {
    const generateTitle = () => {
      if (props.titleRender === false) {
        return null;
      }
      if (props.titleRender) {
        return props.titleRender();
      }
      return (
        <div class="flex items-center font-semibold tracking-widest">
          {props.title}
        </div>
      );
    };

    return () => (
      <div class="grid grid-cols-[minmax(0,_1fr)_auto] gap-4">
        <div class="flex items-center">{generateTitle()}</div>
        <div class="flex items-center gap-2">
          <div class="flex items-center shrink-0">
            <ProTableViewOptions table={props.table} />
            {props.tools.export && (
              <div
                class="w-8 h-8 flex items-center justify-center cursor-pointer"
                v-tooltip="导出"
                onClick={() => {
                  emit("export");
                }}
              >
                <Download class="text-muted-color" size={18} />
              </div>
            )}
          </div>

          <div class="flex items-center gap-2 shrink-0">{props.toolbar()}</div>
        </div>
      </div>
    );
  },
});
