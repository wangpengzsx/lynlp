import React from "react";
import WordSegmentationStore from "../../mobx/word-segmentation-store"
import echarts from "echarts";
import {observer} from "mobx-react";
import _ from "lodash";
import Loading from "../loading";


/**
 * 词频统计
 */
@observer
export default class WordFrequency extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			tabs: [
				{id: 'list', name: '列表展示'},
				{id: 'graph', name: '图形展示'}
			],
			curTab: 'list'
		};

	}

	componentDidUpdate() {
		let {curTab} = this.state;
		let {nounStas, verbStas, adjectiveStas}=WordSegmentationStore;
		if (curTab == 'graph') {
			this.renderChart('nounChart', nounStas, '#488fce');
			this.renderChart('verbChart', verbStas, '#ff9900');
			this.renderChart('adjectiveChart', adjectiveStas, '#67ccaa');
		}
	}


	render() {
		let {item} = this.props;
		let {tabs, curTab} = this.state;
		let {nlp, isFetching, nounStas, verbStas, adjectiveStas}=WordSegmentationStore;

		return (
			<div className="m-hk">
				<div className="jpt cf">
					<h3 className="fl"><i>{item.title}</i></h3>
					<div className="jftab fr" id="mr-3">
						{tabs.map((t, i)=>(
							<span key={i} className={curTab == t.id ? "onsp" : ''}
								  onClick={()=> this.setState({curTab: t.id})}>{t.name}</span>
						))}
					</div>
				</div>
				{isFetching ? <Loading/> :
					<div>
						{curTab == 'list' && <div className="cpm cf" style={{display: 'block'}}>
							<div className="cp-1 fl">
								<h3 className="h3-1">名词</h3>
								{this.renderListTable(nounStas)}
							</div>
							<div className="cp-2 fl">
								<h3 className="h3-1">动词</h3>
								{this.renderListTable(verbStas)}
							</div>
							<div className="cp-3 fl">
								<h3 className="h3-1">形容词</h3>
								{this.renderListTable(adjectiveStas)}
							</div>
						</div>
						}

						{curTab == 'graph' && <div className="cpm cf" style={{display: 'block'}}>
							<div className="cp-1 fl">
								<h3 className="h3-1">名词</h3>
								<div id="nounChart" style={{width: '100%', height: 320}}></div>
							</div>
							<div className="cp-2 fl">
								<h3 className="h3-1">动词</h3>
								<div id="verbChart" style={{width: '100%', height: 320}}></div>
							</div>
							<div className="cp-3 fl">
								<h3 className="h3-1">形容词</h3>
								<div id="adjectiveChart" style={{width: '100%', height: 320}}></div>
							</div>
						</div>
						}
					</div>
				}
			</div>
		)
	}


	renderChart(chartId, arr, color) {
		let data1 = _.map(arr, 'name').reverse();
		let data2 = _.map(arr, 'size').reverse();
		var option = {
			grid: {
				left: '1%',
				right: '3%',
				bottom: '1%',
				top: '1%',
				containLabel: true
			},
			color: [color]
			,
			xAxis: {
				type: 'value',
				boundaryGap: [0, 1]
			},
			yAxis: {
				type: 'category',
				data: data1
			},
			series: [
				{
					type: 'bar',
					data: data2
				}

			]
		};

		var myChart = echarts.init(document.getElementById(chartId));
		myChart.setOption(option);
	}

	renderListTable(arr) {
		return (
			<table className="cptab">
				<tbody>
				<tr>
					<th>词名</th>
					<th>词频</th>
				</tr>
				{arr.map((t, i)=> (
					<tr key={i}>
						<td>{t.name}</td>
						<td>{t.size}</td>
					</tr>
				))}
				</tbody>
			</table>
		);
	}

}
