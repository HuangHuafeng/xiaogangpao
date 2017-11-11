import * as React from 'react'
import { Button, ButtonGroup, Dialog, DialogFooter, DialogContent, Row, TextBox } from '../desktop'
import { Manager } from './manager'

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
    const player = this.props.manager.getPlayerToDeleteOrEdit()
    if (player === undefined) {
      throw new Error('UNEXPECTED! there is no player to be removed!')
    }

    this.props.manager.removePlayerConfirmed(player.getNumber())
    this.props.onDismissed()
  }

  public render() {
    const player = this.props.manager.getPlayerToDeleteOrEdit()
    if (player === undefined) {
      throw new Error('UNEXPECTED! there is no player to be removed!')
    }

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
            <TextBox label="编号" className="number" value={player.getNumber().toString()} disabled={true} />
          </Row>
          <Row>
            <TextBox label="姓名" className="name" value={player.getName()} disabled={true} />
          </Row>
          <Row>
            <TextBox label="单位" className="organization" value={player.getOrganization()} disabled={true} />
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
