import { Brain } from "lucide-vue-next";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Logo",
  props: {
    collapsed: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    return () => (
      <div class="h-full flex items-center justify-center gap-2 text-primary">
        <Brain size={28} />
        {props.collapsed ? (
          <></>
        ) : (
          <span class="font-bold tracking-widest">Vue PrimeAdmin</span>
        )}
      </div>
    );
  },
});
