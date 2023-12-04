import {
  FormFieldFloat,
  FormFieldManager,
  FormFieldValueRendererProps,
  SpecificFormFieldRendererProps,
  TypeOfField,
} from '../types.js';
import React from 'react';
import { NumberFieldRenderer } from '../NumberFieldRenderer.js';

export class FloatFormFieldManager implements FormFieldManager<FormFieldFloat> {
  public type: TypeOfField<FormFieldFloat> = 'float';

  public renderField: React.FC<SpecificFormFieldRendererProps<FormFieldFloat>> = props => (
    <NumberFieldRenderer {...props} isFloat={true} />
  );

  public renderValue: React.FC<FormFieldValueRendererProps<FormFieldFloat>> = props => <>{props.value}</>;
}
