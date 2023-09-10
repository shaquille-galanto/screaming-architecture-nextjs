import { render } from '@testing-library/react'
import { Input } from './input'

describe('<Input>', () => {
  it('should render input that contains "md" class by default', () => {
    const { getByRole } = render(<Input />)
    const input = getByRole('textbox')

    expect(input).toHaveClass('md')
  })

  it('should contain class based on the provided "size" props', () => {
    const { getByRole } = render(<Input size="sm" />)
    const input = getByRole('textbox')

    expect(input).toHaveClass('sm')
  })
})
