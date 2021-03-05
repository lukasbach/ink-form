import React from 'react';
import { SpecificFormFieldRendererProps } from './FormFieldRenderer';
import { FormFieldMultiSelect } from './types';
import { Box, Text } from 'ink';
import SelectInput from 'ink-multi-select';

export const FormFieldMultiSelectRenderer: React.FC<SpecificFormFieldRendererProps<FormFieldMultiSelect>> = props => {
  return (
    <Box borderStyle={'round'} width="100%">
      <SelectInput
        items={props.field.options.map(option => ({ value: option.value, label: option.label ?? option.value }))}
        onSelect={option => props.onChange([...(props.value ?? []), option.value as string])}
        onUnselect={option => props.onChange(props.value.filter(value => value !== option.value))}
        defaultSelected={props.field.options.filter(option => props.value?.includes(option.value))}
      />
    </Box>
  )
}