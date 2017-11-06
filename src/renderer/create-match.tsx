import * as React from 'react'
import {
  Button,
  ButtonGroup,
  Dialog,
  DialogContent,
  DialogFooter,
  Row,
  TextBox,
} from '../desktop'

interface ICreateMatchProps {
  readonly onDismissed: () => void
}

interface ICreateMatchState {
  readonly matchName: string
}

export class CreateMatch extends React.Component<
  ICreateMatchProps,
  ICreateMatchState
> {
  constructor(props: any) {
    super(props)

    this.state = {
      matchName: '',
    }
  }

  private onOK = () => {
    console.log('You clicked OK')
    this.props.onDismissed()
  }

  private onValueChanged = (value: string) => {
    console.log(`onValueChanged(${value})`)
    this.setState({ matchName: value })
  }

  public render() {
    const disabled = this.state.matchName.length === 0

    return (
      <Dialog
        id="newmatch"
        title="新建比赛"
        dismissable={false}
        onDismissed={this.props.onDismissed}
        onSubmit={this.onOK}
      >
        <DialogContent>
          <Row>
            <TextBox
              label="比赛名称"
              onValueChanged={this.onValueChanged}
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
