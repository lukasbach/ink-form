import { FloatFormFieldManager } from './FloatFormFieldManager.js';
import { IntegerFormFieldManager } from './IntegerFormFieldManager.js';
import { MultiSelectFormFieldManager } from './MultiSelectFormFieldManager.js';
import { SelectFormFieldManager } from './SelectFormFieldManager.js';
import { FormField, FormFieldManager, TypeOfField } from '../types.js';
import { StringFormFieldManager } from './StringFormFieldManager.js';
import { BooleanFormFieldManager } from './BooleanFormFieldManager.js';

export const managers: FormFieldManager<FormField>[] = [
  new FloatFormFieldManager(),
  new IntegerFormFieldManager(),
  new MultiSelectFormFieldManager(),
  new SelectFormFieldManager(),
  new StringFormFieldManager(),
  new BooleanFormFieldManager(),
];

export const getManager = (
  formFieldType: TypeOfField<FormField>,
  customManagers: FormFieldManager<FormField>[] = []
) => {
  return [...managers, ...customManagers].find(manager => manager.type === formFieldType);
};
