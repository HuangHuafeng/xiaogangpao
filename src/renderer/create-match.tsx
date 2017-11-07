import * as React from 'react'
import { Button, ButtonGroup, Dialog, DialogContent, DialogFooter, Row, TextBox } from '../desktop'
import { Manager } from './manager'

interface ICreateMatchProps {
  readonly manager: Manager
  readonly onDismissed: () => void
}

interface ICreateMatchState {
  readonly name: string
  readonly organizer: string
}

export class CreateMatch extends React.Component<ICreateMatchProps, ICreateMatchState> {
  constructor(props: ICreateMatchProps) {
    super(props)

    this.state = {
      name: '2017年全国象棋锦标赛(个人)',
      organizer: '国家体育总局棋牌运动管理中心、中国象棋协会',
    }
  }

  private onOK = () => {
    this.props.manager.newMatch(this.state.name, this.state.organizer)
    this.props.onDismissed()
  }

  private onNameChanged = (value: string) => {
    this.setState({ name: value })
  }

  private onOrganizerChanged = (value: string) => {
    this.setState({ organizer: value })
  }

  public render() {
    const disabled = this.state.name.length === 0

    return (
      <Dialog id="newmatch" title="新建比赛" dismissable={false} onDismissed={this.props.onDismissed} onSubmit={this.onOK}>
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
