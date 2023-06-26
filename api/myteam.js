import { request } from '@/utils/request.js' 
export function myTeam(params) {
	return request('/personal-service/insurance/user/myTeam', 'GET', params)	
}