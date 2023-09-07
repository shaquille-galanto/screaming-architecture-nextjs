import { render } from '@testing-library/react'
import { Button } from './button'

describe('Button Component', () => {
  it('should render button that contains "primary" and "md" class by default', () => {
    const { getByRole } = render(<Button />)

    const button = getByRole('button')

    expect(button).toHaveClass('primary')
    expect(button).toHaveClass('md')
  })

  it('should contain class based on the provided "variant" and "size" props', () => {
    const { getByRole } = render(<Button variant="secondary" size="sm" />)

    const button = getByRole('button')

    expect(button).toHaveClass('secondary')
    expect(button).toHaveClass('sm')
  })
})
