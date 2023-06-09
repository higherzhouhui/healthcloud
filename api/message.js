import { request } from '@/utils/request.js' 
export function getChatMessageList(params) {
	return request('/chat-message/getChatMessageList', 'GET', params)	
}
export function getService(params) {
	return request('/chat-message/getService', 'GET', params)	
}
export function sendMessage(params) {
	return request('/chat-message/sendMessage', 'POST', params)	
}