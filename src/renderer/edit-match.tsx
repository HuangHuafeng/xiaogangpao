import * as React from 'react'
import { Button, ButtonGroup, Dialog, DialogContent, DialogFooter, Row, TextBox } from '../desktop'
import { Manager } from './manager'
import { Match } from '../models/match'

interface IEditMatchProps {
  readonly manager: Manager
  readonly match: Match
  readonly onDismissed: () => void
}

interface IEditMatchState {
  readonly name: string
  readonly organizer: string
  readonly totalRounds: string
}

export class EditMatch extends React.Component<IEditMatchProps, IEditMatchState> {
  private match: Match

  constructor(props: IEditMatchProps) {
    super(props)

    this.match = this.props.manager.getMatch()

    this.state = {
      name: this.match.getName(),
      organizer: this.match.getOrganizer(),
      totalRounds: this.props.match.getTotalRounds() ? this.props.match.getTotalRounds().toString() : '',
    }
  }

  private onOK = () => {
    this.match.setName(this.state.name)
    this.match.setOrganizer(this.state.organizer)
    this.match.setTotalRounds(Number(this.state.totalRounds))
    this.props.manager.updateMatch(this.match)
    this.props.onDismissed()
  }

  private onNameChanged = (value: string) => {
    this.setState({ name: value })
  }

  private onOrganizerChanged = (value: string) => {
    this.setState({ organizer: value })
  }

  private onTotalRoundsChanged = (value: string) => {
    const number = Number(value)
    if (!Number.isNaN(number)) {
      this.setState({ totalRounds: number !== 0 ? value : '' })
    }
  }

  public render() {
    const disabled = this.state.name.length === 0 || Number(this.state.totalRounds) <= 0

    return (
      <Dialog id="newmatch" title="比赛设置" dismissable={false} onDismissed={this.props.onDismissed} onSubmit={this.onOK}>
        <DialogContent>
          <Row>
            <TextBox
              label="比赛名称"
              className="name"
              value={this.state.name}
              onValueChanged={this.onNameChanged}
              autoFocus={true}
            />
          </Row>
          <Row>
            <TextBox
              label="主办单位"
              className="organizer"
              value={this.state.organizer}
              onValueChanged={this.onOrganizerChanged}
              autoFocus={true}
            />
          </Row>
          <Row>
            <TextBox
              label="总轮数"
              className="totalrounds"
              value={this.state.totalRounds}
              onValueChanged={this.onTotalRoundsChanged}
              autoFocus={true}
            />
          </Row>
        </DialogContent>
        <DialogFooter>
          <ButtonGroup>
            <Button type="submit" disabled={disabled}>
              确定
            </Button>
            <Button onClick={this.props.onDismissed}>取消</Button>
          </ButtonGroup>
        </DialogFooter>
      </Dialog>
    )
  }
}
