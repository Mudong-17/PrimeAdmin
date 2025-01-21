import { PanelLeftClose } from "lucide-vue-next";
import Avatar from "primevue/avatar";
import { defineComponent } from "vue";
import type { WithFalse } from "./types";
import type { JSX } from "vue/jsx-runtime";

interface HeaderProps {
  collapsed: boolean;
  onCollapsed: () => void;
  userRender: WithFalse<() => JSX.Element> | false;
}

export default defineComponent<HeaderProps>({
  name: "Header",
  props: {
    collapsed: {
      type: Boolean,
      default: false,
    },
    userRender: {
      type: Function,
      default: () => <></>,
    },
  },
  emits: ["collapsed"],
  setup(props, { emit }) {
    return () => (
      <div class="h-[var(--header-height)] flex justify-between items-center px-[var(--content-padding)] box-border">
        <div>
          <div
            class={`cursor-pointer transition-transform duration-300 ${
              props.collapsed ? "rotate-180" : "rotate-0"
            }`}
            onClick={() => emit("collapsed")}
          >
            <PanelLeftClose />
          </div>
        </div>
        <div>{props.userRender !== false && props.userRender()}</div>
      </div>
    );
  },
});
