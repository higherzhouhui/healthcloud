<template>
<view class="container">
    <scroll-view scroll-y="true" v-if="serviceData.remark" :scroll-top="top" ref="scroll" class="scroll-box" id="scroll" @scroll="scroll">
        <view class="item other-item">
            <view class="other box">
                <image class="avatar" src="../../static/kefu/kefu-icon.png" alt=""></image>
                <view class="content">{{ serviceData.remark }}</view>
            </view>
        </view>
        <view v-for="(item, index) in list" :key="index" class="item" :class="[item.form != serviceData.id && 'own-item', item.showTime && 'has-time']">
            <view v-if="item.showTime" class="time"> {{ item.createTime }} </view>
            <view v-if="item.form == serviceData.id" class="other box">
                <image class="avatar" src="../../static/kefu/kefu-icon.png" alt=""></image>
                <view class="content" v-if="item.type == 1">{{ item.content }}</view>
                <img class="imgs" v-if="item.type == 2" @tap="showPhoto(item.content)" :src="item.content">
            </view>
            <view v-else class="own box">
                <view class="content" v-if="item.type == 1">{{ item.content }}</view>
                <img class="imgs" v-if="item.type == 2" @tap="showPhoto(item.content)" :src="item.content">
                <img v-if="$store.state.userInfo.avatar && isOk" @error="isOk = false" :src="$store.state.userInfo.avatar || '../../static/wode/avatar.png'" class="avatar" alt="" />
                <image v-else class="avatar" src="../../static/wode/avatar.png" alt=""></image>
            </view>
        </view>
    </scroll-view>
    <view class="bottom-input" :class="css">
        <input v-model="message" type="text">
        <image @tap="handleUploadAvatar" class="img" src="../../static/kefu/tupian.png"></image>
        <view class="txt" @tap="send()" :class="loading && 'loading'">发送</view>
    </view>
</view>
</template>

<script>
import {
    USER_INFO
} from '@/common/util/constants.js'
import {
    URL
} from '@/config/index.js'
import {
    getChatMessageList,
    getService,
    sendMessage
} from '@/api/message'
export default {
    data() {
        return {
            userInfo: uni.getStorageSync(USER_INFO),
            list: [],
            loading: false,
            message: '',
            serviceData: {
                remark: ''
            },
            css: window ? 'h5css' : 'appcss',
            top: 0,
            times: 0,
            kTime: (1000 * 60 * 5),
            isOk: true
        }
    },
    mounted() {
        this.getService()
        this.toBottom()
        this.getList(1)
        this.timer = setInterval(this.getList, 10000)
    },
    beforeDestroy() {
        clearInterval(this.timer)
        this.timer = null
        // this.top = 0
    },
    onHide() {
        clearInterval(this.timer)
        this.timer = null
    },
    methods: {
        showPhoto(img) {
            uni.previewImage({
                current: 0, // 当前显示图片的索引值
                urls: [img], // 需要预览的图片列表，photoList要求必须是数组
                loop: false, // 是否可循环预览
            })
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
                            that.send(response.data, 2)
                        },
                        fail: function (res) {
                            console.log('上传失败：', res);
                        }
                    });
                }
            });
        },
        scroll: function (e) {
            console.log(e)
            this.top = e.detail.scrollTop
        },
        getList(type) {
            getChatMessageList().then(rt => {
                let list = rt.data || []
                this.times = 0;
                list.forEach(item => {
                    let time = new Date(item.createTime).getTime()
                    if (time - this.times > this.kTime) {
                        // item.showTime = true
                        this.times = time
                    }
                })
                this.list = list
                if (type === 1) {
                    this.toBottom()
                }
            })
        },
        toBottom() {
            this.$nextTick(() => {
                setTimeout(() => {

                    let infos = uni
                        .createSelectorQuery()
                        .in(this)
                        .select('#scroll');
                    infos
                        .boundingClientRect(data => {
                            console.log('----------')
                            this.top = data.height + 2000
                        })
                        .exec();
                }, 500);
            });
        },
        getService() {
            getService().then(rt => {
                this.serviceData = rt.data || {}
            })
        },
        send(message, type) {
            if ((!this.message || !this.message.trim() || this.loading) && !message) return
            this.loading = true
            let t = type || 1;
            let content = message || this.message
            sendMessage({
                to: this.serviceData.id,
                type: t,
                content
            }).then(rt => {
                this.loading = false
                if (rt.code == 200) {
                    this.list.push({
                        form: this.userInfo.id,
                        content,
                        type: t
                        // showTime: (Date.now() - this.times) > this.kTime
                    })
                    this.message = ''
                    this.toBottom()
                }
            }).catch(_ => {
                this.loading = false;
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.container {
    .bottom-input {
        position: fixed;
        bottom: 0px;
        width: 100%;
        display: flex;
        padding: 8px 12px;
        align-items: center;
        background-color: #F0F1F2;
        box-sizing: border-box;

        .img {
            margin-left: 15px;
            width: 25px;
            height: 23px;
        }

        &.h5css {
            bottom: 50px;
        }

        input {
            padding: 0 12px;
            background-color: #fff;
            height: 32px;
            line-height: 32px;
            border-radius: 4px;
            width: 66%;
        }

        .txt {
            margin-left: 12px;
            padding: 0 12px;
            height: 32px;
            line-height: 32px;
            font-size: 13px;
            font-family: PingFang SC-Regular, PingFang SC;
            font-weight: 400;
            color: #FFFFFF;
            background: #FE1E27;
            border-radius: 17px;
            white-space: nowrap;
        }
    }

    .scroll-box {
        padding: 16px 12px 60px;
        box-sizing: border-box;
        height: 100vh;

        .item {
            margin-bottom: 16px;
            display: flex;

            .avatar {
                width: 40px;
                height: 40px;
                border-radius: 50%;
            }

            .box {
                display: flex;
                align-items: start;

                .imgs {
                    max-width: 177px;
                    max-height: 177px;
                    border-radius: 8px;
                    object-fit: cover;
                }

                .content {
                    position: relative;
                    max-width: 60%;
                    background: #fff;
                    padding: 12px;
                    border-radius: 8px;
                    font-size: 14px;
                    font-family: PingFang SC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #17191A;
                    word-break: break-all;

                    &::after {
                        content: '';
                        width: 10px;
                        height: 10px;
                        display: block;
                        background: #fff;
                        transform: rotate(45deg);
                        left: -5px;
                        top: 10px;
                        position: absolute;
                    }
                }
            }

            .other {

                .avatar {
                    margin-right: 10px;
                }
            }

            .own {
                justify-content: end;

                .avatar {
                    margin-left: 10px;
                }

                .content {
                    background: #FE1E27FF;
                    color: #fff;

                    &::after {
                        left: unset;
                        right: -5px;
                        background: #FE1E27FF;
                    }
                }
            }

            &.own-item {
                flex-direction: row-reverse;
                align-items: end;
            }

            &.has-time {
                position: relative;
                margin-top: 40px;

                .time {
                    position: absolute;
                    left: 50%;
                    transform: translateX(-50%);
                    top: -30px;
                    color: #999;
                    font-size: 12px;
                }
            }
        }

    }
}
</style>
