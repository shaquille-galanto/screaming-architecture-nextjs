import { execSync } from 'child_process'

export const formatCode = (answers, config) => {
  const newName = `${config.namePrefix ? config.namePrefix : ''}${answers.name}${
    config.nameSuffix ? config.nameSuffix : ''
  }`
  const path = `${config.basePath}/${answers.path}/${newName}`

  try {
    execSync(`pnpm prettier --write ${path}`)
    execSync(`pnpm eslint --fix ${path}`)
  } catch (error) {
    console.error(`Error running Prettier and ESLint:`, error.message)
  }
}
