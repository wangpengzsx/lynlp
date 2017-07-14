import {observable, runInAction, computed, action, reaction, autorun} from "mobx";
import LynlpApi from "../common/lynlp-api"

class TextClassificationStore {
	@observable	category='';
	@observable isFetching= false;

	@action
	fetchData(content){
		this.isFetching = true;
		LynlpApi.category(content).then(res => {
			this.category = res;
			this.isFetching= false;
		});
	}
}

const textClassificationStore = new TextClassificationStore();
export default textClassificationStore
