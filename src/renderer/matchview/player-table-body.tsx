import * as React from 'react'
import { Manager } from '../manager'
import { Match } from '../../models/match'
import { Player } from '../../models/player'
import { LinkButton } from '../../desktop'

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
    const players = this.props.match.getPlayers()
    let ret: any[] = []
    for (let player of players) {
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
      <tr key={player.getNumber()}>
        <th>{player.getNumber()}</th>
        <th>{player.getName()}</th>
        <th>{player.getOrganization()}</th>
        <th>
          <LinkButton className="editplayer" onClick={() => this.editPlayer(player.getNumber())}>
            编辑
          </LinkButton>
          <LinkButton className="deleteplayer" onClick={() => this.removePlayer(player.getNumber())}>
            删除
          </LinkButton>
        </th>
      </tr>
    )
  }
}
