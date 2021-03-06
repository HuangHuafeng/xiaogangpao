import * as React from 'react'
import {
  Button,
  ButtonGroup,
  Dialog,
  DialogContent,
  DialogFooter,
  Row,
  TextBox,
  Octicon,
  OcticonSymbol,
} from '../desktop'
import { Manager } from './manager'
import { Player } from '../models/player'

interface IAddPlayerProps {
  readonly manager: Manager
  readonly onDismissed: () => void
}

interface IAddPlayerState {
  readonly name: string
  readonly organization: string
}

export class AddPlayer extends React.Component<IAddPlayerProps, IAddPlayerState> {
  constructor(props: IAddPlayerProps) {
    super(props)

    this.state = {
      name: '',
      organization: '',
    }
  }

  private onOK = () => {
    this.props.manager.addPlayer(this.state.name, this.state.organization)
    // don't dismiss the dialog to let the user continue to add new player
    //this.props.onDismissed()
    this.setState({ name: '' })
  }

  private doesNameExist(): Player | undefined {
    return this.props.manager.getMatch().getPlayerByName(this.state.name)
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
        姓名有冲突：已存在编号"{player.getNumber()}"，姓名"{player.getName()}"的选手!
      </Row>
    )
  }

  public render() {
    const player = this.doesNameExist()
    const disabled = this.state.name.length === 0 || player !== undefined

    return (
      <Dialog id="addplayer" title="增加选手" dismissable={false} onDismissed={this.props.onDismissed} onSubmit={this.onOK}>
        <DialogContent>
          {this.renderDuplicateWarning(player)}
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
              增加
            </Button>
            <Button onClick={this.props.onDismissed}>取消</Button>
          </ButtonGroup>
        </DialogFooter>
      </Dialog>
    )
  }
}
