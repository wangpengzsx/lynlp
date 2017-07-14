import React from 'react';
import echarts from 'echarts';
import {observer} from "mobx-react";
import sentimentAnalysisStore from "../../mobx/sentiment-analysis-store"
import Loading from "../loading";

/**
 * 情感分析
 */
@observer
export default class SentimentAnalysis extends React.Component {

	componentDidUpdate(props) {
		let {data, data_type} = sentimentAnalysisStore;
		let data1 = Array.prototype.slice.call(data, 0);
		let data2 = Array.prototype.slice.call(data_type, 0);

		var myChart = echarts.init(document.getElementById('qgfxbt'));
		var option = {
			tooltip: {
				trigger: 'item',
				formatter: "{a} <br/>{b}: {c} ({d}%)"
			},
			series: [
				{
					name: '情感分析',
					type: 'pie',
					selectedMode: 'single',
					radius: [0, '22%'],
					minAngle: 3,
					label: {
						normal: {
							position: 'inner'
						}
					},
					labelLine: {
						normal: {
							show: false
						}
					},
					data: data2
				},
				{
					name: '情感分析',
					type: 'pie',
					radius: ['35%', '55%'],
					data: data1
				}
			],
			animation: false,
		};

		myChart.setOption(option);
	}

	render() {
		let {item} = this.props;
		let {zheng, fu, isFetching} = sentimentAnalysisStore;
		return (
			<div className="m-hk">
				<div className="jpt cf">
					<h3 className="fl"><i>{item.title}</i></h3>
				</div>
				<div className="cf qfmkj">
					{isFetching ? <Loading/> : (
						<div className="fl cf">

							<div className="fl qfmlb">
								{this.showList(zheng, 1)}
							</div>
							<div className="fl qfmlb">
								{this.showList(fu, 2)}
							</div>
						</div>
					)}
					<div className="fl qfmbt" id="qgfxbt"></div>

				</div>
			</div>
		)
	}

	showList(data, num) {
		let {zheng_value, fu_value} = sentimentAnalysisStore;
		let all = (zheng_value + fu_value) / 100;
		var list = data.map((info, i)=> {
			return (
				<div key={i} className="cf qfmoneline">
					<div className="fl qfmlx" style={{backgroundColor: info.itemStyle.normal.color}}>{info.name}</div>
					<div className="fl qfmsz">{info.value}</div>
					<div className="fl qfmbfb">({(info.value / all).toFixed(2)}%)</div>
				</div>
			)
		})
		return (
			<div>
				<div className="cf">
					<div className="fl qfmlx"
						 style={num == 1 ? {backgroundColor: '#FF7F50'} : {backgroundColor: '#87CEEB'}}>{num == 1 ? '正' : '负'}</div>
					<div className="fl qfmsz">{num == 1 ? zheng_value : fu_value}</div>
					<div
						className="fl qfmbfb">{num == 1 ? (zheng_value ? (zheng_value / all).toFixed(2) : 0.00) : (fu_value ? (fu_value / all).toFixed(2) : 0.00)}%
					</div>
				</div>
				<div className="qfmlx-part">
					{list}
				</div>
			</div>
		)
	}
}
