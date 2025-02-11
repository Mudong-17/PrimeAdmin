import { useForm } from "@tanstack/vue-form";
import { defineComponent, type PropType } from "vue";
import { FloatLabel, InputText, Select } from "primevue";
import type { FormSchema } from "../types";

export default defineComponent({
  name: "ProForm",
  props: {
    schema: {
      type: Array as PropType<FormSchema[]>,
      required: true,
    },
    defaultValues: {
      type: Object,
      required: false,
    },
  },

  setup(props) {
    const form = useForm({
      defaultValues: props.defaultValues,
      onSubmit: (values) => {
        console.log(values);
      },
    });

    return () => (
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          {props.schema.map((item) => (
            <form.Field name={item.name} key={item.name}>
              {{
                default: ({ field }) => {
                  if (item.type === "select") {
                    return (
                      <FloatLabel variant="on">
                        <Select
                          class="w-56"
                          v-model={field.value}
                          options={item.options}
                          optionLabel="label"
                          optionValue="value"
                        />
                        <label for={item.name}>{item.label}</label>
                      </FloatLabel>
                    );
                  }
                  return (
                    <FloatLabel variant="on">
                      <InputText id={item.name} v-model={field.value} />
                      <label for={item.name}>{item.label}</label>
                    </FloatLabel>
                  );
                },
              }}
            </form.Field>
          ))}
        </form>
      </div>
    );
  },
});
