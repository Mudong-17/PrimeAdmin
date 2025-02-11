export type FormSchema = {
  name: string;
  label: string;
  type: string;
  multiple?: boolean;
  options?: { label: string; value: string }[];
  validators?:
    | FieldValidators<Record<string, any>, string, undefined, undefined, any>
    | undefined;
};
