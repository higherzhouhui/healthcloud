import { request } from '@/utils/request.js' 
export function uploadImageRequest(params) {
	return request('/admin/upload/uploadImage', 'GET', params)	
}
