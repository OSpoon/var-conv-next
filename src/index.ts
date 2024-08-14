import type { ExtensionContext, TextEditor } from 'vscode'
import { commands, languages } from 'vscode'
import { variableCompletionProvider } from './variable-provider'
import { handleCommand } from './command'

export function activate(context: ExtensionContext) {
  context.subscriptions.push(
    ...[
      'camel',
      'pascal',
      'kebab',
      'snake',
      'constant',
    ].map(commandId => commands.registerTextEditorCommand(`var-conv-next.${commandId}`, (textEditor: TextEditor) => handleCommand(textEditor, commandId))),
    languages.registerCompletionItemProvider(
      [
        { language: 'javascript', pattern: '**/*.js' },
        { language: 'typescript', pattern: '**/*.ts' },
        { language: 'javascriptreact', pattern: '**/*.jsx' },
        { language: 'typescriptreact', pattern: '**/*.tsx' },
      ]
      , variableCompletionProvider,
    ),
  )
}

export function deactivate() { }
