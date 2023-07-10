import { request } from '@/utils/request.js' 
export function uploadImageRequest(params) {
	return request('/upload-service/upload/uploadImage', 'GET', params)	
}

export function getDomainList(params) {
	return request('/project-service/insurance/banner/getDomainList', 'GET', params)	
}

export const uploadImgPath = '/upload-service/upload/uploadImage'
