import React from "react";

export default class Content extends React.Component {
	render() {
		return (
			<div className="wid1200 p_rel">
				{this.props.children}
			</div>
		)
	}
}
