<template>
<view>
    <view class="container">
        <scroll-view v-if="list.length" scroll-y="true" class="scroll-box" @scrolltolower="lower">
            <view v-for="(item, index) in list" :key="index" class="scroll-view-item item">
                <view class="left-info">
                    <view class="name">
                        {{item.typeStr}}
                        <view v-if="item.describe">-{{ item.describe }}</view>
                    </view>
                    <view class="time">
                        {{item.createTime}}
                    </view>
                </view>
                <view class="price">
                    {{`${item.state == 1 ? '+' : '-'} ${item.amount.toFixed(2)}`}}
                </view>

            </view>

        </scroll-view>
        <view v-if="!list.length" class="no-data">暂无数据</view>
    </view>

</view>
</template>

<script>
import {
    getWalletFlowList
} from '@/api/bank'
export default {
    filters: {
        title(type) {
            switch (type) {
                case 'bonus':
                    return '分红钱包';
                case 'extend':
                    return '推广钱包';
                case 'earnings':
                    return '收益钱包';
                case 'chnt':
                    return '正泰补贴金';
            }
        }
    },
    data() {
        return {
            total: 0,
            pageNum: 1,
            hasmore: true,
            list: []
        }
    },
    onPullDownRefresh() {
        this.hasmore = true
		this.pageNum = 1
		this.getList()
    },
    onLoad() {
        this.getList()
    },
    methods: {
        getList() {
            if (!this.hasmore) return
            getWalletFlowList({
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
@import "@/static/customicons.scss"; 

.container {
    padding: 0 16px;
    margin-top: 12px;
    background-color: #Fff;

    .item {
        display: flex;
        justify-content: space-between;
        align-items: top;
        padding: 16px 0;
        border-bottom: 1px solid #EBECED;

        &:last-child {
            border: unset;
        }

        .name {
            font-size: 15px;
            font-family: PingFang SC-Regular, PingFang SC;
            font-weight: 400;
            color: #17191A;
            display: flex;
        }

        .price {
            font-size: 15px;
            font-family: PingFang SC-Semibold, PingFang SC;
            font-weight: 600;
            color: $primaryColor;
        }

        .time {
            margin-top: 6px;
            font-size: 12px;
            font-family: PingFang SC-Regular, PingFang SC;
            font-weight: 400;
            color: #969899;
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
