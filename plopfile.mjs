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
        type: 'input',
        name: 'element',
        message: 'Element tag:',
        default: 'div',
      },
      {
        type: 'list',
        name: 'isReusable',
        message: 'Is it reusable?:',
        choices: ['yes', 'no'],
        default: 'no',
      },
    ],
    actions: [
      {
        type: 'addMany',
        destination: 'src/features/{{path}}/{{name}}',
        base: 'plop/templates/component',
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
        destination: 'src/features/{{path}}/{{name}}-provider',
        base: 'plop/templates/context-reducer',
        templateFiles: 'plop/templates/context-reducer/*.hbs',
        stripExtensions: ['hbs'],
      },
      {
        type: 'formatCode',
        basePath: 'src/features',
        nameSuffix: '-provider',
      },
    ],
  })

  setGenerator('context', {
    description: 'Context boilerplate',
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
        destination: 'src/features/{{path}}/{{name}}-provider',
        base: 'plop/templates/context',
        templateFiles: 'plop/templates/context/*.hbs',
        stripExtensions: ['hbs'],
      },
      {
        type: 'formatCode',
        basePath: 'src/features',
        nameSuffix: '-provider',
      },
    ],
  })

  setActionType('formatCode', formatCode)
  setHelper('isEqual', checkEquality)
}
