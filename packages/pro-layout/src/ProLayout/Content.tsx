import { defineComponent, type VNode } from "vue";
import { ProgressSpinner } from "primevue";

interface ContentProps {
  content: VNode;
  loading?: boolean;
}

export default defineComponent<ContentProps>({
  name: "Content",
  props: {
    content: {
      type: [Object, Function],
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    return () => (
      <div class="flex-1 p-[var(--content-padding)] box-border overflow-y-auto">
        {props.loading ? (
          <div class="flex justify-center items-center h-full">
            <ProgressSpinner />
          </div>
        ) : (
          props.content
        )}
      </div>
    );
  },
});
