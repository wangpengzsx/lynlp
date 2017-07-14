import React from "react";
import WordSegmentationStore from "../../mobx/word-segmentation-store"
import "../../../styles/word.scss";
import {observer} from "mobx-react";
import Loading from "../loading";
import _ from "lodash";

// 词性定义
const natureDefs= {
	"Ag": {"code": "Ag", "name": "形语素", "color": "#986699"},
	"a": {"code": "a", "name": "形容词", "color": "#ff9899"},
	"ad": {"code": "ad", "name": "副形词", "color": "#ffcccb"},
	"an": {"code": "an", "name": "名形词", "color": "#99cc67"},
	"b": {"code": "b", "name": "区别词", "color": "#8ea4de"},
	"c": {"code": "c", "name": "连词", "color": "#4dd9e6"},
	"dg": {"code": "dg", "name": "副语素", "color": "#d7acd7"},
	"d": {"code": "d", "name": "副词", "color": "#f48363"},
	"e": {"code": "e", "name": "叹词", "color": "#f2d404"},
	"f": {"code": "f", "name": "方位词", "color": "#30aadd"},
	"g": {"code": "g", "name": "语素", "color": "#55bfcc"},
	"h": {"code": "h", "name": "前接成分", "color": "#96dbf8"},
	"i": {"code": "i", "name": "成语", "color": "#ccc"},
	"j": {"code": "j", "name": "简称略语", "color": "#488fce"},
	"k": {"code": "k", "name": "后接成分", "color": "#c7aee7"},
	"l": {"code": "l", "name": "习用语", "color": "#cee887"},
	"m": {"code": "m", "name": "数词", "color": "#c9aaca"},
	"Ng": {"code": "Ng", "name": "名语素", "color": "#ffcb99"},
	"n": {"code": "n", "name": "名词", "color": "#67ccaa"},
	"nr": {"code": "nr", "name": "人名", "color": "#67a6d9"},
	"ns": {"code": "ns", "name": "地名", "color": "#f3e988"},
	"nt": {"code": "nt", "name": "机构团体", "color": "#9acccd"},
	"nz": {"code": "nz", "name": "其他专名", "color": "#986699"},
	"o": {"code": "o", "name": "拟声词", "color": "#ff9899"},
	"p": {"code": "p", "name": "介词", "color": "#ffcccb"},
	"q": {"code": "q", "name": "量词", "color": "#99cc67"},
	"r": {"code": "r", "name": "代词", "color": "#8ea4de"},
	"s": {"code": "s", "name": "处所词", "color": "#4dd9e6"},
	"tg": {"code": "tg", "name": "时语素", "color": "#d7acd7"},
	"t": {"code": "t", "name": "时间词", "color": "#f48363"},
	"u": {"code": "u", "name": "助词", "color": "#f2d404"},
	"vg": {"code": "vg", "name": "动语素", "color": "#30aadd"},
	"v": {"code": "v", "name": "动词", "color": "#55bfcc"},
	"vd": {"code": "vd", "name": "副动词", "color": "#96dbf8"},
	"vn": {"code": "vn", "name": "名动词", "color": "#ccc"},
	"w": {"code": "w", "name": "标点符号", "color": "#488fce"},
	"x": {"code": "x", "name": "非语素字", "color": "#c7aee7"},
	"y": {"code": "y", "name": "语气词", "color": "#cee887"},
	"z": {"code": "z", "name": "状态词", "color": "#c9aaca"},
	"un": {"code": "un", "name": "未知词", "color": "#ffcb99"},
	"unknown": {"code": "unknown", "name": "未知", "color": "#67ccaa"}
};

/**
 * 分词标注
 */
@observer
export default class WordSegmentation extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			types: [
				{type: 'nlp', name: 'NLP分词'},
				{type: 'to', name: '精准分词'},
				{type: 'index', name: '索引分词'},
				{type: 'base', name: '细颗粒度分词'},
				{type: 'dic', name: '用户自定义词典分词'}
			],
			curType: 'nlp',
			userDic: '',
		};
	}


	render() {
		let {item} = this.props;
		let {types, curType, userDic} = this.state;
		let {isFetching} = WordSegmentationStore;

		let categorys = WordSegmentationStore[curType].categorys;
		let terms = WordSegmentationStore[curType].terms;
		let newWords = WordSegmentationStore[curType].newWords;

		return (
			<div className="m-hk">
				<div className="jpt cf">
					<h3 className="fl"><i>{item.title}</i></h3>
					<div className="jftab fr" id="mr-2">
						{types.map((t, i)=>(
							<span key={i} className={curType == t.type ? "onsp" : ''}
								  onClick={()=>this.setState({curType: t.type})}>{t.name}</span>
						))}
					</div>
				</div>

				{isFetching ? <Loading/> :
					<div className="fcm">
						<div className="col-xs-3">
							<div style={{padding: 10, width: 'auto', height: 'auto'}}>
								<h1 style={{color: '#979797', fontSize: 16, marginBottom: 20}}>词性类别图示：</h1>
								<dl className="words">
									{categorys.map((t, i)=> {
										if (natureDefs[t]) {
											return (
												<dd key={i} className={t}
													style={{backgroundColor: natureDefs[t].color}}>{natureDefs[t].name}</dd>
											)
										}
									})}
								</dl>
							</div>
						</div>
						<div className="col-xs-6" style={{height: 450, overflow: 'hidden', overflowY: 'scroll'}}>
							<div style={{padding: 10, width: 'auto', height: 'auto'}}>
								<dl className="words">
									{terms.map((t, i)=> {
										let natureDef = natureDefs[t.natureStr] || natureDefs["unknown"];
										return (
											<dd key={i} className={t.natureStr}
												style={{backgroundColor: natureDef.color}}>{t.name}</dd>
										)
									})}
								</dl>
							</div>
						</div>
						<div className="col-xs-3">
							<div style={{padding: 10, width: 'auto', height: 'auto'}}>
								<h1 style={{color: '#979797', fontSize: 16, marginBottom: 20}}>新词发现：</h1>
								<dl className="newwords" style={{height: 200,overflow: 'hidden', overflowY: 'scroll'}}>
									{newWords.map((t, i)=>(
										<dd key={i} className="yell">{t}</dd>
									))}
								</dl>
								<h1 style={{color: '#979797', fontSize: 16, marginBottom: 20}}>用户自定义词：</h1>
								<textarea style={{height: 100,width:204}} value={userDic}
										  onChange={(e) => this.setState({userDic: e.target.value})}/>
								<a href="javascript:void(0)" className="tj-a fr" onClick={this.addUserDic.bind(this)}>添加</a>
							</div>
						</div>
					</div>
				}

			</div>
		)
	}

	addUserDic() {
		WordSegmentationStore.addUserDic(this.state.userDic)
	}
}
