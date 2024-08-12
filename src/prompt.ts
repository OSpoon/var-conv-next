const styles = {
  camel: {
    name: 'CamelCase',
    description: '首个单词小写，后续单词首字母大写，无分隔符',
    steps: [
      '1. 将原始变量名称进行拆分',
      '2. 将首个单词的首字母改为小写',
      '3. 将第二个及以后的每个单词首字母改为大写',
      '4. 将取消所有的分隔符, 如: 下划线, 短横线, 空格等符号',
    ],
  },
  pascal: {
    name: 'PascalCase',
    description: '每个单词首字母大写，无分隔符',
    steps: [
      '1. 将原始变量名称进行拆分',
      '2. 将每个单词的首字母改为大写',
      '3. 将取消所有的分隔符, 如: 下划线, 短横线, 空格等符号',
    ],
  },
  kebab: {
    name: 'KebabCase',
    description: '所有字母小写，单词之间用短横线 "-" 分隔',
    steps: [
      '1. 将原始变量名称进行拆分',
      '2. 将每个单词的字母转换为小写',
      '4. 使用短横线 "-" 将每个单词连接起来',
    ],
  },
  snake: {
    name: 'SnakeCase',
    description: '所有字母小写，单词之间用下划线 "_" 分隔',
    steps: [
      '1. 将原始变量名称进行拆分',
      '2. 将每个单词的字母转换为小写',
      '3. 使用下划线 _ 将每个单词连接起来',
    ],
  },
  constant: {
    name: 'ConstantCase',
    description: '所有字母大写，单词之间用下划线 "_" 分隔',
    steps: [
      '1. 将原始变量名称进行拆分',
      '2. 将每个单词的字母转换为大写',
      '3. 使用下划线 _ 将每个单词连接起来',
    ],
  },

}

export default function prompt(variable: string, style: string) {
  const result = `
目标：实现变量命名风格的转换
  
我将提供一个变量名称和我想要转换到的命名风格。请将这个变量名称转换为指定的风格。
  
输入格式：
  
  1. 原始变量名称：${variable}
  2. 目标命名风格：${Reflect.get(styles, style).name}
  
命名风格介绍：
  
  ${Reflect.get(styles, style).description}

转换风格步骤:

  ${Reflect.get(styles, style).steps.join('\n  ')}
  
输出格式：转换后的变量名称
  `
  return result
}
