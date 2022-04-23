import React from 'react';

/**
 * A description for either a field or a section. If undefined or false, it will not be shown.
 * If its a JSX.Element, it will be rendered as description. If its a string, the string
 * will be rendered. If its an array of strings, they will be rendered as distinctive paragraphs.
 */
export type Description = string | string[] | JSX.Element | undefined | false;

/**
 * The input structure for creating a new form, either by directly rendering it as component in
 * Ink, or by invoking ``openForm(form)`` with it. You have to supply a ``form`` attribute to
 * define the structure of the form. You should also supply a ``onSubmit`` attribute to receive
 * the results when the user submits the form.
 *
 * The form is uncontrolled by default, you can specify an initial value with ``initialValue``. You
 * can also switch to controlled mode by explicitly setting a ``value`` and reacting to ``onChange``
 * events.
 */
export interface FormProps {
  /** Structure of the form, i.e. which fields are contained in which sections. */
  form: FormStructure;
  initialValue?: object;

  /** Current value of the form. Omit to leave the component in uncontrolled mode. */
  value?: object;
  onChange?: (value: object) => void;

  /**
   * ``onSubmit`` is triggered when the user has completed all required fields and triggers the
   * submit button at the end of the page.
   *
   * @param value the final value of the form.
   * */
  onSubmit?: (value: object) => void;

  /**
   * You can use custom field implementations, by specifying their ``type`` attribute to a custom
   * value and supplying a FormFieldManager here that can handle this type.
   */
  customManagers?: FormFieldManager<FormField | AbstractFormField<any, any>>[];
}

/**
 * Top-level structure of the form. A form is composed of several sections, which are
 * displayed as distinct tabs, each containing several fields.
 */
export interface FormStructure {
  /** The title of the form is shown at the top throughout the application. */
  title?: string;
  /** A form contains several sections, each displayed as a tab. */
  sections: FormSection[];
}

/**
 * A form is composed of several sections of which only one can be shown at once. It is
 * composed of several form fields. The title is shown as tab-text for the section.
 * A description can be supplied which will be shown at the top of the form.
 *
 * Note that all form fields are stored in a global value object, regardless of section structure.
 */
export interface FormSection {
  /** Title of the section, will be shown as its tab name. */
  title: string;
  /** List of form fields which are visible when this section is open. */
  fields: FormField[];
  /** Optional text that describes this section. */
  description?: Description;
}

/**
 * A form field describes a type of input, i.e. text input, number input etc.
 *
 * Included are:
 * - FormFieldString
 * - FormFieldInteger
 * - FormFieldFloat
 * - FormFieldSelect
 * - FormFieldMultiSelect
 * - FormFieldBoolean
 *
 * You can add your own form field by extending ``AbstractFormField`` and implementing
 * an associated ``FormFieldManager<CustomFormField>``.
 */
export type FormField =
  | FormFieldString
  | FormFieldInteger
  | FormFieldFloat
  | FormFieldSelect
  | FormFieldMultiSelect
  | FormFieldBoolean
  | AbstractFormField<any, any>;

export type ValueOfField<T extends FormField> = T extends AbstractFormField<any, infer V> ? V : never;
export type TypeOfField<T extends FormField> = T extends AbstractFormField<infer V, any> ? V : never;

export type AbstractFormField<T extends string, V> = {
  /**
   * The type uniquely identifies which kind of form field is used, e.g. 'string', 'integer'. This tells
   * the library which form field manager should be used to handle this form field.
   */
  type: T;

  /**
   * The name uniquely identifies the input field and is used to store the value in the output
   * structure, i.e. if ``field.name === 'myFieldName'``, then the value chosen by the user
   * is available in the output stucture in ``output['myFieldName']``. Note that the section
   * structure is irrelevant for the output structure, just the name uniquely identifies the
   * field.
   */
  name: string;

  /**
   * A quick description of the field. If omitted, the name will be used as label.
   */
  label?: string;

  /** An optional verbose description which will only be shown when the field is expanded. */
  description?: Description;

  /** If this is set to true, the form cannot be submitted if this fields value is empty or undefined. */
  required?: boolean;
  initialValue?: V;
  onChange?: (value: V, name: string) => void;
};

export type FormFieldBoolean = AbstractFormField<'boolean', boolean> & {};

export type FormFieldString = AbstractFormField<'string', string> & {
  /** Set to e.g. ``*`` to use as password field.  */
  mask?: string;

  /** If supplied, the user cannot use a value which does not conform this regular expression. */
  regex?: RegExp;
  placeholder?: string;
};

export type FormFieldInteger = AbstractFormField<'integer', number> & {
  min?: number;
  max?: number;
  /** The user can use the arrow keys to increase or decrease the value by that step amount. */
  step?: number;
  placeholder?: string;
};

export type FormFieldFloat = AbstractFormField<'float', number> & {
  min?: number;
  max?: number;
  /** The user can use the arrow keys to increase or decrease the value by that step amount. */
  step?: number;
  placeholder?: string;
};

export type FormFieldSelect = AbstractFormField<'select', string> & {
  options: Array<{ label?: string; value: string }>;
};

export type FormFieldMultiSelect = AbstractFormField<'multiselect', string[]> & {
  options: Array<{ label?: string; value: string }>;
};

export interface FormFieldValueRendererProps<T extends FormField> {
  value?: ValueOfField<T>;
  field: T;
}

/**
 * A FormFieldManager is responsible for handling a input kind, i.e. a ``FormField``, by specifying
 * how its input should be rendered. Implement a custom ``FormFieldManager`` and supply it to the
 * form to add custom form fields.
 */
export interface FormFieldManager<T extends FormField> {
  /** This value must match the ``FormField.type`` value you use for your custom form fields. */
  type: TypeOfField<T>;
  needCtrlToReturnSave?: boolean;
  /** Render method for rendering the input component if the field is expanded. */
  renderField: React.FC<SpecificFormFieldRendererProps<T>>;
  /** Render method for rendering the value if the field is collapsed. */
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
};
