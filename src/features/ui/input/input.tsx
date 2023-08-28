import clsx from 'clsx'
import { forwardRef } from 'react'
import styles from './styles.module.scss'
import type { InputProps } from './types'

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ children, className, ...props }, ref) => (
    <input className={clsx(styles.input, className)} ref={ref} {...props}>
      {children}
    </input>
  ),
)
