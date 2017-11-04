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
  readonly applicationName: string
  readonly applicationVersion: string
}

interface ICreateMatchState {}

export class CreateMatch extends React.Component<
  ICreateMatchProps,
  ICreateMatchState
> {
  constructor(props: any) {
    super(props)
  }

  private onValueChanged() {
    console.log('onValueChanged()')
  }

  public render() {
    return (
      <Dialog
        id="newmatch"
        title="新建比赛"
        onSubmit={this.props.onDismissed}
        onDismissed={this.props.onDismissed}
      >
        <DialogContent>
          <Row>
            <TextBox
              label="比赛名称"
              placeholder="repository name"
              onValueChanged={this.onValueChanged}
              autoFocus={true}
            />
          </Row>
        </DialogContent>
        <DialogFooter>
          <ButtonGroup>
            <Button onClick={this.props.onDismissed}>确定</Button>
          </ButtonGroup>
        </DialogFooter>
      </Dialog>
    )
  }
}
