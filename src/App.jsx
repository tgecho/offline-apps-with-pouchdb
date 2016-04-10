import React from 'react'
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
		}).on('change', change => {
			console.log('change', change)

			this.setState(({docs}) => (
				{docs: {...docs, [change.id]: change.doc}}
			))
		})

		this.toggleSync()
	},
	render() {
		const {docs, syncing} = this.state

		return <div>
			<button onClick={this.toggleSync}>{syncing ? 'Disconnect' : 'Connect'}</button>

			<Doc key="new" save={this.saveDoc} />

			{Object.keys(docs).map(id =>
				<Doc doc={this.state.docs[id]} key={id} save={this.saveDoc} />
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
