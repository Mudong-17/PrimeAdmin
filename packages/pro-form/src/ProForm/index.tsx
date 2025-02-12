import { useForm } from "@tanstack/vue-form";
import { defineComponent, type PropType } from "vue";
import {
  Button,
  CascadeSelect,
  Checkbox,
  CheckboxGroup,
  DatePicker,
  FloatLabel,
  InputMask,
  InputNumber,
  InputOtp,
  InputText,
  MultiSelect,
  Password,
  Select,
  Textarea,
} from "primevue";
import type { FormSchema } from "../types";

const generateInputFilter = (item: FormSchema, field: any) => {
  const InputCommonProps = {
    class: "w-full",
    size: "small" as const,
    modelValue: field.state.value,
    invalid: field.state.meta.errors?.length > 0,
    ...item.fieldProps,
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

  const renderInput = () => {
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

    if (item.type === "textarea") {
      return <Textarea {...InputCommonProps} autoResize />;
    }

    if (item.type === "cascade") {
      return (
        <CascadeSelect
          {...SelectCommonProps}
          optionGroupChildren="children"
          optionGroupLabel="label"
        />
      );
    }

    if (item.type === "checkbox") {
      return (
        <CheckboxGroup {...InputCommonProps} class="flex gap-2">
          {item?.options?.map((option) => (
            <div key={option.value} class="flex items-center gap-2">
              <Checkbox value={option.value} />
              <label for={option.value}>{option.label}</label>
            </div>
          ))}
        </CheckboxGroup>
      );
    }

    if (item.type === "date") {
      return <DatePicker {...InputCommonProps} showIcon iconDisplay="input" />;
    }

    if (item.type === "mask") {
      return <InputMask {...InputCommonProps} />;
    }

    if (item.type === "number") {
      return <InputNumber {...InputCommonProps} />;
    }

    if (item.type === "opt") {
      return <InputOtp {...InputCommonProps} />;
    }

    if (item.type === "password") {
      return <Password toggleMask {...InputCommonProps} inputClass="w-full" />;
    }

    return <InputText {...InputCommonProps} />;
  };

  if (
    item.type === "checkbox" ||
    item.type === "opt" ||
    item.type === "radio"
  ) {
    return renderInput();
  }

  return (
    <FloatLabel variant="on">
      {renderInput()}
      <label for={item.name}>{item.label}</label>
    </FloatLabel>
  );
};

// 导出组件实例类型

export default defineComponent({
  name: "ProForm",
  props: {
    layout: {
      type: Object as PropType<{
        cols: number;
        gutter: number;
      }>,
      required: false,
      default: () => ({
        cols: 1,
        gutter: 8,
      }),
    },
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
    submitRender: {
      type: Function,
      required: false,
    },
  },
  setup(props, { expose }) {
    const form = useForm({
      defaultValues: props.defaultValues,
      onSubmit: async ({ value }: { value: Record<string, any> }) => {
        const errors = await form.validateAllFields("submit");
        if (errors.length > 0) {
          return;
        }
        props.onSubmit?.(value);
      },
    });

    const handleSubmit = () => {
      console.log("handleSubmit");
      form.handleSubmit();
    };

    expose({
      submit: handleSubmit,
    });

    return () => (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <div
          class="grid"
          style={{
            gridTemplateColumns: `repeat(${props.layout.cols}, 1fr)`,
            gap: `${props.layout.gutter}px`,
          }}
        >
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
                      {generateInputFilter(item, field)}

                      {field.state.meta.errors && (
                        <div class="text-red-500 h-4 text-xs mt-1">
                          {field.state.meta.errors.join(", ")}
                        </div>
                      )}
                    </div>
                  );
                },
              }}
            </form.Field>
          ))}
          {props.submitRender ? (
            props.submitRender()
          ) : (
            <div
              class="flex gap-4 justify-end h-9 items-center self-center"
              style={{
                gridColumn: `span ${props.layout?.cols} / span ${props.layout?.cols}`,
              }}
            >
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
                提交
              </Button>
            </div>
          )}
        </div>
      </form>
    );
  },
});
