export function checkEquality(value, compareValue, options) {
  return value === compareValue ? options.fn(this) : options.inverse(this)
}
