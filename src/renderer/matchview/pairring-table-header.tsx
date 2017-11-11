import * as React from 'react'
import { Manager } from '../manager'

interface IPairringTableHeaderProps {
  readonly manager: Manager
}

interface IPairringTableHeaderState {}

export class PairringTableHeader extends React.Component<IPairringTableHeaderProps, IPairringTableHeaderState> {
  constructor(props: IPairringTableHeaderProps) {
    super(props)
  }

  public render() {
    return (
      <thead>
        <tr>
          <th>编号</th>
          <th>单位</th>
          <th>姓名</th>
          <th>结果</th>
          <th>姓名</th>
          <th>单位</th>
          <th>编号</th>
        </tr>
      </thead>
    )
  }
}
