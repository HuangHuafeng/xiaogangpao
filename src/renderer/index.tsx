import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Manager } from './manager'
import { App } from './app'

// This is the magic trigger for webpack to go compile
// our sass into css and inject it into the DOM.
require('../desktop/styles/desktop.scss')

let manager = new Manager()
ReactDOM.render(<App manager={manager} />, document.getElementById('app'))
