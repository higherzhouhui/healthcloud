//APP更新
import {
	getDomainList
} from "@/api/common"
import {
	CURRENT_API
} from '@/common/util/constants.js'
import store from '@/store'
import {
	Local
} from "./common"
import {
	request
} from "@/utils/request.js"
export default async function chooseLine() {
	// 检查网络状态
	let timer = ''
	let time = 0
	console.log(store.state.userInfo)
	timer = setInterval(() => {
		time += 1
		if (!store.state.chooseLineStatus) {
			uni.hideLoading()
			clearInterval(timer)
		}
	}, 1000)
	
	if (time > 3) {
		uni.showLoading({
			title: '正在为您自动切换网络，请稍后',
			icon: 'none'
		})
	}
	uni.getNetworkType({
		success: async (res) => {
			const networkType = res.networkType;
			if (networkType === 'none') {
				// 未联网
				uni.showToast({
					title: '请检查网络连接',
					icon: 'none',
				});
			} else {
				const result = await request(
					'http://domain.jxybao.com/project-service/insurance/banner/getDomainList?url=http://domain.jxybao.com',
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
				fetchFastestData().then(result => {
						uni.hideLoading()
						clearInterval(timer)
						time = 0
						console.log('Fastest response:', result.extra);
						if (result.extra) {
							Local(CURRENT_API, {API: result.extra})
						}
					})
					.catch(error => {
						uni.hideLoading()
						clearInterval(timer)
						time = 0
						console.error('Error:', error);
					});
			}
		},
	});
}