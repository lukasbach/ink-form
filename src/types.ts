import React from 'react';

export type Description = string | string[] | JSX.Element | undefined | false;

export interface FormProps {
  form: FormStructure;
  initialValue?: object;
  value?: object;
  onChange?: (value: object) => void;
  onSubmit?: (value: object) => void;
  customManagers?: FormFieldManager<FormField | AbstractFormField<any, any>>[];
}

export interface FormStructure {
  title?: string;
  sections: FormSection[];
}

export interface FormSection {
  title: string;
  fields: FormField[];
  description?: Description;
}

export type FormField = FormFieldString | FormFieldInteger | FormFieldFloat | FormFieldSelect | FormFieldMultiSelect | FormFieldBoolean;

export type ValueOfField<T extends FormField> = T extends AbstractFormField<any, infer V> ? V : never;
export type TypeOfField<T extends FormField> = T extends AbstractFormField<infer V, any> ? V : never;

export type AbstractFormField<T extends string, V> = {
  type: T;
  name: string;
  label?: string;
  description?: Description;
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

export interface FormFieldValueRendererProps<T extends FormField> {
  value?: ValueOfField<T>;
  field: T;
}

export interface FormFieldManager<T extends FormField> {
  type: TypeOfField<T>;
  needCtrlToReturnSave?: boolean;
  renderField: React.FC<SpecificFormFieldRendererProps<T>>;
  renderValue: React.FC<FormFieldValueRendererProps<T>>;
}


export type FormFieldRendererProps<T extends FormField> = {
  field: T;
  form: FormStructure;
  value?: ValueOfField<T>;
  onChange: (value: ValueOfField<T>) => void;
  onSetEditingField: (field?: string) => void;
  editingField?: string;
  customManagers?: FormFieldManager<FormField>[];
};

export type SpecificFormFieldRendererProps<T extends FormField> = FormFieldRendererProps<T> & {
  onError: (error: string) => void;
  onClearError: () => void;
  error?: string;
  onSave: (newValue?: ValueOfField<T>) => void;
  onCancel: () => void;
}