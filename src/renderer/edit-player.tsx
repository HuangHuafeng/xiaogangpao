import * as React from 'react'
import {
  Button,
  ButtonGroup,
  Dialog,
  DialogFooter,
  DialogContent,
  Row,
  TextBox,
  Octicon,
  OcticonSymbol,
} from '../desktop'
import { Manager } from './manager'
import { Player } from '../models/player'

interface IEditPlayerProps {
  readonly manager: Manager
  readonly onDismissed: () => void
}

interface IEditPlayerState {
  readonly number: string
  readonly name: string
  readonly organization: string
}

export class EditPlayer extends React.Component<IEditPlayerProps, IEditPlayerState> {
  private player: Player

  constructor(props: IEditPlayerProps) {
    super(props)

    let player = this.props.manager.getPlayerToDeleteOrEdit()
    if (player === undefined) {
      throw new Error('UNEXPECTED! there is no player to be edited!')
    }
    this.player = player

    this.state = {
      number: this.player.getNumber().toString(),
      name: this.player.getName(),
      organization: this.player.getOrganization(),
    }
  }

  private onOK = () => {
    let number = this.player.getNumber()
    this.player.setNumber(Number(this.state.number))
    this.player.setName(this.state.name)
    this.player.setOrganization(this.state.organization)

    this.props.manager.updatePlayer(number, this.player)
    this.props.onDismissed()
  }

  private doesNumberExist(): Player | undefined {
    const number = Number(this.state.number)
    if (number === 0) {
      return undefined
    }

    const match = this.props.manager.getMatch()
    const player = match.getPlayerByNumber(number)
    if (player === undefined) {
      return undefined
    }

    // if the the player under editting
    if (player.getNumber() == this.player.getNumber() && player.getName() == this.player.getName()) {
      return undefined
    }

    return player
  }

  private doesNameExist(): Player | undefined {
    const match = this.props.manager.getMatch()
    const player = match.getPlayerByName(this.state.name)
    if (player === undefined) {
      return undefined
    }

    // if the the player under editting
    if (player.getNumber() == this.player.getNumber() && player.getName() == this.player.getName()) {
      return undefined
    }

    return player
  }

  private onNumberChanged = (value: string) => {
    const number = Number(value)
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

  private renderDuplicateWarning(player: Player | undefined) {
    if (player === undefined) {
      return null
    }
    return (
      <Row className="warning-helper-text">
        <Octicon symbol={OcticonSymbol.alert} />
        编号或姓名有冲突：已存在编号"{player.getNumber()}"，姓名"{player.getName()}"的选手!
      </Row>
    )
  }

  private isChanged(): boolean {
    return (
      this.state.name !== this.player.getName() ||
      this.state.organization !== this.player.getOrganization() ||
      this.state.number !== this.player.getNumber().toString()
    )
  }

  public render() {
    const player = this.doesNumberExist() || this.doesNameExist()
    const disabled =
      this.state.name.length === 0 ||
      this.state.number.length === 0 ||
      player !== undefined ||
      this.isChanged() === false

    return (
      <Dialog
        id="editplayer"
        title="编辑选手"
        dismissable={false}
        onDismissed={this.props.onDismissed}
        onSubmit={this.onOK}
      >
        <DialogContent>
          {this.renderDuplicateWarning(player)}
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
