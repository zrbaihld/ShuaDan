<template>
	<view class="container">
		<view class="top-view">
			<view class="welcome">welcome</view>
			<view class="title-view">
				<view class="title">ऑर्डर लेने वाला हॉल</view>
				<view class="tips">Order reception hall</view>
			</view>

		</view>
		<view class="notice">
			<image src="../../../static/icon_bottom_notice.png" style="width: 46rpx;margin: 0 17rpx 0 11rpx;"
				mode="widthFix"></image>
			<view style="flex-wrap: nowrap;overflow: hidden;">निधि प्रवाह पूछताछनिधि प्रवाह पूछताछनिधि प्रवाधि प्रवाधि
			</view>
		</view>
		<view class="content">
			<view class="tab" style="margin-top: 50rpx;">
				<view class="left" :class="{active:accountType==1}" @click="tapClick(1)">प्रगति पर है</view>
				<view class="right" :class="{active:accountType==2}" @click="tapClick(2)">पुरा होना।</view>
			</view>

			<view class="content-card" v-for="item in list">
				<view class="line1">
					<view>नाम：{{item.orderNo}}</view>
					<image src="../../../static/icon_bottom_select.png" style="width: 26rpx;height: 26rpx;"></image>
				</view>
				<view class="line2">किनारा：{{item.upiAccount}}</view>
				<view class="line3">
					<view class="line3-title">किनारा：{{item.bankAccount}}</view>
					<image src="../../../static/icon_bottom_copy.png" style="width: 35rpx;height: 38rpx;margin-left: 17rpx;" @click="copyAccount(item)"></image>
				</view>
				<view class="line4">
					<view>मात्रा：{{item.orderMoney}}</view>
					<view>लाभ：{{item.commission}}</view>
					<view class="date">12/6--12/12</view>
				</view>
				
				<view class="button" @click="toDetail(item)">
					प्राप्त करें
				</view>
			</view>
		</view>
		
		<uni-popup ref="popup" background-color="#fff" @change="change">
			<uni-popup-dialog ref="inputClose" mode="input" title="绑定银行卡" value="对话框预置提示内容!"
								placeholder="请输入内容" @confirm="dialogInputConfirm">
								<view class="popup-content">
									<uni-easyinput v-if="accountType==2" style="margin-top: 10rpx;" v-model="dialogForm.bankAccount" :clearable=false :placeholder="$t('银行卡号')" prefixIcon="" placeholderStyle="color: '#CCCCCC'"></uni-easyinput>
									<uni-easyinput v-if="accountType==2" style="margin-top: 10rpx;" v-model="dialogForm.IFSC" :clearable=false :placeholder="$t('IFSC')" prefixIcon="" placeholderStyle="color: '#CCCCCC'"></uni-easyinput>
									<uni-easyinput v-if="accountType==1" style="margin-top: 10rpx;" v-model="dialogForm.upiAccount" :clearable=false :placeholder="$t('upiAccount')" prefixIcon="" placeholderStyle="color: '#CCCCCC'"></uni-easyinput>
									<uni-easyinput style="margin-top: 10rpx;" v-model="dialogForm.accountName" :clearable=false :placeholder="$t('accountName')" prefixIcon="" placeholderStyle="color: '#CCCCCC'"></uni-easyinput>
								</view>
			</uni-popup-dialog>
		</uni-popup>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				accountType:1,
				list:[{
					accountType:1,//0不限制  1 UPI 2 银行卡
					orderNo:'',
					orderName:'',
					upiAccount:'',
					bankAccount:'',
					IFSC:'',
					orderMoney:'',
					commission:'',
				}],
				dialogForm:{
					userAccount:'',
					bankAccount:'',
					IFSC:'',
					accountName:'',
					upiAccount:'',
				}
			}
		},
		onLoad() {
			
		},
		mounted() {
			this.loadDetail()
		},
		methods: {
			loadDetail(){
				this.$refs.popup.open()
				uni.showLoading({
					title:'加载中'
				})
				this.$api
					.post(this.$url.incomeOrderGet, {
						userAccount:this.$store.getters.aid,
						accountType:this.accountType,
					})
					.then(res => {
						if (res.code==0) {
							
						} 
					}).catch(err=>{
						if(err.code==32){
							this.$refs.popup.open()
						}
					})
					.finally(() => {
						uni.hideLoading()
					});
			},
			dialogInputConfirm(){
				let url=''
				if (this.accountType==1) {
					url=this.$url.upiAccountAdd
				}else{
					url=this.$url.bankAccountAdd
				}
				uni.showLoading({
					title:'加载中'
				})
				this.$api
					.post(url, this.dialogForm)
					.then(res => {
						if (res.code==0) {
							this.loadDetail()
						} 
					}).catch(err=>{
					})
					.finally(() => {
						uni.hideLoading()
					});
			},
			tapClick(tap){
				this.accountType = tap
				this.loadDetail()
			},
			copyAccount(item){
				uni.setClipboardData({  
				    data: item.bankAccount,  
				    success: function () {  
				        uni.showToast({  
				            title: '复制成功',  
				            icon: 'none'  
				        });  
				    },  
				    fail: function (err) {  
				        console.error('复制失败：', err);  
				    }  
				});
			},
			toDetail(item){
				uni.navigateTo({
					url:"/pages/index/task/detail?id="+item.id
				})
			}

		}
	}
