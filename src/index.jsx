import 'babel-polyfill'
import './index.html'
import './style.css'

import PouchDB from 'pouchdb'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

window.PouchDB = PouchDB
window.log = console.log.bind(console)
window.db = new PouchDB('test')

ReactDOM.render(<App db={window.db} />, document.getElementById('app'))
