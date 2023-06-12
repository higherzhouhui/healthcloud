<template>
<view class="container">
    <scroll-view v-if="list.length" scroll-y="true" class="scroll-box" @scrolltolower="lower">
        <view class="item" v-for="item in list" :key="item.id">
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
    </scroll-view>
	<view v-if="!list.length" class="no-data">暂无数据</view>
</view>
</template>

<script>
import {
    getMyProjectList
} from '@/api/project'
export default {
    data() {
        return {
            avatar: 'https://alipic.lanhuapp.com/web475b3b1e-96fa-4a25-be45-7c2868ddce63',
            list: [],
            pageNum: 1,
            hasmore: true,
        }
    },
    onLoad() {
        this.getList()
    },
    onPullDownRefresh() {
        // 执行刷新操作
        this.hasmore = true
        this.pageNum = 1
        this.getList()

    },
    methods: {
        getList() {
            if (!this.hasmore) return
            getMyProjectList({
                pageNum: this.pageNum,
                pageSize: 20
            }).then(rt => {
                uni.stopPullDownRefresh();
                let {
                    list
                } = rt.data
                if (!list.length) return this.hasmore = false
                if (this.pageNum == 1) {
                    this.list = list
                } else {
                    this.list = this.list.concat(list)
                }

                this.pageNum++
            })
        },
		lower: function (e) {
            this.getList()
        },
    }
}
</script>

<style lang="scss" scoped>
.container {
    padding: 12px;

    .item {
        margin-bottom: 12px;
        padding: 12px;
        box-sizing: border-box;
        border-radius: 8px;
        background-color: #fff;

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
	.no-data {
        padding: 20px 0;
        font-size: 14px;
        color: rgba(23, 25, 26, .5);
        text-align: center;
    }
}

.scroll-box {
    height: 100vh;
}
</style>
