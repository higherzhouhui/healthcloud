<template>
    <view class="container">
        <view class="gq-box">
            <view class="gq-box-item red">
                <view class="key">转账卡号</view>
                <view class="value">{{ data.cardId }}</view>
                <view class="copy" @tap="copy">复制</view>
            </view>
            <view class="gq-box-item">
                <view class="key">转入账户</view>
                <view class="value">{{ data.name }}</view>
            </view>
            <view class="gq-box-item">
                <view class="key">转入银行</view>
                <view class="value">{{ data.bankName }}</view>
            </view>
        </view>
        <view class="item">
            <view class="title">上传打款截图</view>
            <image v-if="data.cardimg" class="up-img" :src="data.cardimg"></image>
            <view v-else class="up-box" @tap="handleUploadAvatar">
                <image class="img" src="../../static/xiangmu/shangchuan.png"></image>
            </view>
        </view>
        <view class="sure-btn" :class="loading && 'loading'" @tap="onPay">
            已打款，提交审核
        </view>
    </view>
</template>

<script>
import {
    URL
} from '@/config/index.js'
export default {
    data() {
        return {
            data: {
                cardId: '6226 6846 8989 8876 076',
                name: '王大锤',
                bankName: '大锤银行',
                cardimg: ''
            },
        }
    },
    onLoad() {

    },
    onShow() {

    },
    methods: {
        copy() {
            uni.showToast({ title: '复制成功' })
            uni.setClipboardData({
                data: this.data.cardId
            });
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
                            that.data.cardimg = response.data
                        },
                        fail: function (res) {
                            console.log('上传失败：', res);
                        }
                    });
                }
            });
        },
        onPay() {

        }
    }
}
</script>

<style lang="scss" scoped>
.container {
    padding: 12px;

    .gq-box {
        margin-bottom: 12px;
        padding: 0 0 1px;
        background-color: #Fff;
        border-radius: 8px;
        text-align: center;

        .gq-box-item {
            padding: 0 12px;
            position: relative;
            margin-bottom: 15px;
            display: flex;
            font-size: 16px;

            &.red {
                padding: 9px 12px;
                color: #FE1E27;
                background-color: #FFE6E6;
                border-radius: 8px;
            }

            .key {
                margin-right: 4px;

            }

            .value {
                font-weight: 600;
            }

            .copy {
                display: flex;
                align-items: center;
                top: 0;
                right: 0;
                line-height: 100%;
                position: absolute;
                height: 100%;
                padding: 0 8px;
                white-space: nowrap;
                border-radius: 8px;
                background: #FF4B4B;
                color: #fff;
            }
        }

    }

    .item {
        margin-bottom: 12px;
        padding: 12px 12px 20px;
        box-sizing: border-box;
        border-radius: 8px;
        background-color: #fff;

        .title {
            font-size: 15px;
            font-family: PingFang SC-Semibold, PingFang SC;
            font-weight: 600;
            color: #17191A;
        }

    }


}
.up-img{
    margin-top: 10px;
    width: 100%;
    border-radius: 12px;
}
.up-box {
    margin-top: 10px;
    width: 100%;
    padding: 80px 0;
    border-radius: 12px;
    border: 1px solid #D9DADB;
    text-align: center;

    .img {
        width: 20px;
        height: 20px;
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
