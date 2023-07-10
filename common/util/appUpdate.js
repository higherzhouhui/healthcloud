//APP更新
import {getVersionRequest} from "@/api/project"
import store from '@/store'
export default function appUpdate(check) {
	let timer
	// 获取系统信息
	const systemInfo = uni.getSystemInfoSync();
	// 获取应用版本号
	const version = systemInfo.appWgtVersion;
	getVersionRequest({deviceType: 1}).then(res => {
		if (res.code === 200) {
			const {data} = res
			const currentVersion = Number(String(version).replace(/\./g, ''))
			const onlineVersioin = Number(String(data.version ).replace(/\./g, ''))
			if (isNaN(currentVersion) || isNaN(onlineVersioin)) {
				return
			}
			if (currentVersion < onlineVersioin) {
				uni.showModal({ 
					title: `当前版本:${version}`,
					content: `更新提示：${data.describe},最新版本:${data.version}`,
					confirmText: '更新',
					cancelText: data.isCompel ? '' : '取消',
					success: (showResult) => {
						if (showResult.confirm) {
							plus.nativeUI.toast("正在准备环境，请稍后!");
							var dtask = plus.downloader.createDownload(data.downUrl, {
								method: 'GET',
								filename: '_doc/update/'
							}, function(d, status) {
								if (status == 200) {
									var path = d.filename; //下载apk
									plus.runtime.install(path); // 自动安装apk文件
								} else {
									plus.nativeUI.alert('版本更新失败:' + status);
								}
							});
							dtask.start();
							store.commit('SET_DOWLOADSTATUS', {isShowProgress: true, percent: 0})
							timer = setInterval(() => {
								if (!dtask.totalSize || !dtask.downloadedSize) return
								let percent = (dtask.downloadedSize / dtask.totalSize).toFixed(2) // fileSize文件总大小，后端返回的
								store.commit('SET_DOWLOADSTATUS', {percent: Math.floor(percent * 100)})
								if (percent >= 1) { // 注意百分比，及时清除定时器即可
									clearInterval(timer)
									store.commit('SET_DOWLOADSTATUS', {isShowProgress: false, percent: 0})
					
								}
							}, 1000)
						}
					}
				})
			} else {
				if (check) {
					uni.showToast({
						title: '当前已是最新版本' + version,
						icon: 'none'
					})
				}
			}
		}
	})
}
