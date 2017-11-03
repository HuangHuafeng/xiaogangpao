import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Manager } from './manager'
import { App } from './app'

let manager = new Manager()
ReactDOM.render(<App manager={manager}/>, document.getElementById('app'))
