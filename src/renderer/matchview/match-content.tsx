import * as React from 'react'
import { Manager } from '../manager'
import { Match } from '../../models/match'
import { PlayerTable } from './player-table'

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
    return (
      <div id="match-content">
        <PlayerTable manager={this.props.manager} match={this.props.match} />
      </div>
    )
  }
}
