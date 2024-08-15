export default function prompt(variable: string, style: string) {
  const result = `
Convert the following variable names to ${style} case format and directly output the converted variable names without any additional content.
Source Variable Name: ${variable}
Transformed Variable Name:`
  return result
}
