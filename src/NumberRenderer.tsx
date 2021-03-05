import React from 'react';
import { FormFieldRendererProps, SpecificFormFieldRendererProps } from './FormFieldRenderer';
import { FormFieldInteger, FormFieldString } from './types';
import { Box, Text, useInput } from 'ink';
import TextInput from 'ink-text-input';

const FLOAT_REGEX = /^-?((\d+)|(\d*\.\d+))$/;

export const FormFieldFloatRenderer: React.FC<SpecificFormFieldRendererProps<FormFieldInteger>> = props => {
  const change = (value: string) => {
    if (FLOAT_REGEX.test(value)) {
      props.onClearError();
      const asFloat = Math.round(parseFloat(value) * 100000) / 100000;
      if (props.field.min !== undefined && props.field.min > asFloat) {
        props.onError(`"${value}" too small, must be above or equal to ${props.field.min}.`);
        props.onChange(value as any);
        return;
      } else if (props.field.max !== undefined && props.field.max < asFloat) {
        props.onError(`"${value}" too big, must be below or equal to ${props.field.max}.`);
        props.onChange(value as any);
        return;
      } else {
        props.onChange(asFloat);
      }
    } else {
      props.onError(`"${value}" is not an integer.`);
      props.onChange(value as any);
    }
  };

  useInput((input, key) => {
    if (typeof props.value === 'number') {
      if (key.upArrow) {
        change('' + ((props.value ?? 0) + (props.field.step ?? 1)));
      } else if (key.downArrow) {
        change('' + ((props.value ?? 0) - (props.field.step ?? 1)));
      }
    } else {
      if (key.upArrow || key.downArrow) {
        change('' + ((props.field.min ?? 0) <= 0 && (props.field.max ?? 0) >= 0 ? 0 : props.field.min ?? props.field.max));
      }
    }
  });

  return (
    <Box borderStyle={'round'} width="100%" flexDirection="column">
      <Box>
        <TextInput
          value={'' + (props.value ?? '')}
          onChange={value => {
            if (FLOAT_REGEX.test(value)) {
              props.onClearError();
              change(value);
            } else {
              props.onError(`"${value}" is not an float.`);
              props.onChange(value as any);
            }
          }}
          placeholder={props.field.placeholder}
          onSubmit={() => props.onSetEditingField(undefined)}
        />
      </Box>
      <Box>
        <Text dimColor>
          Press UP/DOWN to increase or decrease the value.
        </Text>
      </Box>
    </Box>
  )
}