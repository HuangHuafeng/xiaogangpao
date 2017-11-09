import * as React from 'react'
import { Manager } from '../manager'
import { Match } from '../../models/match'
import { Player } from '../../models/player'
import { Button } from '../../desktop'

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

  private removePlayer(number: number) {
    this.props.manager.removePlayer(number)
  }

  private editPlayer(number: number) {
    this.props.manager.editPlayer(number)
  }

  private renderAPlayer(player: Player) {
    return (
      <tr key={player.number}>
        <th>{player.number}</th>
        <th>{player.name}</th>
        <th>{player.organization}</th>
        <th>
          <Button className="addplayer" onClick={() => this.editPlayer(player.number)}>
            编辑
          </Button>
          <Button className="addplayer" onClick={() => this.removePlayer(player.number)}>
            删除
          </Button>
        </th>
      </tr>
    )
  }
}
