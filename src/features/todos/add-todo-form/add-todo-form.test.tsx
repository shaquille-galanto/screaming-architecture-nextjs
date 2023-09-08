import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AddTodoForm } from './add-todo-form'

jest.mock('../todo-context', () => ({
  useTodoDispatch: () => ({
    handleAdd: jest.fn(),
  }),
}))

describe('<AddTodoForm>', () => {
  it(`should display an error message when the input is empty and submit button should be disabled`, async () => {
    const user = userEvent.setup()

    const { getByRole, getByText } = render(<AddTodoForm />)

    const { body } = document
    const input = getByRole('textbox')
    const submitButton = getByRole('button')

    await user.click(input)
    await user.click(body)

    const errorMessage = getByText('This field is required')

    expect(submitButton).toBeDisabled()
    expect(errorMessage).toBeInTheDocument()
  })

  it('should reset form after submission', async () => {
    const user = userEvent.setup()

    const { getByRole } = render(<AddTodoForm />)

    const input = getByRole('textbox')
    const submitButton = getByRole('button')

    await user.type(input, 'New Todo')

    expect(input).toHaveValue('New Todo')

    await user.click(submitButton)

    expect(input).toHaveValue('')
  })
})
