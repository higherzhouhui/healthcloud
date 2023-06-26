import { request } from '@/utils/request.js' 
export function uploadImageRequest(params) {
	return request('/upload-service/upload/uploadImage', 'GET', params)	
}
