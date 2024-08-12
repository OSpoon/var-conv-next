/**
 * https://github.com/btxtiger/change-case-all
 */
import { describe, expect, it } from 'vitest'
import { Case } from 'change-case-all'

describe(`should be CamelCase`, () => {
  const target = `helloWorld`
  its(target, 'camel')
})

describe(`should be PascalCase`, () => {
  const target = `HelloWorld`
  its(target, 'pascal')
})

describe(`should be KebabCase`, () => {
  const target = `hello-world`
  its(target, 'kebab')
})

describe(`should be SnakeCase`, () => {
  const target = `hello_world`
  its(target, 'snake')
})

describe(`should be ConstantCase`, () => {
  const target = `HELLO_WORLD`
  its(target, 'constant')
})

function its(target: string, caseName: string) {
  const inputs = [{
    name: `input helloWorld to get ${target}`,
    value: `helloWorld`,
  }, {
    name: `input HelloWorld to get ${target}`,
    value: `HelloWorld`,
  }, {
    name: `input hello-world to get ${target}`,
    value: `hello-world`,
  }, {
    name: `input HELLO_WORLD to get ${target}`,
    value: `HELLO_WORLD`,
  }, {
    name: `input Hello_World to get ${target}`,
    value: `Hello_World`,
  }]

  for (const input of inputs) {
    it(input.name, () => {
      const result = Reflect.get(Case, caseName)(input.value)
      expect(result).toEqual(target)
    })
  }
}
