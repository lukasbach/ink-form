import React, { useState } from 'react';
import { FormField, FormFieldRendererProps, SpecificFormFieldRendererProps } from './types.js';
import { Box, useFocus, Text, useInput } from 'ink';
import { getManager } from './managers/managers.js';
import { DescriptionRenderer } from './DescriptionRenderer.js';

export const FormFieldRenderer: React.FC<FormFieldRendererProps<any>> = props => {
  const manager = getManager(props.field.type, props.customManagers);
  const [error, setError] = useState<string>();
  const [currentValue, setCurrentValue] = useState<any>(props.value ?? props.field.initialValue);

  const isEditing = !!props.editingField && props.editingField === (props.field.label ?? props.field.name);
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
    setCurrentValue(props.value);
    props.onSetEditingField(undefined);
    setError(undefined);
  };

  const { isFocused } = useFocus({});

  useInput(
    (input, key) => {
      if (!isEditing && key.return && !key.ctrl && !key.meta) {
        props.onSetEditingField(props.field.label ?? props.field.name);
      } else if (isEditing && key.escape) {
        cancel();
      } else if (isEditing && key.return && (!manager?.needCtrlToReturnSave || key.ctrl)) {
        save();
      }
    },
    { isActive: isFocused }
  );

  if (hide) {
    return null;
  }

  if (!isEditing) {
    const RenderValue = manager?.renderValue ?? (() => <>{props.value}</>);
    return (
      <Box marginX={2} paddingX={1} borderStyle="round" borderColor={isFocused ? 'blue' : undefined}>
        <Box flexGrow={1}>
          <Text underline={isFocused} color={isFocused ? 'blue' : undefined}>
            {props.field.label ?? props.field.name}
          </Text>
          {props.field.required && <Text color="red">*</Text>}
          <Text>: </Text>
          <Text dimColor>
            <RenderValue value={props.value as any} field={props.field} />
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
    const rendererProps: SpecificFormFieldRendererProps<FormField> = {
      ...props,
      onError: setError,
      onClearError: () => setError(undefined),
      onChange: setCurrentValue,
      value: currentValue,
      onSave: save,
      onCancel: cancel,
      error,
    };

    if (!manager) {
      component = <Text color="red">No formfield manager for form field of type {props.field.type} available.</Text>;
    } else {
      const Field = manager.renderField;
      component = <Field {...rendererProps} />;
    }

    return (
      <Box paddingX={3} paddingY={1} flexDirection="column">
        <Box>
          <Text>{props.field.label ?? props.field.name}</Text>
          {props.field.required && <Text color="red">*</Text>}
          <Text>: </Text>
        </Box>
        <Box>{component}</Box>
        {props.field.description && (
          <Box>
            <Text dimColor>
              <DescriptionRenderer description={props.field.description} />
            </Text>
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
              <>Press {manager?.needCtrlToReturnSave ? 'CTRL+Enter' : 'Enter'} to complete field, or ESC to cancel.</>
            )}
          </Text>
        </Box>
      </Box>
    );
  }
};
