import { request } from '@/utils/request.js' 
export function getChatMessageList(params) {
	return request('/project-service/insurance/chat-message/getChatMessageList', 'GET', params)	
}
export function getService(params) {
	return request('/project-service/insurance/chat-message/getService', 'GET', params)	
}
export function sendMessage(params) {
	return request('/project-service/insurance/chat-message/sendMessage', 'POST', params)	
}