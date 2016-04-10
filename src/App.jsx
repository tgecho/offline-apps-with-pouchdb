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
	},
	render() {
		return <div>
			<Doc key="new" save={this.saveDoc} />

			{Object.keys(this.state.docs).map(id =>
				<Doc doc={this.state.docs[id]} key={id} save={this.saveDoc} />
			)}
		</div>
	},
	componentWillUnmount() {
		this._changes.cancel()
	},
	saveDoc(doc) {
		return doc._id
			? this.props.db.put(doc)
			: this.props.db.post(doc)
	},
})
