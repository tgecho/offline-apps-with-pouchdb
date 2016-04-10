import React from 'react'


export default React.createClass({
	render() {
		return <div className="doc">
			<pre>{pretty(this.props.doc)}</pre>
		</div>
	},
})


function pretty(obj) {
	return JSON.stringify(obj, null, 1)
}
