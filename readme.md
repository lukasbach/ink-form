# ink-form

`ink-form` is a Node library for displaying a user-friendly form in a terminal window.
It can be used in two ways, either by using the React Ink component `Form` exported by
the package, or by using the imperative API `openForm(options)`.

![alt text](https://github.com/lukasbach/ink-form/raw/main/demo/overview.gif 'Demo 1')
![alt text](https://github.com/lukasbach/ink-form/raw/main/demo/packagejson.gif 'Demo 2')

## Example usage

    npm install ink-form

```typescript jsx
const options = [
  { label: 'Opt 1', value: 'a' },
  { label: 'Opt 2', value: 'b' },
];

const form: FormProps = {
  form: {
    title: 'Form title',
    sections: [
      {
        title: 'Text and Number fields',
        fields: [
          { type: 'string', name: 'field1', label: 'Input with initial value', initialValue: 'Initial value' },
          { type: 'string', name: 'field2', label: 'Masked input', mask: '*' },
          { type: 'integer', name: 'field3', label: 'Integer between -5 and 8, stepsize 2', min: -5, max: 8, step: 2 },
          { type: 'float', name: 'field4', label: 'Float between 0 and 5, stepsize 0.1', min: 0, max: 5, step: 0.1 },
        ],
      },
      {
        title: 'Select and boolean fields',
        fields: [
          { type: 'select', name: 'field5', label: 'Select', options },
          { type: 'multiselect', name: 'field6', label: 'Multi Select', options },
          { type: 'boolean', name: 'field7', label: 'Boolean select', options },
        ],
      },
    ],
  },
};

// either:
(async () => {
  const result = await openForm(form);
  console.log(`Finished with value`, result);
})();

// or:
render(
  <Form
    {...form}
    onSubmit={result => {
      console.log(`Finished with value`, result);
    }}
  />
);
```

If you want to see how using `ink-form` feels, you can clone this repo, run `yarn` to install
dependencies and then run one of the demo scripts:

- `yarn demo:overview` ([See Code](https://github.com/lukasbach/ink-form/blob/main/src/demo/overview.tsx))
- `yarn demo:packagejson` ([See Code](https://github.com/lukasbach/ink-form/blob/main/src/demo/packagejson.tsx))
- `yarn demo:custommanager` ([See Code](https://github.com/lukasbach/ink-form/blob/main/src/demo/custommanager.tsx))
- `yarn demo:imperative` ([See Code](https://github.com/lukasbach/ink-form/blob/main/src/demo/imperative.ts))

## Documentation

Detailed documentation is available at [lukasbach.github.io/ink-form](https://lukasbach.github.io/ink-form/).
Install the package with `npm install ink-form --save` or `yarn add ink-form` to your project.

Then, render the form by invoking the [imperative interface](https://lukasbach.github.io/ink-form/modules.html#openform)
or by rendering the [React Ink component](https://lukasbach.github.io/ink-form/modules.html#form).
Both take [`FormProps`](https://lukasbach.github.io/ink-form/interfaces/formprops.html) as parameters.

The most important property is the `form`-property, which dictates how the form fields are structured. It follows
the [`FormStructure`](https://lukasbach.github.io/ink-form/interfaces/formstructure.html)-interface. Look into the
example above to see an example.

## Custom fields

A form field describes a type of input, i.e. text input, number input etc.
Included are:

- FormFieldString
- FormFieldInteger
- FormFieldFloat
- FormFieldSelect
- FormFieldMultiSelect
- FormFieldBoolean

You can add your own form field by extending
[`AbstractFormField`](https://lukasbach.github.io/ink-form/modules.html#abstractformfield)
and implementing an associated
[`FormFieldManager<CustomFormField>`](https://lukasbach.github.io/ink-form/interfaces/formfieldmanager.html).

![alt text](https://github.com/lukasbach/ink-form/raw/main/demo/customfield.gif 'Demo 3')
