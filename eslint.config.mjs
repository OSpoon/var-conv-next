// @ts-check
import antfu from '@antfu/eslint-config'

export default antfu(
  {
    ignores: [
      // eslint ignore globs here
      'playground.ts',
    ],
  },
  {
    rules: {
      // overrides
    },
  },
)
