import { openForm } from '../imperativeInterface.js';
import { FormProps } from '../types.js';

const form: FormProps = {
  form: {
    title: "Form title",
    sections: [
      {
        title: "Text fields",
        fields: [
          {type: 'string', name: 'field1', label: 'Input with initial value', initialValue: 'Initial value'},
          {type: 'string', name: 'field2', label: 'Masked input', mask: '*'},
          {
            type: 'string',
            name: 'field3',
            label: 'Input with placeholder, description and required flag',
            placeholder: 'Placeholder',
            required: true,
            description: 'Hello I am a description'
          },
          {type: 'string', name: 'field4-nolabel'},
          {
            type: 'string',
            name: 'field5',
            label: 'Regex, must be an url',
            regex: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/
          },
        ]
      },
    ]
  }
};

(async () => {
  const result = await openForm(form);
  console.log(`Finished with value`, result);
})();

