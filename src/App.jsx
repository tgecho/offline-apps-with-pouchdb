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
			{Object.keys(this.state.docs).map(id =>
				<Doc doc={this.state.docs[id]} key={id} />
			)}
		</div>
	},
	componentWillUnmount() {
		this._changes.cancel()
	},
})
