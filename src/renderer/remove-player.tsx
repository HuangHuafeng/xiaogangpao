import * as React from 'react'
import { Button, ButtonGroup, Dialog, DialogFooter, DialogContent, Row, TextBox } from '../desktop'
import { Manager } from './manager'
import { Player } from '../models/player'
import * as assert from 'assert'

interface IRemovePlayerProps {
  readonly manager: Manager
  readonly onDismissed: () => void
}

interface IRemovePlayerState {}

export class RemovePlayer extends React.Component<IRemovePlayerProps, IRemovePlayerState> {
  constructor(props: IRemovePlayerProps) {
    super(props)
  }

  private onOK = () => {
    if (this.props.manager.match && this.props.manager.playerToDeleteOrEdit) {
      this.props.manager.match.removePlayer(this.props.manager.playerToDeleteOrEdit)
    }

    this.props.onDismissed()
  }

  public render() {
    if (!this.props.manager.match || !this.props.manager.playerToDeleteOrEdit) {
      assert.ok(false, `manager.match or manager.playerToDeleteOrEdit is undefined!`)
      return null
    }
    const player = this.props.manager.match.getPlayerByNumber(this.props.manager.playerToDeleteOrEdit) as Player
    assert.ok(
      player != undefined,
      `IMPOSSIBLE! failed to get the player with number "${this.props.manager.playerToDeleteOrEdit}"!`
    )

    return (
      <Dialog
        id="removeplayer"
        title="确定删除这位选手吗？"
        dismissable={false}
        onDismissed={this.props.onDismissed}
        onSubmit={this.onOK}
      >
        <DialogContent>
          <Row>
            <TextBox label="编号" className="number" value={player.number.toString()} disabled={true} />
          </Row>
          <Row>
            <TextBox label="姓名" className="name" value={player.name} disabled={true} />
          </Row>
          <Row>
            <TextBox label="单位" className="organization" value={player.organization} disabled={true} />
          </Row>
        </DialogContent>
        <DialogFooter>
          <ButtonGroup>
            <Button type="submit">确定</Button>
            <Button onClick={this.props.onDismissed}>取消</Button>
          </ButtonGroup>
        </DialogFooter>
      </Dialog>
    )
  }
}
