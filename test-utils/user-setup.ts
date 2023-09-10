import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ReactElement } from 'react'

export const userSetup = (jsx: ReactElement, options?: Parameters<typeof render>[1]) => ({
  user: userEvent.setup(),
  ...render(jsx, options),
})
