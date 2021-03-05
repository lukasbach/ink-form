import { FloatFormFieldManager } from './FloatFormFieldManager';
import { IntegerFormFieldManager } from './IntegerFormFieldManager';
import { MultiSelectFormFieldManager } from './MultiSelectFormFieldManager';
import { SelectFormFieldManager } from './SelectFormFieldManager';
import { FormField, FormFieldManager, TypeOfField } from '../types';
import { StringFormFieldManager } from './StringFormFieldManager';
import { BooleanFormFieldManager } from './BooleanFormFieldManager';

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
