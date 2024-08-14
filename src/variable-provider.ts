import { Case } from 'change-case-all'
import type { CompletionItemProvider, CompletionList, Position, ProviderResult, TextDocument } from 'vscode'
import { CompletionItem, CompletionItemKind, Range } from 'vscode'

export const variableCompletionProvider: CompletionItemProvider = {
  provideCompletionItems(document: TextDocument, position: Position): ProviderResult<CompletionItem[] | CompletionList<CompletionItem>> {
    const lineText = document.lineAt(position.line).text
    const linePrefix = lineText.slice(0, position.character)

    const match = linePrefix.match(/\b(const|let|var)\s+(\w[\s\w-]*)$/)
    if (!match) {
      return
    }

    const variableName = match[2]
    // Skip if the variable name length is less than 5
    if (variableName.length < 5) {
      return
    }

    // Compute the range for the variable name
    const startOffset = linePrefix.lastIndexOf(variableName)
    if (startOffset === -1) {
      return
    }

    // Generate variable name styless
    const camelCase = Case.camel(variableName)
    const pascalCase = Case.pascal(variableName)
    const kebabCase = Case.kebab(variableName)
    const snakeCase = Case.snake(variableName)
    const constantCase = Case.constant(variableName)

    // Create CompletionItems for each style
    const items: CompletionItem[] = [
      new CompletionItem(camelCase, CompletionItemKind.Variable),
      new CompletionItem(pascalCase, CompletionItemKind.Variable),
      new CompletionItem(kebabCase, CompletionItemKind.Variable),
      new CompletionItem(snakeCase, CompletionItemKind.Variable),
      new CompletionItem(constantCase, CompletionItemKind.Variable),
    ]

    // Set the range for each CompletionItem
    items.forEach((item) => {
      item.range = new Range(position, position)
      item.insertText = '' // Set insertText to empty string
      item.additionalTextEdits = [
        {
          newText: item.label.toString(), // Replace the variable name with the style
          range: new Range(
            position.with(position.line, startOffset),
            position.with(position.line, startOffset + variableName.length),
          ),
        },
      ]
    })

    return items
  },
}
