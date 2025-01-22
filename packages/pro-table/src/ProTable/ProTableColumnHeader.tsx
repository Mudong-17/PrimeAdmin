import { computed, defineComponent, ref, type PropType } from "vue";
import type { Column } from "@tanstack/vue-table";
import { TieredMenu } from "primevue";
import {
  ArrowDownWideNarrow,
  ArrowUpNarrowWide,
  ChevronsUpDown,
  EyeOff,
} from "lucide-vue-next";
import { JSX } from "vue/jsx-runtime";

interface ProTableColumnHeaderProps {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  column: Column<any, any>;
  title: string;
}

export default defineComponent<ProTableColumnHeaderProps>({
  name: "ProTableColumnHeader",
  props: {
    column: {
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      type: Object as PropType<Column<any, any>>,
      required: true,
    },
    title: {
      type: String,
      required: true,
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

    return () => (
      <>
        {props.column.getCanSort() ? (
          <div class="cursor-pointer">
            <div
              class="flex items-center gap-2 w-fit"
              onClick={(e) => menuRef.value?.toggle(e)}
            >
              <span>{props.title}</span>
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
            </div>

            {/* biome-ignore lint/suspicious/noExplicitAny: <explanation> */}
            <TieredMenu ref={menuRef} model={menus as any} popup>
              {{
                itemicon: ({
                  item,
                }: {
                  item: { icon: string | JSX.Element };
                }) => {
                  if (typeof item.icon === "string") {
                    return <i class={item.icon} />;
                  }
                  return item.icon;
                },
              }}
            </TieredMenu>
          </div>
        ) : (
          <div>{props.title}</div>
        )}
      </>
    );
  },
});
