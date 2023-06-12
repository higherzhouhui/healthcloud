import { request } from '@/utils/request.js' 
export function loginRequest(params) {
	return request('/user/login', 'GET', params)	
}
export function getUserWallet(params) {
	return request('/user-wallet/getUserWallet', 'GET', params)	
}
export function walletTransfer(params) {
	return request('/user-wallet/walletTransfer', 'GET', params)	
}
export function walletWithdraw(params) {
	return request('/user-wallet/walletWithdraw', 'GET', params)	
}
export function personalInfo(params) {
	return request('/user/personalInfo', 'GET', params)	
}
export function registerRequest(params) {
	return request('/user/register', 'POST', params)	
}
export function insert(params) {
	return request('/user/sign-in/insert', 'POST', params)	
}
export function updatePassword(params) {
	return request('/user/updatePassword', 'PUT', params)	
}
export function realName(params) {
	return request('/user/realName', 'PUT', params)	
}

export function resetPasswordRequest(params) {
	return request('/user/resetPassword', 'PUT', params)	
}

export function personalInfoRequest(params) {
	return request('/user/personalInfo', 'GET', params)	
}

export function updateAvatarRequest(params) {
	return request('/user/updateAvatar', 'PUT', params)	
}
export function getVersionRequest(params) {
	return request('/banner/getVersion', 'GET', params)	
}
