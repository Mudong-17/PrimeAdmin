import { computed, defineComponent, ref, VNode, type PropType } from "vue";
import type { Column } from "@tanstack/vue-table";
import { TieredMenu } from "primevue";
import {
  ArrowDownWideNarrow,
  ArrowUpNarrowWide,
  ChevronsUpDown,
  EyeOff,
} from "lucide-vue-next";

interface ProTableColumnHeaderProps {
  column: Column<any, any>;
  title: string;
  filter?:
    | boolean
    | {
        type: "text" | "select";
        options?: {
          label: string;
          value: string;
        }[];
      };
}

export default defineComponent<ProTableColumnHeaderProps>({
  name: "ProTableColumnHeader",
  props: {
    column: {
      type: Object as PropType<Column<any, any>>,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    filter: {
      type: [Boolean, Object] as PropType<
        | boolean
        | {
            type: "text" | "select";
            options?: { label: string; value: string }[];
          }
      >,
      default: false,
    },
  },
  setup(props) {
    const menus = [
      {
        label: "升序",
        value: "asc",
        icon: <ArrowUpNarrowWide size={16} />,
        command: () => props.column.toggleSorting(false),
      },
      {
        label: "降序",
        value: "desc",
        icon: <ArrowDownWideNarrow size={16} />,
        command: () => props.column.toggleSorting(true),
      },
      { separator: true },
      {
        label: "隐藏",
        value: "hide",
        icon: <EyeOff size={16} />,
        command: () => props.column.toggleVisibility(false),
      },
    ];
    const menuRef = ref<InstanceType<typeof TieredMenu> | null>(null);

    const generateSort = () => {
      if (props.column.getCanSort()) {
        return (
          <div
            class="flex items-center gap-2 w-fit"
            onClick={(e) => menuRef.value?.toggle(e)}
          >
            <span>
              {props.column.getIsSorted() === "asc" && (
                <ArrowUpNarrowWide size={16} />
              )}
              {props.column.getIsSorted() === "desc" && (
                <ArrowDownWideNarrow size={16} />
              )}
              {props.column.getIsSorted() !== "desc" &&
                props.column.getIsSorted() !== "asc" && (
                  <ChevronsUpDown size={16} />
                )}
            </span>
            <TieredMenu ref={menuRef} model={menus as any} popup>
              {{
                itemicon: ({ item }: { item: { icon: string | VNode } }) => {
                  if (typeof item.icon === "string") {
                    return <i class={item.icon} />;
                  }
                  return item.icon;
                },
              }}
            </TieredMenu>
          </div>
        );
      }
    };

    return () => (
      <div class="cursor-pointer flex items-center gap-2">
        <div class="flex items-center gap-2">
          <span>{props.title}</span>
          {generateSort()}
        </div>
      </div>
    );
  },
});
