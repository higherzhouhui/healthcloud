import { request } from '@/utils/request.js' 
// 轮播图
export function getBannerListRequest() {
	return request('/banner/getBannerList', 'GET')	
}
// 公告
export function getNewNoticeRequest() {
	return request('/banner/getNewNotice', 'GET')	
}
// 新闻列表
export function getNewsListRequest(params) {
	return request('/banner/getNewsList', 'GET', params)	
}

// 新闻详情
export function getNewsDetailRequest() {
	return request('/banner/getNewsDetail', 'GET')	
}

// 视频
export function getHomeBaseRequest() {
	return request('/banner/getHomeInfo', 'GET')	
}
