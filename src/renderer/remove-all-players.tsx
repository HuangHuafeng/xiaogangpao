import * as React from 'react'
import { Button, ButtonGroup, Dialog, DialogFooter } from '../desktop'
import { Manager } from './manager'

interface IRemoveAllPlayersProps {
  readonly manager: Manager
  readonly onDismissed: () => void
}

interface IRemoveAllPlayersState {}

export class RemoveAllPlayers extends React.Component<IRemoveAllPlayersProps, IRemoveAllPlayersState> {
  constructor(props: IRemoveAllPlayersProps) {
    super(props)
  }

  private onOK = () => {
    this.props.manager.removeAllPlayersConfirmed()
    this.props.onDismissed()
  }

  public render() {
    return (
      <Dialog
        id="removeallplayers"
        title="确定删除所有选手吗？"
        dismissable={false}
        onDismissed={this.props.onDismissed}
        onSubmit={this.onOK}
      >
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
