import { request } from '@/utils/request.js' 
export function getProjectList(params) {
	return request('/project/getProjectList', 'GET', params)	
}
export function buyProject(params) {
	return request('/project/buyProject', 'POST', params)	
}
export function getPayOrder(params) {
	return request('/project/getPayOrder', 'GET', params)	
}
export function getMyProjectList(params) {
	return request('/project/getMyProjectList', 'GET', params)	
}
export function getPayCard(params) {
	return request('/project/getPayCard', 'GET', params)	
}
