import clsx from 'clsx'
import { forwardRef } from 'react'
import styles from './styles.module.scss'
import type { InputProps } from './types'

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ size = 'md', children, className, ...props }, ref) => (
    <input className={clsx(styles.input, styles[size], className)} ref={ref} {...props}>
      {children}
    </input>
  ),
)
