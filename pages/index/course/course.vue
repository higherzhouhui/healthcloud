<template>
	<view class="container">
		<image :src="image" mode="widthFix"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				image: ''
			}
		},
		onLoad(options) {
			this.image = options?.course
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
.container {
	display: flex;
	justify-content: center;
	padding: 12px;
}
</style>
