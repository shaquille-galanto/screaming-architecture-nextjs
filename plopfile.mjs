/* eslint-disable import/no-anonymous-default-export */

import { formatCode } from './plop/actions/index.mjs'
import { checkEquality } from './plop/helpers/index.mjs'
import { BASE_PROMPTS, setBaseActions } from './plop/utils/index.mjs'

export default function (
  /** @type {import('plop').NodePlopAPI} */
  { setGenerator, setActionType, setHelper },
) {
  setGenerator('component', {
    description: 'Component boilerplate',
    prompts: [
      ...BASE_PROMPTS,
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
    actions: setBaseActions({ generatorName: 'component' }),
  })

  setGenerator('context-reducer', {
    description: 'Context-Reducer boilerplate',
    prompts: BASE_PROMPTS,
    actions: setBaseActions({ generatorName: 'context-reducer', nameSuffix: '-provider' }),
  })

  setGenerator('context', {
    description: 'Context boilerplate',
    prompts: BASE_PROMPTS,
    actions: setBaseActions({ generatorName: 'context', nameSuffix: '-provider' }),
  })

  setGenerator('custom-hook', {
    description: 'Custom Hook boilerplate',
    prompts: BASE_PROMPTS,
    actions: setBaseActions({ generatorName: 'custom-hook', namePrefix: 'use-' }),
  })

  setGenerator('utils', {
    description: 'Custom Hook boilerplate',
    prompts: BASE_PROMPTS,
    actions: setBaseActions({ generatorName: 'utils' }),
  })

  setActionType('formatCode', formatCode)
  setHelper('isEqual', checkEquality)
}
