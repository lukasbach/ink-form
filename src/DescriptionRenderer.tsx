import React from 'react';
import { Description } from './types.js';
import { Box, Text } from 'ink';

export const DescriptionRenderer: React.FC<{ description: Description }> = props => {
  if (!props.description) {
    return null;
  } else if ((props.description as JSX.Element).type) {
    return props.description as JSX.Element;
  } else if (Array.isArray(props.description)) {
    return (
      <Box flexDirection="column">
        {props.description.map(line => (
          <Box key={line} width="100%" marginBottom={1}>
            <Text>{line}</Text>
          </Box>
        ))}
      </Box>
    );
  } else {
    return <Text>{props.description}</Text>;
  }
};
