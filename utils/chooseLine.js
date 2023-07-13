//APP线路切换
import {
	Local
} from "./common"
import {
	request
} from "@/utils/request.js"
import {URL} from '@/config/index.js'
import {CURRENT_API} from '@/common/util/constants.js'
export default async function chooseLine() {
	// 检查网络状态
	uni.getNetworkType({
		success: async (res) => {
			const networkType = res.networkType;
			if (networkType === 'none') {
				// 未联网
				uni.showToast({
					title: '请检查网络连接',
					icon: 'error',
					duration: 5000
				});
			} else {
				const result = await request(
					`${URL}/project-service/insurance/banner/getDomainList?url=${URL}`,
					'GET'
				)
				const lineList = result.data
				const requestList = []
				lineList.map((item, index) => {
					requestList.push(request(
						`${item}/project-service/insurance/banner/getDomainList?url=${item}`
					))
				})
				const racePromises = requestList.map(promise => {
					return promise.then(result => {
						return {
							...result,
							isSuccess: true
						};
					}).catch(error => {
						return {
							error,
							isSuccess: false
						};
					});
				});
				async function fetchFastestData() {
					const fastestResponse = await Promise.race(racePromises);
					return fastestResponse;
				}
				const fetchResult = await fetchFastestData()
				console.log('Fastest response:', fetchResult.extra);
				if (fetchResult.extra) {
					Local(CURRENT_API, {API: fetchResult.extra})
				}
			}
		},
	});
}