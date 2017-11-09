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
import * as assert from 'assert'
import { Match } from '../models/match'

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
  player: Player

  constructor(props: IEditPlayerProps) {
    super(props)

    if (!this.props.manager.match || !this.props.manager.playerToDeleteOrEdit) {
      assert.ok(false, 'manager.match or manager.playerToDeleteOrEdit is undefined!')
      return
    }
    const player = this.props.manager.match.getPlayerByNumber(this.props.manager.playerToDeleteOrEdit) as Player
    assert.ok(
      player != undefined,
      `IMPOSSIBLE! failed to get the player with number "${this.props.manager.playerToDeleteOrEdit}"!`
    )
    this.player = player

    this.state = {
      number: player.number.toString(),
      name: player.name,
      organization: player.organization,
    }
  }

  private onOK = () => {
    if (!this.props.manager.match || !this.props.manager.playerToDeleteOrEdit) {
      assert.ok(false, `manager.match or manager.playerToDeleteOrEdit is undefined!`)
      return
    }

    this.player.number = Number(this.state.number)
    this.player.name = this.state.name
    this.player.organization = this.state.organization

    this.props.manager.match.updatePlayer(this.props.manager.playerToDeleteOrEdit, this.player)
    this.props.onDismissed()
  }

  private doesNumberExist(): Player | undefined {
    const number = Number(this.state.number)
    if (number === 0) {
      return undefined
    }

    const match = this.props.manager.match as Match
    const player = match.getPlayerByNumber(number)
    if (player === undefined) {
      return undefined
    }

    if (player.number == this.player.number && player.name == this.player.name) {
      return undefined
    }

    return player
  }

  private doesNameExist(): Player | undefined {
    const match = this.props.manager.match as Match
    const player = match.getPlayerByName(this.state.name)
    if (player === undefined) {
      return undefined
    }

    if (player.number == this.player.number && player.name == this.player.name) {
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
        编号或姓名有冲突：已存在编号"{player.number}"，姓名"{player.name}"的选手!
      </Row>
    )
  }

  public render() {
    const player = this.doesNumberExist() || this.doesNameExist()
    const disabled = this.state.name.length === 0 || this.state.number.length === 0 || player !== undefined

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
