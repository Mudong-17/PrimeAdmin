import { computed, defineComponent, ref, type PropType } from "vue";
import type { Column } from "@tanstack/vue-table";
import { TieredMenu } from "primevue";

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
      { label: "升序", value: "asc" },
      { label: "降序", value: "desc" },
      { separator: true },
      { label: "隐藏", value: "hide" },
    ];
    const menuRef = ref<InstanceType<typeof TieredMenu> | null>(null);
    console.log(props.column.getCanSort());

    const canSort = computed(() => props.column.getCanSort());
    return () => (
      <>
        {canSort ? (
          <div class="cursor-pointer">
            <div onClick={(e) => menuRef.value?.toggle(e)}>{props.title}</div>
            <TieredMenu ref={menuRef} model={menus} popup />
          </div>
        ) : (
          <div>{props.title}</div>
        )}
      </>
    );
  },
});
