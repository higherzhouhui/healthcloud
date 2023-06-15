<template>
	<view>
		<view class="item no-border avatar-item" @tap="handleUploadAvatar">
			<view class="key">
				头像
			</view>
			<image :src="info.avatar || '../../../static/wode/avatar.png'" class="avatar value"></image>
		</view>
		<view class="item" @tap="linkTo('authentication', info.authenticated)">
			<view class="key">
				姓名
			</view>
			<view class="value">
				{{ info.name || '未实名' }}
			</view>
		</view>
		<view class="item">
			<view class="key">
				手机号
			</view>
			<view class="value">
				{{ hideMiddlePhone(info.mobilePhone) }}
			</view>
		</view>
		<view class="item">
			<view class="key">
				邀请码
			</view>
			<view class="value" @click="copy">
				{{ info.inviteCode }}
				<image class="copy-icon" src="../../../static/wode/copy-icon.png" mode=""></image>
			</view>
		</view>
		<view class="item no-border" @click="linkTo()">
			<view class="key">
				修改密码
			</view>
			<view class="value">
				<image class="right-icon" src="../../../static/wode/right-icon.png" mode=""></image>
			</view>
		</view>
		<view class="item center no-border" @tap="logOut">
			退出登录
		</view>
	</view>
</template>

<script>
import { updateAvatarRequest } from '@/api/user'
import { hideMiddlePhone } from "@/utils/common"
import { mapActions } from "vuex"
import {
    URL
} from '@/config/index.js'
export default {
	data() {
		return {
			onerror: false,
			info: {
			},
			hideMiddlePhone: hideMiddlePhone,
			avatarUrlError: false
		}
	},
	onShow() {
		this.getUserInfo()
	},
	methods: {
		sm() {
				uni.scanCode({
					success: function (res) {
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
					}
				});

			},
		...mapActions(["Logout"]),
		copy() {
			uni.showToast({ title: '复制成功' })
			uni.setClipboardData({
				data: this.info.inviteCode
			});
		},
		linkTo(path = 'repassword', bol = false) {
			if(bol) return 
			uni.navigateTo({ url: "/pages/wode/child/" + path });
		},
		logOut() {
			const _this = this
				uni.showModal({
					title: '提示',
					content: '确认退出登录？',
					success: function (res) {
						if (res.confirm) {
							_this.Logout().then(res => {
								_this.$Router.replaceAll({ name: 'index' })
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
		},
		getUserInfo() {
			// personalInfo().then(rt=>{
			// 	this.info = rt.data
			// })
			this.info = this.$store.state.userInfo
		},
		handleUploadAvatar() {
			// 获取图片
			let that = this;
			// 选择图片
			uni.chooseImage({
			  success(res) {
				const tempFilePaths = res.tempFilePaths[0];
				uni.uploadFile({
				  url: `${URL}/admin/upload/uploadImage`,
				  filePath: tempFilePaths,
				  name: 'file',
				  formData: {
				    'user': 'test'
				  },
				  success: function (res) {
					  const response = JSON.parse((res.data))
				    updateAvatarRequest({
						avatar: response.data,
						idCard: that.info.idCard,
						name: that.info.name
					}).then(avatarRes => {
						if (avatarRes.code === 200) {
							that.info.avatar = response.data;
							that.$store.commit('SET_USERINFO', that.info)
						}
					})
				  },
				  fail: function (res) {
				    console.log('上传失败：', res);
				  }
				});
			  }
			});
		}
	}
}
</script>

<style scoped lang="scss">
.item {
	padding: 22px 16px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 15px;
	font-family: PingFang SC-Regular, PingFang SC;
	font-weight: 400;
	border-bottom: 1px solid #EBECED;
	background-color: #fff;

	&.no-border {
		border: unset;
	}

	&.avatar-item {
		padding: 5px 16px;
	}

	&.center {
		margin-top: 12px;
		justify-content: center;
		font-size: 15px;
		font-family: PingFang SC-Regular, PingFang SC;
		font-weight: 400;
		color: #4F5459;
	}

	.key {
		color: #4F5459;
	}

	.value {
		color: #17191A;

		&.avatar {
			width: 55px;
			height: 55px;
			border-radius: 50%;
		}

		.copy-icon {
			margin-left: 16px;
			width: 20px;
			height: 20px;
			vertical-align: middle;
		}

		.right-icon {
			width: 12px;
			height: 12px;
		}
	}
}</style>