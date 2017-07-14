import {observable, runInAction, computed, action, reaction, autorun} from "mobx";
import LynlpApi from "../common/lynlp-api"

class KeywordExtractStore {
	@observable	keyword='';
	@observable isFetching= false;

	@action
	fetchData(content){
		this.isFetching = true;
		LynlpApi.keyword(content, 50).then(res => {
			this.keyword = res;
			this.isFetching = false
		});
	}
}

const keywordExtractStore = new KeywordExtractStore();
export default keywordExtractStore
