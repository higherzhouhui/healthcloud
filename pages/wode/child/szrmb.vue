<template>
	<view class="container">
		<view class="top-bg">
			
		</view>
		
		

		<view class="top-info">
			<image class="img" src="../../../static/xiangmu/shuzirenmingbi.png"></image>
			
			<view class="top-info-box">
				<view class="flex j-s-b">
					<view class="txt">
						钱包余额
					</view>
					<view class="flex" @tap="to('recharge')">
						<view class="txts">
							充值
						</view>
						<image class="imgs" src='../../../static/xiangmu/gengduo.png'></image>
					</view>
				</view>
				
				<view class='input-form'>
					<view class="input-box">
						<view class="fh">￥</view>
						<view class="price">{{ price }}</view>
					</view>
				</view>
				<view class="flex j-s-b">
					<view class="sure-btn sure-btn1" @tap="to('szwithdrawal')">转账</view>
					<view class="sure-btn" @tap="to('collection')" >收款</view>
				</view>
				
			</view>
		</view>
		
	</view>
</template>

<script>
import {walletWithdraw} from '@/api/user'
	export default {
		data() {
			return {
				amount: 10000,
				txPrice: null,
				type: '',
				price: 0
			}
		},
		onLoad(option) {
			this.price = option.value || 0
		},
		methods: {
			to(link) {
				uni.navigateTo({
					url:`/pages/wode/child/${link}`
				})
			},
			withdrawal() {
				
			}
		},
	}
</script>

<style scoped lang="scss">
	.container{
		.top-bg{
			position: relative;
			width: 100%;
			padding-bottom: 90%;
			background: linear-gradient(180deg, #F31E27 0%, #F58972 56%, #F5F6F7 100%);
			
			.top-box{
				position: absolute;
				padding: 24px 16px;
				width: 100%;
				height: 100%;
				font-size: 14px;
				font-family: PingFang SC-Regular, PingFang SC;
				font-weight: 400;
				color: #fff;
				.count-txt{
					margin-top: 5px;
					font-size: 32px;
					font-family: DIN-Bold, DIN;
					font-weight: bold;
					.fh{
						display: inline-block;
						font-size: 24px;
						font-family: PingFang SC-Regular, PingFang SC;
						font-weight: 400;
					}
				}
			}
			
		}
		.img{
			width: 100%;
		}
		.top-info{
			width: 93.33%;
			// padding-bottom: 30.07%;
			position: relative;
			top: -300px;
			margin: auto;
			.flex{
				display: flex;
				align-items: center;
				.imgs{
					width: 20px;
					height: 20px;
				}
				.txts{
					color: rgba(254, 30, 39, 1);
				}
			}
			.j-s-b{
				justify-content: space-between;
			}
			.top-info-box{
				// position: absolute;
				margin-top: -6px;
				padding: 28px 16px;
				box-sizing: border-box;
				width: 100%;
				height: 100%;
				background-color: #fff;
				border-radius: 0 0 8px 8px;
				font-size: 15px;
				font-family: PingFang SC-Regular, PingFang SC;
				font-weight: 400;
				color: #17191AFF;
				.input-form{
					margin-top: 24px;
					display: flex;
					justify-content: space-between;
					align-items: baseline;
					.fh{
						display: inline-block;
						font-size: 24px;
						margin-right: 5px;
					}
					.input-box{
						display: flex;
						align-items: center;
						input{
							font-size: 24px;
							color: #FE1E27FF;
						}
					}
					.all{
						font-size: 15px;
						color: #FE1E27FF;
						white-space: nowrap;
					}
				}
				.price{
					font-size: 32px;
					font-family: PingFang SC-Semibold, PingFang SC;
					font-weight: 600;
					color: #17191A;
				}
			}
		}
		.sure-btn{
			
			padding: 11px 0;
			width: 46%;
			margin: 34px auto 0;
			background-color: #FE1E27FF;
			color: #fff;
			font-size: 15px;
			font-family: PingFang SC-Medium, PingFang SC;
			font-weight: 500;
			text-align: center;
			border-radius: 24px;
			&.sure-btn1{
				
				background: #FEEAEA;
				color: #FE1E27;
			}
		}
	}
</style>