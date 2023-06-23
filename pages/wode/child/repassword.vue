<template>
	<view class="container">
		<form>
			<view class="form-box">
				<view class="uni-form-item uni-column">
					<view class="title">验证原密码</view>
					<view class="input-box">
						<input class="uni-input" placeholder="请输入原密码" :password="showPassword" v-model="form.password" />
						<image v-if="form.password" src="../../../static/login/close.png" class="clear"
							@tap="() => form.password = ''"></image>
					</view>
				</view>
			</view>
			<view class="form-box">
				<view class="uni-form-item uni-column">
					<view class="title">设置新密码</view>
					<view class="input-box">
						<input class="uni-input" placeholder="请输入新密码" :password="showPassword" v-model="form.newPassword" />
						<image v-if="form.newPassword" src="../../../static/login/close.png" class="clear"
							@tap="() => form.newPassword = ''"></image>
					</view>
				</view>
			</view>
			<view class="form-box">
				<view class="uni-form-item uni-column">
					<view class="title">再次输入新密码</view>
					<view class="input-box">
						<input class="uni-input" placeholder="请再次输入新密码" :password="showPassword"
							v-model="form.reNewPassword" />
						<image v-if="form.reNewPassword" src="../../../static/login/close.png" class="clear"
							@tap="() => form.reNewPassword = ''"></image>
					</view>
				</view>
			</view>
		</form>
		<view class="sure-btn" @tap="formSubmit">确认修改</view>
	</view>
</template>

<script>
import { updatePassword } from '@/api/user'
export default {
	data() {
		return {
			showPassword: true,
			form: {
				password: '',
				newPassword: '',
				reNewPassword: ''
			}
		}
	},
	methods: {
		valid() {
			let bol = true;
			let msg = ''
			let { password, newPassword, reNewPassword } = this.form
			if (!password || !password.trim()) {
				bol = false
				msg = '请输入原密码'
			} else if (!newPassword || !newPassword.trim()) {
				bol = false
				msg = '请输入新密码'
			} else if (!reNewPassword || !reNewPassword.trim()) {
				bol = false
				msg = '请再次输入新密码'
			} else if (reNewPassword != newPassword) {
				bol = false
				msg = '重复输入密码不一致'
			}
			if (msg) {
				uni.showToast({ title: msg, icon: 'none' })
			}
			return bol
		},
		formSubmit() {
			if (this.valid()) {
				let { password, newPassword } = this.form
				updatePassword({ password, newPassword }).then(rt => {
					if (rt.data) {
						uni.showToast({ title: '修改成功' })
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							});
						}, 1000)

					} else {
						uni.showToast({ title: rt.message || '修改失败', icon: 'none' })
					}
				})
			}
		},

	}
}
</script>

<style scoped lang="scss">
@import "@/static/customicons.scss"; 

.container {
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

	.sure-btn {
		padding: 11px 0;
		width: 86.7%;
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