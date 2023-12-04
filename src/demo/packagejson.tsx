import { render } from 'ink';
import { Form } from '../Form.js';
import React from 'react';

const licenses = [
  'MIT', 'CC-BY-SA-4.0', 'CC-BY-ND-4.0', 'CC-BY-NC-SA-4.0', 'CC-BY-NC-ND-4.0', 'CC-BY-NC-4.0', 'CC-BY-4.0', 'BSD-4-Clause-UC', 'Apache-2.0', 'W3C-20150513',
].map(value => ({ value }));

render(
  <Form
    onSubmit={value => console.log(`Submitted: `, value)}
    form={{
      title: "Edit your package.json file",
      sections: [
        {
          title: "Basics",
          description: 'General attributes of your package.json file.',
          fields: [
            {
              type: 'boolean',
              name: 'private',
              label: 'Is private?',
              required: true,
              initialValue: false,
              description: 'If you set "private": true in your package.json, then npm will refuse to publish it.\n\nThis is a way to prevent accidental publication of private repositories. If you would like to ensure that a given package is only ever published to a specific registry (for example, an internal registry), then use the publishConfig dictionary described below to override the registry config param at publish-time.'
            },
            {
              type: 'string',
              name: 'name',
              label: 'Package name',
              initialValue: '@scope/name',
              required: true,
              description: 'If you plan to publish your package, the most important things in your package.json are the name and version fields as they will be required. The name and version together form an identifier that is assumed to be completely unique. Changes to the package should come along with changes to the version. If you don\'t plan to publish your package, the name and version fields are optional.'
            },
            {
              type: 'string',
              name: 'version',
              label: 'Version',
              initialValue: '1.0.0',
              required: true,
              regex: /^([0-9]+)\.([0-9]+)\.([0-9]+)(?:-([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?(?:\+[0-9A-Za-z-]+)?$/,
              description: 'If you plan to publish your package, the most important things in your package.json are the name and version fields as they will be required. The name and version together form an identifier that is assumed to be completely unique. Changes to the package should come along with changes to the version. If you don\'t plan to publish your package, the name and version fields are optional.'
            },
            {
              type: 'string',
              name: 'description',
              label: 'Description',
              description: 'Put a description in it. It\'s a string. This helps people discover your package, as it\'s listed in npm search.'
            },
            {
              type: 'string',
              name: 'author',
              label: 'Author'
            },
            {
              type: 'select',
              name: 'license',
              label: 'License',
              description: 'You should specify a license for your package so that people know how they are permitted to use it, and any restrictions you\'re placing on it.\n\nIf you\'re using a common license such as BSD-2-Clause or MIT, add a current SPDX license identifier for the license you\'re using, like this:',
              options: licenses
            },
            {
              type: 'string',
              name: 'keywords',
              label: 'Keywords',
              description: 'Put keywords in it, seperated by spaces. This helps people discover your package as it\'s listed in npm search.'
            },
          ]
        },
        {
          title: "Links",
          description: 'URLs to external locations that are relevant for your poject.',
          fields: [
            {
              type: 'string',
              name: 'repository',
              label: 'Repository',
              description: 'Specify the place where your code lives. This is helpful for people who want to contribute. If the git repo is on GitHub, then the npm docs command will be able to find you.'
            },
            {
              type: 'string',
              name: 'homepage',
              label: 'Homepage',
              regex: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
              description: 'The url to the project homepage.'
            },
            {
              type: 'string',
              name: 'bugs',
              label: 'Bugtracker',
              regex: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
              description: 'The url to your project\'s issue tracker and / or the email address to which issues should be reported. These are helpful for people who encounter issues with your package.'
            },
            {
              type: 'string',
              name: 'funding',
              label: 'Funding',
              regex: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
              description: 'You can specify an object containing an URL that provides up-to-date information about ways to help fund development of your package.'
            },
          ]
        },
        {
          title: "Files",
          description: 'Files within your project structure that should be associated with your node project.',
          fields: [
            {
              type: 'string',
              name: 'files',
              label: 'Files',
              description: 'The optional files field is an array of file patterns that describes the entries to be included when your package is installed as a dependency. File patterns follow a similar syntax to .gitignore, but reversed: including a file, directory, or glob pattern (*, **/*, and such) will make it so that file is included in the tarball when it\'s packed. Omitting the field will make it default to ["*"], which means it will include all files.'
            },
            {
              type: 'string',
              name: 'bin',
              label: 'bin',
              description: 'A lot of packages have one or more executable files that they\'d like to install into the PATH. npm makes this pretty easy (in fact, it uses this feature to install the "npm" executable.)\n\nTo use this, supply a bin field in your package.json which is a map of command name to local file name. On install, npm will symlink that file into prefix/bin for global installs, or ./node_modules/.bin/ for local installs.'
            },
            {
              type: 'string',
              name: 'man',
              label: 'man',
              description: 'Specify either a single file or an array of filenames to put in place for the man program to find.'
            },
            {
              type: 'string',
              name: 'main',
              label: 'main',
              description: 'The main field is a module ID that is the primary entry point to your program. That is, if your package is named foo, and a user installs it, and then does require("foo"), then your main module\'s exports object will be returned.\n\nThis should be a module relative to the root of your package folder.\n\nFor most modules, it makes the most sense to have a main script and often not much else.'
            },
          ]
        },
        {
          title: 'Scripts',
          description: 'Command implementation for common npm lifecycle scripts.',
          fields: ['npm cache add', 'npm ci', 'npm diff', 'npm install', 'npm pack', 'npm publish', 'npm rebuild', 'npm restart', 'npm start', 'npm stop', 'npm test'].map(scriptName => ({
            type: 'string',
            name: `script-${scriptName}`,
            label: scriptName,
            description: `Command implementation for the ${scriptName} lifecycle script.`
          }))
        }
      ]
    }}
  />
);
