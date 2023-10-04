import { render } from '@testing-library/react'
import { TodoProvider } from '../../todo-provider'
import { TodoSection } from './todo-section'

describe('<TodoSection>', () => {
  it('should render without any error', () => {
    expect(() => {
      render(<TodoSection />, { wrapper: TodoProvider })
    }).not.toThrow()
  })
})
