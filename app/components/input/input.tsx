import * as React from 'react'
import { View, Text, ViewStyle, TextStyle, KeyboardType } from 'react-native'
import { platform } from '../../theme'
import { TextInput } from './text-input'
import { NumberInput } from './number-input'

const { px2dp, onePixel } = platform

const ROOT: ViewStyle = {
  height: px2dp(50),
}

const MAIN: ViewStyle = {
  height: px2dp(30),
  flexDirection: 'row',
  alignItems: "center",
  borderBottomWidth: onePixel,
  borderBottomColor: '#E9E9E9',
}

const MAIN_ACTIVE: ViewStyle = {
  borderBottomColor: '#ccc'
}

const MAIN_ERROR: ViewStyle = {
  borderBottomColor: 'red'
}

const INPUT: TextStyle = {
  flex: 1,
  paddingVertical: 0,
  paddingHorizontal: 5,
  fontSize: 14,
}

const ERROR: TextStyle = {
  height: px2dp(20),
  lineHeight: px2dp(20),
  fontSize: 12,
  textAlign: "right",
  color: 'red',
}

export interface InputProps {
  style?: ViewStyle
  onFocus?: () => void
  onBlur?: () => void
  password?: boolean
  keyboardType?: KeyboardType
  onChange?: (value: string) => void
  formatType?: 'number'
  errorText?: string
}

/**
 * Stateless functional component for your needs
 *
 * Component description here for TypeScript tips.
 */
export class Input extends React.Component<InputProps> {
  state: {
    focus: boolean
  }
  visit: boolean = false

  constructor (props: Readonly<InputProps>) {
    super(props)
    this.state = {
      focus: false,
    }
  }

  _onFocus = () => {
    if (this.props.onFocus) this.props.onFocus()
    this.setState({ focus: true }, () => {
      this.visit = true
    })
  }

  _onBlur = () => {
    if (this.props.onBlur) this.props.onBlur()
    this.setState({ focus: false })
  }

  render () {
    const {
      password,
      children,
      onChange,
      formatType,
      errorText,
      ...rest
    } = this.props

    const InputWrapper = formatType === 'number' ? NumberInput : TextInput

    const styles = [
      MAIN,
      this.state.focus ? MAIN_ACTIVE : null,
      (this.visit && errorText) ? MAIN_ERROR : null
    ]

    return (
      <View style={ROOT}>
        <View style={styles}>
          <InputWrapper
            style={INPUT}
            secureTextEntry={password}
            underlineColorAndroid='rgba(0,0,0,0)'
            {...rest}
            onChangeText={onChange}
            onFocus={this._onFocus}
            onBlur={this._onBlur}
            clearButtonMode='while-editing'
            placeholderTextColor='#CCCCCCFF'
          />
          {children}
        </View>
        <Text style={ERROR}>{this.visit ? errorText : ""}</Text>
      </View>
    )
  }
}
