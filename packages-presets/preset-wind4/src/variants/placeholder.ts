import type { VariantFunction } from '@unocss/core'
import type { Theme } from '../theme'
import { h, hasParseableColor } from '../utils'

export const placeholderModifier: VariantFunction<Theme> = (input: string, { theme }) => {
  const m = input.match(/^(.*)\b(placeholder-)(.+)$/)
  if (m) {
    const [, pre = '', p, body] = m
    if (hasParseableColor(body, theme) || hasOpacityValue(body)) {
      return {
        // Append `placeholder-$ ` (with space!) to the rule to be matched.
        // The `placeholder-` is added for placeholder variant processing, and
        // the `$ ` is added for rule matching after `placeholder-` is removed by the variant.
        // See rules/placeholder.
        matcher: `${pre}placeholder-$ ${p}${body}`,
      }
    }
  }
}

function hasOpacityValue(body: string) {
  const match = body.match(/^op(?:acity)?-?(.+)$/)
  if (match && match[1] != null)
    return h.bracket.percent(match[1]) != null
  return false
}
