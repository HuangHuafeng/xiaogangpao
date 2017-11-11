import * as React from 'react'
import { Manager } from '../manager'
import { Match, MatchStatus } from '../../models/match'
import { TabBar } from '../../desktop'
import { RoundView } from './round-view'
import { NextRound } from './next-round'

interface IMatchRoundsProps {
  readonly manager: Manager
  readonly match: Match
}

interface IMatchRoundsState {
  readonly selectedIndex: number
}

export class MatchRounds extends React.Component<IMatchRoundsProps, IMatchRoundsState> {
  constructor(props: IMatchRoundsProps) {
    super(props)

    this.state = { selectedIndex: 0 }
  }

  private onTabClicked = (index: number) => {
    this.setState({ selectedIndex: index })
  }

  private renderTabs() {
    let tabs = []
    for (let index = 0; index < this.props.match.getCurrentRound(); index++) {
      const round = index + 1
      tabs.push(<span key={'round' + round.toString()}>第{round}轮</span>)
    }

    tabs.push(<span key={'nextround'}>下一轮</span>)

    return (
      <TabBar onTabClicked={this.onTabClicked} selectedIndex={this.state.selectedIndex}>
        {tabs}
      </TabBar>
    )
  }

  private renderActiveTabContents() {
    if (this.state.selectedIndex < this.props.match.getCurrentRound()) {
      return <RoundView manager={this.props.manager} match={this.props.match} round={this.state.selectedIndex} />
    }

    return <NextRound manager={this.props.manager} match={this.props.match} />
  }

  public render() {
    if (this.props.match.getStatus() === MatchStatus.NotStarted) {
      return <div id="match-rounds">{this.renderNotStarted()}</div>
    } else {
      return (
        <div id="match-rounds">
          {this.renderTabs()}
          {this.renderActiveTabContents()}
        </div>
      )
    }
  }

  private renderNotStarted() {
    return <p>比赛还没有开始</p>
  }
}
