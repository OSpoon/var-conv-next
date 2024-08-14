import { workspace } from 'vscode'

export function getSiliconCloudConfig() {
  const config = workspace.getConfiguration('var-conv-next')
  return {
    enabled: config.get<string>('siliconCloud.enabled'),
    token: config.get<string>('siliconCloud.token'),
    model: config.get<string>('siliconCloud.model'),
  }
}
