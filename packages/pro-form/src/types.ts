import type { FieldValidators } from "@tanstack/vue-form";

export type FormSchema = {
  name: string;
  label: string;
  type: string;
  multiple?: boolean;
  options?: { label: string; value: string }[];
  validators?:
    | FieldValidators<Record<string, any>, string, undefined, undefined, any>
    | undefined;
  fieldProps?: Record<string, any>;
};

export type ProFormInstance = {
  submit: () => void;
};
