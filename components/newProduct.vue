<template>
	<view class="product" @tap="routeToDetail()">
		<view class="left">
			<image :src="product.image" class="cover"></image>
		</view>
		<view class="right">
			<view class="title">{{ product.title || '塔克拉玛干沙漠腹地一光伏电站正式并网发电'}}</view>
			<view class="time">{{ product.createTime || '2023-06-01 18:00:00'}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"newProduct",
		props:{
			product: Object,
		},
		data() {
			return {
			};
		},
		methods: {
			routeToDetail() {
				uni.navigateTo({url: `/pages/index/newsDetail/newsDetail?id=${this.product.id}`});
			}
		}
	}
</script>

<style scoped lang="scss">
.product {
	display: flex;
	margin-top: 12px;
	.left {
		margin-right: 17px;
		.cover {
			width: 78px;
			height: 78px;
			object-fit: fill;
			border-radius: 4px;
		}
	}
	.right {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		.title {
			height: 40px;
			max-height: 40px;
			font-size: 14px;
			font-family: PingFang SC-Medium, PingFang SC;
			font-weight: 500;
			color: #17191A;
			line-height: 20px;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			overflow: hidden;
			-webkit-line-clamp: 2;
			text-overflow: ellipsis;
			
		}
		.time {
			font-size: 12px;
			font-family: PingFang SC-Regular, PingFang SC;
			font-weight: 400;
			color: #969899;
			margin-top: 12px;
		}
	}
}
</style>