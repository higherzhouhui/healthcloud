<template>
	<view class="catiner">
		<view class="tabs">
			<view class="tab-item" @tap="value = item.value" :class="item.value == value && 'active'"
				v-for="item in tabs" :key="item.value">
				<view class="itemprice">{{ item.value }}</view>
				<view class="itemlabel">{{ item.label }}</view>
				</view>
		</view>

		<canvas ref="canvas" id="demoCanvas" canvas-id="output_mini"></canvas>
	</view>
</template>
<script module="echarts" lang="renderjs">
	import * as echarts from 'echarts';

	export default {
		name: "newProduct",
		props: {
			tabs: {
				type: Array,
				default: function() {
					return [{
						label: '赛选',
						value: 1
					}, {
						label: '赛选',
						value: 2
					}, {
						label: '赛选',
						value: 3
					}, {
						label: '赛选',
						value: 4
					}]
				}
			},
			options: {
				type: Object,
				default: function() {
					return {
						xAxis: {
							type: 'category',
							data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
						},
						yAxis: {
							type: 'value'
						},
						series: [{
							data: [150, 230, 224, 218, 135, 147, 260],
							type: 'line'
						}]
					}
				}
			},
		},
		data() {
			return {
				value: 1,
			}
		},
		mounted() {
			this.init()
		},
		methods: {
			init() {
				let chartDom = document.getElementById('demoCanvas')
				var myChart = echarts.init(chartDom);
				myChart.setOption(this.options);
			}
		},
	}
</script>
<style lang="scss" scoped>
@import "@/static/customicons.scss"; 
	.catiner {
		margin-bottom: -30px;
	}

	.tabs {
		margin-top: 12px;
		margin-bottom: -20px;
		display: grid;
		position: relative;
		z-index: 10;
		grid-template-columns: repeat(4, 1fr);
		column-gap: 10px;
		border-bottom: 1px dotted #8c8c8c;
		.tab-item {
			padding: 2px 8px;
			font-size: 13px;
			font-family: PingFang SC-Regular, PingFang SC;
			font-weight: 400;
			color: #333;
		    .itemprice {
				color: $primaryColor;
				text-align: center;
				font-weight: bold;
				font-size: 15px;
			}
			// &.active {
			// 	color: #2E9CFD;
			// 	background: #D9EDFF;
			// }
			.itemlabel {
				text-align: center;
			}
		}
	}

	#demoCanvas {
		width: 100%;
		height: 300px;
	}
</style>