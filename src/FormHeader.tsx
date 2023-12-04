import * as React from 'react';
import { Box, Text, useInput } from 'ink';
import { FormProps } from './types.js';

export const HELP_SECTION_ID = 'Help';

export const FormHeader: React.FC<
  FormProps & { currentTab: number; onChangeTab: (tab: number) => void; editingField?: string }
> = props => {
  const sections = props.form.sections;

  useInput(
    (input, key) => {
      let id: undefined | number = undefined;

      if (key.rightArrow) {
        id = props.currentTab + 1;
      } else if (key.leftArrow) {
        id = props.currentTab - 1;
      } else if (/\d/.test(input)) {
        id = parseInt(input) - 1;
      }

      if (id !== undefined && id >= 0 && id < sections.length) {
        props.onChangeTab(id);
      }
    },
    { isActive: !props.editingField }
  );

  return (
    <Box borderStyle="double" width="100%" flexDirection="column">
      <Box width="100%">
        <Box flexGrow={1}>
          <Text bold={true}>{props.form.title}</Text>
        </Box>
        <Box>
          <Text>
            {!props.editingField ? 'Use arrow keys to move around' : 'Press ESC to cancel, or Enter to complete field'}
          </Text>
        </Box>
      </Box>
      <Box width="100%">
        <Box>
          {!props.editingField ? (
            sections.map((section, id) => (
              <Box key={section.title}>
                <Text color="gray">[{id + 1}] </Text>
                <Text color={props.currentTab === id ? 'blue' : undefined} underline={props.currentTab === id}>
                  {section.title}
                </Text>
                <Text> </Text>
              </Box>
            ))
          ) : (
            <Box>
              <Text>Editing {props.editingField}</Text>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};
