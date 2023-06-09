import { request } from '@/utils/request.js' 
export function myTeam(params) {
	return request('/user/myTeam', 'GET', params)	
}