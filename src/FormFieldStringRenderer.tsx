import React from 'react';
import { FormFieldRendererProps, SpecificFormFieldRendererProps } from './FormFieldRenderer';
import { FormFieldString } from './types';
import { Box, Text } from 'ink';
import TextInput from 'ink-text-input';

export const FormFieldStringRenderer: React.FC<SpecificFormFieldRendererProps<FormFieldString>> = props => {
  return (
    <Box borderStyle={'round'} width="100%">
      <TextInput
        value={props.value ?? ''}
        onChange={value => {
          props.onChange(value);

          if (props.field.regex && !props.field.regex.test(value)) {
            props.onError(`Value does not conform to regular expression: ${props.field.regex}`);
          } else {
            props.onClearError();
          }
        }}
        placeholder={props.field.placeholder}
        onSubmit={() => props.onSetEditingField(undefined)}
        mask={props.field.mask}
      />
    </Box>
  )
}