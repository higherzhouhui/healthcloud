// 推广
import { request } from '@/utils/request.js' 
export function getExpandList(params) {
	return request('/expand/getExpandList', 'GET', params)	
}
export function getExpandRule(params) {
	return request('/expand/getExpandRule', 'GET', params)	
}
export function receiveExpand(id) {
	return request('/expand/receiveExpand/' + id, 'POST', {id})	
}