<template>
	<view class="container">
		<view class="top-bg">
			<view class="top-box">
				<view class="txt">
					{{type == 'cash' ? '可兑换健享币（枚）' : '可兑换现金（元）'}}
				</view>
				<view class="count-txt">
					<!-- <view class="fh">
						￥
					</view> -->
					{{amount}}
				</view>
				
			</view>
			<!-- <view class="cashNumber" v-if="type === 'cash'">提现卡:<text>{{cashNumber}}</text>张</view> -->
		</view>
		<view class="top-info">
			<view class="top-info-box">
			<!-- 	<view class="itemWrapper">
					<view
						class="item" 
						v-for="(item, index) in list" 
						:key="item" 
						:class="exchangeAmount == item ? 'activeItem' : ''"
						@tap="exchangeAmount = item"
						>
						<view class="price">{{item}}</view>
						<view class="almost">约{{Math.round(item * currentPrice / pro)}}元</view>
					</view>
				</view> -->
				<view class="content">
					<!-- <view class="txt">
						自定义
					</view> -->
					<view class='input-form'>
						<view class="input-title">
							<span>{{type == 'cash' ? '兑换数量' : '兑换金额'}}</span>
							<span>当前价格：<span class="price">{{currentPrice}}</span>&nbsp;元/枚</span>
						</view>
						<view class="input-wrapper">
							<input type="number" maxlength="13" v-model="exchangeAmount" class="input-box" />
							<view class="all" @tap="exchangeAmount = amount">
								全部兑换
							</view>
						</view>
						<view class="amountPrice">
							<span v-if="type === 'cash'">预估金额：{{ amountPrice }}元</span>
							<span v-else>预估健享币：{{ amountPrice }}枚</span>
						</view>
					</view>
					<view class="sure-btn" @tap="exchange">立即兑换</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		walletChange,
		getNewHealthyCurrencyPrice,
	} from '@/api/user'
	export default {
		data() {
			return {
				amount: 0,
				type: '',
				list: [1000, 3000, 5000, 10000, 30000, 50000],
				pro: 100,
				currentPrice: 0,
				exchangeAmount: '',
				amountPrice: 0,
			}
		},
		onLoad(option) {
			this.type = option.type;
			this.amount = option.amount;
			uni.setNavigationBarTitle({
				title: option.type != 'cash' ? '现金兑换健享币' : '健享币兑换现金'
			});
			this.getPrice()
		},
		methods: {
			getPrice() {
				getNewHealthyCurrencyPrice().then(res => {
					if (res.code === 200) {
						this.currentPrice = res.data
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				})
			},
			getAlmostMoney() {
				let ap = Math.round(this.currentPrice * this.exchangeAmount * 100) / 100
				if (this.type == 'healthy_currency') {
					ap = Math.round(this.exchangeAmount / this.currentPrice * 100) / 100
				}
				this.amountPrice =ap
			},
			exchange() {
				if (this.exchangeAmount == '0') {
					return
				}
				if (!this.exchangeAmount) {
					return uni.showToast({
						title: '请填写兑换数',
						icon: 'none'
					})
				} else if (this.exchangeAmount > this.amount) {
					return uni.showToast({
						title: '可兑换不足',
						icon: 'none'
					})
				}
				const appWidthDraw = () => {
					uni.showLoading({
						title: '兑换中...'
					})
					walletChange({
						amount: this.exchangeAmount,
						type: this.type
					}).then(rt => {
						uni.hideLoading()
						if (rt.code === 200) {
							uni.showToast({
								title: '兑换成功',
								icon: 'none'
							})
							setTimeout(() => {
								this.$Router.replaceAll({
									name: 'wode'
								})
							}, 1000)
						} else {
							uni.showToast({
								title: rt.msg || '发起兑换申请失败，请重试',
								icon: 'none'
							})
						}
					}).catch(() => {
						uni.hideLoading()
					})
				}
				appWidthDraw()
			}
		},
		watch: {
			exchangeAmount(newVal, oldVal) {
				this.getAlmostMoney()
			},
			
		}
	}
</script>

<style scoped lang="scss">
	@import "@/static/customicons.scss";
	.container {
		.top-bg {
			position: relative;
			width: 100%;
			padding-bottom: 46.4%;
			background: linear-gradient(180deg, #FE8216 0%, #FFA65A 69%, #FFDEC2 100%);
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
					margin-top: 8px;
					font-size: 32px;
					font-family: DIN-Bold, DIN;
					font-weight: bold;
					display: flex;
					align-items: center;
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
		.amountPrice {
			margin-top: 8px;
			color: #ff0000;
		}
		.top-info {
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
				border-radius: 8px;
				font-size: 15px;
				font-family: PingFang SC-Regular, PingFang SC;
			
				.itemWrapper {
					color: #17191A;
					display: grid;
					grid-template-columns: repeat(3, 1fr);
					row-gap: 12px;
					column-gap: 12px;
				}
				.item {
					background-color: #fff;
					border-radius: 12px;
					padding: 15px 0;
					text-align: center;
					color: #111;
					border: 1px solid transparent;
					.price {
						font-weight: bold;
						font-size: 20px;
						margin-bottom: 8px;
					}
					.almost {
						font-size: 14px;
					}
				}
				.activeItem {
					color: $primaryColor;
					border: 1px solid $primaryColor;
				}
				.content {
					width: 100%;
					.txt {
						color: #999;
						margin: 12px 0;
					}
				}
				.input-form {
					background: #fff;
					border-radius: 8px;
					padding: 16px;
					.input-title {
						margin-bottom: 20px;
						font-size: 15px;
						color: #17191A;
						display: flex;
						align-items: center;
						justify-content: space-between;
						.price {
							color: #ff0000;
							font-weight: bold;
						}
					}
					.input-wrapper {
						position: relative;
					}
					.input-box {
						font-size: 28px;
						font-family: PingFang SC-Regular, PingFang SC;
						color: #17191A;
						line-height: 36px;
					}
					.all {
						top: 50%;
						right: 12px;
						transform: translate(0, -50%);
						position: absolute;
						font-size: 15px;
						color: $primaryColor;
						white-space: nowrap;
					}
				}
			}
		}

		.sure-btn {
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