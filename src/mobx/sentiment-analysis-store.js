import {observable, runInAction, computed, action, reaction, autorun} from "mobx";
import LynlpApi from "../common/lynlp-api"
import {sentiment} from '../demo/data/sentiment-analysis';

class SentimentAnalysisStore {

	@observable isFetching = true;
	@observable data = [];
	@observable data_type = [];
	@observable zheng = [];
	@observable fu = [];
	@observable zheng_value = 0;
	@observable fu_value = 0;

	@action
	fetchData(content) {
		this.isFetching = true;
		let  zheng=[];
		let  fu=[];
		let  zheng_value=0;
		let  fu_value=0;
		LynlpApi.sentiment(content).then(res => {
			for(let i=0;i<res.length;i++){

				for (var val in res[i]){
					let now_sen = sentiment[val.trim()];
					if(now_sen){
						now_sen.value = res[i][val];
						if(now_sen.type==1){
							zheng_value+=now_sen.value;
							zheng.push(now_sen);
						}else{
							fu_value+=now_sen.value;
							fu.push(now_sen);
						}
					}
				}
			}
			this.zheng = zheng;
			this.fu = fu;
			this.zheng_value = zheng_value;
			this.fu_value = fu_value;
			this.data = zheng.concat(fu);

			this.data_type = [
				{value:this.zheng_value, name:'正',itemStyle:{
					normal:{
						color:'#FF7F50',
					}
				}, selected:true},
				{value:this.fu_value, name:'负',itemStyle:{
					normal:{
						color:'#87CEEB',
					}
				},},
			];
			this.isFetching = false;
		});

	}


}

const sentimentAnalysisStore = new SentimentAnalysisStore();
export default sentimentAnalysisStore
