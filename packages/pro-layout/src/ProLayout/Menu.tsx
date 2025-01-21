import {
  computed,
  defineComponent,
  inject,
  provide,
  ref,
  Transition,
  watch,
} from "vue";
import type { PropType } from "vue";
import type { MenuDataItem } from "./types";
import { TieredMenu } from "primevue";

// 抽取公共样式
const MENU_STYLES = {
  menuItem:
    "flex items-center gap-2 py-3 px-4 cursor-pointer justify-between rounded-border hover:bg-primary-50 hover:text-primary-500",
  menuList: "flex flex-col gap-2 mt-2",
  menuIcon: "pi pi-fw pi-angle-down transition-transform duration-300",
  activeMenuItem: "bg-primary-50 text-primary-500",
} as const;

interface TieredMenuItems {
  label: string;
  icon: string;
  command: () => void;
  items: TieredMenuItems[] | undefined;
}

const convertToTieredMenuItems = (menus: MenuDataItem[]): TieredMenuItems[] => {
  const handleClick = inject<(menu: MenuDataItem) => void>(
    "menuClick",
    () => {}
  );

  return menus.map((menu) => ({
    label: menu.name as string,
    icon: menu.icon as unknown as string,
    command: () => handleClick(menu),
    items: menu.children ? convertToTieredMenuItems(menu.children) : undefined,
  }));
};

// CollapsedMenuItem.tsx 组件
const CollapsedMenuItem = defineComponent({
  name: "CollapsedMenuItem",
  props: {
    menu: {
      type: Object as PropType<MenuDataItem>,
      required: true,
    },
    index: {
      type: Number,
      default: 0,
    },
    activePath: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const menuRef = ref<InstanceType<typeof TieredMenu> | null>(null);
    const mouseInMenu = ref(false);
    const isActive = computed(() => {
      if (props.menu.path === props.activePath) return true;
      if (props.menu.children) {
        return props.menu.children.some(
          (child) =>
            child.path === props.activePath ||
            child.children?.some(
              (grandChild) => grandChild.path === props.activePath
            )
        );
      }
      return false;
    });

    const handleMouseEnter = (e: MouseEvent) => {
      mouseInMenu.value = true;
      menuRef.value?.show(e);
    };

    const handleClick = inject<(menu: MenuDataItem) => void>(
      "menuClick",
      () => {}
    );

    return () => (
      <li key={props.menu.path} class="flex items-center justify-center">
        <div
          class={[
            "flex w-[var(--icon-size)] h-[var(--icon-size)] p-4 items-center justify-center rounded-lg cursor-pointer hover:bg-primary-50",
            { "bg-primary-50 text-primary-500": isActive.value },
          ]}
          onClick={() => handleClick(props.menu)}
          onMouseenter={handleMouseEnter}
        >
          {props.menu.icon && (
            <i
              class={`${props.menu.icon}`}
              style={{ fontSize: "var(--icon-size)" }}
              v-tooltip={{
                value: props.menu.name,
                showDelay: 1000,
              }}
            />
          )}
        </div>
        {props.menu.children && (
          <TieredMenu
            ref={menuRef}
            model={convertToTieredMenuItems(props.menu.children)}
            popup
            appendTo="body"
          />
        )}
      </li>
    );
  },
});

// ExpandedMenuItem.tsx 组件
const ExpandedMenuItem = defineComponent({
  name: "ExpandedMenuItem",
  props: {
    menu: {
      type: Object as PropType<MenuDataItem>,
      required: true,
    },
    index: {
      type: Number,
      default: 0,
    },
    activePath: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const isExpanded = ref(false);
    const handleClick = inject<(menu: MenuDataItem) => void>(
      "menuClick",
      () => {}
    );

    // 计算是否应该展开
    const shouldExpand = computed(() => {
      if (!props.menu.children) return false;
      return props.menu.children.some(
        (child) =>
          child.path === props.activePath ||
          child.children?.some(
            (grandChild) => grandChild.path === props.activePath
          )
      );
    });

    // 监听 shouldExpand 的变化来自动展开菜单
    watch(
      shouldExpand,
      (newValue) => {
        if (newValue) {
          isExpanded.value = true;
        }
      },
      { immediate: true }
    );

    const isActive = computed(() => {
      if (props.menu.path === props.activePath) return true;
      if (props.menu.children) {
        return props.menu.children.some(
          (child) =>
            child.path === props.activePath ||
            child.children?.some(
              (grandChild) => grandChild.path === props.activePath
            )
        );
      }
      return false;
    });

    const onMenuItemClick = (e: Event) => {
      e.preventDefault();
      if (!props.menu.children) {
        handleClick(props.menu);
      } else {
        isExpanded.value = !isExpanded.value;
      }
    };

    return () => (
      <li>
        <div
          class={[
            MENU_STYLES.menuItem,
            { [MENU_STYLES.activeMenuItem]: isActive.value },
          ]}
          onClick={onMenuItemClick}
        >
          <div class="flex items-center gap-2">
            {props.menu.icon && <i class={props.menu.icon} />}
            <span
              class="line-clamp-1"
              v-tooltip={{
                value: props.menu.name,
                showDelay: 1000,
              }}
            >
              {props.menu.name}
            </span>
          </div>
          {props.menu.children && (
            <i
              class={`${MENU_STYLES.menuIcon} ${
                isExpanded.value ? "rotate-180" : "rotate-0"
              }`}
            />
          )}
        </div>
        {props.menu.children && (
          <Transition name="fade" mode="out-in">
            {isExpanded.value && (
              <ul
                class={MENU_STYLES.menuList}
                style={{ marginLeft: `${props.index + 1}rem` }}
              >
                {props.menu.children.map((childMenu) => (
                  <ExpandedMenuItem
                    key={childMenu.path}
                    menu={childMenu}
                    index={props.index + 1}
                    activePath={props.activePath}
                  />
                ))}
              </ul>
            )}
          </Transition>
        )}
      </li>
    );
  },
});

// Menu 组件
const Menu = defineComponent({
  name: "Menu",
  props: {
    collapsed: {
      type: Boolean,
      default: false,
    },
    menus: {
      type: Array as PropType<MenuDataItem[]>,
      required: true,
    },
    index: {
      type: Number,
      default: 0,
    },
    onClick: {
      type: Function as PropType<(menu: MenuDataItem) => void>,
      required: true,
    },
    activePath: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    provide("menuClick", props.onClick);

    return () => (
      <ul
        class={MENU_STYLES.menuList}
        style={{ marginLeft: `${props.index}rem` }}
      >
        {props.menus.map((menu) =>
          props.collapsed ? (
            <CollapsedMenuItem
              key={menu.path}
              menu={menu}
              index={props.index}
              activePath={props.activePath}
            />
          ) : (
            <ExpandedMenuItem
              key={menu.path}
              menu={menu}
              index={props.index}
              activePath={props.activePath}
            />
          )
        )}
      </ul>
    );
  },
});

export default Menu;
