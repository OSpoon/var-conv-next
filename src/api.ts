import axios from 'axios'
import type { Response } from './types'

const options = {
  method: 'POST',
  url: 'https://api.siliconflow.cn/v1/chat/completions',
  headers: {
    'accept': 'application/json',
    'content-type': 'application/json',
    'authorization': ``,
  },
  data: {
    model: ``,
    messages: [
      { role: 'user', content: '输出格式：转换后的变量名称' },
      { role: 'user', content: '重点要求：不要输出额外的信息, 仅输出转换后的变量名称即可.' },
    ].filter(i => i.content),
    stream: false,
    max_tokens: 20,
    temperature: 0,
    top_p: 0.7,
    top_k: 50,
    frequency_penalty: 0,
    n: 1,
  },
}

export default function request(content: string, opts: { token: string, model: string }): Promise<Response> {
  return new Promise((resolve, reject) => {
    const { token, model } = opts
    options.headers.authorization = `Bearer ${token}`
    options.data.model = model
    options.data.messages.push({ role: 'user', content })
    axios.request(options).then((response) => {
      resolve(response.data)
    }).catch((error) => {
      reject(error)
    })
  })
}
