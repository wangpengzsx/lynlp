import React from "react";
import Position from "./position";
import SubmitText from "./submit-text";
import Result from "./result";
import GoTop from "./go-top";

export default class Demo extends React.Component {
	render() {
		return (
			<div>
				<Position/>
				<SubmitText/>
				<Result/>
				<GoTop/>
			</div>
		)
	}
}
