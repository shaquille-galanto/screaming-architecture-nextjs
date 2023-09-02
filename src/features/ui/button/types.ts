export type ButtonProps = OmitNonHTMLAttributes<JSX.IntrinsicElements['button']> & {
  variant?: 'primary' | 'secondary'
  size?: 'md' | 'sm'
}
