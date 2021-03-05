import React from 'react';
import { Text, Box, useFocus, useInput } from 'ink';

export const SubmitButton: React.FC<{
  canSubmit: boolean;
  onSubmit: () => void;
}> = props => {
  const { isFocused } = useFocus({ isActive: props.canSubmit });
  useInput((input, key) => {
    if (key.return && isFocused && props.canSubmit) {
      props.onSubmit();
    }
  });

  return (
    <Box marginRight={2}>
      <Box marginRight={2} paddingY={1}>
        <Text>
          {!props.canSubmit
            ? 'There are still required inputs you have not competed yet.'
            : isFocused
            ? 'Press Enter to submit form'
            : 'Use the arrow keys to navigate to the submit button.'}
        </Text>
      </Box>
      <Box borderStyle={'round'} borderColor={!props.canSubmit ? 'gray' : isFocused ? 'blue' : 'white'} paddingX={2}>
        <Text color={!props.canSubmit ? 'gray' : isFocused ? 'blue' : 'white'} bold={true} underline={isFocused}>
          {props.canSubmit ? 'Submit form' : 'Cannot submit form yet'}
        </Text>
      </Box>
    </Box>
  );
};
