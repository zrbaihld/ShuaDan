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
				<view class="left" :class="{active:accountType==0}" @click="tapClick(0)">代收</view>
				<view class="right" :class="{active:accountType==1}" @click="tapClick(1)">代付</view>
			</view>
			<view class="uni-padding-wrap uni-common-mt">
				<uni-segmented-control :current="current" :values="items" :style-type="styleType"
					 @clickItem="onClickItem" />
			</view>
			<view v-if="list.length>0">
				<view class="content-card" v-for="item in list">
					<view class="line1">
						<view>नाम：{{item.orderNo}}</view>
						<image src="../../../static/icon_bottom_select.png" style="width: 26rpx;height: 26rpx;"></image>
					</view>
					<view class="line3" v-if="current==0">
						<view class="line3-title">किनारा：{{item.upiAccount}}</view>
						<image src="../../../static/icon_bottom_copy.png" style="width: 35rpx;height: 38rpx;margin-left: 17rpx;" @click="copyAccount(item.upiAccount)"></image>
					</view>
					<view class="line3" v-if="current==1">
						<view class="line3-title">किनारा：{{item.bankAccount}}</view>
						<image src="../../../static/icon_bottom_copy.png" style="width: 35rpx;height: 38rpx;margin-left: 17rpx;" @click="copyAccount(item.bankAccount)"></image>
					</view>
					<view class="line4">
						<view>मात्रा：{{item.orderMoney}}</view>
						<view>लाभ：{{item.commission}}</view>
						<view class="date">{{item.expiresTime}}</view>
					</view>
					
					<view class="lin5">
						<view class="button" @click="toDetail(item,1)">
							成功
						</view>
						
						<view class="button cancel" @click="toDetail(item,2)">
							失败
						</view>
					</view>
					
					
				</view>
			</view>
			<view class="content-view" v-else>
				<view class="button" @click="getOrder()">
					接单
				</view>
			</view>

			
		</view>
		
		<uni-popup ref="popup" background-color="#fff" @change="change">
			<uni-popup-dialog ref="inputClose" mode="input" :title="accountType==1?'绑定银行卡':'绑定UPI'" value="对话框预置提示内容!"
								placeholder="请输入内容" @confirm="dialogInputConfirm">
								<view class="popup-content">
									<uni-easyinput v-if="accountType==1" style="margin-top: 10rpx;" v-model="dialogForm.bankAccount" :clearable=false :placeholder="$t('银行卡号')" prefixIcon="" placeholderStyle="color: '#CCCCCC'"></uni-easyinput>
									<uni-easyinput v-if="accountType==1" style="margin-top: 10rpx;" v-model="dialogForm.ifsc" :clearable=false :placeholder="$t('IFSC')" prefixIcon="" placeholderStyle="color: '#CCCCCC'"></uni-easyinput>
									<uni-easyinput v-if="accountType==0" style="margin-top: 10rpx;" v-model="dialogForm.upiAccount" :clearable=false :placeholder="$t('upiAccount')" prefixIcon="" placeholderStyle="color: '#CCCCCC'"></uni-easyinput>
									<uni-easyinput style="margin-top: 10rpx;" v-model="dialogForm.accountName" :clearable=false :placeholder="$t('accountName')" prefixIcon="" placeholderStyle="color: '#CCCCCC'"></uni-easyinput>
								</view>
			</uni-popup-dialog>
		</uni-popup>
<!-- 提示窗示例 -->
			<uni-popup ref="alertDialog" type="dialog" :isMaskClick="false">
				<uni-popup-dialog :showClose="false" type="info" cancel confirmText="马上刷新" title="通知" :content="`提交成功，任务状态将于${refreshTimes}s后自动刷新`" @confirm="dialogConfirm"
					></uni-popup-dialog>
			</uni-popup>

	</view>
</template>

