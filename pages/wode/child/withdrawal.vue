<template>
	<view class="container">
		<view class="top-bg">
			<view class="top-box">
				<view class="txt">
					可提现金额(元)
				</view>
				<view class="count-txt">
					<view class="fh">
						￥
					</view>
					{{amount}}
				</view>
			</view>
			<view class="cashNumber" v-if="type === 'cash'">提现卡:<text>{{cashNumber}}</text>张</view>
		</view>
		<view class="top-info">
			<view class="top-info-box">
				<view class="txt">
					提现金额
				</view>
				<view class='input-form'>
					<view class="input-box">
						<view class="fh">￥</view>
						<input type="number" v-model="txPrice">
					</view>
					<view class="all" @tap="txPrice = amount">
						全部提现
					</view>
				</view>
			</view>
			<view class="sure-btn" @tap="withdrawal">申请提现</view>
		</view>

	</view>
</template>

<script>
	import {
		walletWithdraw
	} from '@/api/user'
	export default {
		data() {
			return {
				amount: 10000,
				txPrice: null,
				type: ''
			}
		},
		onLoad(option) {
			this.type = option.type;
			this.amount = option.amount;
			this.cashNumber = option.cashNumber
			uni.setNavigationBarTitle({
				title: `${option.title}提现`
			});
		},
		methods: {
			withdrawal() {
				if (this.type == 'currency') {
					return uni.showToast({
						title: '暂未开放，敬请期待',
						icon: 'none'
					})
				}
				if (!this.txPrice) {
					return uni.showToast({
						title: '请填写提现金额',
						icon: 'none'
					})
				} else if (this.txPrice > this.amount) {
					return uni.showToast({
						title: '可提现金额不足',
						icon: 'none'
					})
				}
				const appWidthDraw = () => {
					walletWithdraw({
						amount: this.txPrice,
						type: this.type
					}).then(rt => {
						if (rt.code === 200) {
							uni.showToast({
								title: '发起提现申请成功',
								icon: 'none'
							})
							setTimeout(() => {
								this.$Router.replaceAll({
									name: 'wode'
								})
							}, 1000)
						} else {
							uni.showToast({
								title: rt.message || '发起提现申请失败，请重试',
								icon: 'none'
							})
						}
					})
				}
				
				// 对提现卡进行拦截
				if (this.type === 'cash') {
					if (this.cashNumber * 1) {
						uni.showModal({
							title: '提示',
							content: '需要消耗一张提现卡，是否继续？',
							success: (res) => {
								if (res.confirm) {
									appWidthDraw()
								} else if (res.cancel) {
									console.log('用户点击取消');
								}
							}
						});
					} else {
						uni.showModal({
							title: '提示',
							content: '您暂无提现卡，购买股权可获得',
							confirmText: '去购买',
							cancelText: '我再想想',
							success: (res) => {
								if (res.confirm) {
									uni.switchTab({
										url: '/pages/xiangmu/xiangmu'
									})
									uni.setStorageSync('xiangmu-type', 2);
								} else if (res.cancel) {
									console.log('用户点击取消');
								}
							}
						});
					}
				} else {
					appWidthDraw()
				}
			}
		},
	}
</script>

<style scoped lang="scss">
	@import "@/static/customicons.scss";

	.container {
		.top-bg {
			position: relative;
			width: 100%;
			padding-bottom: 46.4%;
			background: linear-gradient(180deg, #F31E27 0%, #F59178 100%);
			;

			.top-box {
				position: absolute;
				padding: 24px 16px;
				width: 100%;
				height: 100%;
				font-size: 14px;
				font-family: PingFang SC-Regular, PingFang SC;
				font-weight: 400;
				color: #fff;

				.count-txt {
					margin-top: 5px;
					font-size: 32px;
					font-family: DIN-Bold, DIN;
					font-weight: bold;

					.fh {
						display: inline-block;
						font-size: 20px;
						font-family: PingFang SC-Regular, PingFang SC;
						font-weight: 400;
					}
				}
			}

			.cashNumber {
				position: absolute;
				right: 10px;
				top: 24px;
				font-size: 15px;
				color: #f3e1dc;

				text {
					color: #fff;
					padding: 0 12px;
				}
			}
		}

		.top-info {
			width: 93.33%;
			padding-bottom: 30.07%;
			position: relative;
			margin: auto;

			.top-info-box {
				position: absolute;
				padding: 16px;
				box-sizing: border-box;
				left: 0;
				top: -50%;
				width: 100%;
				height: 100%;
				background-color: #fff;
				border-radius: 8px;
				font-size: 15px;
				font-family: PingFang SC-Regular, PingFang SC;
				font-weight: 400;
				color: #17191AFF;

				.input-form {
					margin-top: 24px;
					display: flex;
					justify-content: space-between;
					align-items: baseline;

					.fh {
						display: inline-block;
						font-size: 32px;
						margin-right: 5px;
					}

					.input-box {
						display: flex;
						align-items: center;

						input {
							font-size: 24px;
							color: $primaryColor;
						}
					}

					.all {
						font-size: 15px;
						color: $primaryColor;
						white-space: nowrap;
					}
				}
			}
		}

		.sure-btn {
			position: absolute;
			bottom: -24px;
			padding: 11px 0;
			width: 100%;
			margin: 24px auto;
			background-color: $primaryColor;
			color: #fff;
			font-size: 15px;
			font-family: PingFang SC-Medium, PingFang SC;
			font-weight: 500;
			text-align: center;
			border-radius: 24px;
		}
	}
</style>