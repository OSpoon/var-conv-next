import axios from 'axios'

const URL = 'https://api.siliconflow.cn/v1/chat/completions'
const data = {
  model: '',
  messages: [],
  stream: false,
  max_tokens: 512,
  temperature: 0,
  top_p: 0.1,
  top_k: 0,
  frequency_penalty: 0,
  n: 1,
}

export default function request(content: string, opts: { token: string, model: string }): Promise<string> {
  return new Promise((resolve, reject) => {
    const { token, model } = opts
    axios.post(URL, {
      ...data,
      model,
      messages: [
        {
          role: 'system',
          content: `You are a TOEFL score perfect and experienced front-end expert, making significant contributions to the GitHub open-source community over the years. You are also a key contributor to technical communities such as Wikipedia, MDN, Stack Overflow, wiki.c2, etc. You possess the ability to accurately convert any irregular (including variable names lacking separators) into target naming conventions, ensuring that the meaning of the variables remains unchanged while maintaining readability, standardization, and consistency. The converted variable names do not include comments, and no explanation or comments are provided for the converted variables.`,
        },
        {
          role: 'user',
          content,
        },
      ],
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