<script>
	import { pathToBase64, base64ToPath } from 'image-tools'
	export default {
		data() {
			return {
				accountType:0,
				list:[],
				current: 0,
				styleType: 'button',
				items: ['UPI', '银行卡'],
				dialogForm:{
					userAccount:'',
					bankAccount:'',
					ifsc:'',
					accountName:'',
					upiAccount:'',
				},
				refreshTimes:10,
			}
		},
		onLoad() {
			
		},
		mounted() {
			this.loadDetail()
		},
		methods: {
			loadDetail(){
				uni.showLoading({
					title:'加载中'
				})
				let url = ""
				if (this.accountType==0) {
					url=this.$url.incomeOrderGetPending
				}else{
					url=this.$url.payoutOrderGetPending
				}
				this.$api
					.post(url, {
						userAccount:this.$store.getters.aid,
						accountType:this.current,
					})
					.then(res => {
						if (res.code==0) {
							this.list=[res.data]
						} 
					}).catch(err=>{
						if(err.code==32||err.code==31){
							this.$refs.popup.open()
						}
					})
					.finally(() => {
						uni.hideLoading()
					});
			},
			dialogInputConfirm(){
				let url=''
				let form=Object.assign(this.dialogForm)
				if (this.accountType==0) {
					url=this.$url.upiAccountAdd
					delete form.bankAccount
					delete form.ifsc
				}else{
					url=this.$url.bankAccountAdd
					delete form.upiAccountss
				}
				uni.showLoading({
					title:'加载中'
				})
				this.$api
					.post(url, form)
					.then(res => {
						uni.hideLoading()
						if (res.code==0) {
							this.$refs.popup.close()
							this.loadDetail()
							
							// this.refreshTimes=10
							// this.interval=setInterval(()=>{
							// 	this.refreshTimes--
							// 	if (this.refreshTimes<=0) {
							// 		this.dialogConfirm()
							// 	}
							// },1000)
							
						} 
					}).catch(err=>{
						uni.hideLoading()
					})
					.finally(() => {
						
					});
			},
			dialogConfirm(){
				this.loadDetail()
				clearInterval(this.interval)
			},
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex
				}
				
			},
			getOrder(){
				uni.showLoading({
					title:'加载中'
				})
				let url=''
				if (this.accountType==0) {
					url=this.$url.incomeOrderGet
				}else{
					url=this.$url.payoutOrderGet
				}
				this.$api
					.post(url,{
						userAccount:this.$store.getters.aid,
						accountType:this.current,
					})
					.then(res => {
						this.loadDetail()
					}).catch(err=>{
						if(err.code==32||err.code==31){
							this.$refs.popup.open()
						}
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
				    data: item,  
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
			toDetail(item,type){
				//1成功
				uni.chooseImage({
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						// const tempFilePaths = res.tempFilePaths;
						uni.showLoading({
							title:'加载中'
						})
						pathToBase64(tempFilePaths[0]).then(base64 => {
						    console.log("图片=="+base64);
							this.uploadStatus(base64,type,item)
						 }).catch(error => {
						    console.error(error)
						})
					}
				});
			},
			uploadStatus(path,type,item){
				uni.showLoading({
					title:'加载中'
				})
				let url=''
				let form = {
					userAccount:this.$store.getters.aid,
					orderNo:item.orderNo,
					orderMoney:item.orderMoney,
					payMoney:item.orderMoney,
					receiveMoney:item.orderMoney,
					photp:path,
				}
				if (this.accountType==0) {
					if (type==1) {
						url=this.$url.incomeOrderSuccess
					}else{
						url=this.$url.incomeOrderFailed
					}
					delete form.payMoney
				}else{
					if (type==1) {
						url=this.$url.payoutOrderSuccess
					}else{
						url=this.$url.payoutOrderFailed
					}
					delete form.receiveMoney
				}
				this.$api
					.post(url,form)
					.then(res => {
						this.list=[]
					}).catch(err=>{
					})
					.finally(() => {
						uni.hideLoading()
						// this.loadDetail()
					});
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
		.uni-padding-wrap{
			width: 640rpx;
			margin-top: 20rpx;
		}

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
			.lin5{
				display: flex;
				justify-content: space-between;
				margin-top: 20rpx;
				.button{
					width: 153rpx;
					height: 70rpx;
					line-height: 70rpx;
					background: #F5BB0F;
					box-shadow: 0px 9rpx 13rpx 0px rgba(245,187,15,0.24);
					border-radius: 20rpx;
					font-family: Nirmala UI;
					font-weight: bold;
					font-size: 32rpx;
					color: #FFFFFF;
					text-align: center;
				}
				.cancel{
					background: #cacaca;
					box-shadow: 0px 9rpx 13rpx 0px rgba(170, 170, 170, 0.2);
				}
			
			}
			
		}
		.content-view{
			padding-top: 200rpx;
			padding-bottom: 200rpx;
			
			.button{
				width: 153rpx;
				height: 70rpx;
				line-height: 70rpx;
				background: #F5BB0F;
				box-shadow: 0px 9rpx 13rpx 0px rgba(245,187,15,0.24);
				border-radius: 20rpx;
				font-family: Nirmala UI;
				font-weight: bold;
				font-size: 32rpx;
				color: #FFFFFF;
				text-align: center;
			}
		}
	}
	.popup-content{
		// display: flex;
		
	}
</style>