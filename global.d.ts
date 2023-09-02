type OmitNonHTMLAttributes<T, K = undefined> = K extends undefined
  ? Omit<T, 'ref' | 'key'>
  : Omit<Omit<T, 'ref' | 'key'>, K>
