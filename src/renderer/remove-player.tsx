import * as React from 'react'
import { Button, ButtonGroup, Dialog, DialogFooter, DialogContent, Row, TextBox } from '../desktop'
import { Manager } from './manager'
import { assertNever } from '../desktop'

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
    if (!(this.props.manager.match && this.props.manager.playerToDeleteOrEdit)) {
      return assertNever(undefined as never, `manager.match and manager.playerToDeleteOrEdit are both undefined!`)
    }
    const player = this.props.manager.match.getPlayer(this.props.manager.playerToDeleteOrEdit)

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
