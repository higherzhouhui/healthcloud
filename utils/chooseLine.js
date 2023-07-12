//APP线路切换
import store from '@/store'
import {
	Local
} from "./common"
import {
	request
} from "@/utils/request.js"
import {URL} from '@/config/index.js'
export default async function chooseLine() {
	// 检查网络状态
	let timer = ''
	let time = 0
	store.commit('SET_CHOOSELINESTATUS', true)
	let isloading = false
	timer = setInterval(() => {
		time += 1
		if (time > 3) {
			if (!isloading) {
				isloading = true
				uni.showLoading({
					title: '',
				})
			}
		}
		if (!store.state.chooseLineStatus) {
			uni.hideLoading()
			clearInterval(timer)
			isloading = false
		}
	}, 1000)
	

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
				fetchFastestData().then(result => {
						uni.hideLoading()
						clearInterval(timer)
						isloading = false
						time = 0
						console.log('Fastest response:', result.extra);
						if (result.extra) {
							Local(CURRENT_API, {API: result.extra})
						}
					})
					.catch(error => {
						uni.hideLoading()
						isloading = false
						clearInterval(timer)
						time = 0
						console.error('Error:', error);
					});
			}
		},
	});
}