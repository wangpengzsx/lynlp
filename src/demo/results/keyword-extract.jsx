import React from 'react';
import {observer} from "mobx-react";
import keywordExtractStore from "../../mobx/keyword-extract-store"
import * as d3 from 'd3';
import cloud from 'd3-cloud';
import Loading from '../loading';

/**
 * 关键词提取
 */

@observer
export default class KeywordExtract extends React.Component {


	componentDidUpdate(props) {
		d3.select('#d3').selectAll('*').remove();
		let cloudData = keywordExtractStore.keyword
		if (cloudData) {
			var fill = d3.scaleOrdinal(d3.schemeCategory20);
			const layout = cloud()
				.size([890, 290])
				.font("Impact")
				.words(cloudData.map(function (d) {
					var freq = d.freq * 15;
					return {text: d.name, size: freq};
				}))
				.padding(5)
				.rotate(function () {
					return (~~(Math.random() * 6) - 3) * 30;
				})
				.fontSize(function (d) {
					return d.size;
				})
				.on('end', words => {
					d3.select("#d3")
						.append('svg')
						.attr('width', layout.size()[0])
						.attr('height', layout.size()[1])
						.append('g')
						.attr('transform', `translate(${layout.size()[0] / 2},${layout.size()[1] / 2})`)
						.selectAll('text')
						.data(words)
						.enter()
						.append('text')
						.style('font-size', d => `${d.size}px`)
						.style('font-family', 'Impact')
						.style('fill', (d, i) => fill(i))
						.attr('text-anchor', 'middle')
						.attr("transform", function (d) {
							return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
						})
						.text(function (d) {
							return d.text;
						});
				});

			layout.start();
		}
	}

	render() {
		let {item} = this.props;

		let {isFetching} = keywordExtractStore;

		return (
			<div className="m-hk">
				<div className="jpt cf">
					<h3 className="fl"><i>{item.title}</i></h3>
				</div>
				{isFetching ? <Loading/> : <div id="d3" style={{height: 290}}></div>}

			</div>
		)
	}
}
