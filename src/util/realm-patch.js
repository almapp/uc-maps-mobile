'use strict'

export function toArray(results) {
  const length = results.length
  const output = []
  for (let i = 0; i < length; i++) {
    output.push(results[i])
  }
  return output
}
