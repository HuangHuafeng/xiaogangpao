import * as React from 'react'
import { Button, ButtonGroup, Dialog, DialogFooter, DialogContent, Row, TextBox } from '../desktop'
import { Manager } from './manager'
import { assertNever } from '../desktop'
import { Player } from '../models/player'

interface IEditPlayerProps {
  readonly manager: Manager
  readonly onDismissed: () => void
}

interface IEditPlayerState {
  readonly number: string
  readonly name: string
  readonly organization: string
  readonly player: Player
}

export class EditPlayer extends React.Component<IEditPlayerProps, IEditPlayerState> {
  constructor(props: IEditPlayerProps) {
    super(props)

    if (!(this.props.manager.match && this.props.manager.playerToDeleteOrEdit)) {
      return assertNever(undefined as never, `manager.match and manager.playerToDeleteOrEdit are both undefined!`)
    }
    const player = this.props.manager.match.getPlayer(this.props.manager.playerToDeleteOrEdit)

    this.state = {
      number: player.number.toString(),
      name: player.name,
      organization: player.organization,
      player: player,
    }
  }

  private onOK = () => {
    if (!(this.props.manager.match && this.props.manager.playerToDeleteOrEdit)) {
      return assertNever(undefined as never, `manager.match and manager.playerToDeleteOrEdit are both undefined!`)
    }

    let player = this.state.player
    player.number = Number(this.state.number)
    player.name = this.state.name
    player.organization = this.state.organization

    this.props.manager.match.updatePlayer(this.props.manager.playerToDeleteOrEdit, player)
    this.props.onDismissed()
  }

  private onNumberChanged = (value: string) => {
    let number = Number(value)
    if (!Number.isNaN(number)) {
      this.setState({ number: number !== 0 ? value : '' })
    }
  }

  private onNameChanged = (value: string) => {
    this.setState({ name: value })
  }

  private onOrganizationChanged = (value: string) => {
    this.setState({ organization: value })
  }

  public render() {
    const disabled = this.state.name.length === 0 || this.state.number.length === 0

    return (
      <Dialog
        id="editplayer"
        title="编辑选手"
        dismissable={false}
        onDismissed={this.props.onDismissed}
        onSubmit={this.onOK}
      >
        <DialogContent>
          <Row>
            <TextBox
              label="编号"
              className="number"
              value={this.state.number.toString()}
              onValueChanged={this.onNumberChanged}
              autoFocus={true}
            />
          </Row>
          <Row>
            <TextBox
              label="姓名"
              className="name"
              value={this.state.name}
              onValueChanged={this.onNameChanged}
              autoFocus={true}
            />
          </Row>
          <Row>
            <TextBox
              label="单位"
              className="organization"
              value={this.state.organization}
              onValueChanged={this.onOrganizationChanged}
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
