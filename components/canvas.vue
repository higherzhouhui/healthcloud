<template>
	<view class="catiner">
		<view class="tabs">
			<view class="tab-item" @tap="value = item.value" :class="item.value == value && 'active'"
				v-for="item in chartTabs" :key="item.value">
				<view class="itemprice">{{ item.value }}</view>
				<view class="itemlabel">{{ item.label }}</view>
				</view>
		</view>

		<canvas ref="canvas" id="demoCanvas" canvas-id="output_mini"></canvas>
	</view>
</template>
<script module="echarts" lang="renderjs">
import * as echarts from 'echarts';
import {
    getHealthyCurrencyPrice,
    getHealthyCurrencyCount,
    getNewHealthyCurrencyPrice
} from '@/api/common.js'
	export default {
		name: "newProduct",
		data() {
			return {
				value: 1,
				chartTabs: [],
				chartOptions: {}
			}
		},
		mounted() {
			this.init()
		},
		methods: {
			init() {
				Promise.all([ getHealthyCurrencyPrice({day: 10}), getHealthyCurrencyCount()]).then(res => {
					const [rchartOption, rchartTabs] = res
					if (rchartOption.code === 200) {
						const listData = rchartOption.data
						const xdata = [], yseries = [];
						listData.map(item => {
							xdata.push(item.date.replace('2023-', ''))
							yseries.push(item.price * 1)
						})
						const options = {
							grid: {
								left: '13px',
								right: '0%',
								top: '20%',
								bottom: '10%',
							    containLabel: true
							},
							xAxis: {
								type: 'category',
								data: xdata
							},
							yAxis: {
								type: 'value',
								name: '健享币/元'
							},
							series: [{
								data: yseries,
								type: 'line'
							}]
						}
						const chartDom = document.getElementById('demoCanvas')
						const myChart = echarts.init(chartDom);
						myChart.setOption(options);
					}
					if (rchartTabs.code === 200) {
						const {price, rose, todayRose, sumRose } = rchartTabs.data
						const currentUp = Math.round(rose / (price - rose) * 10000) / 100
						const todayUp = Math.round(todayRose / (price - todayRose) * 10000) / 100
						const allUp = Math.round(sumRose / (price - sumRose) * 100)
						const tabs = [
							{'label': '当前价格', 'value': price},
							{'label': '当前上涨', 'value': currentUp + '%'},
							{'label': '今日上涨', 'value': todayUp + '%'},
							{'label': '累计上涨', 'value': allUp + '%' },
						]
						this.chartTabs = tabs
					}
				})
			}
		},
		watch: {
			options(newVal, oldVal) {
				this.init()
			},
		}
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