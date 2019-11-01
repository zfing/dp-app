import * as React from 'react'
import { ViewStyle } from 'react-native'
import { Text } from '../text'
import { SetTimeoutMixin } from '../set-timeout-mixin'
import { Touchable } from '../touchable'
import { isNumber } from '@crude/extras'
import * as storage from '../../utils/storage'

const downCache = {
  async set(name: any, value: number) {
    await storage.save(`@@CountDown-${name}`, value)
  },
  async get(name: any) {
    const cache = await storage.load(`@@CountDown-${name}`)
    return cache
  },
}

export interface CutdownProps {
  text?: string
  nextText?: string
  duration?: number
  onOk?: (run?: () => void) => void
  disabled?: boolean
  cache?: string

  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle
}

/**
 * Stateless functional component for your needs
 *
 * Component description here for TypeScript tips.
 */
export class Cutdown extends SetTimeoutMixin {
  constructor(props: CutdownProps) {
    super(props)
    this.state = {
      duration: null,
    }
  }

  static defaultProps: CutdownProps = {
    duration: 30,
  }

  componentDidMount() {
    this._handleHistory()
  }

  _handleHistory = async () => {
    const { cache, duration } = this.props
    if (!cache) return
    const lastTime = await downCache.get(cache)
    if (!lastTime) return
    const timeLeft = Math.floor(duration - (Date.now() - lastTime) / 1000)

    if (timeLeft > 0) {
      this._start(timeLeft)
    }
  }

  run = () => {
    if (!this.state.duration && !this.props.disabled) {
      this.clearTimeouts()
      this._start(this.props.duration)
    }
  }

  _onClick = async () => {
    const { disabled, onOk, cache } = this.props
    if (!this.state.duration && !disabled) {
      onOk(this.run)
      if (cache) {
        await downCache.set(cache, Date.now())
      }
    }
  }

  _start = (duration: number) => {
    this.setState({ duration })
    if (duration) {
      this.setTimeout(() => {
        this._start(--duration)
      }, 1000)
    } else {
      this.clearTimeouts()
    }
  }

  render() {
    const {
      text, nextText, disabled, ...rest
    } = this.props
    const { duration } = this.state

    return (
      <Touchable
        disabled={!!duration || disabled}
        onPress={this._onClick}
        {...rest}
      >
        <Text>
          {duration || (isNumber(duration) && nextText) || text}
          {' '}
          {duration ? 's' : ''}
        </Text>
      </Touchable>
    )
  }
}
