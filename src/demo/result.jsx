import React from "react";
import SimpleComplex from "./results/simple-complex";
import WordSegmentation from "./results/word-segmentation";
import WordFrequency from "./results/word-frequency";
import KeywordExtract from "./results/keyword-extract";
import EntityExtract from "./results/entity-extract";
import TextClassification from "./results/text-classification";
import ContentSummary from "./results/content-summary";
import SemanticAssociation from "./results/semantic-association";
import SentimentAnalysis from "./results/sentiment-analysis";
import DependencyGrammar from "./results/dependency-grammar";
import SensitiveWords from "./results/sensitive-words";
import jq from "jquery";


const items = [
	{id: 'a-01', title: '简繁体&拼音', component: SimpleComplex},
	{id: 'a-02', title: '分词标注', component: WordSegmentation},
	{id: 'a-03', title: '词频统计', component: WordFrequency},
	{id: 'a-04', title: '关键词提取', component: KeywordExtract},
	{id: 'a-05', title: '实体抽取', component: EntityExtract},
	{id: 'a-06', title: '文本分类', component: TextClassification},
	{id: 'a-07', title: '内容摘要', component: ContentSummary},
	{id: 'a-08', title: '语义关联', component: SemanticAssociation},
	{id: 'a-09', title: '情感分析', component: SentimentAnalysis},
	{id: 'a-10', title: '依存文法', component: DependencyGrammar},
	// {id: 'a-11', title: '敏感词标注', component: SensitiveWords}
];

export default class Result extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			selected: 'a-01'
		}
	}

	componentDidMount() {
		window.addEventListener('scroll', this.handleScroll.bind(this))
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll.bind(this));
	}

	handleScroll() {
		let self = this

		function getElementTop(elem) {
			var elemTop = elem.offsetTop;
			elem = elem.offsetParent;
			while (elem != null) {
				elemTop += elem.offsetTop;
				elem = elem.offsetParent;
			}
			return elemTop;
		}

		const scrollTop = document.body.scrollTop
		items.map((item)=> {
			var obj = document.getElementById(item.id);
			var offsetTop = getElementTop(obj)
			if (scrollTop > offsetTop - 100) {
				self.setState({
					selected: item.id
				})
			}
		})

		var obj1 = document.getElementById('test');
		var offsetTop1 = getElementTop(obj1)
		if (scrollTop < offsetTop1 || (obj1.style.position == 'fixed' && scrollTop < 530)) {
			obj1.style.position = 'static';
		} else {
			obj1.style.position = 'fixed';
			obj1.style.top = '10px';
		}
	}

	onItemPress(id) {
		jq("html, body").animate({
				scrollTop: $("#"+id).offset().top
			}, {duration: 300, easing: "swing"})

		this.setState({
			selected: id
		})
	}

	render() {
		return (
			<div>
				<h2 className="h2-z">分析结果</h2>
				<div className="mf cf">
					<ul className="nav-l fl" id="test">
						{items.map((item) => this.renderMenuItem(item))}
					</ul>
					<div className="m-r fr">
						{items.map((item) => this.renderResultItem(item))}
					</div>
				</div>
			</div>
		)
	}

	renderMenuItem(item) {
		let {selected} = this.state;
		return (
			<li key={item.id} className={selected === item.id ? 'oli' : ''}>
				<a href={'#' + item.id} className={item.id}
				   onClick={this.onItemPress.bind(this, item.id)}>{item.title}</a>
				<span className="sp2"/>
			</li>
		)
	}

	renderResultItem(item) {
		let Component = item.component;
		return (
			<div key={item.id} id={item.id}>
				<Component item={item}/>
			</div>
		)
	}
}
