import {
  FormFieldBoolean,
  FormFieldManager,
  FormFieldValueRendererProps,
  SpecificFormFieldRendererProps,
  TypeOfField,
} from '../types.js';
import React from 'react';
import { Box, Text, useInput } from 'ink';

export class BooleanFormFieldManager implements FormFieldManager<FormFieldBoolean> {
  public type: TypeOfField<FormFieldBoolean> = 'boolean';

  public renderField: React.FC<SpecificFormFieldRendererProps<FormFieldBoolean>> = props => {
    useInput((input, key) => {
      if (input === ' ') {
        props.onChange(!props.value);
      }
    });

    return (
      <Box width="100%" borderStyle={'round'} borderColor={props.value ? 'green' : 'gray'} marginBottom={2}>
        <Box marginRight={2}>
          <Text color={props.value ? 'green' : 'gray'}>
            {props.value === undefined ? '[Not set]' : props.value ? '[True]' : '[False]'}
          </Text>
        </Box>
        <Box flexGrow={1}>
          <Text>Press Space to toggle value</Text>
        </Box>
      </Box>
    );
  };

  public renderValue: React.FC<FormFieldValueRendererProps<FormFieldBoolean>> = props => (
    <Text>{props.value === undefined ? '[Not set]' : props.value ? '[True]' : '[False]'}</Text>
  );
}
