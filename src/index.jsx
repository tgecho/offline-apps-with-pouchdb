import 'babel-polyfill'
import './index.html'
import './style.css'
import './index.appcache'

import PouchDB from 'pouchdb'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

window.PouchDB = PouchDB
window.log = console.log.bind(console)
window.db = new PouchDB('test')
window.remote = new PouchDB('http://127.0.0.1:5984/test')

ReactDOM.render(<App db={window.db} remote={window.remote} />, document.getElementById('app'))
