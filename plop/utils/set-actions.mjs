/**
 * @param {{generatorName: string, nameSuffix?: string, namePrefix?:string}}
 */
export const setBaseActions = ({ generatorName, namePrefix, nameSuffix }) => [
  {
    type: 'addMany',
    destination: `src/features/{{path}}/${namePrefix ?? ''}{{name}}${nameSuffix ?? ''}`,
    base: `plop/templates/${generatorName}`,
    templateFiles: `plop/templates/${generatorName}/*.hbs`,
    stripExtensions: ['hbs'],
  },
  {
    type: 'formatCode',
    basePath: 'src/features',
    namePrefix,
    nameSuffix,
  },
]
