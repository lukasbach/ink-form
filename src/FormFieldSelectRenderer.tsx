import React from 'react';
import { FormFieldRendererProps, SpecificFormFieldRendererProps } from './FormFieldRenderer';
import { FormFieldSelect } from './types';
import { Box, Text } from 'ink';
import SelectInput from 'ink-select-input';

export const FormFieldSelectRenderer: React.FC<SpecificFormFieldRendererProps<FormFieldSelect>> = props => {
  return (
    <Box borderStyle={'round'} width="100%">
      <SelectInput
        items={props.field.options.map(option => ({ value: option.value, label: option.label ?? option.value }))}
        onHighlight={option => props.onChange(option.value)}
        initialIndex={props.field.options.findIndex(option => option.value === props.value) ?? 0}
      />
    </Box>
  )
}