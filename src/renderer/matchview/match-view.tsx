import * as React from 'react'
import { Manager } from '../manager'
import { Match } from '../../models/match'
import { LinkButton } from '../../desktop'
import { sendMenuEvent } from '../../menu-event'
import { MatchHeader } from './match-header'
import { MatchFooter } from './match-footer'
import { MatchSetting } from './match-setting'
import { MatchContent } from './match-content'

interface IMatchViewProps {
  readonly manager: Manager
  readonly match?: Match
}

interface IMatchViewState {}

export class MatchView extends React.Component<IMatchViewProps, IMatchViewState> {
  constructor(props: IMatchViewProps) {
    super(props)
  }

  public render() {
    if (this.props.match === undefined) {
      return this.renderNewMatch()
    }

    return (
      <div id="match">
        <MatchHeader manager={this.props.manager} match={this.props.match} />
        <MatchSetting manager={this.props.manager} match={this.props.match} />
        <MatchContent manager={this.props.manager} match={this.props.match} />
        <MatchFooter manager={this.props.manager} match={this.props.match} />
      </div>
    )
  }

  private renderNewMatch() {
    return (
      <div id="match">
        <LinkButton className="newmatch" onClick={() => sendMenuEvent('file-new')}>
          <h2>创建比赛</h2>
        </LinkButton>
      </div>
    )
  }
}
