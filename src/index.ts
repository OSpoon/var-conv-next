import type { ExtensionContext, TextEditor } from 'vscode'
import { commands, languages, window, workspace } from 'vscode'
import { Case } from 'change-case-all'
import request from './api'
import prompt from './prompt'
import VariableCompletionProvider from './providers/VariableCompletionProvider'

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
  return await request(prompt(content, commandId), { token, model })
}

function changeCaseByLocal(content: string, commandId: string) {
  return Reflect.get(Case, commandId)(content)
}

async function handle(textEditor: TextEditor, commandId: string) {
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

function getSiliconCloudConfig() {
  const config = workspace.getConfiguration('var-conv-next')
  return {
    enabled: config.get<string>('siliconCloud.enabled'),
    token: config.get<string>('siliconCloud.token'),
    model: config.get<string>('siliconCloud.model'),
  }
}

export function activate(context: ExtensionContext) {
  [
    'camel',
    'pascal',
    'kebab',
    'snake',
    'constant',
  ].forEach((commandId) => {
    context.subscriptions.push(
      commands.registerTextEditorCommand(`var-conv-next.${commandId}`, (textEditor: TextEditor) => handle(textEditor, commandId)),
    )
  })
  context.subscriptions.push(
    languages.registerCompletionItemProvider({ pattern: '**' }, new VariableCompletionProvider()),
  )
}

export function deactivate() { }
