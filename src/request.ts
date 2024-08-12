import process from 'node:process'
import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

export interface Response {
  id: string
  choices: Choice[]
  usage: Usage
  created: number
  model: string
  object: string
}

export interface Choice {
  message: Message
  finish_reason: string
}

export interface Message {
  role: string
  content: string
}

export interface Usage {
  prompt_tokens: number
  completion_tokens: number
  total_tokens: number
}

const token = process.env.TOKEN
const model = process.env.MODEL

const options = {
  method: 'POST',
  url: 'https://api.siliconflow.cn/v1/chat/completions',
  headers: {
    'accept': 'application/json',
    'content-type': 'application/json',
    'authorization': `Bearer ${token}`,
  },
  data: {
    model,
    messages: [
      { role: 'user', content: '' },
    ].filter(i => i.content),
    stream: false,
    max_tokens: 50,
    temperature: 0.1,
    top_p: 0.7,
    top_k: 50,
    frequency_penalty: 0.5,
    n: 1,
  },
}

export default function request(content: string): Promise<Response> {
  return new Promise((resolve, reject) => {
    options.data.messages.push({ role: 'user', content })
    axios.request(options).then((response) => {
      resolve(response.data)
    }).catch((error) => {
      reject(error)
    })
  })
}
