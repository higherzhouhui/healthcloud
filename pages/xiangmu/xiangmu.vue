<template>
	<view>
		<view class="tabs" :class="css">
			<view class="tabs-item" @tap="type = item.type" :class="item.type == type && 'active'" v-for="item in tabs"
				:index="item.type">
				<view class="txt">{{ item.label }}</view>
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
					<view class="button" @tap="toBuy(item, 1)">
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
						<view class="value value2">{{ item.price }}</view>
						<view class="txt">购买价格</view>
					</view>
				</view>
			</view>
		</view>
		<view class="gq" v-else>
			<img :src="gqData.image" class="img" v-if="gqData.image" alt="">
			<image v-else class="img" src='../../static/xiangmu/guquan.png'></image>
			<view class="gq-box">
				<view class="gq-box-title">
					<view class="price">￥{{ gqData.price }}</view> 元/份
				</view>
				<view class="gq-box-content" v-html="gqData.details">
					<!-- <view class="gq-box-content-title">
						健享云保健康医疗原始股权
					</view>
					<view class="gq-box-content-p">
						云之健在老大的带领下，响应国家号召，全面实现健康所需。
					</view>
					<view class="gq-box-content-p">
						早投资早收益，凡是购买股权的家人，均可获得800积分，终身享受股权收益。
					</view>
					<view class="gq-box-content-p">
						股权每日分红2.8%，分红可立即提现，同时额外事有社保补贴金每日分红3.5%，社保补贴金每月可提现。
					</view> -->
				</view>
				<view class="gq-box-content">
					<view class="item flex j-s-b">
						<view>
							起购数量
						</view>
						<view>
							{{ gqData.base }}
						</view>
					</view>
					<view class="item flex j-s-b">
						<view>
							购买数量
						</view>
						<view class="flex choice">
							<image class="imgs js" src="../../static/xiangmu/js.png" @tap="choice(-1)"></image>
							<view class="input">{{ gqData.count + gqData.base }}</view>
							<image class="imgs add" src="../../static/xiangmu/zj.png" @tap="choice(1)"></image>
						</view>
					</view>
				</view>
				<view class="gq-box-content flex j-s-b">
					<view class="flex">
						<view>合计金额：</view>
						<view class="price">￥{{ price }}</view>
					</view>
					<view class="btn" @tap="toBuy({ price }, 2, gqData.count)">
						提交订单
					</view>
				</view>
			</view>

		</view>
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
				{ label: '理财计划', type: 1 },
				{ label: '股权', type: 2 }
			],
			type: 1,
			css: window ? 'h5css' : 'appcss',
			gqData: {
				price: 8,
				count: 0,
				base: 100,
				details: ''
			}
		}
	},
	computed: {
		price() {
			return this.gqData.price * (this.gqData.count + this.gqData.base)
		}
	},
	watch: {
		type() {
			this.getList()
		}
	},
	onLoad() {
		this.getList()
	},
	onPullDownRefresh() {
		// 执行刷新操作
		this.getList()
	},
	methods: {
		getList() {
			getProjectList({ projectType: this.type }).then(rt => {
				uni.stopPullDownRefresh()
				this.list = rt.data
				if (this.type == 2 && this.list[0]) {
					this.gqData = Object.assign({}, this.gqData, this.list[0])
				}
			})
		},
		choice(num) {
			let { count } = this.gqData
			let val = count + num
			if (val < 0) return
			this.gqData.count = val
		},
		toBuy(item, type, num) {
			if (type == 2 && this.list[0]) {
				item.id = this.list[0].id
			}
			item.type = type
			item.num = num
			uni.navigateTo({ url: "/pages/xiangmu/buy?item=" + encodeURIComponent(JSON.stringify(item)) });
		}
	}
}
</script>

<style scoped lang="scss">
.tabs {
	position: fixed;
	top: 0;
	width: 100%;
	display: flex;
	background-color: #fff;
	z-index: 2;

	&.h5css {
		top: 40px;
	}

	.tabs-item {
		padding: 10px 0 0;
		flex: 1;
		text-align: center;
		font-size: 15px;
		font-family: PingFang SC-Medium, PingFang SC;
		font-weight: 400;
		height: 40px;
		line-height: 40px;
		background-color: #fff;

		.txt {
			// padding: 0 4px 10px;
			display: inline-block;
		}

		&.active {
			color: #FE1E27FF;
			font-weight: 500;

			.txt {
				border-bottom: 3px solid;
			}
		}
	}
}

.gq {
	.img {
		margin-top: 45px;
		width: 100%;
		font-size: 0;
	}

	.gq-box {
		margin-top: -6px;

		.gq-box-title {
			padding-left: 12px;
			box-sizing: border-box;
			display: flex;
			background-color: #FE1E27FF;
			height: 38px;
			line-height: 38px;
			font-size: 13px;
			font-family: PingFang SC-Semibold, PingFang SC;
			font-weight: 600;
			color: #FFFFFF;

			.price {
				font-size: 20px;
			}
		}

		.flex {
			display: flex;
			align-items: center;
			font-size: 13px;
			font-family: PingFang SC-Regular, PingFang SC;
			font-weight: 400;
			color: #17191A;

			&.choice {
				border-radius: 4px;
				border: 1px solid #C5C6C7;
			}

			.btn {
				padding: 0 16px;
				font-weight: 400;
				color: #FFFFFF;
				height: 32px;
				line-height: 32px;
				background: #FE1E27;
				border-radius: 16px;
			}

			.imgs {
				padding: 4px;
				width: 15px;
				height: 15px;

				&.js {
					border-right: 1px solid #C5C6C7;
				}

				&.add {
					border-left: 1px solid #C5C6C7;
				}
			}

			.input {
				width: 50px;
				font-size: 15px;
				font-family: PingFang SC-Medium, PingFang SC;
				font-weight: 500;
				color: #17191A;
				height: 23px;
				line-height: 23px;
				text-align: center;
			}
		}

		.j-s-b {
			justify-content: space-between;
		}

		.gq-box-content {
			margin-bottom: 12px;
			padding: 16px 12px;
			background-color: #fff;

			.price {
				font-size: 20px;
				font-family: PingFang SC-Semibold, PingFang SC;
				font-weight: 600;
				color: #FE1E27;
			}

			.item {
				font-size: 15px;
				font-family: PingFang SC-Medium, PingFang SC;
				font-weight: 500;
				color: #17191A;

				&:first-child {
					margin-bottom: 16px;
				}
			}
		}

		.gq-box-content-title {
			font-size: 15px;
			font-family: PingFang SC-Medium, PingFang SC;
			font-weight: 500;
			color: #17191A;
		}

		.gq-box-content-p {
			margin-top: 12px;
			font-size: 13px;
			font-family: PingFang SC-Regular, PingFang SC;
			font-weight: 400;
			color: #4F5459;
		}
	}
}
.container {

	padding: 62px 12px 12px;

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
}
</style>
