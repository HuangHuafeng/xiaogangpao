import * as React from 'react'
import { Button, ButtonGroup, Dialog, DialogContent, DialogFooter, Octicon, OcticonSymbol, Row } from '../desktop'

interface IAboutProps {
  readonly onDismissed: () => void
  readonly applicationName: string
  readonly applicationVersion: string
}

interface IAboutState {}

export class About extends React.Component<IAboutProps, IAboutState> {
  constructor(props: IAboutProps) {
    super(props)
  }

  public render() {
    const name = this.props.applicationName
    const version = this.props.applicationVersion

    return (
      <Dialog id="about" onSubmit={this.props.onDismissed} onDismissed={this.props.onDismissed}>
        <DialogContent>
          <Row className="logo">
            <Octicon symbol={OcticonSymbol.markGithub} />
          </Row>
          <Row className="name">
            <h2>{name}</h2>
          </Row>
          <Row className="version">
            <p>版本 {version}</p>
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
