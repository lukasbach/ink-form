import {
  FormFieldManager,
  FormFieldString,
  FormFieldValueRendererProps,
  SpecificFormFieldRendererProps,
  TypeOfField,
} from '../types.js';
import React from 'react';
import { Box, Text, Transform } from 'ink';
import TextInput from 'ink-text-input';

export class StringFormFieldManager implements FormFieldManager<FormFieldString> {
  public type: TypeOfField<FormFieldString> = 'string';

  public renderField: React.FC<SpecificFormFieldRendererProps<FormFieldString>> = props => (
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
  );

  public renderValue: React.FC<FormFieldValueRendererProps<FormFieldString>> = props => (
    <Transform
      transform={
        props.value !== undefined && props.field.mask
          ? text =>
              text
                .split('')
                .map(char => '*')
                .join('')
          : text => text
      }
    >
      {props.value}
    </Transform>
  );
}
