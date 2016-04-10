import React from 'react'
import {omit} from 'lodash'
import Doc from './Doc'


export default React.createClass({
	getInitialState() {
		return {docs: {}}
	},
	componentWillMount() {
		const {db} = this.props

		this._changes = db.changes({
			live: true,
			include_docs: true,
			conflicts: true,
		}).on('change', change => {
			console.log('change', change)

			const {_conflicts, ...doc} = change.doc

			if (doc._deleted) {
				this.receiveRevs(change.id, null)
			} else if (_conflicts) {
				db.get(change.id, {open_revs: _conflicts}).then(revs => {
					this.receiveRevs(change.id, [doc, ...revs.map(({ok}) => ok)])
				})
			} else {
				this.receiveRevs(change.id, [doc])
			}
		})

		this.toggleSync()
	},
	render() {
		const {docs, syncing} = this.state

		return <div>
			<button onClick={this.toggleSync}>{syncing ? 'Disconnect' : 'Connect'}</button>

			<Doc key="new" save={this.saveDoc} />

			{Object.keys(docs).map(id =>
				<div className="docList" key={id}>
					{docs[id].map(d =>
						<Doc doc={d} key={d._rev} save={this.saveDoc} />
					)}
				</div>
			)}
		</div>
	},
	componentWillUnmount() {
		this._changes.cancel()
		if (this.state.syncing) {
			this.state.syncing.cancel()
		}
	},
	saveDoc(doc) {
		return doc._id
			? this.props.db.put(doc)
			: this.props.db.post(doc)
	},
	receiveRevs(id, revs) {
		this.setState(({docs}) => (
			{docs: revs ? {...docs, [id]: revs} : omit(docs, id)}
		))
	},
	toggleSync() {
		const {syncing} = this.state
		if (syncing) {
			this.setState({syncing: undefined}, () => syncing.cancel())
		} else {
			this.setState({
				syncing: this.props.db.sync(this.props.remote, {
					live: true,
					retry: true,
				})
			})
		}
	}
})
