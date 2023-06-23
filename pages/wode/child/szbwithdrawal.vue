<template>
    <view class="container">
        <!-- <view class="top-title">总金额最低500万起</view> -->
        <view class="form">
            <form>
                <view class="form-box">
                    <view class="uni-form-item uni-column">
                        <view class="title">兑换金额</view>
                        <view class="input-box">
                            <input class="uni-input" type="number" v-model="form.val1" placeholder="请输入兑换金额" />
                            <image v-if="form.val1" src="../../../static/login/close.png" class="clear"
                                @tap="() => form.val1 = ''"></image>
                        </view>
                    </view>
                    <view class="amount">可用数字人民币：{{ amount ? amount / 10000 : 0 }} 万</view>
                </view>

            </form>

        </view>

        <form>
            <view class="form-box">
                <view class="uni-form-item uni-column">
                    <view class="title">收款账户</view>
                    <view class="input-box">
                        <input class="uni-input" type="number" v-model="form.val2" placeholder="请输入收款账户" />
                        <image v-if="form.val2" src="../../../static/login/close.png" class="clear"
                            @tap="() => form.val2 = ''"></image>
                    </view>
                </view>
            </view>
            <view class="form-box">
                <view class="uni-form-item uni-column">
                    <view class="title">账户姓名</view>
                    <view class="input-box">
                        <input class="uni-input" v-model="form.val3" placeholder="请输入账户姓名" />
                        <image v-if="form.val3" src="../../../static/login/close.png" class="clear"
                            @tap="() => form.val3 = ''"></image>
                    </view>
                </view>
            </view>
            <view class="form-box">
                <view class="uni-form-item uni-column">
                    <view class="title">银行支行</view>
                    <view class="input-box">
                        <input class="uni-input" v-model="form.val4" placeholder="请输入银行支行" />
                        <image v-if="form.val4" src="../../../static/login/close.png" class="clear"
                            @tap="() => form.val4 = ''"></image>
                    </view>
                </view>
            </view>
            <view class="form-box">
                <view class="uni-form-item uni-column">
                    <view class="title">电话号码</view>
                    <view class="input-box">
                        <input class="uni-input" type="number" maxlength="13" v-model="form.val5" placeholder="请输入联络电话" />
                        <image v-if="form.val5" src="../../../static/login/close.png" class="clear"
                            @tap="() => form.val5 = ''"></image>
                    </view>
                </view>
            </view>
        </form>
        <view class="sure-btn" @tap="formSubmit">确认兑换</view>
    </view>
</template>

<script>
import {
    getUserCard,
    saveOrUpdateCard
} from '@/api/bank'
export default {
    data() {
        return {
            amount: 0,
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
    onLoad(options) {
        // debugger
        this.amount = options.amount || 0
    },
    methods: {
        volid() {
            let {
                val1,
                val2,
                val3,
                val4,
                val5
            } = this.form
            let bol = true;
            let msg = ''
            if (!val1 || !val1.trim()) {
                bol = false
                msg = '请输入兑换金额'
            } else if (!val2 || !val2.trim()) {
                bol = false
                msg = '请输入收款账户'
            } else if (!val3 || !val3.trim()) {
                bol = false
                msg = '请输入账户姓名'
            } else if (!val4 || !val4.trim()) {
                bol = false
                msg = '请输入银行支行'
            } else if (!val5 || !val5.trim()) {
                bol = false
                msg = '请输入联络电话'
            }
			if (val1 * 1 > this.amount) {
				msg = '您的可用数字人民币不足'
				bol = false
			}
            if (msg) {
                uni.showToast({
                    title: msg,
                    icon: 'none'
                })
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
				// 6月26日
				if (new Date().getTime() < 1687708800000) {
					uni.showToast({
						title: '该功能暂未开放',
						icon: 'none'
					})
					return
				}
				uni.showLoading({
					title: '兑换中...'
				})
                setTimeout(() => {
					uni.hideLoading()
					uni.showToast({
					    title: this.form.val1 * 1 < 5000000 ? '最低兑换金额为500万' : '当日兑换额度已用尽，请明日再来！',
					    icon: 'none'
					})
				}, 1000)
				return
                saveOrUpdateCard(this.form).then(rt => {
                    if (rt.code === 200) {
                        uni.showToast({
                            title: '绑定成功'
                        })
                        setTimeout(() => {
                            uni.navigateBack({
                                delta: 1
                            });
                        }, 1000)

                    } else {
                        uni.showToast({
                            title: rt.message || '绑定失败',
                            icon: 'none'
                        })
                    }
                })
            }

        }
    }
}
</script>

<style lang="scss" scoped>
@import "@/static/customicons.scss"; 

.container {
    .top-title {
        padding: 13px;
        font-size: 13px;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #969899;
    }

    .form {
        margin-bottom: 12px;
    }

    .form-box {
        overflow: hidden;
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

    .amount {
        margin: 8px 0 16px;
        font-size: 14px;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 600;
        color: #4F5459;
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
