import { FormStructure } from './types.js';

export const canSubmit = (form: FormStructure, value: object) => {
  return form.sections
    .map(section => section.fields)
    .reduce((fields1, fields2) => [...fields1, ...fields2], [])
    .map(field => !field.required || (value[field.name] !== undefined && value[field.name] !== ''))
    .reduce((field1, field2) => field1 && field2, true);
};
