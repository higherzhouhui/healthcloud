<template>
	<view class="container">
		<a :href="downLoad" class="downLoad">下载</a>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				course: ''
			}
		},
		onLoad(options) {
			this.downLoad = options.html
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	@import "@/static/customicons.scss"; 
.container {
	min-height: 100vh;
	background-image: url('../../../static/home/wmqd.png');
	background-size: 100% 100%;
	background-repeat: no-repeat;
	position: relative;
	.downLoad {
		height: 40px;
		text-align: center;
		line-height: 40px;
		border-radius: 32px;
		background: $primaryColor;
		color: #fff;
		padding: 0 70px;
		font-size: 18px;
		text-decoration: none;
		position: absolute;
		left: 50%;
		top: 70%;
		transform: translate(-50%, 0);
	}
}
</style>
