import * as React from 'react'
import { Manager } from '../manager'
import { Match } from '../../models/match'
import { LinkButton } from '../../desktop'

interface IMatchSettingProps {
  readonly manager: Manager
  readonly match: Match
}

interface IMatchSettingState {}

export class MatchSetting extends React.Component<IMatchSettingProps, IMatchSettingState> {
  constructor(props: IMatchSettingProps) {
    super(props)
  }

  public render() {
    return (
      <div id="match-setting">
        <LinkButton className="newmatch">参赛人员</LinkButton>
        <LinkButton className="newmatch">计分规则</LinkButton>
      </div>
    )
  }
}
