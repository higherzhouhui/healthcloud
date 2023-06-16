<template>
    <view class="container">
        <view class="item" v-if="type == 1">
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
		<view class="gq-box" v-else>
			<view class="price">
				￥{{item.price || 0}}
			</view>
			<view class="txt">
				健享云保健康医疗原始股权
			</view>
		</view>
        <view class="item">
            <view class="title">支付方式</view>
            <view>
                <view class="pay-item" @tap="payType = 2">
                    <view>
                        <image class="icon" src="../../static/xiangmu/zhifubao-icon.png" alt=""></image>
                        支付宝
                    </view>
                    <view>
                        <image class="choice" v-if="payType == 2" src="../../static/xiangmu/choice-active.png"></image>
                        <image class="choice" v-else src="../../static/xiangmu/choice.png"></image>
                    </view>

                </view>
                <view class="pay-item" @tap="payType = 1">
                    <view>
                        <image class="icon" src="../../static/xiangmu/wechat-icon.png" alt=""></image>
                        微信支付
                    </view>
                    <view>
                        <image class="choice" v-if="payType == 1" src="../../static/xiangmu/choice-active.png"></image>
                        <image class="choice" v-else src="../../static/xiangmu/choice.png"></image>
                    </view>

                </view>
                <view class="pay-item" @tap="bankbuy">
                    <view>
                        <image class="icon" src="../../static/xiangmu/yinhangka.png" alt=""></image>
                        银行卡支付
                    </view>
                    <view>
                        <image class="choice" v-if="payType == 3" src="../../static/xiangmu/choice-active.png"></image>
                        <image class="choice" v-else src="../../static/xiangmu/choice.png"></image>
                    </view>

                </view>
            </view>
        </view>
        <view class="sure-btn" :class="loading && 'loading'" @tap="onPay">
            立即支付
        </view>
    </view>
</template>

<script>
import {
    buyProject
} from '@/api/project'
export default {
    data() {
        return {
            avatar: 'https://alipic.lanhuapp.com/web475b3b1e-96fa-4a25-be45-7c2868ddce63',
            item: {},
            payType: 2,
            loading: false,
			type: 1,
            num: 0
        }
    },
    onLoad(option) {
        this.item = JSON.parse(decodeURIComponent(option.item));
		this.type = this.item.type
        this.num = this.item.num
    },
    onShow() {

    },
    methods: {
        bankbuy() {
            uni.navigateTo({ url: "/pages/xiangmu/buybank?id="+this.item.id});
        },
        onPay() {
            if(this.loading) return
            this.loading = true
            let {num = 0, id, type} = this.item
            buyProject({ num: num * 1 * 100, projectType: type, payType: this.payType, id, returnUrl: '/pages/xiangmu/xiangmu?status=1' }).then(rt => {
                this.loading = false
                if (rt.data) {
                    uni.redirectTo({
                        url: `/pages/xiangmu/webview?url=${rt.data.payUrl}&mchOrderNo=${rt.data.mchOrderNo}`
                    })
                }
                else {
                    uni.showToast({ title: rt.message || '购买失败', icon: 'none' })
                }
            }).catch(err=>{
                this.loading = false
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.container {
    padding: 12px;
	.gq-box{
		margin-bottom: 12px;
		padding: 34px;
		background-color: #Fff;
		border-radius: 8px;
		text-align: center;
		.price{
			font-size: 20px;
			font-family: PingFang SC-Semibold, PingFang SC;
			font-weight: 600;
			color: #FE1E27;
		}
		.txt{
			margin-top: 8px;
			font-size: 13px;
			font-family: PingFang SC-Regular, PingFang SC;
			font-weight: 400;
			color: #17191A;
		}
	}
    .item {
        margin-bottom: 12px;
        padding: 12px;
        box-sizing: border-box;
        border-radius: 8px;
        background-color: #fff;

        .title {
            font-size: 15px;
            font-family: PingFang SC-Semibold, PingFang SC;
            font-weight: 600;
            color: #17191A;
        }

        .pay-item {
            display: flex;
            padding: 15px 0;
            justify-content: space-between;
            align-content: center;
            font-size: 15px;
            font-family: PingFang SC-Regular, PingFang SC;
            font-weight: 400;
            color: #17191A;
            border-bottom: 1px solid #EBECED;
            &:last-child {
                border-bottom: unset;
            }

            .icon {
                margin-right: 10px;
                width: 20px;
                height: 20px;
                vertical-align: middle;
            }

            .choice {
                width: 21px;
                height: 21px;
            }
        }

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
                background-color: #FE1E27;
                font-size: 13px;
                font-family: PingFang SC-Regular, PingFang SC;
                font-weight: 400;
                color: #FFFFFF;
                border-radius: 16px;
            }
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
                    color: #FE1E27FF;
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

.sure-btn {
    padding: 11px 0;
    margin: 24px auto;
    background-color: #FE1E27FF;
    color: #fff;
    font-size: 15px;
    font-family: PingFang SC-Medium, PingFang SC;
    font-weight: 500;
    text-align: center;
    border-radius: 24px;
}

</style>
