import * as React from 'react'
import { TextInput as Input } from '../../components'

export interface InputProps {
    onChange?: (value: string) => void
    formatType?: 'number'
}
export function TextInput (props: InputProps) {

  const { formatType, onChange, ...rest } = props
  // 限制只输入数值
  const format = (value: string) => {
    let nextValue = value.trim()
    if (formatType === 'number') {
      nextValue = nextValue.replace(/[^\d]/g, '')
    }
    return nextValue
  }

  return (
    <Input 
      {...rest} 
      onChangeText={text => onChange(format(text))}
    />
  )
}
