import { describe, expect, it } from 'vitest'
import dotenv from 'dotenv'
import request from '../src/api'
import prompt from '../src/prompt'

dotenv.config()

const isDev = [process.env.TOKEN, process.env.MODEL].every(Boolean)

describe(`siliconflow chat variable style`, () => {
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
})

function its(target: string, caseName: string) {
  const inputs = [
    {
      name: `input helloworld to get ${target}`,
      value: `helloworld`,
    },
    {
      name: `input helloWorld to get ${target}`,
      value: `helloWorld`,
    },
    {
      name: `input HelloWorld to get ${target}`,
      value: `HelloWorld`,
    },
    {
      name: `input hello-world to get ${target}`,
      value: `hello-world`,
    },
    {
      name: `input HELLO_WORLD to get ${target}`,
      value: `HELLO_WORLD`,
    },
    {
      name: `input Hello_World to get ${target}`,
      value: `Hello_World`,
    },
  ]

  for (const input of inputs) {
    it.skipIf(!isDev)(input.name, async () => {
      const contents = prompt(input.value, caseName)
      const result = await request(contents, { token: process.env.TOKEN!, model: process.env.MODEL! })
      expect(result).toEqual(result)
    })
  }
}
