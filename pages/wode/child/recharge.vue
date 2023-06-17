<template>
	<view class="box">
		<image src='../../../static/xiangmu/zanweikaifang.png'></image>
		<view class="txt">
			暂未开放，敬请期待～
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad(options) {
			// 请注意，货币兑换与充值共用该页面
			const { title } = options
			if (title) {
				uni.setNavigationBarTitle({
					title: title
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.box{
		position: absolute;
		left: 50%;
		top: 40%;
		transform: translate(-50%, -50%);
		text-align: center;
		.txt{
			font-size: 15px;
			font-family: PingFang SC-Regular, PingFang SC;
			font-weight: 400;
			color: #969899;
		}
	}
</style>