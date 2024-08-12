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
