import * as React from 'react'
import { Manager } from './manager'
import { Match } from '../models/match'

interface IMatchViewProps {
  readonly manager: Manager
  readonly match?: Match
}

interface IMatchViewState {}

export class MatchView extends React.Component<
  IMatchViewProps,
  IMatchViewState
> {
  constructor(props: IMatchViewProps) {
    super(props)
  }

  public render() {
    let name = '请创建比赛'
    if (this.props.match) {
      name = this.props.match.name
    }
    return <h1>{name}</h1>
  }
}
