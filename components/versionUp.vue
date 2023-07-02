<template>
    <view class="mask" v-if="download.isShowProgress">
        <view class="progress-box">
            <view class="text">文件下载中，请稍后......</view>
            <progress :percent="download.percent" show-info stroke-width="3" />
            <image class="close" @tap="close" src="../static/login/close.png"></image>
        </view>
    </view>
</template>
<script>
export default {
    computed: {
        download() {
            return this.$store.state.download
        }
    },
    methods: {
        close() {
            this.$store.commit('SET_DOWLOADSTATUS', {isShowProgress: false, percent: 0})
        }
    },
}
</script>
<style lang="scss" scoped>
.mask {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0px;
    z-index: 999;
    background: rgba(0, 0, 0, .5);

    .progress-box {
        text-align: center;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background: #fff;
        border-radius: 16px;
        padding: 12px;
        box-shadow: 0 1px 4px rgba(0, 0, 0, .2);

    }

    .close {
        width: 20px;
        height: 20px;
        position: absolute;
        right: -7px;
        top: -7px;
    }

    .text {
        font-size: 12px;
    }
}</style>
