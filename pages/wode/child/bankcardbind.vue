<template>
	<view class="container">
		<view class="top-title">请填写您本人的银行卡信息</view>
		<form>
			<view class="form-box">
				<view class="uni-form-item uni-column">
					<view class="title">姓名</view>
					<view class="input-box">
						<input class="uni-input" v-model="form.name" placeholder="请输入姓名" />
						<image v-if="form.name" src="../../../static/login/close.png" class="clear"
							@tap="() => form.name = ''"></image>
					</view>
				</view>
			</view>
			<view class="form-box">
				<view class="uni-form-item uni-column">
					<view class="title">所属银行</view>
					<view class="input-box">
						<input class="uni-input" v-model="form.bankName" placeholder="请输入所属银行" />
						<image v-if="form.bankName" src="../../../static/login/close.png" class="clear"
							@tap="() => form.bankName = ''"></image>
					</view>
				</view>
			</view>
			<view class="form-box">
				<view class="uni-form-item uni-column">
					<view class="title">银行卡号</view>
					<view class="input-box">
						<input class="uni-input" v-model="form.bankCode" placeholder="请输入银行卡号" />
						<image v-if="form.bankCode" src="../../../static/login/close.png" class="clear"
							@tap="() => form.bankCode = ''"></image>
					</view>

				</view>
			</view>
		</form>
		<view class="sure-btn" @tap="formSubmit">立即绑定</view>
	</view>
</template>

<script>
import { getUserCard, saveOrUpdateCard } from '@/api/bank'
export default {
	data() {
		return {
			form: {
				bankCode: '',
				bankName: '',
				name: ''
			}
		}
	},
	onShow() {
		this.getInfo()
	},
	methods: {
		volid() {
			let { bankCode, bankName, name } = this.form
			let bol = true;
			let msg = ''
			if (!name || !name.trim()) {
				bol = false
				msg = '请输入姓名'
			} else if (!bankName || !bankName.trim()) {
				bol = false
				msg = '请输入所属银行'
			} else if (!bankCode || !bankCode.trim()) {
				bol = false
				msg = '请输入银行卡号'
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
				saveOrUpdateCard(this.form).then(rt => {
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