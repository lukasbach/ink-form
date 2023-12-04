import {
  FormFieldManager,
  FormFieldSelect,
  FormFieldValueRendererProps,
  SpecificFormFieldRendererProps,
  TypeOfField,
} from '../types.js';
import React from 'react';
import { Box } from 'ink';
import SelectInput from 'ink-select-input';

export class SelectFormFieldManager implements FormFieldManager<FormFieldSelect> {
  public type: TypeOfField<FormFieldSelect> = 'select';

  public renderField: React.FC<SpecificFormFieldRendererProps<FormFieldSelect>> = props => (
    <Box borderStyle={'round'} width="100%">
      <SelectInput
        items={props.field.options.map(option => ({ value: option.value, label: option.label ?? option.value }))}
        onHighlight={option => props.onChange(option.value)}
        initialIndex={props.field.options.findIndex(option => option.value === props.value) ?? 0}
      />
    </Box>
  );

  public renderValue: React.FC<FormFieldValueRendererProps<FormFieldSelect>> = props => (
    <>{props.field.options.find(option => option.value === props.value)?.label ?? props.value ?? 'No value'}</>
  );
}
