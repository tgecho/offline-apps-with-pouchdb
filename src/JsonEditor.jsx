import React from 'react'


export default React.createClass({
	render() {
		const {value=''} = this.props
		return <div>
			<textarea
				value={value}
				onChange={this.onChange}
				rows={value.split('\n').length} />
		</div>
	},
	onChange(event) {
		const {value} = event.target
		try {
			JSON.parse(value)
			this.props.onUpdate(value, null)
		} catch (error) {
			this.props.onUpdate(value, error)
		}
	}
})