</script>

<style lang="less" scoped>
	.top-view {
		width: 750rpx;
		background: #1772F6;
		position: relative;
		padding-bottom: 40rpx;
		display: flex;
		height: 313rpx;
		align-items: center;
		flex-direction: column;

		.welcome {
			font-family: Microsoft YaHei;
			position: absolute;
			top: 0;
			left: 0;
			font-weight: bold;
			font-size: 166rpx;
			color: #FFFFFF;
			opacity: 0.03;
		}

		.title-view {
			position: relative;
			margin-top: 150rpx;
			display: flex;
			align-items: center;
			flex-direction: column;

			.title {
				font-family: Nirmala UI;
				font-weight: bold;
				font-size: 67rpx;
				color: #FFFFFF;
			}

			.tips {
				font-family: Nirmala UI;
				font-weight: 400;
				font-size: 33rpx;
				margin-top: 25rpx;
				color: #92BEFF;
			}
		}



	}

	.notice {
		width: 750rpx;
		height: 87rpx;
		background: #E0ECFC;
		display: flex;
		align-items: center;

		font-family: Nirmala UI;
		font-weight: 400;
		font-size: 28rpx;
		color: #333333;
		flex-wrap: nowrap;
	}

	.content {
		background: white;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;

		.tab {
			width: 640rpx;
			height: 95rpx;
			display: flex;

			.left {
				width: 320rpx;
				height: 95rpx;
				background: #B3CEFF;
				box-shadow: 0px 17rpx 27rpx 0px rgba(0, 89, 255, 0.24);
				border-radius: 20rpx 0px 0px 20rpx;


				font-family: Nirmala UI;
				font-weight: bold;
				font-size: 37rpx;
				line-height: 95rpx;
				text-align: center;
				color: #FFF600;
			}

			.right {
				width: 320rpx;
				height: 95rpx;
				border-radius: 0px 20rpx 20rpx 0rpx;
				background: #B3CEFF;
				box-shadow: 0px 17rpx 27rpx 0px rgba(0, 89, 255, 0.24);
				font-family: Nirmala UI;
				font-weight: bold;
				font-size: 37rpx;
				line-height: 95rpx;
				text-align: center;
				color: #FFFFFF;
			}
			.active{
				background: #1772F6;
			}
		}

		.content-card {
			width: 639rpx;
			background: #28C613;
			box-shadow: 0px 17rpx 40rpx 0px rgba(40, 198, 19, 0.24);
			border-radius: 33rpx;
			margin-top: 45rpx;
			padding: 30rpx 28rpx;
			position: relative;

			.line1 {
				font-family: Nirmala UI;
				font-weight: bold;
				font-size: 28rpx;
				color: #FFFFFF;
				display: flex;
				justify-content: space-between;
				align-items: center;

			}

			.line2 {
				margin-top: 26rpx;
				width: 420rpx;
				font-family: Nirmala UI;
				font-weight: bold;
				font-size: 28rpx;
				color: #FFFFFF;
			}

			.line3 {
				margin-top: 26rpx;
				width: 420rpx;
				font-family: Nirmala UI;
				font-weight: bold;
				font-size: 28rpx;
				color: #FFFFFF;
				display: flex;
				align-items: center;
				.line3-title{
					 /* 强制文本在一行内显示 */  
					    white-space: nowrap;  
						flex: 1;
					      
					    /* 隐藏超出容器的内容 */  
					    overflow: hidden;  
					      
					    /* 使用省略号表示被截断的内容 */  
					    text-overflow: ellipsis;  
				}
				
			}

			.line4 {
				margin-top: 26rpx;
				font-family: Nirmala UI;
				font-weight: bold;
				font-size: 28rpx;
				color: #FFFFFF;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.date{
					font-weight: 400;
					font-size: 21rpx;
					color: #FFFFFF;
				}
			}
			
			.button{
				width: 153rpx;
				height: 90rpx;
				line-height: 90rpx;
				background: #F5BB0F;
				box-shadow: 0px 9rpx 13rpx 0px rgba(245,187,15,0.24);
				border-radius: 20rpx;
				font-family: Nirmala UI;
				font-weight: bold;
				font-size: 32rpx;
				color: #FFFFFF;
				text-align: center;
				
				position: absolute;
				right: 28rpx;
				top: calc(50% - 45rpx);
			}
		}
	}
	.popup-content{
		// display: flex;
		
	}
</style>