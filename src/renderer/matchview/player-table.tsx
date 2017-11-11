import * as React from 'react'
import { Manager } from '../manager'
import { Match } from '../../models/match'
import { Button } from '../../desktop'
import { PlayerTableHeader } from './player-table-header'
import { PlayerTableBody } from './player-table-body'
import { sendMenuEvent } from '../../menu-event'

interface IPlayerTableProps {
  readonly manager: Manager
  readonly match: Match
}

interface IPlayerTableState {}

export class PlayerTable extends React.Component<IPlayerTableProps, IPlayerTableState> {
  constructor(props: IPlayerTableProps) {
    super(props)
  }

  public render() {
    const numberOfPlayers = this.props.match.getPlayers().length

    return (
      <div id="players">
        选手总数：{numberOfPlayers}
        <br />
        <Button className="addplayer" onClick={() => sendMenuEvent('add-player')}>
          增加选手
        </Button>
        <Button
          className="removeall"
          onClick={() => sendMenuEvent('remove-all-players')}
          disabled={numberOfPlayers === 0}
        >
          全部删除
        </Button>
        <table>
          <PlayerTableHeader manager={this.props.manager} />
          <PlayerTableBody manager={this.props.manager} match={this.props.match} />
        </table>
      </div>
    )
  }
}
