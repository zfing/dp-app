import { translate } from '../../i18n'

/**
 * 解析code多语言
 * @param {number} code
 */
export function message(code: number): string {
  return translate(`respCode.${code}`, { defaultValue: '未翻译错误' })
}
