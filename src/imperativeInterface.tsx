import { FormProps } from './types';
import { render } from 'ink';
import { Form } from './Form';
import React from 'react';

export const openForm = async (options: Omit<FormProps, 'value'>): Promise<{ [key: string]: any }> => {
  return new Promise((res) => {
    const { clear, unmount } = render(
      <Form
        {...options}
        onSubmit={value => {
          clear();
          unmount();
          res(value);
        }}
      />
    );
  });
};
