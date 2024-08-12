/**
 * https://github.com/blakeembrey/change-case
 *
 * Convert strings between camelCase, PascalCase, Capital Case, snake_case and more
 */
import { describe, expect, it } from 'vitest'
import * as changeCase from 'change-case'

describe(`should be CamelCase`, () => {
  const target = `helloWorld`
  its(target, 'camelCase')
})

describe(`should be PascalCase`, () => {
  const target = `HelloWorld`
  its(target, 'pascalCase')
})

describe(`should be KebabCase`, () => {
  const target = `hello-world`
  its(target, 'kebabCase')
})

describe(`should be SnakeCase`, () => {
  const target = `hello_world`
  its(target, 'snakeCase')
})

describe(`should be ConstantCase`, () => {
  const target = `HELLO_WORLD`
  its(target, 'constantCase')
})

function its(target: string, caseName: string) {
  const inputs = [{
    name: `input helloWorld to get ${target}`,
    value: `helloWorld`,
  }, {
    name: `input HelloWorld to get ${target}`,
    value: `HelloWorld`,
  }, {
    name: `input hello_world to get ${target}`,
    value: `hello_world`,
  }, {
    name: `input Hello_World to get ${target}`,
    value: `Hello_World`,
  }, {
    name: `input HELLO_WORLD to get ${target}`,
    value: `HELLO_WORLD`,
  }, {
    name: `input hello-world to get ${target}`,
    value: `hello-world`,
  }, {
    name: `input Hello-World to get ${target}`,
    value: `Hello-World`,
  }]

  for (const input of inputs) {
    it(input.name, () => {
      const result = Reflect.get(changeCase, caseName)(input.value)
      expect(result).toEqual(target)
    })
  }
}
