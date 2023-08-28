import clsx from 'clsx'
import { forwardRef } from 'react'
import styles from './styles.module.scss'
import type { ButtonProps } from './types'

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', children, className, ...props }, ref) => (
    <button
      className={clsx(styles.button, styles[variant], styles[size], className)}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  ),
)
