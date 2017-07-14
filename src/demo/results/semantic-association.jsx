import React from 'react';
import {observer} from "mobx-react";
import contentStore from '../../mobx/content-store'
import semanticAssociationStore from '../../mobx/semantic-association-store'
import _ from "lodash";
import Loading from "../loading";
import echarts from "echarts";
/**
 * 语义关联
 */
@observer
export default class SemanticAssociation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			current: 0,
		};
		this.now=1;
	}

	componentWillUpdate(nextProps){
		if(this.now==semanticAssociationStore.changeCurrent){
			semanticAssociationStore.fetchDataGraph(semanticAssociationStore.keyItem);
			this.setState({
				current:0
			});
			this.now++;
		}
	}

	componentDidUpdate(){
		let {graph}= semanticAssociationStore
		if(graph.nodes){
			this.ygTu(graph)
		}
	}
	itemNav(index){
		return index === this.state.current ? 'spon' : '';
	}
	click(index,item){
		this.setState({
			current: index,
		});
		semanticAssociationStore.fetchDataGraph(item);


	}
	ygTu(data){

	let node=[];

		let obj={};
		let arr={};
		data.links.map((item,index)=>{
			if(item.from==this.key){
				arr[item.to]=1;
			}
		});

		data.nodes.map((item,index)=>{
				obj={
					id:item.name,
					category:index==0?0:(arr[item.name]?1:2),
					name:item.name,
					symbolSize: 40
				};

			node.push(obj)
		});
		let links=[];
		let lik={
			target: '',
			source:''
		};
		data.links.map((item,index)=>{
			lik={
				target: item.to,
				source:item.from
			};
			links.push(lik)
		});


		var option = {
			legend: {
				show: true,
				data: [
					{
						name: '解决方案',
						icon: 'rect'//'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
					},
					{
						name: '关联词',
						icon: 'roundRect'
					},
					{
						name: '相关联词',
						icon: 'circle'
					}
				]
			},
			series: [{
				type: 'graph', //关系图
				name: "语义关联", //系列名称，用于tooltip的显示，legend 的图例筛选，在 setOption 更新数据和配置项时用于指定对应的系列。
				layout: 'force', //图的布局，类型为力导图，'circular' 采用环形布局，见示例 Les Miserables
				force: {
					repulsion: 100,//节点之间的斥力因子。支持数组表达斥力范围，值越大斥力越大。
					gravity: 0.1,//节点受到的向中心的引力因子。该值越大节点越往中心点靠拢。
					edgeLength: 50,//边的两个节点之间的距离，这个距离也会受 repulsion。[10, 50] 。值越小则长度越长
					layoutAnimation: false
				},
				edgeSymbol: ['none', 'none'],//边两端的标记类型，可以是一个数组分别指定两端，也可以是单个统一指定。默认不显示标记，常见的可以设置为箭头，如下：edgeSymbol: ['circle', 'arrow']
				edgeSymbolSize: 5,//边两端的标记大小，可以是一个数组分别指定两端，也可以是单个统一指定。
				itemStyle: {//===============图形样式，有 normal 和 emphasis 两个状态。normal 是图形在默认状态下的样式；emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时。
					normal: { //默认样式
						label: {
							show: true
						},
						borderType: 'solid', //图形描边类型，默认为实线，支持 'solid'（实线）, 'dashed'(虚线), 'dotted'（点线）。
						borderWidth: 0, //图形的描边线宽。为 0 时无描边。
						opacity: 1
						// 图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。默认0.5

					},
					emphasis: {//高亮状态

					}
				},

				categories: [
					{
						name: '解决方案',
						symbol: 'rect',
						label: { //标签样式
						}
					}, {
						name: '关联词',
						symbol: 'rect',
					}, {
						name: '相关联词',
						symbol: 'roundRect',
					}],
				data:node,
				links:links

			}],
			lineStyle: { //==========关系边的公用线条样式。
				normal: {
					color: 'pink',
					width: '5',
					type: 'solid', //线的类型 'solid'（实线）'dashed'（虚线）'dotted'（点线）
					curveness: 0, //线条的曲线程度，从0到1
					opacity: 1
				},
				emphasis: {//高亮状态

				}
			},
			label: { //=============图形上的文本标签
				normal: {
					show: true,//是否显示标签。
					position: 'inside',//标签的位置。['50%', '50%'] [x,y]
					textStyle: { //标签的字体样式
						color: '#000', //字体颜色
						fontStyle: 'normal',//文字字体的风格 'normal'标准 'italic'斜体 'oblique' 倾斜
						fontWeight: 'normal',//'normal'标准'bold'粗的'bolder'更粗的'lighter'更细的或100 | 200 | 300 | 400...
						fontFamily: 'sans-serif', //文字的字体系列
						fontSize: 12, //字体大小
					}
				},
				emphasis: {//高亮状态

				}
			},
		};
		var dom_yg =document.getElementById('yg');
		if(dom_yg){
			var myChart = echarts.init(dom_yg);
			/*if(this.key==node[0].name){
				myChart.setOption(option)
			}*/
			myChart.setOption(option)
		}
	}
	render() {
		let data=semanticAssociationStore.recommend;
		let semanticKey=_.keys(data);
		let {current}=this.state;
		this.key=semanticKey[current];
		let recommend=data[this.key];
		let recommend_arr =[];
		for(var i in recommend){
			recommend_arr.push(recommend[i])
		};
		let box=(null);
		if(!semanticAssociationStore.fetching){
			box=(
				<div>
					<div className="ygt" >
						关键词：
						{semanticAssociationStore.fetching?null:semanticKey.map((item,index)=> {
							return <span  key={index} onClick={ () => {this.click(index,item)} } className={ this.itemNav(index) }>{item}</span>
						})}
					</div>
					<div className="ygm cf">
						<div className="yg-l fl" style={{float:'left'}}>
							<table className="cptab">
								<tbody>
								<tr>
									<th>词名</th>
									<th>相关性</th>
								</tr>
								{recommend_arr.map((item,index)=>{return <tr key={index}>
									<td>{item.name}</td>
									<td>{item.score.toFixed(2)}</td>
								</tr>})}
								</tbody>
							</table>
						</div>
						{semanticAssociationStore.fetchingTu?<Loading />:<div id="yg" style={{width:650,height:400,float:'left'}}></div>}
					</div>
				</div>
			)
		}else {
			box = (
				<Loading/>
			)
		}
			return (
				<div className="m-hk">
					<div className="jpt cf">
						<h3 className="fl"><i>语义关联</i></h3>
					</div>
					<div className="ygBox">
						{box}
					</div>

				</div>
			)
		}


}
