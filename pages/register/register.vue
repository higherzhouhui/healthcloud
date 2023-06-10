<template>
	<view class="container">
		<!-- <image src="../../static/login/loginBg.png" class="loginBg"></image> -->
		<view class="main">
			<view class="title">Hi，欢迎来到健享云保！</view>
			<form class="formStyle" @submit="formSubmit">
				<view class="label"><image src="../../static/login/phone.png" class="phoneImg"></image>手机号</view>
				<view class="inputForm">
					<input name="mobilePhone" type="number" maxlength="11" v-model="mobilePhone" class="inputStyle" placeholder="请输入手机号"/>
					<image v-if="mobilePhone" src="../../static/login/close.png" class="clear" @tap="() => mobilePhone = ''"></image>
				</view>
				<view class="label"><image src="../../static/login/yzm.png" class="phoneImg"></image>推荐码</view>
				<view class="inputForm">
					<input :disabled="registerType === 2" type="number" name="inviteCode" maxlength="12" v-model="inviteCode" class="inputStyle" placeholder="请输入推荐码"/>
					<image v-if="inviteCode && registerType === 1" src="../../static/login/close.png" class="clear" @tap="() => inviteCode = ''"></image>
				</view>
				<view class="label"><image src="../../static/login/password.png" class="phoneImg"></image>设置密码</view>
				<view class="inputForm">
					<input name="password" password maxlength="12" v-model="password" class="inputStyle" placeholder="请输入密码"/>
					<image v-if="password" src="../../static/login/close.png" class="clear" @tap="() => password = ''"></image>
				</view>
				<view class="label"><image src="../../static/login/password.png" class="phoneImg"></image>确认密码</view>
				<view class="inputForm">
					<input name="rePassword" password maxlength="12" v-model="rePassword" class="inputStyle" placeholder="请再次输入密码"/>
					<image v-if="rePassword" src="../../static/login/close.png" class="clear" @tap="() => rePassword = ''"></image>
				</view>
				<view class="errorWrapper" v-if="errorMsg">
					<image src="../../static/login/error.png" class="errorImg"></image>
					<text class="errorText">{{ errorMsg }}</text>
				</view>
				<button class="submit" form-type="submit" :loading="loading">注册</button>
			</form>
			<view class="nophone">
				<text>已有账号？</text>
				<text class="link" @tap="handleToPages('login')">立即登录</text>
			</view>
		</view>
		<view class="bottom">
			<text class="agress">登录即代表您同意</text>
			<text class="personal" @tap="handleToPages('personal')">《用户协议》</text>
			<text class="agress">和</text>
			<text class="personal" @tap="handleToPages('privacy')">《隐私协议》</text>
		</view>
	</view>
</template>

<script>
import { mapActions } from "vuex"
import { registerRequest } from "@/api/user.js"
import { getQueryString } from "@/utils/common.js"
	export default {
		data() {
			return {
				mobilePhone:'',
				password: '',
				rePassword: '',
				loading: false,
				errorMsg: '',
				inviteCode: '',
				registerType: 1
			}
		},
		onShow() {
		},
		onLoad(options) {
			const inviteCode = getQueryString('inviteCode')
			if (inviteCode) {
				// 注册类型 1:app注册 2:连接注册
				this.registerType = 2
				this.inviteCode = inviteCode
			}
		},
		methods: {
			...mapActions(["PhoneLogin"]),
			formSubmit(data) {
				// 正在请求不再向下执行
				if (this.loading) {
					return
				}
				const { mobilePhone, password, inviteCode, rePassword } = data?.detail?.value
				if (!mobilePhone) {
					this.errorMsg = '手机号不能为空'
					return
				}
				if (!inviteCode) {
					this.errorMsg = '推荐码不能为空'
					return
				}
				if (!password) {
					this.errorMsg = '密码不能为空'
					return
				}
				if (password.length < 6)
				if (!rePassword) {
					this.errorMsg = '密码长度不能小于6'
					return
				}
				if (password !== rePassword) {
					this.errorMsg = '两次密码不一致'
					return
				}
				this.loading = true
				const params = {
					mobilePhone,
					inviteCode,
					password,
					registerType: this.registerType
				}
				registerRequest(params).then(response => {
					this.loading = false
					if (response.code === 200) {
						this.loading = true
						this.PhoneLogin({mobilePhone, password}).then(res => {
							this.loading = false
							if (res.code === 200) {
								uni.showToast({
									icon: 'success',
									title: '注册成功'
								})
								this.$Router.replaceAll({ name: 'index' })
							} else {
								this.errorMsg = res.message
							}
						})
					} else {
						this.errorMsg = response.message
					}
				}).catch(error => {
					this.loading = false
				})
			},
			handleToPages(page) {
				if (page === 'login') {
					this.$Router.replaceAll({ name: page })
					return
				}
			   uni.navigateTo({url: `/pages/${page}/${page}`});
			},
		},
		watch: {
			mobilePhone(newVal, oldVal){
				this.errorMsg = ''
			},
			inviteCode(newVal, oldVal){
				this.errorMsg = ''
			},
			password(newVal, oldVal){
				this.errorMsg = ''
			},
			rePassword(newVal, oldVal){
				this.errorMsg = ''
			}
		}
	}
