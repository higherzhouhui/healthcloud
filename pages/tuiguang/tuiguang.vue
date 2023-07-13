<template>
	<view class="container">
		<view class="mask" v-if="ruleVisible">
			<view class="rule-box">
				<view class="txt">
					奖励规则
				</view>
				<!-- <view v-for="(item, index) in rules" :key="index">
					<view class="title">{{ item.title }}</view>
					<view class="section">
						<view class="line" v-for="(value, iindex) in item.list" :key="iindex">
							{{ value }}
						</view>
					</view>
				</view> -->
				<view class="box-content" v-html="rules"></view>
				<image @tap="ruleHide" class="close" src="../../static/tuiguang/close.png"></image>
			</view>

		</view>

		<view class="bg-box">
			<image class="bg" src="../../static/tuiguang/bg.png" alt="" />
		</view>
		<view class="rule" @tap="ruleShow">规则</view>
		<view class="box">
			<view class="item" v-for="(item, index) in list" :key="item.id">
				<view class="top-info">
					<view class="avatar-box">
						<img class="avatar" :src="item.icon" :onerror="`this.src='${icon}'`" alt="" />
						<view class="avatar-info">
							<view class="name">推广奖励金：{{ item.amount }}/月</view>
							<view class="num">
								已邀请青铜会员：{{ item.thenInviteNum }}人</view>
							<view class="txt">邀请 <view class="numed">{{ item.inviteNum }}个</view>青铜会员即可达标</view>
						</view>
					</view>
					<view class="button"
						:class="[item.receiveState == 1 && 'received', item.inviteNum > item.thenInviteNum && 'no-allow']"
						@tap="receive(item, index)">
						{{ item.receiveState == 1 ? '已领取' : '立即领取' }}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { getExpandList, getExpandRule, receiveExpand } from '@/api/promotion'
export default {
	data() {
		return {
			icon: 'https://alipic.lanhuapp.com/web475b3b1e-96fa-4a25-be45-7c2868ddce63',
			rules: '',
			list: [],
			ruleVisible: false
		}
	},
	methods: {
		receive(item, index) {
			let { id, receiveState, inviteNum, thenInviteNum } = item
			if(inviteNum > thenInviteNum) return
			if (receiveState == 1) {
				return uni.showToast({ title: '已领取' })
			}
			receiveExpand(id).then(rt => {
				if (rt.code == 200) {
					uni.showToast({ title: '领取成功' })
					this.$set(this.list[index], 'receiveState', 1)
				} else {
					uni.showToast({ title: rt.message || '领取失败', icon: 'none' })
				}
			})
		},
		ruleShow() {
			this.ruleVisible = true
			uni.hideTabBar()
		},
		ruleHide() {
			this.ruleVisible = false
			uni.showTabBar()
		},
		getList() {
			getExpandList().then(rt => {
				uni.stopPullDownRefresh()
				this.list = rt.data
			})
		},
		getRules() {
			getExpandRule().then(rt => {
				this.rules = rt.data
			})
		}
	},
	onLoad() {
		this.getRules()
		this.getList()
	},
	onPullDownRefresh() {
		// 执行刷新操作
		this.getRules()
		this.getList()
	},
}
</script>

<style scoped lang="scss">
@import "@/static/customicons.scss"; 

.container {
	.bg-box {
		width: 100%;
		position: relative;
		padding-bottom: 56%;

		.bg {
			position: absolute;
			width: 100%;
			height: 100%;
		}
	}

	.mask {
		position: fixed;
		left: 0;
		top: 0;
		z-index: 999999;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, .6);
	}

	.rule-box {
		padding: 21px 16px 16px;
		position: absolute;
		top: 50%;
		left: 50%;
		width: 77.3%;
		transform: translate(-50%, -50%);
		background-color: #fff;
		border-radius: 14px;
		border: 5px solid #EBECEDFF;

		.txt {
			// position: absolute;
			// width: 100%;
			// top: 50%;
			// transform: translateY(-50%);
			margin-bottom: 12px;
			text-align: center;
			font-size: 18px;
			font-family: PingFang SC-Semibold, PingFang SC;
			font-weight: 600;
			color: $primaryColor;
		}

		.box-content {
			word-break: break-all;
			max-width: 100%;
			max-height: 500px;
			overflow: auto;
			min-height: 200px;
			font-size: 13px;
			line-height: 21px;
		}

		.close {
			position: absolute;
			left: 50%;
			bottom: -60px;
			transform: translateX(-50%);
			width: 30px;
			height: 30px;

		}

		.title {
			margin-bottom: 7px;
			font-size: 15px;
			font-family: PingFang SC-Semibold, PingFang SC;
			font-weight: 600;
			color: #17191A;
		}

		.section {
			margin-bottom: 10px;

			.line {
				margin-bottom: 4px;
				font-size: 13px;
				font-family: PingFang SC-Regular, PingFang SC;
				font-weight: 400;
				color: #4F5459;
			}
		}

	}

	.rule {
		position: absolute;
		right: 0;
		top: 13%;
		padding: 2px 8px;
		font-size: 12px;
		border-radius: 10px 0 0 10px;
		background-color: rgba(34, 34, 34, .2);
		color: #fff;
	}

	.box {
		position: relative;
		z-index: 1;
		margin-top: -25px;
		padding: 12px;
	}

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
				align-items: top;

				.avatar {
					margin-right: 8px;
					width: 48px;
					height: 48px;
					border-radius: 8px;
				}

				.avatar-info {
					.name {
						color: #17191A;
						font-size: 15px;
						font-weight: 600;
					}

					.num {
						padding: 1px 4px;
						border-radius: 4px;
						margin-top: 5px;
						font-size: 12px;
						font-family: PingFang SC-Regular, PingFang SC;
						font-weight: 400;
						color: #F2A63A;
						background-color: #FDF2D4;

					}

					.txt {
						font-size: 12px;
						font-family: PingFang SC-Regular, PingFang SC;
						font-weight: 400;
						color: #969899;

						.numed {
							margin-top: 3px;
							display: inline-block;
							color: #17191A;
							font-family: PingFang SC-Regular;
							font-weight: Regular;
						}
					}
				}
			}

			.button {
				padding: 6px 12px;
				background: linear-gradient(90deg, #FF6C5E 0%, #FF4F6D 100%);
				;
				font-size: 13px;
				font-family: PingFang SC-Regular, PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
				border-radius: 16px;

				&.received {

					background: #DFDFE0;
				}

				&.no-allow {
					opacity: .5;
				}
			}
		}
	}
}</style>
