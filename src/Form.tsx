import { Box, Text, useFocusManager, useInput } from 'ink';
import { useEffect, useMemo, useState } from 'react';
import * as React from 'react';
import { FormProps } from './types';
import { FormHeader } from './FormHeader';
import { FormFieldRenderer } from './FormFieldRenderer';
import { DescriptionRenderer } from './DescriptionRenderer';
import { canSubmit } from './canSubmit';
import { SubmitButton } from './SubmitButton';
import { useItemScroll } from './use-item-scroll';
import { FullScreen } from './Fullscreen';

export const Form: React.FC<FormProps> = props => {
  const isControlled = props.value !== undefined;
  const [currentTab, setCurrentTab] = useState(0);
  const [value, setValue] = useState<object>(props.value ?? {});
  const [editingField, setEditingField] = useState<string>();
  const canSubmitForm = useMemo(() => canSubmit(props.form, value), [value, props.form]);
  const focusManager = useFocusManager();
  const { containerRef, registerItem, onRerender, onChangeFocus, viewPort } =
    useItemScroll(props.form.sections[currentTab].fields.length);

  onRerender();

  useEffect(() => {
    focusManager.enableFocus();
  }, []);

  useEffect(() => {
    if (props.value) {
      setValue(props.value);
    }
  }, [props.value]);

  useEffect(() => {
    // Set initial values
    if (!isControlled) {
      setValueAndPropagate({
        ...value,
        ...props.form.sections
          .map(section =>
            section.fields
              .map(field => (field.initialValue !== undefined ? { [field.name]: field.initialValue } : {}))
              .reduce((obj1, obj2) => ({ ...obj1, ...obj2 }), {})
          )
          .reduce((obj1, obj2) => ({ ...obj1, ...obj2 }), {}),
      });
    }
  }, []);

  const setValueAndPropagate = (value: object) => {
    setValue(value);
    props.onChange?.(value);
  };

  useInput(
    (input, key) => {
      if (key.upArrow) {
        focusManager.focusPrevious();
      } else if (key.downArrow) {
        focusManager.focusNext();
      }
    },
    { isActive: !editingField }
  );

  return (
    <>
      <Box width="100%" height="100%" flexDirection="column">
        <FormHeader {...props} currentTab={currentTab} onChangeTab={setCurrentTab} editingField={editingField} />
        {!editingField && props.form.sections[currentTab].description && (
          <Box marginX={4}>
            <DescriptionRenderer description={props.form.sections[currentTab].description} />
          </Box>
        )}
        <Box flexDirection="column" ref={containerRef} flexGrow={1}>
          {currentTab > props.form.sections.length - 1
            ? null
            : props.form.sections[currentTab].fields.map((field, index) => {
              if (index < viewPort[0] || index > viewPort[1]) {
                return null;
              }

              return (
                <FormFieldRenderer
                  ref={registerItem}
                  field={field}
                  key={field.name}
                  form={props.form}
                  value={value[field.name]}
                  onChange={v => setValueAndPropagate({ ...value, [field.name]: v })}
                  onFocus={() => onChangeFocus(index)}
                  onSetEditingField={setEditingField}
                  editingField={editingField}
                  customManagers={props.customManagers}
                />
              );
            })}
        </Box>
        {!editingField && (
          <Box flexDirection="row-reverse">
            <SubmitButton canSubmit={canSubmitForm} onSubmit={() => props.onSubmit?.(value)} />
          </Box>
        )}
        <Box>
          <Text>{JSON.stringify({viewPort})}</Text>
        </Box>
      </Box>
    </>
  );
};
