import { request } from '@/utils/request.js' 
export function uploadImageRequest(params) {
	return request('/upload-service/upload/uploadImage', 'GET', params)	
}

export const uploadImgPath = '/upload-service/upload/uploadImage'
