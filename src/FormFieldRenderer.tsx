import React, { useCallback, useState } from 'react';
import { FormField, FormStructure, ValueOfField } from './types';
import { Box, useFocus, Text, useInput, Transform } from 'ink';
import { FormFieldStringRenderer } from './FormFieldStringRenderer';
import { FormFieldIntegerRenderer } from './FormFieldIntegerRenderer';
import { FormFieldFloatRenderer } from './FormFieldFloatRenderer';
import { FormFieldSelectRenderer } from './FormFieldSelectRenderer';
import { FormFieldMultiSelectRenderer } from './FormFieldMultiSelectRenderer';

export type FormFieldRendererProps<T extends FormField> = {
  field: T;
  form: FormStructure;
  value: ValueOfField<T>;
  onChange: (value: ValueOfField<T>) => void;
  onSetEditingField: (field?: string) => void;
  editingField?: string;
};

export type SpecificFormFieldRendererProps<T extends FormField> = FormFieldRendererProps<T> & {
  onError: (error: string) => void;
  onClearError: () => void;
  error?: string;
  onSave: (newValue?: ValueOfField<T>) => void;
  onCancel: () => void;
}

export const FormFieldRenderer: React.FC<FormFieldRendererProps<any>> = props => {
  const [error, setError] = useState<string>();
  const [currentValue, setCurrentValue] = useState<any>(props.value);

  const isEditing = !!props.editingField && (props.editingField === (props.field.label ?? props.field.name));
  const hide = !isEditing && !!props.editingField;

  const save = (newValue?: any) => {
    if (!error) {
      if (newValue) {
        props.onChange(newValue);
        setCurrentValue(newValue);
      } else {
        props.onChange(currentValue);
      }
      props.onSetEditingField(undefined);
    }
  };

  const cancel = () => {
    setCurrentValue(props.value)
    props.onSetEditingField(undefined);
    setError(undefined);
  };

  const { isFocused } = useFocus({  });

  useInput((input, key) => {
    if (!isEditing && key.return && !key.ctrl && !key.meta) {
      props.onSetEditingField(props.field.label ?? props.field.name);
    } else if (isEditing && key.escape) {
      cancel();
    } else if (isEditing && key.return) {
      save();
    }
  }, { isActive: isFocused });

  if (hide) {
    return null;
  }

  if (!isEditing) {
    return (
      <Box marginX={2} paddingX={1} borderStyle="round" borderColor={isFocused ? 'blue' : undefined}>
        <Box flexGrow={1}>
          <Text>{ props.field.label ?? props.field.name }</Text>
          {props.field.required && (<Text color="red">*</Text>)}
          <Text>: </Text>
          <Text dimColor>
            <Transform
              transform={
                (props.value !== undefined && props.field.mask)
                  ? text => text.split('').map(char => '*').join('')
                  : text => text
              }
            >
              {props.value ?? 'No value'}
            </Transform>
          </Text>
        </Box>
        {isFocused && (
          <Box>
            <Text>Press enter to edit</Text>
          </Box>
        )}
      </Box>
    );
  } else {
    let component: JSX.Element;
    const rendererProps: SpecificFormFieldRendererProps<any> = {
      ...props,
      onError: setError,
      onClearError: () => setError(undefined),
      onChange: setCurrentValue,
      value: currentValue,
      onSave: save,
      onCancel: cancel,
      error
    };

    switch (props.field.type) {
      case 'string':
        component = <FormFieldStringRenderer {...rendererProps as any} />;
        break;
      case 'integer':
        component = <FormFieldIntegerRenderer {...rendererProps as any} />;
        break;
      case 'float':
        component = <FormFieldFloatRenderer {...rendererProps as any} />;
        break;
      case 'select':
        component = <FormFieldSelectRenderer {...rendererProps as any} />;
        break;
      case 'multiselect':
        component = <FormFieldMultiSelectRenderer {...rendererProps as any} />;
        break;
      default:
        component = (
          <Text color="red">Unsupported field type: {props.field.type}</Text>
        )
        break;
    }

    return (
      <Box paddingX={3} paddingY={1} flexDirection="column">
        <Box>
          <Text>{ props.field.label ?? props.field.name }</Text>
          {props.field.required && (<Text color="red">*</Text>)}
          <Text>: </Text>
        </Box>
        <Box>
          {component}
        </Box>
        {props.field.description && (
          <Box>
            <Text dimColor>{props.field.description}</Text>
          </Box>
        )}
        {error && (
          <Box>
            <Text color="red">Error: {error}</Text>
          </Box>
        )}
        <Box marginTop={2}>
          <Text dimColor>
            {error ? (
              <>Press ESC to cancel.</>
            ) : (
              <>Press Enter to complete field, or ESC to cancel.</>
            )}
          </Text>
        </Box>
      </Box>
    )
  }

}