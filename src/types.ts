export interface FormProps {
  form: FormStructure;
  initialValue?: object;
  value?: object;
  onChange?: (value: object) => void;
}

export interface FormStructure {
  title?: string;
  sections?: FormSection[];
  fields?: FormField[];
}

export interface FormSection {
  title: string;
  fields: FormField[];
}

export type FormField = FormFieldString | FormFieldInteger | FormFieldFloat | FormFieldSelect | FormFieldMultiSelect | FormFieldBoolean;

export type ValueOfField<T extends FormField> = T extends AbstractFormField<any, infer V> ? V : never;
export type TypeOfField<T extends FormField> = T extends AbstractFormField<infer V, any> ? V : never;

export type AbstractFormField<T extends string, V> = {
  type: T;
  name: string;
  label?: string;
  description?: string;
  required?: boolean;
  initialValue?: V;
  onChange?: (value: V, name: string) => void;
  placeholder?: string;
}

export type FormFieldBoolean = AbstractFormField<'boolean', boolean> & {
}

export type FormFieldString = AbstractFormField<'string', string> & {
  mask?: string;
  regex?: RegExp;
}

export type FormFieldInteger = AbstractFormField<'integer', number> & {
  min?: number;
  max?: number;
  step?: number;
}

export type FormFieldFloat = AbstractFormField<'float', number> & {
  min?: number;
  max?: number;
  step?: number;
}

export type FormFieldSelect = AbstractFormField<'select', string> & {
  options: Array<{ label?: string, value: string }>;
}

export type FormFieldMultiSelect = AbstractFormField<'multiselect', string[]> & {
  options: Array<{ label?: string, value: string }>;
}
