import { request } from '@/utils/request.js' 
export function getProjectList(params) {
	return request('/project-service/insurance/project/getProjectList', 'GET', params)	
}
export function buyProject(params) {
	return request('/project-service/insurance/project/buyProject', 'POST', params)	
}
export function getPayOrder(params) {
	return request('/project-service/insurance/project/getPayOrder', 'GET', params)	
}
export function getMyProjectList(params) {
	return request('/project-service/insurance/project/getMyProjectList', 'GET', params)	
}
export function getVersionRequest(params) {
	return request('/project-service/insurance/banner/getVersion', 'GET', params)	
}