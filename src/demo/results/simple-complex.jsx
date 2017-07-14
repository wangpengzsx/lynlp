import React from "react";
import {observer} from "mobx-react";
import simpleComplexStore from "../../mobx/simple-complex-store";
import Loading from "../loading";

const itemName = [{name: '繁体', pinyin: 'fanti'},{name: '简体', pinyin: 'jianti'},  {name: '拼音', pinyin: 'pinyin'}]

/**
 * 简、繁体与拼音
 */
@observer
export default class SimpleComplex extends React.Component {

	state = {
		currentItem: 'fanti'
	}

	onItemPress(item) {
		this.setState({
			currentItem: item.pinyin
		})
	}

	//http://ly.infcn.com.cn/images/loader.gif
	render() {
		let {item} = this.props,
			{isFetching} = simpleComplexStore,
			{currentItem} = this.state;
		return (
			<div className="m-hk">
				<div className="jpt cf">
					<h3 className="fl"><i>{item.title}</i></h3>
					<div className="jftab fr" id="mr-1">
						{itemName.map((item, index) => {
							return (
								<span onClick={this.onItemPress.bind(this, item)} key={index}
									  className={this.state.currentItem === item.pinyin ? 'onsp' : ''}>{item.name}</span>
							)
						})}
					</div>
				</div>
				{isFetching ? <Loading/> : <div className="jfp">{simpleComplexStore[currentItem]}</div>}
			</div>
		)
	}
}
