import * as React from 'react'
import { Button, ButtonGroup, Dialog, DialogContent, DialogFooter, Row, TextBox } from '../desktop'
import { Manager } from './manager'

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

  private onNameChanged = (value: string) => {
    this.setState({ name: value })
  }

  private onorganizationChanged = (value: string) => {
    this.setState({ organization: value })
  }

  public render() {
    const disabled = this.state.name.length === 0

    return (
      <Dialog
        id="addplayer"
        title="新增参赛人员"
        dismissable={false}
        onDismissed={this.props.onDismissed}
        onSubmit={this.onOK}
      >
        <DialogContent>
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
              onValueChanged={this.onorganizationChanged}
              autoFocus={true}
            />
          </Row>
        </DialogContent>
        <DialogFooter>
          <ButtonGroup>
            <Button type="submit" disabled={disabled}>
              增加
            </Button>
            <Button onClick={this.props.onDismissed}>完成</Button>
          </ButtonGroup>
        </DialogFooter>
      </Dialog>
    )
  }
}
