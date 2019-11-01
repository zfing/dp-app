/**
 * 随机数
 * @param  {Number} length [长度]
 * @return {String}
 */
export const random = (length: number = 1): string => {
  const base = Math.floor(Math.random() * Math.pow(10, length - 1))
  return (`0000000000000000${base}`).substr(-length)
}

/**
 * 生成唯一ID
 * @param len 长度
 * @param dict 字典
 */
export const unique = (len: number, dict?: string): string => {
  dict = dict || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let id: string = '';
  for (let i = 0; i < len; i++) {
   const index = Math.floor(Math.random() * dict.length)
   id = id + dict.substring(index, index + 1)
  }
  return id
}