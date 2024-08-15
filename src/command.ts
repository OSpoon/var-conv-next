import { Case } from 'change-case-all'
import type { TextEditor } from 'vscode'
import { window } from 'vscode'
import request from './api'
import prompt from './prompt'
import { getSiliconCloudConfig } from './configuration'

async function changeCaseByAPI(content: string, commandId: string) {
  const { token, model } = getSiliconCloudConfig()
  if (!token) {
    window.showInformationMessage('启用 SiliconCloud 需提供 Token')
    return
  }
  if (!model) {
    window.showInformationMessage('启用 SiliconCloud 需提供 Model')
    return
  }
  const result = await request(prompt(content, commandId), { token, model })
  // 大模型回答过长时默认使用本地函数
  return result.length > content.length * 1.5 ? Reflect.get(Case, commandId)(content) : Reflect.get(Case, commandId)(result)
}

function changeCaseByLocal(content: string, commandId: string) {
  return Reflect.get(Case, commandId)(content)
}

export async function handleCommand(textEditor: TextEditor, commandId: string) {
  const content = textEditor.document.getText(textEditor.selection)
  let result: string | undefined
  if (content) {
    // API
    if (getSiliconCloudConfig().enabled) {
      result = await changeCaseByAPI(content, commandId)
    }
    // Local
    else {
      result = changeCaseByLocal(content, commandId)
    }
    // Replace
    if (result) {
      const editor = window.activeTextEditor
      editor
        ?.edit((edit) => {
          editor?.selections.forEach(v => edit.replace(v, result || content))
        })
        .then((success) => {
          window.showInformationMessage(
            success ? '😂 变量转换成功！' : '🤕 变量转换失败！',
          )
        })
    }
  }
}
