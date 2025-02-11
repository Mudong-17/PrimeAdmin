import { defineComponent } from "vue";

export default defineComponent({
  name: "TableRow",
  props: {
    class: {
      type: String,
      default: "",
    },
    style: {
      type: Object,
      default: {},
    },
    measureElement: {
      type: Function,
      default: () => {},
    },
    index: {
      type: Number,
      default: 0,
    },
  },
  setup(props, { slots }) {
    return () => (
      <tr
        data-index={props.index}
        class={[
          "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted box-border",
          props.class,
        ]}
        style={props.style}
        ref={(el: any) => props.measureElement(el)}
      >
        {slots.default?.()}
      </tr>
    );
  },
});
