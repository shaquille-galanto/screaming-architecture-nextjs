import { execSync } from 'child_process'

export const formatCode = (answers, config) => {
  const path = `${config.basePath}/${answers.path}/${answers.name}`
  try {
    execSync(`pnpm prettier --write ${path}`)
    execSync(`pnpm eslint --fix ${path}`)
  } catch (error) {
    console.error(`Error running Prettier and ESLint:`, error.message)
  }
}
