// 推广
import { request } from '@/utils/request.js' 
export function getExpandList(params) {
	return request('/project-service/insurance/expand/getExpandList', 'GET', params)	
}
export function getExpandRule(params) {
	return request('/project-service/insurance/expand/getExpandRule', 'GET', params)	
}
export function receiveExpand(id) {
	return request('/project-service/insurance/expand/receiveExpand/' + id, 'POST', {id})	
}