import { request } from '@/utils/request.js' 
// 轮播图
export function getBannerListRequest() {
	return request('/project-service/insurance/banner/getBannerList', 'GET')	
}
// 公告
export function getNewNoticeRequest() {
	return request('/project-service/insurance/banner/getNewNotice', 'GET')	
}
// 新闻列表
export function getNewsListRequest(params) {
	return request('/project-service/insurance/banner/getNewsList', 'GET', params)	
}

// 新闻详情
export function getNewsDetailRequest() {
	return request('/project-service/insurance/banner/getNewsDetail', 'GET')	
}

// 基础信息
export function getHomeBaseRequest() {
	return request('/project-service/insurance/banner/getHomeInfo', 'GET')	
}
