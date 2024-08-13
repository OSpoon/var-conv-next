import axios from 'axios'

const URL = 'https://api.siliconflow.cn/v1/chat/completions'
const data = {
  model: '',
  messages: [

  ],
  stream: false,
  max_tokens: 512,
  temperature: 0.7,
  top_p: 0.7,
  top_k: 50,
  frequency_penalty: 0,
  n: 1,
}

export default function request(contents: string[], opts: { token: string, model: string }): Promise<string> {
  return new Promise((resolve, reject) => {
    const { token, model } = opts
    axios.post(URL, {
      ...data,
      model,
      messages: contents.map((content) => {
        return { role: 'system', content }
      }),
    }, {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`,
      },
    }).then((response) => {
      try {
        const content = response.data.choices[0].message.content
        resolve(content.trim())
      }
      catch (error) {
        reject(error)
      }
    }).catch((error) => {
      reject(error)
    })
  })
}
