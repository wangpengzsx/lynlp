import React from "react";
import jq from "jquery";

export default class GoTop extends React.Component {
	render() {
		return (
			<a className="go-top"><img src={require('../../images/go-top.png')} onClick={this.gotTop.bind()}/></a>
		)
	}

	gotTop() {
		jq("html, body").animate({
			scrollTop: 0
		}, {duration: 300, easing: "swing"})
	}
}
