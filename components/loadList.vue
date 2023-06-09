<template>
	<view>
		<slot/>
		<view id="bottomLoading">
		</view>
	</view>
</template>

<script>
	export default {
		name:"loadList",
		props: {
			loadMore: '',
			loading: ''
		},
		data() {
			return {
				bottom: ''
			};
		},
		mounted() {
			uni.$on('onPageScroll', this.scrollRenderHandler())
		},
		methods: {
			onPageScroll(e) {
			   let scrollHeight = e.scrollHeight
			   let scrollTop = e.scrollTop
			   let clientHeight = e.clientHeight
			}
		},
		destroyed() {
			uni.$off('onPageScroll', this.scrollRenderHandler())
		},
	}
</script>

<style scoped>
.bottom {
	padding: 30px 0;
}
</style>