<template>
	<view class="container">
		<!-- <image src="../../static/login/loginBg.png" class="loginBg"></image> -->
		<view class="main">
			<view class="title">找回密码</view>
			<form class="formStyle" @submit="formSubmit">
				<view class="label"><image src="../../static/login/people.png" class="phoneImg"></image>姓名</view>
				<view class="inputForm">
					<input name="name" maxlength="11" v-model="name" class="inputStyle" placeholder="请输入姓名"/>
					<image v-if="name" src="../../static/login/close.png" class="clear" @tap="() => name = ''"></image>
				</view>
				<view class="label"><image src="../../static/login/id.png" class="phoneImg"></image>身份证号</view>
				<view class="inputForm">
					<input name="idCard" type="number" maxlength="18" v-model="idCard" class="inputStyle" placeholder="请输入身份证号"/>
					<image v-if="idCard" src="../../static/login/close.png" class="clear" @tap="() => idCard = ''"></image>
				</view>
				<view class="label"><image src="../../static/login/password.png" class="phoneImg"></image>设置密码</view>
				<view class="inputForm">
					<input name="password" password maxlength="16" v-model="password" class="inputStyle" placeholder="请输入密码"/>
					<image v-if="password" src="../../static/login/close.png" class="clear" @tap="() => password = ''"></image>
				</view>
				<view class="label"><image src="../../static/login/password.png" class="phoneImg"></image>确认密码</view>
				<view class="inputForm">
					<input name="rePassword" password maxlength="16" v-model="rePassword" class="inputStyle" placeholder="请再次输入密码"/>
					<image v-if="rePassword" src="../../static/login/close.png" class="clear" @tap="() => rePassword = ''"></image>
				</view>
				<view class="errorWrapper" v-if="errorMsg">
					<image src="../../static/login/error.png" class="errorImg"></image>
					<text class="errorText">{{ errorMsg }}</text>
				</view>
				<button class="submit" form-type="submit" :loading="loading">确认</button>
				<button class="reback" @tap="handleToPages('login')">返回登录</button>
			</form>
		</view>
	</view>
</template>

<script>
import { resetPasswordRequest } from "@/api/user.js"
	export default {
		data() {
			return {
				name:'',
				password: '',
				rePassword: '',
				loading: false,
				errorMsg: '',
				idCard: '',
			}
		},
		onShow() {
		},
		methods: {
			formSubmit(data) {
				// 正在请求不再向下执行
				if (this.loading) {
					return
				}
				const { name, password, idCard, rePassword } = data?.detail?.value
				if (!name) {
					this.errorMsg = '手机号不能为空'
					return
				}
				if (!idCard) {
					this.errorMsg = '身份证号不能为空'
					return
				}
				if (!password) {
					this.errorMsg = '密码不能为空'
					return
				}
				if (!rePassword) {
					this.errorMsg = '密码不能为空'
					return
				}
				if (password !== rePassword) {
					this.errorMsg = '两次密码不一致'
					return
				}
				this.loading = true
				const params = {
					name,
					idCard,
					password
				}
				resetPasswordRequest(params).then(response => {
					this.loading = false
					if (response.code === 200) {
						this.loading = true
						uni.showToast({
							icon: 'success',
							title: '密码重置成功'
						})
						this.$Router.replaceAll({ name: 'login' })
					} else {
						this.errorMsg = response.message
					}
				}).catch(error => {
					this.loading = false
				})
			},
			handleToPages(page) {
				// uni.navigateTo({url: `/pages/${page}/${page}`});
			   this.$Router.replaceAll({ name: page })
			},
		},
		watch: {
			name(newVal, oldVal){
				this.errorMsg = ''
			},
			idCard(newVal, oldVal){
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
@import "@/static/customicons.scss"; 
.loginBg {
	width: 100%;
	object-fit: cover;
}
.container {
	min-height: 100vh;
	background-color: #fff;
}
.main {
	padding: 59px 28px 50px 28px;
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
	background: $primaryColor;
	border-radius: 22px;
	margin: 32px auto 0 auto;
	font-size: 15px;
	font-family: PingFang SC-Medium, PingFang SC;
	font-weight: 500;
	color: #FFFFFF;
	text-align: center;
	line-height: 40px;
}
.reback {
	width: 300px;
	height: 40px;
	border: 1px solid $primaryColor;
	border-radius: 22px;
	margin: 32px auto 0 auto;
	font-size: 15px;
	font-family: PingFang SC-Medium, PingFang SC;
	font-weight: 500;
	color: #000;
	text-align: center;
	line-height: 40px;
}
</style>