</script>

<style scoped lang="scss">
.container{
	background-color: #fff;
	height: 100vh;
	box-sizing: border-box;
}
.loginBg {
	width: 100%;
	object-fit: cover;
}
.main {
	// margin-top: 59px;
	padding: 59px 28px 0;
	position: relative;
	z-index: 9;
}
.label {
	display: flex;
	align-items: center;
	margin: 25px 0 17px 0;
}
.label:first-child {
	margin-top: 0;
}
.title {
	font-size: 22px;
	font-family: PingFang SC-Heavy, PingFang SC;
	font-weight: 800;
	color: #17191A;
	margin-bottom: 40px;
}
.phoneImg {
	width: 22px;
	height: 22px;
	margin-right: 4px;
}
.inputForm {
	position: relative;
	.clear {
		width: 20px;
		height: 20px;
		position: absolute;
		right: 0;
		top: 0;
	}
}
.inputStyle {
	border-bottom: 1px solid #EBECED;
	font-size: 15px;
	line-height: 21px;
	padding-bottom: 7px;
	color: #000;
	&::placeholder {
		font-size: 15px;
		font-family: PingFang SC-Regular, PingFang SC;
		font-weight: 400!important;
		color: #C5C6C7;
		line-height: 21px;
	}
}
.errorWrapper {
	height: 34px;
	background: #FFEBEB;
	border-radius: 4px 4px 4px 4px;
	display: flex;
	align-items: center;
	opacity: 1;
	margin-top: 8px;
	animation: doudong 1.5s .15s linear forwards;

	.errorImg {
		width: 22px;
		height: 22px;
		margin-right: 4px;
	}
	.errorText {
		font-size: 13px;
		font-family: PingFang SC-Regular, PingFang SC;
		font-weight: 400;
		color: #FF4B4B;
		line-height: 17px;
	}
}
.forget {
	font-size: 13px;
	font-family: PingFang SC-Regular, PingFang SC;
	font-weight: 400;
	color: #4F5459;
	line-height: 17px;
	margin-top: 8px;
	width: 100%;
	text-align: right;
}

.submit {
	width: 300px;
	height: 40px;
	background: #FF4B4B;
	border-radius: 22px;
	margin: 32px auto 0 auto;
	font-size: 15px;
	font-family: PingFang SC-Medium, PingFang SC;
	font-weight: 500;
	color: #FFFFFF;
	text-align: center;
	line-height: 40px;
}
.nophone {
	margin-top: 26px;
	text-align: center;
	font-size: 15px;
	font-family: PingFang SC-Medium, PingFang SC;
	font-weight: 600;
	color: #17191A;
	.link {
		color: #17191A;
		text-decoration: underline;
	}
}
.bottom {
	margin-top: 50px;
	padding-bottom: 30px;
	width: 100%;
	text-align: center;
	.agress {
		font-size: 13px;
		font-family: PingFang SC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
		line-height: 17px;
	}
	.personal {
		height: 19px;
		font-size: 13px;
		font-family: PingFang SC-Regular, PingFang SC;
		font-weight: 400;
		color: #FF4B4B;
		line-height: 17px;
	}
}
</style>
