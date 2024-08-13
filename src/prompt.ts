function styles(variable: string) {
  return {
    camel: {
      name: 'camel',
      prompts: [
`Target：Implement variable naming style conversion.\n`,
`Input variable：${variable}\n`,
`Change style：camel case\n`,
`Style introduce：The first word is lowercase, and the first letter of the next word is uppercase, without delimiters.\n`,
`Tip 1: Output only converted variable names.\n`,
`Tip 2: Output directly if it matches the style.\n`,
      ],
    },
    pascal: {
      name: 'pascal',
      prompts: [
`Target：Implement variable naming style conversion.\n`,
`Input variable：${variable}\n`,
`Change style：pascal case\n`,
`Style introduce：The first letter of each word is capitalized without delimiters.\n`,
`Tip 1: Output only converted variable names.\n`,
`Tip 2: Output directly if it matches the style.\n`,
      ],
    },
    kebab: {
      name: 'kebab',
      prompts: [
`Target：Implement variable naming style conversion.\n`,
`Input variable：${variable}\n`,
`Change style：kebab case\n`,
`Style introduce：All letters are lowercase, separated by a dash of "-".\n`,
`Tip 1: Output only converted variable names.\n`,
`Tip 2: Output directly if it matches the style.\n`,
      ],
    },
    snake: {
      name: 'snake',
      prompts: [
`Target：Implement variable naming style conversion.\n`,
`Input variable：${variable}\n`,
`Change style：snake case\n`,
`Style introduce：All letters are lowercase and words are separated by the underscore "_".\n`,
`Tip 1: Output only converted variable names.\n`,
`Tip 2: Output directly if it matches the style.\n`,
      ],
    },
    constant: {
      name: 'constant',
      prompts: [
`Target：Implement variable naming style conversion.\n`,
`Input variable：${variable}\n`,
`Change style：constant case\n`,
`Style introduce：All letters are capitalized and words are separated by the underscore "_".\n`,
`Tip 1: Output only converted variable names.\n`,
`Tip 2: Output directly if it matches the style.\n`,
      ],
    },
  }
}

export default function prompt(variable: string, style: string) {
  const result = Reflect.get(styles(variable), style).prompts
  return result
}
