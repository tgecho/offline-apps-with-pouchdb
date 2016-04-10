import 'babel-polyfill'
import './index.html'
import './style.css'

import PouchDB from 'pouchdb'

window.PouchDB = PouchDB
window.log = console.log.bind(console)
