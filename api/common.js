import { request } from '@/utils/request.js' 
export function uploadImageRequest(params) {
	return request('/upload-service/upload/uploadImage', 'GET', params)	
}
//获取最近几天数据
export function getHealthyCurrencyPrice(params) {
	return request('/project-service/insurance/banner/getHealthyCurrencyPrice', 'GET', params)	
}

//获取健享币统计数据
export function getHealthyCurrencyCount(params) {
	return request('/project-service/insurance/banner/getHealthyCurrencyCount', 'GET', params)	
}

//获取健享币当前价格
export function getNewHealthyCurrencyPrice(params) {
	return request('/project-service/insurance/banner/getNewHealthyCurrencyPrice', 'GET', params)	
}


export const uploadImgPath = '/upload-service/upload/uploadImage'
