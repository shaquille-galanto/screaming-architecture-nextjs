/* eslint-disable import/no-anonymous-default-export */

import { formatCode } from './plop/actions/index.mjs'
import { checkEquality } from './plop/helpers/index.mjs'

export default function (
  /** @type {import('plop').NodePlopAPI} */
  { setGenerator, setActionType, setHelper },
) {
  setGenerator('component', {
    description: 'Component boilerplate',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Name:',
      },
      {
        type: 'input',
        name: 'path',
        message: 'File path:',
      },
      {
        type: 'list',
        name: 'isReusable',
        message: 'Is it reusable?:',
        choices: ['yes', 'no'],
      },
    ],
    actions: [
      {
        type: 'addMany',
        base: 'plop/templates/component',
        destination: 'src/features/{{path}}/{{name}}',
        templateFiles: 'plop/templates/component/*.hbs',
        stripExtensions: ['hbs'],
      },
      {
        type: 'formatCode',
        basePath: 'src/features',
      },
    ],
  })

  setGenerator('context-reducer', {
    description: 'Context-Reducer boilerplate',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Name:',
      },
      {
        type: 'input',
        name: 'path',
        message: 'File path:',
      },
    ],
    actions: [
      {
        type: 'addMany',
        base: 'plop/templates/context-reducer',
        destination: 'src/features/{{path}}/{{name}}',
        templateFiles: 'plop/templates/context-reducer/*.hbs',
        stripExtensions: ['hbs'],
      },
      {
        type: 'formatCode',
        basePath: 'src/features',
      },
    ],
  })

  setActionType('formatCode', formatCode)
  setHelper('isEqual', checkEquality)
}
