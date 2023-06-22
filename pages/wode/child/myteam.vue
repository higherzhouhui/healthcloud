<template>
	<view>
		<view class="tabs">
			<view class="tabs-item" @tap="type = item.type" :class="item.type == type && 'active'" v-for="item in tabs" :index="item.type" >
				<view class="txt">{{item.label}}({{ item.length }})</view>
			</view>
		</view>
		<view class="container">
			<view class="total-box">
				<view class="txt-box">
					<view class="txt">
						总业绩(元)
					</view>
					<view class="num">
						{{total.toFixed(2)}}
					</view>
				</view>
			</view>
			<view class="table">
				<view class="table-title">
					<view class="name item">
						姓名
					</view>
					<view class="phone item">
						手机号
					</view>
					<view class="price item">
						消费金额(元)
					</view>
					<view class="time item">
						注册时间
					</view>
				</view>
				<scroll-view  :scroll-top="settingOptions.scrollTop" scroll-y="true" class="table-body" @scrolltoupper="upper"
					@scrolltolower="lower" @scroll="scroll">
					<view v-for="(item, index) in list" :key="index"  class="scroll-view-item table-item">
						<view class="name item">
							{{item.name || '—'}}
						</view>
						<view class="phone item">
							{{item.mobilePhone}}
						</view>
						<view class="price item">
							{{item.consume}}
						</view>
						<view class="time item">
							{{item.registerDate}}
						</view>
					</view>
					<view v-if="!tabs[this.type - 1].length" class="no-data">暂无数据</view>
				</scroll-view>
			</view>
		</view>

	</view>
</template>

<script>
	import {myTeam} from '@/api/myteam'
	export default {
		data() {
			return {
				info: {
					teamOne: [],
					teamOneConsume: 0,
					teamTwo: [],
					teamThreeConsume: 0,
					teamThree: [],
					teamTwoConsume: 0
				},
				type: 1,
				tabs: [{
					type: 1,
					label: '一级',
					length: 0
				},{
					type: 2,
					label: '二级',
					length: 0
				},{
					type: 3,
					label: '三级',
					length: 0
				}],
				settingOptions: {
					scrollTop: 0,
					old: {
						scrollTop: 0
					}
				}
			}
		},
		computed: {
			total() {
				let {teamOneConsume, teamThreeConsume, teamTwoConsume} = this.info
				return [teamOneConsume, teamTwoConsume, teamThreeConsume][this.type - 1]
			},
			list() {
				let {teamOne, teamThree, teamTwo} = this.info
				return [teamOne, teamTwo, teamThree][this.type - 1]
			}
		},
		onLoad() {
			this.getMyTeam()
		},
		onPullDownRefresh() {
			// 执行刷新操作
			this.getMyTeam()
		},
		methods: {
			getMyTeam() {
				myTeam().then(rt=>{
					uni.stopPullDownRefresh()
					if (rt.code === 200) {
						this.info = rt.data
						this.tabs[0].length = rt.data.teamOne.length
						this.tabs[1].length = rt.data.teamTwo.length
						this.tabs[2].length = rt.data.teamThree.length
					}
				})
				
			},
			upper: function(e) {
				console.log(e)
			},
			lower: function(e) {
				console.log(e)
			},
			scroll: function(e) {
				console.log(e)
				this.settingOptions.old.scrollTop = e.detail.scrollTop
			},
		}
	}
</script>
	
<style scoped lang="scss">
.tabs{
	display: flex;
	background-color: #fff;
		.tabs-item{
			padding: 10px 0 0;
			flex: 1;
			text-align: center;
			font-size: 15px;
			font-family: PingFang SC-Medium, PingFang SC;
			font-weight: 400;
			.txt{
				padding: 0 4px 10px;
				display: inline-block;
			}
			&.active{	
				color: #FE1E27FF;			
				font-weight: 500;
				
				.txt{
					border-bottom: 3px solid;
				}
			}
		}
	}
	.container{
		padding: 12px;
		.total-box{
			position: relative;
			padding-bottom: 22.8%;
			height: 0;
			width: 100%;
			background: #FE1E27FF;
			border-radius: 8px;
			.txt-box{
				position: absolute;
				top:50%;
				transform: translateY(-50%);
				width: 100%;
				text-align: center;
				color: #fff;
				.num{
					margin-top: 8px;
					font-size: 20px;
					font-family: DIN-Bold, DIN;
					font-weight: bold;
				}
				.txt{
					font-size: 14px;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
				}
			}
		}
		.table{
			margin-top: 12px;
			.table-title{
				padding:0 8px;
				box-sizing: border-box;
				display: flex;
				border-radius: 8px 8px 0 0;
				background-color: rgba(250, 251, 252, 1);
				.item{
					padding: 13px 0;
					flex: 1;
					font-size: 13px;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #4F5459;
					&.time{
						text-align: right;
					}
				}
			}
			.table-body{
				background-color: #fff;
				border-radius: 0 0 8px 8px;
				.table-item{
					padding:0 8px;
					display: flex;
					.item {
						padding: 13px 0;
						flex: 1;
						font-size: 13px;
						font-family: PingFang SC-Regular, PingFang SC;
						font-weight: 400;
						color: rgba(23, 25, 26, 1);
						&.time{
							text-align: right;
						}
						&.price{
							transform: translateX(10px);
							font-weight: bold;
						}
					}
				}
			
			}
		}
		.no-data{
			padding: 20px 0;
			font-size: 14px;
			color: rgba(23, 25, 26, .5);
			text-align: center;
		}
	}
	
</style>
