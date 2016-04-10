import React from 'react'
import JsonEditor from './JsonEditor'


export default React.createClass({
	getInitialState() {
		return {}
	},
	render() {
		const {doc} = this.props
		const {value, error} = this.state

		// Doc is currently being edited
		if (value) {
			return <div className="doc">
				<JsonEditor value={value} onUpdate={this.onUpdate} />
				<button onClick={this.save} disabled={error}>Save</button>
				<button onClick={this.clear}>Cancel</button>
				{error && <span className="error"> {error.toString()}</span>}
			</div>

		// Doc exists, but is not actively being edited
		} else if (doc) {
			return <div className="doc">
				<pre>{pretty(doc)}</pre>
				<button onClick={this.edit}>Edit</button>
			</div>

		// Doc does not exist
		} else {
			return <button onClick={this.edit}>Create</button>
		}
	},
	edit() {
		this.setState({value: pretty(this.props.doc || {})})
	},
	clear() {
		this.setState({value: undefined, error: undefined})
	},
	save() {
		this.props.save(JSON.parse(this.state.value))
			.then(() => this.isMounted() && this.clear())
	},
	onUpdate(value, error) {
		this.setState({value, error})
	},
})


function pretty(obj) {
	return JSON.stringify(obj, null, 1)
}
