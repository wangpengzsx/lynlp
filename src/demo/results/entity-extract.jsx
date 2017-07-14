import React from "react";
import {observer} from "mobx-react";
import echarts from "echarts";
import EntityExtractStore from "../../mobx/entity-extract-store";
import contentStore from "../../mobx/content-store";
import Loading from "../loading";
import _ from "lodash"

/**
 * 实体抽取
 */
@observer
export default class EntityExtract extends React.Component {

	buildGraph(result) {
		let k0 = '文本',
			nodes = [{name: k0, category: 0, symbolSize: 80}],
			links = [];
		_.forEach(result, (v1, k1)=> {
			nodes.push({name: k1, category: 1});
			links.push({source: k0, target: k1, weight: 1});

			_.forEach(v1, (n)=> {
				let k2 = _.findKey(n, (chr)=> true);
				nodes.push({name: k2, category: 2});
				links.push({source: k1, target: k2, weight: 2})
			})
		});
		return {nodes, links}
	}

	componentDidUpdate(props) {
		let graph = this.buildGraph(EntityExtractStore.entity);

		let myChart = echarts.init(document.getElementById('main'));
		let option = {
			series: [
				{
					type: 'graph',
					layout: 'force',
					roam: true,
					symbolSize: 50,
					categories: [
						{
							name: '文本',
							itemStyle: {
								normal: {
									color: '#2ec7c9'
								}
							}
						},
						{
							name: '分类',
							itemStyle: {
								normal: {
									color: '#b6a2de'
								}
							}
						},
						{
							name: '关键词',
							itemStyle: {
								normal: {
									color: '#5ab1ef'
								}
							}
						}
					],
					edgeSymbol: ['none', 'arrow'],
					edgeSymbolSize: 6,
					force: {
						repulsion: 500,
					},
					draggable: true,
					lineStyle: {
						normal: {
							width: 1,
						}
					},
					label: {
						normal: {
							show: true,
							textStyle: {
								color: '#222'
							}
						}
					},
					data: graph.nodes,
					links: graph.links
				}
			]
		};
		myChart.setOption(option);
	}

	render() {
		let {item} = this.props;
		let {isFetching} = EntityExtractStore
		return (
			<div className="m-hk">
				<div className="jpt cf">
					<h3 className="fl"><i>{item.title}</i></h3>
				</div>
				{isFetching ? <Loading/> : <div id="main" style={{height: 600}}></div>}
			</div>
		)
	}
}
