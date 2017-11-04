import * as React from 'react'

interface IClockState {
  readonly date: Date
}

export class Clock extends React.Component<any, IClockState> {
  timerId: NodeJS.Timer

  constructor(props: any) {
    super(props)
    this.state = { date: new Date() }

    // no need to call bind() when using arrow fucntions since 'this' in arrow
    // function is lexical scoped. Check the relevant code in componentDidMount().
    this.tick = this.tick.bind(this)
  }

  tick() {
    this.setState({
      date: new Date(),
    })
  }

  componentDidMount() {
    this.timerId = setInterval(
      /*
            () => {
                this.tick();
            },
            */
      this.tick,
      1000
    )
  }

  componentWillUnmount() {
    clearInterval(this.timerId)
  }

  render() {
    return <h2>{this.state.date.toLocaleTimeString()}</h2>
  }
}
