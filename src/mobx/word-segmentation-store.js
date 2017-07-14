import {observable, runInAction, computed, action, reaction, autorun} from "mobx";
import LynlpApi from "../common/lynlp-api"
import _ from "lodash";

class WordSegmentationStore {

	@observable isFetching = true;
	@observable content = '';
	@observable userDic = '';
	@observable base = {categorys: [], terms: [], newWords: []};
	@observable index = {categorys: [], terms: [], newWords: []};
	@observable to = {categorys: [], terms: [], newWords: []};
	@observable nlp = {categorys: [], terms: [], newWords: []};
	@observable dic = {categorys: [], terms: [], newWords: []};

	@observable nounStas = [];
	@observable verbStas = [];
	@observable adjectiveStas = [];


	@action
	fetchData(content) {
		this.isFetching = true;
		this.content = content;
		Promise.all([
			LynlpApi.seg('base', content, this.userDic),
			LynlpApi.seg('index', content, this.userDic),
			LynlpApi.seg('to', content, this.userDic),
			LynlpApi.seg('nlp', content, this.userDic),
			LynlpApi.seg('dic', content, this.userDic)
		])
		.then(([result1, result2, result3,result4,result5]) => {
			this.isFetching = false;
			this.base = this.handle(result1);
			this.index = this.handle(result2);
			this.to = this.handle(result3);
			this.nlp = this.handle(result4);
			this.dic = this.handle(result5);

			// 处理词频统计数据
			this.handleWordTrequency();
		});
	}

	handle(terms) {
		terms = terms.terms.filter((t)=>t.natureStr != 'null');
		let newWords = _.uniq(_.map(_.filter(terms, ['newWord', true]),'name'));
		let categorys = _.uniq(_.map(terms, 'natureStr'));
		return {categorys, terms, newWords};
	}

	@action
	addUserDic(dic) {
		this.userDic = dic;
		this.fetchData(this.content);
	}

	handleWordTrequency() {
		let cbb = _.groupBy(this.nlp.terms, (n)=>n.natureStr.substr(0, 1));
		let noun = cbb.n;
		let verb = cbb.v;
		let adjective = cbb.a;

		let groupArr = (arr) => {
			return _.chain(arr)
			.groupBy((n) => n.name)
			.mapValues((o) => o.length)
			.map((v, k)=> {
				return {name: k, size: v};
			})
			.sortBy(['size'])
			.reverse()
			.slice(0, 10)
			.value();
		}

		this.nounStas = groupArr(noun)
		this.verbStas = groupArr(verb)
		this.adjectiveStas = groupArr(adjective)
	}

}

const wordSegmentationStore = new WordSegmentationStore();
export default wordSegmentationStore
