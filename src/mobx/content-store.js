import {action, autorun, computed, observable, reaction, runInAction} from "mobx";
import LynlpApi from "../common/lynlp-api";
import simpleComplexStore from "../mobx/simple-complex-store";
import contentSummaryStore from "../mobx/conent-summary-store";
import textClassificationStore from "../mobx/text-classification-store";
import keywordExtractStore from "../mobx/keyword-extract-store";
import sentimentAnalysisStore from "../mobx/sentiment-analysis-store"
import dependencyGrammarStore from "../mobx/dependency-grammar-store"
import WordSegmentationStore from "../mobx/word-segmentation-store"

class ContentStore {
	@observable isFetching = false;
	@observable content = '北京英富森软件股份有限公司（股票代码：430374）以“信息中国”（Information China，简称INFCN）为核心目标与发展战略，面向全行业信息（知识）服务用户，基于语言学、应用数学及计算机技术实现信息（知识）的规划、采集、整合、组织、发现与利用，为机构（或个人）用户提供信息（知识）应用的相关软件产品与解决方案。公司是国家级高新技术企业、双软企业，并通过了ISO9001:2008计算机应用软件开发质量体系认证、CMMI-DEV ML3认证及ISO27001-2013认证。公司被中国计算机行业协会、中国软件行业协会分别授予“2013年度中国信息与知识服务行业领军企业奖”和“2014中国软件行业优秀企业奖”称号。';

	@action
	grabContent(url, callback) {
		this.isFetching = true;
		LynlpApi.grabContent(url).then(res => {
			this.content = res.content;
			this.isFetching = false;
			callback(res.content)
		}, (err) => {
			this.isFetching = false;
			alert('抓取失败！')
		});
	}
}

const contentStore = new ContentStore();
export default contentStore
