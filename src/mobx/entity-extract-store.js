import {observable, runInAction, computed, action, reaction, autorun} from "mobx";
import LynlpApi from "../common/lynlp-api"
import _ from "lodash";

class EntityExtractStore {
	@observable isFetching = false;
	@observable entity = {};

	@action
	fetchData(content) {
		this.isFetching = true;
		LynlpApi.entity(content).then((result) => {
			this.entity = result;
			this.isFetching = false;
		});
	}
}

const entityExtractStore = new EntityExtractStore();
export default entityExtractStore
