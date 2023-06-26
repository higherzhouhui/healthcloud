

import { request } from '@/utils/request.js' 
export function getUserCard(params) {
	return request('/personal-service/insurance/user-card/getUserCard', 'GET', params)	
}
export function saveOrUpdateCard(params) {
	return request('/personal-service/insurance/user-card/saveOrUpdateCard', 'POST', params)	
}
export function getWalletFlowList(params) {
	return request('/personal-service/insurance/user-wallet/getWalletFlowList', 'GET', params)
}