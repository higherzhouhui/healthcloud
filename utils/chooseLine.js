//APP线路切换
import {
	Local
} from "./common"
import {
	request
} from "@/utils/request.js"
import {URL} from '@/config/index.js'
import {CURRENT_API} from '@/common/util/constants.js'
import { getVersionRequest } from "@/api/project"
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
				const result = await request(`${URL}/project-service/insurance/banner/getDomainList?url=${URL}`)
				const lineList = result.data
				const requestList = []
				lineList.map((item, index) => {
					requestList.push(request(
						`${item}/project-service/insurance/banner/getDomainList?url=${item}`, 'GET', {}, 3000
					))
				})
				let timer = ''
				let countTime = 0
				timer = setInterval(() => {
					countTime += 10
				}, 10)
				const racePromises = requestList.map((promise, index) => {
					return promise.then(result => {
						return {
							...result,
							isSuccess: true,
							delay: countTime,
						};
					}).catch(error => {
						if (Local('userInfo') && Local('userInfo').mobilePhone == '18516010812') {
							uni.showToast({
								title: `${lineList[index]}: 线路异常`,
								icon: 'none'
							})
						}
						return {
							error,
							extra: lineList[index],
							delay: countTime,
							isSuccess: false,
						};
					});
				});
				async function fetchFastestData() {
					const allResponse = await Promise.all(racePromises);
					return allResponse;
				}
				try {
					let fetchResult = await fetchFastestData()
					clearInterval(timer)
					fetchResult = fetchResult.filter(item => {return item.isSuccess})
					fetchResult.sort((a,b) => {return a.delay - b.delay})
					console.log('all response:', fetchResult);
					if (fetchResult.length && fetchResult[0].extra) {
						Local(CURRENT_API, {API: fetchResult[0].extra})
					} else {
						if (Local('userInfo') && Local('userInfo').mobilePhone == '18516010812') {
							uni.showToast({
								title: '所有线路异常',
								icon: 'none'
							})
						}
					}
				} catch(error) {
					console.error((error))
				}
			}
		},
	});
}