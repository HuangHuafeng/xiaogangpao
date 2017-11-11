import * as React from 'react'
import { Manager } from '../manager'
import { Match } from '../../models/match'

interface IRoundViewProps {
  readonly manager: Manager
  readonly match: Match
  readonly round: number
}

interface IRoundViewState {}

export class RoundView extends React.Component<IRoundViewProps, IRoundViewState> {
  constructor(props: IRoundViewProps) {
    super(props)
  }

  public render() {
    return (
      <div className="round" key={'round' + this.props.round.toString()}>
        第{this.props.round}轮的数据
      </div>
    )
  }
}
