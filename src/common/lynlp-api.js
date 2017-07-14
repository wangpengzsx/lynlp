import config from "./config";
import jq from "jquery";
// import "babel-runtime/core-js/promise";

const newPromise = function (url, params) {
	return new Promise(function (resolve, reject) {
		jq.ajax({
			url: url,
			type: "POST",
			dataType: "json",
			data: params,
			success: function (res) {
				if (res.ok) {
					resolve(res.obj)
				} else {
					reject(res.message)
				}
			},
			error: function (err) {
				reject(err)
			}
		});
	})
}


const newPromise2 = function (url, params) {

	let formData = new FormData();
	for (let key in params) {
		formData.append(key, params[key]);
	}

	return new Promise(function (resolve, reject) {
		fetch(url, {
			method: "POST",
			headers: {},
			body: formData
		})
			.then(res => res.json())
			.then(res => {
				if (res.ok) {
					resolve(res.obj)
				} else {
					reject(res.message)
				}
			})
			.catch(err => reject(err));
	})
}

export default {
	/**
	 * 依存句法分析
	 */
	dependency(content) {
		return new newPromise(config.apiPath + 'NlpDemoApi/dependency', {
			content
		})
	},
	/**
	 * 情感分析
	 */
	sentiment(content) {
		return new newPromise(config.apiPath + 'NlpDemoApi/sentiment', {
			content
		})
	},
	/**
	 * 繁体转简体
	 */
	f2j(content) {
		return new newPromise(config.apiPath + 'NlpDemoApi/f2j', {
			content
		})
	},
	/**
	 * 简体转繁体
	 */
	j2f(content) {
		return new newPromise(config.apiPath + 'NlpDemoApi/j2f', {
			content
		})
	},
	/**
	 * 简体转拼音
	 */
	pinyin(content) {
		return new newPromise(config.apiPath + 'NlpDemoApi/pinyin', {
			content
		})
	},
	/**
	 * 内容摘要
	 */
	summary(content) {
		return new newPromise(config.apiPath + 'NlpDemoApi/summary', {
			content
		})
	},
	seg(type, content, dic) {

		return new newPromise(config.apiPath + 'NlpDemoApi/seg', {
			type, content, dic
		})
	},
	/**
	 * 文本分类
	 */
	category(content) {
		return new newPromise(config.apiPath + 'NlpDemoApi/category', {
			content
		})
	},
	/**
	 * 实体抽取
	 */
	entity(content) {
		return new newPromise(config.apiPath + 'NlpDemoApi/entity', {
			content
		})
	},
	/**
	 * 关键词抽取
	 */
	keyword(content, size) {
		return new newPromise(config.apiPath + 'NlpDemoApi/keyword', {
			content,
			size
		})
	},
	/**
	 * 抓取网页内容
	 */
	grabContent(url) {
		return newPromise(config.apiPath + 'ContentExtractorApi/execute', {
			url
		});
	},
	/**
	 * 语义关联
	 */
	semanticRecommend(content) {
		return newPromise(config.apiPath + 'NlpDemoApi/semanticRecommend', {
			content
		});
	},
	/**
	 * 语义关联-关系图
	 */
	semanticRecommendGraph(keyword) {
		return newPromise(config.apiPath + 'NlpDemoApi/semanticRecommendGraph', {
			keyword
		});
	}
}
