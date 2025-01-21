import { defineComponent, type PropType, toRefs } from "vue";
import Logo from "./Logo";
import type { MenuDataItem, WithFalse } from "./types";
import type { JSX } from "vue/jsx-runtime";
import Menu from "./Menu";
import type { RouteLocationNormalized, Router } from "vue-router";

interface SidderProps {
  collapsed: boolean;
  logo: WithFalse<(collapsed: boolean) => JSX.Element> | false;
  menus: MenuDataItem[];
  router: Router;
  activePath: string;
  isMobile?: boolean;
}

export default defineComponent<SidderProps>({
  name: "Sidder",
  props: {
    collapsed: {
      type: Boolean,
      default: false,
    },
    logo: {
      type: [Function, Boolean],
      default: () => <></>,
    },
    menus: {
      type: Array,
      default: () => [],
    },
    router: {
      type: Object as PropType<Router>,
      default: () => ({}),
    },
    activePath: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const { collapsed } = toRefs(props);

    return () => (
      <div
        class={`transition-[width] flex flex-col duration-300 flex-shrink-0 ${
          collapsed.value ? "w-[60px]" : "w-[var(--sider-width)]"
        }`}
      >
        {props.logo !== false && (
          <Logo
            collapsed={collapsed.value}
            logo={props.logo}
            onClick={() => {
              props.router.push("/");
            }}
          />
        )}
        <div class="flex-1 overflow-y-auto overflow-x-hidden">
          <Menu
            collapsed={collapsed.value}
            activePath={props.activePath}
            menus={props.menus}
            onClick={(menu) => {
              if (menu.path) {
                props.router.push(menu.path);
              }
            }}
          />
        </div>
      </div>
    );
  },
});
