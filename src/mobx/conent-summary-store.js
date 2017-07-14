import {observable, runInAction, computed, action, reaction, autorun} from "mobx";
import LynlpApi from "../common/lynlp-api"

class ContentSummaryStore {
	@observable isFetching= false;
	@observable	summary='';

	@action
	fetchData(content){
		this.isFetching = true;
		LynlpApi.summary(content).then(res => {
			this.summary = res;
			this.isFetching = false
		});
	}
}

const contentSummaryStore = new ContentSummaryStore();
export default contentSummaryStore
