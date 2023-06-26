import { request } from '@/utils/request.js' 
export function loginRequest(params) {
	return request('/personal-service/insurance/user/login', 'GET', params)	
}
export function getUserWallet(params) {
	return request('/personal-service/insurance/user-wallet/getUserWallet', 'GET', params)	
}
export function walletTransfer(params) {
	return request('/personal-service/insurance/user-wallet/walletTransfer', 'GET', params)	
}
export function walletWithdraw(params) {
	return request('/personal-service/insurance/user-wallet/walletWithdraw', 'GET', params)	
}
export function personalInfo(params) {
	return request('/personal-service/insurance/user/personalInfo', 'GET', params)	
}
export function registerRequest(params) {
	return request('/personal-service/insurance/user/register', 'POST', params)	
}
export function insert(params) {
	return request('/personal-service/insurance/user/sign-in/insert', 'POST', params)	
}
export function updatePassword(params) {
	return request('/personal-service/insurance/user/updatePassword', 'PUT', params)	
}
export function realName(params) {
	return request('/personal-service/insurance/user/realName', 'PUT', params)	
}
export function resetPasswordRequest(params) {
	return request('/personal-service/insurance/user/resetPassword', 'PUT', params)	
}

export function updateAvatarRequest(params) {
	return request('/personal-service/insurance/user/updateAvatar', 'PUT', params)	
}

export function getPayCard(params) {
	return request('/personal-service/insurance/user-card/getPayCard', 'GET', params)	
}