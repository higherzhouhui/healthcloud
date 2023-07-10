<template>
	<view class="fullScreen">
		<view class="cutDown" v-if="cutDown">{{cutDown}}S</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timer: '',
				cutDown: 0,
			}
		},
		onUnload() {
			clearInterval(this.timer)
			this.timer = null
		},
		onLoad() {
			// 检查网络状态
			uni.getNetworkType({
				success: (res) => {
					const networkType = res.networkType;
					if (networkType === 'none') {
						// 未联网
						uni.showToast({
							title: '请检查网络连接',
							icon: 'none',
						});
					} else {
						this.cutDown = 5
						this.timer = setInterval(() => {
							this.cutDown -= 1
							if (this.cutDown === 0) {
								this.cutDown = 5
								// uni.switchTab({
								// 	url: '/pages/index/index',
								// });
							}
						}, 1000)
					
					}
				},
			});
		},
	};
</script>

<style lang = "scss" scope>
.fullScreen {
	height: 100vh;
	background: url('@/static/start.png');
	background-size: 100% 100% ;
	background-repeat: no-repeat;
	position: relative;
	.cutDown {
		position: absolute;
		right: 20px;
		top: 20px;
		padding: 6px 20px;
		color: #fff;
		background: #aaaaaa;
		border-radius: 20px;
		font-size: 14px;
	}
} 
</style>	