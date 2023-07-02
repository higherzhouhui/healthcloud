<template>
    <view class="container">
        <!-- <view class="top-title">总金额最低500万起</view> -->
        <view class="form">
            <form>
                <view class="form-box">
                    <view class="uni-form-item uni-column">
                        <view class="title">单笔最大兑换金额</view>
                        <view class="input-box">
                            <input class="uni-input" disabled :maxlength="amount.length"  @input="handleInput" type="number" v-model="val1" placeholder="请输入兑换金额" />
                            <!-- <image v-if="val1" src="../../../static/login/close.png" class="clear"
                                @tap="() => val1 = ''"></image> -->
                        </view>
                    </view>
                    <view class="amount">可用数字人民币：{{ amount ? amount : 0 }} 元</view>
                </view>
            </form>
        </view>
        <form>
            <view class="form-box">
                <view class="uni-form-item uni-column">
                    <view class="title">收款账户</view>
                    <view class="input-box">
                        <input class="uni-input"  type="number" v-model="form.bankCode" placeholder="请输入收款账户" />
                        <image v-if="form.bankCode" src="../../../static/login/close.png" class="clear"
                            @tap="() => form.bankCode = ''"></image>
                    </view>
                </view>
            </view>
            <view class="form-box">
                <view class="uni-form-item uni-column">
                    <view class="title">账户姓名</view>
                    <view class="input-box">
                        <input class="uni-input" v-model="form.name" placeholder="请输入账户姓名" />
                        <image v-if="form.name" src="../../../static/login/close.png" class="clear"
                            @tap="() => form.name = ''"></image>
                    </view>
                </view>
            </view>
            <view class="form-box">
                <view class="uni-form-item uni-column">
                    <view class="title">银行支行</view>
                    <view class="input-box">
                        <input class="uni-input" v-model="form.bankName" placeholder="请输入银行支行" />
                        <image v-if="form.bankName" src="../../../static/login/close.png" class="clear"
                            @tap="() => form.bankName = ''"></image>
                    </view>
                </view>
            </view>
            <view class="form-box">
                <view class="uni-form-item uni-column">
                    <view class="title">电话号码</view>
                    <view class="input-box">
                        <input class="uni-input" type="number" maxlength="13" v-model="form.phone" placeholder="请输入电话号码" />
                        <image v-if="form.phone" src="../../../static/login/close.png" class="clear"
                            @tap="() => form.phone = ''"></image>
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
import {
	rmbWithdraw
} from '@/api/user'
import {
    getHomeBaseRequest
} from '@/api/home.js'
import {
	Local
} from '@/utils/common'
export default {
    data() {
        return {
            amount: 0,
			val1: Local('baseInfo').rmbWithdrawAmount || 5000000,
            form: {
                // bankCode: '',
                // bankName: '',
                // name: '',
				bankName: '',
				bankCode: '',
				name: '',
				phone: '',
            },
			exchange: {},
        }
    },
    onShow() {
        // this.getExchangeInfo()
    },
    onLoad(options) {
        this.amount = options.amount || ''
    },
    methods: {
        volid() {
            const {
                bankCode,
                name,
                bankName,
                phone
            } = this.form
            let bol = true;
            let msg = ''
            if (!this.val1) {
                bol = false
                msg = '请输入兑换金额'
            } else if (!bankCode || !bankCode.trim()) {
                bol = false
                msg = '请输入收款账户'
            } else if (!name || !name.trim()) {
                bol = false
                msg = '请输入账户姓名'
            } else if (!bankName || !bankName.trim()) {
                bol = false
                msg = '请输入银行支行'
            } else if (!phone || !phone.trim()) {
                bol = false
                msg = '请输入电话号码'
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
		getExchangeInfo() {
			getHomeBaseRequest().then(res => {
				if (res.code === 200) {
					this.exchange = JSON.parse(res.data.exchange)
				} else {
					this.exchange = {}
				}
			})
		},
        formSubmit() {
            if (this.volid()) {
				// const {start, end, threshold, lowHint, upHint, otherHint} = this.exchange
				// const currentHour = new Date().getHours()
				// console.log(this.exchange)
				// if (currentHour > (start || 9) && currentHour < (end || 16)) {
				// 	uni.showLoading({
				// 		title: '正在兑换中...'
				// 	})
				// 	setTimeout(() => {
				// 		uni.hideLoading()
				// 		uni.showToast({
				// 		    title: this.form.val1 * 1 < (threshold || 5000000) ? (lowHint || `最低兑换金额为500万`) : (upHint || '今日兑换额度已用尽，请明日再来！'),
				// 		    icon: 'none'
				// 		})
				// 	}, 1000)
				// } else {
				// 	uni.showToast({
				// 		title: otherHint || '不在兑换时间内',
				// 		icon: 'none'
				// 	})
				// }
				// return
				
				uni.showLoading({
					title: '正在兑换中...',
					icon: 'none',
				})
				rmbWithdraw(this.form).then(res => {
					uni.hideLoading()
					if (res.code === 200) {
						uni.showToast({
							title: res.message || res.msg,
							icon: 'none'
						})
						setTimeout(() => {
							this.$Router.replaceAll({
							    name: 'wode'
							})
						}, 1000)
					} else {
						uni.showToast({
							title: res.message || res.msg,
							icon: 'none'
						})
					}
				}).catch(error =>{
					console.log(error)
				})
            }
        },
		handleInput(event) {
		  let value =  event.target.value
		  if (value * 1 >  this.amount * 1) {
			this.form.val1 = this.amount
		  } else {
			this.form.val1 = value
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
