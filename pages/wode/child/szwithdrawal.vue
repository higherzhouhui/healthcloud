<template>
	<view class="container">
		<view class="top-title">通过姓名、手机号向好友转账</view>
		<form>
			<view class="form-box">
				<view class="uni-form-item uni-column">
					<view class="title">转账额</view>
					<view class="input-box">
						<input class="uni-input" v-model="form.amount" placeholder="请输入转账额" />
						<image v-if="form.amount" src="../../../static/login/close.png" class="clear"
							@tap="() => form.amount = ''"></image>
					</view>
				</view>
			</view>
			<view class="form-box">
				<view class="uni-form-item uni-column">
					<view class="title">手机号</view>
					<view class="input-box">
						<input class="uni-input" v-model="form.phone" placeholder="请输入收款人手机号" />
						<image v-if="form.phone" src="../../../static/login/close.png" class="clear"
							@tap="() => form.phone = ''"></image>
					</view>
				</view>
			</view>
		</form>
		<view class="sure-btn" @tap="formSubmit">立即转账</view>
	</view>
</template>

<script>
import { walletTransfer } from '@/api/user'
export default {
	data() {
		return {
			form: {
				phone: '',
				amount: 0
			}
		}
	},
	onShow() {
		this.getInfo()
	},
	methods: {
		volid() {
			let { amount, phone } = this.form
			let bol = true;
			let msg = ''
			if (!amount || !amount.trim() || isNaN(amount)) {
				bol = false
				msg = '请输入正确的转账额'
			} else if (!phone || !phone.trim() || isNaN(phone)) {
				bol = false
				msg = '请输入正确的收款人手机号'
			}
			if (msg) {
				uni.showToast({ title: msg, icon: 'none' })
			}
			return bol
		},
		getInfo() {
			getUserCard().then(rt => {
				if (rt.data) {
					this.form = rt.data
				}
			})
		},
		formSubmit() {
			
			if (this.volid()) {
				walletTransfer(this.form).then(rt => {
					if (rt.code === 200) {
						uni.showToast({ title: '绑定成功' })
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							});
						}, 1000)

					} else {
						uni.showToast({ title: rt.message || '绑定失败', icon: 'none' })
					}
				})
			}

		}
	}
}
</script>

<style scoped lang="scss">
.container {
	.top-title {
		padding: 13px;
		font-size: 13px;
		font-family: PingFang SC-Regular, PingFang SC;
		font-weight: 400;
		color: #969899;
	}

	.form-box {
		padding: 0 16px;
		background-color: #Fff;

		.uni-form-item {
			padding: 16px 0 10px;
			border-bottom: 1px solid #EBECED;

			.uni-input {
				margin-top: 16px;
				font-size: 15px;
				font-family: PingFang SC-Regular, PingFang SC;
				font-weight: 400;
			}

			.title {
				font-size: 14px;
				font-family: PingFang SC-Regular, PingFang SC;
				font-weight: 400;
				color: #4F5459;
			}
		}

		.input-box {
			position: relative;
		}

		.clear {
			width: 20px;
			height: 20px;
			position: absolute;
			right: 0;
			top: 0;
		}
	}

	.sure-btn {
		padding: 11px 0;
		width: 86.7%;
		margin: 24px auto;
		background-color: #FE1E27FF;
		color: #fff;
		font-size: 15px;
		font-family: PingFang SC-Medium, PingFang SC;
		font-weight: 500;
		text-align: center;
		border-radius: 24px;
	}
}
</style>