<template>
	<view class="main">
		<view class="bottom">
		  <a download="正泰新能源.apk " :href="versionInfo.downUrl" class="download">立即下载</a>
		  <view class="version">版本号:{{versionInfo.version}}</view>
		</view>
	</view>
</template>

<script>
	import {getVersionRequest} from "@/api/user.js"
	export default {
		data() {
			return {
				versionInfo: {}
			}
		},
		onLoad(options) {
			if (!options.useH5) {
				this.int()
			}
			this.getVersion()
		},
		methods: {
			int(){
				// #ifdef H5
				var a = document.getElementsByClassName('uni-page-head-hd')
				if (a.length) {
					a[0].style.display = 'none';
				}
				// #endif
			},
			getVersion() {
				getVersionRequest({ deviceType:1 }).then(res => {
					if (res.code === 200) {
						this.versionInfo = res.data
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
  .main {
    width: 100%;
    height: calc(100vh - 44px);
    background-image: url('../../static/start.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
  .logo {
    width: 200px;
    height: 165px;
  } 
  .bottom {
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	  position: fixed;
	  bottom: 80px;
	  width: 100%;
  }
  .download {
    width: 256px;
    height: 50px;
    background: linear-gradient(90deg, #FFC42E 0%, #FF822E 100%);
    border-radius: 28px 28px 28px 28px;
    opacity: 1;
    text-decoration: none;
    text-align: center;
    line-height: 50px;
    color: #fff;
    font-size: 18px;

  }
  .version {
    font-size: 15px;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #FFFFFF;
		margin-top: 12px;
	}
</style>
