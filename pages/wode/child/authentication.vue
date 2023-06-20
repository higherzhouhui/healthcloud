<template>
	<view class="container">
		<view class="top-title">请填写您本人的身份信息</view>
		<form>
			<view class="form-box">
				<view class="uni-form-item uni-column">
					<view class="input-box">
						<view class="title">真实姓名</view>
						<input class="uni-input" :disabled="disabled" v-model="name" placeholder="请输入您的真实姓名" />
						<image v-if="name && !disabled" src="../../../static/login/close.png" class="clear"
							@tap="() => name = ''"></image>
					</view>
				</view>
			</view>
			<view class="form-box">
				<view class="uni-form-item uni-column">
					<view class="input-box">
						<view class="title">身份证号</view>
						<input class="uni-input" :disabled="disabled" v-model="idCard" placeholder="请输入您的身份证号" />
						<image v-if="idCard && !disabled" src="../../../static/login/close.png" class="clear"
							@tap="() => idCard = ''"></image>
					</view>
				</view>
			</view>
		</form>
		<view class="sure-btn" @tap="formSubmit" v-if="!disabled">立即认证</view>
		<view class="sure-btn" style="opacity: 0.6;" v-else>如需修改，请您联系在线客服</view>
	</view>
</template>

<script>
import { realName, personalInfo } from '@/api/user'
export default {
	data() {
		return {
			idCard: '',
			name: '',
			disabled: false
		}
	},
	onShow() {
		this.getUserInfo()
	},
	methods: {
		getUserInfo() {
			personalInfo().then(rt=>{
				let {idCard, name, authenticated} = rt.data
				this.idCard = idCard
				this.name = name
				this.disabled = authenticated
			})
		},
		volid() {
			let bol = true;
			let msg = ''
			if (!this.name || !this.name.trim()) {
				bol = false
				msg = '请输入真实姓名'
			} else if (!this.idCard || !this.idCard.trim()) {
				bol = false
				msg = '请输入身份证号'
			}
			if(msg) {
				uni.showToast({ title: msg, icon: 'none' })
			}
			return bol
		},
		formSubmit() {
			if (this.volid()) {
				uni.showModal({
					title: '再次确认',
					content: `姓名：${this.name},身份证号：${this.idCard}`,
					confirmText: '确认无误',
					cancelText: '我要修改',
					success: (showResult) => {
						if (showResult.confirm) {
							this.updateInfo()
						}
					}
				})
			}
		},
		updateInfo() {
			uni.showLoading({
				title: '认证中...'
			})
			realName({name: this.name, idCard: this.idCard}).then(rt=>{
				uni.hideLoading()
				if (rt.code === 200) {
					uni.showToast({ title: '认证成功' })
					this.$store.commit('SET_USERINFO', {...this.$store.state.userInfo, name: this.name})
					setTimeout(() => {
						uni.navigateBack({
							delta: 1
						});
					}, 1000)
				} else {
					uni.showToast({ title: rt.message, icon: 'none' })
				}
			}).catch((err) => {
				uni.hideLoading()
				uni.showToast({ title: err, icon: 'none' })
			})
		}
	}
}
</script>

<style scoped lang="scss">
.container {
	.input-box {
		position: relative;
	}

	.clear {
		width: 20px;
		height: 20px;
		position: absolute;
		right: 0;
		bottom: 0;
	}
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