import { defineComponent } from "vue";
import type { WithFalse } from "./types";
import type { JSX } from "vue/jsx-runtime";

interface LogoProps {
  collapsed: boolean;
  logo: WithFalse<(collapsed: boolean) => JSX.Element> | false;
  onClick: () => void;
}

export default defineComponent<LogoProps>({
  name: "Logo",
  props: {
    collapsed: {
      type: Boolean,
      default: false,
    },
    logo: {
      type: Function,
      default: () => <></>,
    },
    onClick: {
      type: Function,
      default: () => {},
    },
  },
  setup(props) {
    // 判断 logo 是函数还是字符串
    const logo = () => {
      if (typeof props.logo === "function") {
        return props.logo(props.collapsed);
      }
      return <></>;
    };

    return () => (
      <div
        class={`transition-[width] duration-300 flex-shrink-0 h-[var(--header-height)] cursor-pointer ${
          props.collapsed ? "w-[60px]" : "w-[var(--sider-width)]"
        }`}
        onClick={props.onClick}
      >
        {logo()}
      </div>
    );
  },
});
