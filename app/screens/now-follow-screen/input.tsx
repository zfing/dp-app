import * as React from 'react'
import { TextInput as Input } from '../../components'

export interface InputProps {
    onChange?: (value: string) => void
    formatType?: 'number'
    balance?: any
}
export function TextInput (props: InputProps) {

  const { formatType, balance, onChange, ...rest } = props
  // 限制输入数值
  const format = (value: string) => {
    let nextValue = value.trim()
    if (formatType === 'number') {
      nextValue = nextValue.replace(/[^\d]/g, '')
      nextValue = Number(nextValue) === 0 ? '' : nextValue
      nextValue = Number(nextValue) > 10000 ? '10000' : (Number(nextValue) > balance ? String(Math.floor(Number(balance))) : nextValue)
    }
    return nextValue
  }

  return (
    <Input 
      {...rest} 
      keyboardType="numeric" 
      onChangeText={text => onChange(format(text))}
    />
  )
}
