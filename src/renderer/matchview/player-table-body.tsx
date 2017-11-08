import * as React from 'react'
import { Manager } from '../manager'
import { Match } from '../../models/match'
import { Player } from '../../models/player'

interface IPlayerTableBodyProps {
  readonly manager: Manager
  readonly match: Match
}

interface IPlayerTableBodyState {}

export class PlayerTableBody extends React.Component<IPlayerTableBodyProps, IPlayerTableBodyState> {
  constructor(props: IPlayerTableBodyProps) {
    super(props)
  }

  public render() {
    return <tbody>{this.renderPlayerTableBody()}</tbody>
  }

  private renderPlayerTableBody() {
    let ret: any[] = []
    for (let player of this.props.match.players) {
      ret.push(this.renderAPlayer(player))
    }
    return ret
  }

  private renderAPlayer(player: Player) {
    return (
      <tr key={player.number}>
        <th>{player.number}</th>
        <th>{player.name}</th>
        <th>{player.organization}</th>
      </tr>
    )
  }
}
