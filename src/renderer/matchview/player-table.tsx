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
    return (
      <div id="players">
        <table>
          <PlayerTableHeader manager={this.props.manager} />
          <PlayerTableBody manager={this.props.manager} match={this.props.match} />
        </table>
        <Button className="addplayer" onClick={() => sendMenuEvent('add-player')}>
          增加
        </Button>
        <Button className="deleteplayer">删除</Button>
      </div>
    )
  }
}
