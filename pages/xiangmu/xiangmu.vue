<template>
	<view>
		<view class="tabs">
			<view class="tabs-item" @tap="type = item.type" :class="item.type == type && 'active'" v-for="item in tabs" :index="item.type" >
				<view class="txt">{{item.label}}</view>
			</view>
		</view>
		<view class="container" v-if="type == 1">
			<view class="item" v-for="item in list" :key="item.id">
				<view class="top-info">
					<view class="avatar-box">
						<img class="avatar" :onerror="`this.src='${avatar}'`" :src="item.image" alt="">
						<view class="avatar-info">
							<view class="name">{{ item.title }}</view>
							<!-- <view class="num">
								<view class="fh">￥</view>{{ item.price }}
							</view> -->
						</view>
					</view>
					<view class="button" @tap="toBuy(item)">
						立即购买
					</view>
				</view>
				<view class="botton-info">
					<view class="in-item">
						<view class="value">{{ item.chntSubsidy }}</view>
						<view class="txt">奖励数字人民币</view>
					</view>
					<view class="in-item">
						<view class="value">{{ item.dayEarnings }}</view>
						<view class="txt">每日社保补贴</view>
					</view>
					<view class="in-item">
						<view class="value value2">{{ item.period }}</view>
						<view class="txt">购买价格</view>
					</view>
				</view>
			</view>
		</view>
		<view class="qq" v-else></view>
	</view>

</template>

<script>
import { getProjectList } from '@/api/project'
export default {
	data() {
		return {
			avatar: 'https://alipic.lanhuapp.com/web475b3b1e-96fa-4a25-be45-7c2868ddce63',
			list: [],
			tabs: [
				{label: '信托计划', type: 1},
				{label: '股权', type: 2}
			],
			type: 1
		}
	},
	onLoad(option) {
		getProjectList().then(rt => {
			this.list = rt.data
		})
		if (option && option.status == 1) {
			uni.showToast({ title: '购买成功' })
		}
	},
	onPullDownRefresh() {
		// 执行刷新操作
		getProjectList().then(rt => {
			uni.stopPullDownRefresh()
			this.list = rt.data
		})
	},
	methods: {
		toBuy(item) {
			uni.navigateTo({ url: "/pages/xiangmu/buy?item=" + encodeURIComponent(JSON.stringify(item)) });
		}
	}
}
</script>

<style scoped lang="scss">
	.tabs{
		position: fixed;
		top:40px;
		width: 100%;
		display: flex;
		background-color: #fff;
			.tabs-item{
				padding: 10px 0 0;
				flex: 1;
				text-align: center;
				font-size: 15px;
				font-family: PingFang SC-Medium, PingFang SC;
				font-weight: 400;
				height: 40px;
				line-height: 40px;
				background-color: #fff;
				.txt{
					// padding: 0 4px 10px;
					display: inline-block;
				}
				&.active{	
					color: #FE1E27FF;			
					font-weight: 500;
					
					.txt{
						border-bottom: 3px solid;
					}
				}
			}
		}
.container {

	padding:62px  12px 12px;

	.item {
		margin-bottom: 12px;
		padding: 12px;
		box-sizing: border-box;
		border-radius: 8px;
		background-color: #fff;

		.top-info {
			display: flex;
			justify-content: space-between;
			align-items: center;

			.avatar-box {
				display: flex;
				align-items: center;

				.avatar {
					margin-right: 8px;
					width: 40px;
					height: 40px;
					border-radius: 8px;
				}

				.avatar-info {
					.name {
						font-size: 15px;
						font-family: PingFang SC-Semibold, PingFang SC;
						font-weight: 600;
						color: #17191A;
					}

					.num {
						margin-top: 5px;
						font-size: 20px;
						font-family: DIN-Bold, DIN;
						font-weight: bold;
						color: #FF4B4B;

						.fh {
							display: inline-block;
							font-size: 14px;
							font-family: PingFang SC-Semibold, PingFang SC;
							font-weight: 600;
						}
					}
				}
			}

			.button {
				padding: 5px 16px;
				background-color: #FE1E27FF;
				font-size: 13px;
				font-family: PingFang SC-Regular, PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
				border-radius: 16px;
			}
		}

		.botton-info {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-top: 12px;
			padding: 9px 19px 5px 19px;
			// background-color: #F6FAFF;
			border-radius: 4px;

			.in-item {
				text-align: center;

				.value {
					font-size: 16px;
					font-family: DIN-Bold, DIN;
					font-weight: bold;
					color: #17191A;

					&.value2 {
						color: #FF4B4BFF;
					}
				}

				.txt {
					margin-top: 3px;
					font-size: 12px;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #4F5459;
				}
			}
		}
	}
}</style>
