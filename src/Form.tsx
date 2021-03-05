import { Box, Newline, Text, useFocusManager, useInput } from 'ink';
import { useEffect, useState } from 'react';
import * as React from 'react';
import { FormProps } from './types';
import { FormHeader } from './FormHeader';
import { FormFieldRenderer } from './FormFieldRenderer';

export const Form: React.FC<FormProps> = props => {
  const isControlled = props.value !== undefined;
  const [currentTab, setCurrentTab] = useState(0)
  const [value, setValue] = useState<object>(props.value ?? {});
  const [editingField, setEditingField] = useState<string>();
  const focusManager = useFocusManager();

  useEffect(() => {
    focusManager.enableFocus();
  }, []);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  useEffect(() => {
    // Set initial values
    if (!isControlled) {
      setValueAndPropagate({
        ...value,
        ...props.form.sections.map(section => section.fields.map(field => field.initialValue !== undefined ? {[field.name]: field.initialValue} : {})
          .reduce((obj1, obj2) => ({ ...obj1, ...obj2 }), {})).reduce((obj1, obj2) => ({ ...obj1, ...obj2 }), {})
      })
    }
  }, []);

  const setValueAndPropagate = (value: object) => {
    setValue(value);
    props.onChange?.(value);
  }

  useInput((input, key) => {
    if (key.upArrow) {
      focusManager.focusPrevious();
    } else if (key.downArrow) {
      focusManager.focusNext();
    }
  }, { isActive: !editingField });

  return (
    <Box width="100%" height="100%" flexDirection="column">
      <FormHeader {...props} currentTab={currentTab} onChangeTab={setCurrentTab} editingField={editingField} />
      <Box flexDirection="column">
        {currentTab >= props.form.sections.length ? null : (
          props.form.sections[currentTab].fields.map(field => (
            <FormFieldRenderer
              field={field}
              key={field.name}
              form={props.form}
              value={value[field.name]}
              onChange={v => setValueAndPropagate(({ ...value, [field.name]: v }))}
              onSetEditingField={setEditingField}
              editingField={editingField}
            />
          ))
        )}
      </Box>
    </Box>
  )
}