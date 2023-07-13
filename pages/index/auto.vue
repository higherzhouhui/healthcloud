<template>
    <view class="container">
        <view v-html="html"></view>
    </view>
</template>
<script>
export default {
    data() {
        return {
            title: '',
            html: ''
        }
    },
    onLoad(options) {
        const { title, html } = options
        this.title = title
        this.html = html
        if (title) {
            uni.setNavigationBarTitle({
                title: title
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.container {
    text-align: center;

    /deep/p {
        max-width: 100%;
        text-align: center;
    }

    /deep/img {
        max-width: 100%;
    }
}
</style>