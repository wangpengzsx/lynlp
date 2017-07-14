import {observable, runInAction, computed, action, reaction, autorun} from "mobx";
import LynlpApi from "../common/lynlp-api"

class SimpleComplexStore {

	@observable isFetching= false;
	@observable	jianti='';
	@observable	fanti= '';
	@observable pinyin= '';

	@action
	fetchData(content){
		// LynlpApi.j2f(content).then(result => {
		// 	this.fanti = result;
		// });
		// LynlpApi.f2j(content).then(result => {
		// 	this.jianti = result;
		// });
		// LynlpApi.pinyin(content).then(result => {
		// 	this.pinyin = result;
		// });

		this.isFetching = true;
		Promise.all([
			LynlpApi.j2f(content),
			LynlpApi.f2j(content),
			LynlpApi.pinyin(content)
		])
		.then(([result1, result2, result3]) => {
			this.isFetching = false;
			this.fanti = result1;
			this.jianti = result2;
			this.pinyin = result3;
		});

	}



}

const simpleComplexStore = new SimpleComplexStore();
export default simpleComplexStore
