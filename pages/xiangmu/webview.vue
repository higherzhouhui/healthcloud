
<template>
    <view>
        <!-- 动态绑定需要跳转的网址 -->
        <web-view ref="url"  :src="url"></web-view>
    </view>
</template>
 
<script>
import {getPayOrder} from '@/api/project'
export default {
    data() {
        return {
            url: '',
            mchOrderNo: ''
        };
    },
    onLoad(item) {//接收上个界面传递来的参数
        this.url = item.url
        this.mchOrderNo = item.mchOrderNo
        // '/#/pages/xiangmu/xiangmu?status=1'
    },
    beforeDestroy() {
        clearInterval(this.timer)
    },
    onShow() {
        this.getPayOrder()
        clearInterval(this.timer)
        this.timer = setInterval(()=>{
            this.getPayOrder()
        }, 5000)
    },
    methods: {
        getPayOrder() {
            getPayOrder({mchOrderNo: this.mchOrderNo}).then(rt=>{
                if(rt.code == 200 && rt.data.status == 2) {
                    uni.showToast({ title: '支付成功' })
                    setTimeout(()=>{
                        clearInterval(this.timer)
                        uni.redirectTo({url: `/pages/wode/child/xiangmu`});
                    }, 1000)
                }
            })
        }
    }
}
</script>
 
