import React from "react";
import {observer} from "mobx-react";
import {enableLogging} from "mobx-logger";
import "../styles/index.scss";
import Header from "./layout/header";
import Footer from "./layout/footer";
import Content from "./layout/content";
import Nav from "./layout/nav";
import Demo from "./demo/index";

// 启用mobx日志输出
enableLogging({
	predicate: () => __DEV__,//process.env.NODE_ENV !== 'production'
	action: true,
	reaction: true,
	transaction: true,
	compute: true
});

@observer
export default class App extends React.Component {
	render() {
		return (
			<div>
				<Header/>
				<Content>
					<Nav/>
					<Demo/>
				</Content>
				<Footer/>
			</div>
		)
	}
}
