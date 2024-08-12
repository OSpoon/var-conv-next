import { describe, expect, it } from 'vitest'
import dotenv from 'dotenv'
import request from '../src/api'

dotenv.config()

function prompt(variable: string, style: string) {
  return `
目标：实现变量命名风格的转换

我将提供一个变量名称和我想要转换到的命名风格。请将这个变量名称转换为指定的风格。

输入格式：

1. 原始变量名称：${variable}
2. 目标命名风格：${style}

命名风格选项：

1. CamelCase 风格：首个单词小写，后续单词首字母大写，无分隔符，重点是首个单词首字母大写, 无分隔符。
2. PascalCase 风格：每个单词首字母大写，无分隔符，重点是单词首字母大写, 无分隔符。
3. SnakeCase 风格：所有字母小写，单词之间用下划线 "_" 分隔，重点是所有字母小写, 下划线分割。
4. ConstantCase 风格：所有字母大写，单词之间用下划线 "_" 分隔，重点是所有字母大写, 下划线分割。
5. KebabCase 风格：所有字母小写，单词之间用短横线 "-" 分隔，重点是所有字母小写, 短横线分割。

输出格式：转换后的变量名称

重点备注：不需要输出额外的信息, 仅输出转换后的变量名称即可.
`
}

const isDev = [process.env.TOKEN, process.env.MODEL].every(Boolean)

describe(`siliconflow chat variable style`, () => {
  it.skipIf(!isDev)(`should be CamelCase`, async () => {
    const target = `helloWorld`
    const variable = `hello world`
    const style = `CamelCase`
    const result = await request(prompt(variable, style), { token: process.env.TOKEN!, model: process.env.MODEL! })
    expect(result?.choices[0].message.content).toEqual(target)
  })

  it.skipIf(!isDev)(`should be PascalCase`, async () => {
    const target = `HelloWorld`
    const variable = `hello world`
    const style = `PascalCase`
    const result = await request(prompt(variable, style), { token: process.env.TOKEN!, model: process.env.MODEL! })
    expect(result?.choices[0].message.content).toEqual(target)
  })

  it.skipIf(!isDev)(`should be KebabCase`, async () => {
    const target = `hello-world`
    const variable = `hello world`
    const style = `KebabCase`
    const result = await request(prompt(variable, style), { token: process.env.TOKEN!, model: process.env.MODEL! })
    expect(result?.choices[0].message.content).toEqual(target)
  })

  it.skipIf(!isDev)(`should be SnakeCase`, async () => {
    const target = `hello_world`
    const variable = `hello world`
    const style = `SnakeCase`
    const result = await request(prompt(variable, style), { token: process.env.TOKEN!, model: process.env.MODEL! })
    expect(result?.choices[0].message.content).toEqual(target)
  })

  it.skipIf(!isDev)(`should be ConstantCase`, async () => {
    const target = `HELLO_WORLD`
    const variable = `hello world`
    const style = `ConstantCase`
    const result = await request(prompt(variable, style), { token: process.env.TOKEN!, model: process.env.MODEL! })
    expect(result?.choices[0].message.content).toEqual(target)
  })
})
