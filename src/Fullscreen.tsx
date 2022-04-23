import { useEffect } from 'react';

const enterAltScreenCommand = '\x1b[?1049h';
const leaveAltScreenCommand = '\x1b[?1049l';

export const exitFullScreen = () => {
  process.stdout.write(leaveAltScreenCommand);
};

export const FullScreen = ({ children }) => {
  useEffect(() => {
    // trigger alternate screen
    process.stdout.write(enterAltScreenCommand);
    // destroy alternate screen on unmount
    return exitFullScreen;
  }, []);
  return children;
};
