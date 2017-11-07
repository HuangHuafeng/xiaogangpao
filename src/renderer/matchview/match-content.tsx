import * as React from 'react'
import { Manager } from '../manager'
import { Match } from '../../models/match'

interface IMatchContentProps {
  readonly manager: Manager
  readonly match: Match
}

interface IMatchContentState {
  readonly viewRound: number
}

export class MatchContent extends React.Component<IMatchContentProps, IMatchContentState> {
  constructor(props: IMatchContentProps) {
    super(props)

    this.state = { viewRound: 1 }
  }

  public render() {
    return <div id="match-content">当前正在查看第{this.state.viewRound}轮</div>
  }
}
