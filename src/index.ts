import type { ExtensionContext, TextEditor } from 'vscode'
import { commands, window } from 'vscode'
import * as changeCase from 'change-case'

function handle(textEditor: TextEditor, commandId: string) {
  const origin = textEditor.document.getText(textEditor.selection)
  if (origin) {
    const command = changeCase.camelCase(commandId)
    const result = Reflect.get(changeCase, command)(origin)
    const editor = window.activeTextEditor
    editor
      ?.edit((edit) => {
        editor?.selections.forEach(v => edit.replace(v, result))
      })
      .then((success) => {
        window.showInformationMessage(
          success ? '😂 变量转换成功！' : '🤕 变量转换失败！',
        )
      })
  }
}

export function activate(context: ExtensionContext) {
  [
    'CamelCase',
    'PascalCase',
    'KebabCase',
    'SnakeCase',
    'ConstantCase',
  ].forEach((commandId) => {
    context.subscriptions.push(
      commands.registerTextEditorCommand(`var-conv-next.${commandId}`, (textEditor: TextEditor) => handle(textEditor, commandId)),
    )
  })
}

export function deactivate() { }
