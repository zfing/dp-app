import * as React from 'react'

export class SetTimeoutMixin extends React.Component<any, any> {
  timeouts: any[]

  constructor(props: Readonly<{}>) {
    super(props)
    this.timeouts = []
    this.setTimeout = this.setTimeout.bind(this)
    this.clearTimeouts = this.clearTimeouts.bind(this)
  }

  setTimeout(func: () => void, durtion: number) {
    this.timeouts.push(setTimeout(func, durtion))
  }

  clearTimeouts() {
    this.timeouts.forEach(clearTimeout)
  }

  componentWillUnmount() {
    this.clearTimeouts()
  }
}
