import { useForm } from "@tanstack/vue-form";
import { defineComponent, type PropType } from "vue";
import { Button, FloatLabel, InputText, MultiSelect, Select } from "primevue";
import type { FormSchema } from "../types";

const generateInputFilter = (item: FormSchema, field: any) => {
  const InputCommonProps = {
    class: "w-full",
    size: "small" as const,
    modelValue: field.state.value,
    ...{
      "onUpdate:modelValue": (value: string) => field.handleChange(value),
    },
  };

  const SelectCommonProps = {
    ...InputCommonProps,
    options: item.options,
    optionLabel: "label",
    optionValue: "value",
  };

  if (item.type === "select") {
    return item.multiple ? (
      <MultiSelect
        filter
        emptyFilterMessage="未找到结果"
        showToggleAll={false}
        {...SelectCommonProps}
      />
    ) : (
      <Select {...SelectCommonProps} />
    );
  }

  return <InputText {...InputCommonProps} />;
};

export default defineComponent({
  name: "ProSearch",
  props: {
    schema: {
      type: Array as PropType<FormSchema[]>,
      required: true,
    },
    defaultValues: {
      type: Object,
      required: false,
    },
    onSubmit: {
      type: Function,
      required: false,
    },
  },

  setup(props) {
    const form = useForm({
      defaultValues: props.defaultValues,
      onSubmit: ({ value }: { value: Record<string, any> }) => {
        props.onSubmit?.(value);
      },
    });

    return () => (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <div class="grid grid-cols-5 gap-x-4 gap-y-8">
          {props.schema.map((item) => (
            <form.Field
              name={item.name}
              key={item.name}
              validators={item.validators}
            >
              {{
                default: ({ field }: { field: any }) => {
                  return (
                    <div class="relative">
                      <FloatLabel variant="on">
                        {generateInputFilter(item, field)}
                        <label for={item.name}>{item.label}</label>
                      </FloatLabel>
                      {field.state.meta.errors && (
                        <div class="text-red-500 absolute text-xs mt-1">
                          {field.state.meta.errors.join(", ")}
                        </div>
                      )}
                    </div>
                  );
                },
              }}
            </form.Field>
          ))}
          <div class="col-start-5 flex gap-4 justify-end h-9 items-center self-center">
            <Button
              class="h-full"
              type="reset"
              severity="contrast"
              raised
              onClick={() => {
                form.reset();
                form.handleSubmit();
              }}
            >
              重置
            </Button>
            <Button class="h-full" type="submit" raised>
              搜索
            </Button>
          </div>
        </div>
      </form>
    );
  },
});
