import {
  FormFieldInteger,
  FormFieldManager,
  FormFieldValueRendererProps,
  SpecificFormFieldRendererProps,
  TypeOfField,
} from '../types.js';
import React from 'react';
import { NumberFieldRenderer } from '../NumberFieldRenderer.js';

export class IntegerFormFieldManager implements FormFieldManager<FormFieldInteger> {
  public type: TypeOfField<FormFieldInteger> = 'integer';

  public renderField: React.FC<SpecificFormFieldRendererProps<FormFieldInteger>> = props => (
    <NumberFieldRenderer {...props} isFloat={false} />
  );

  public renderValue: React.FC<FormFieldValueRendererProps<FormFieldInteger>> = props => <>{props.value}</>;
}
