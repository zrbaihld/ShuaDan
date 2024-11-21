<template>
	<view class="container">
		<view class="top-view">
			<view class="welcome">{{$t("Welcome")}}</view>
			<view class="top-view-name" style="margin-top: 112rpx;">{{detail.userName}}</view>
			<view class="top-view-line" style="margin-top: 30rpx;"></view>
			<view>
				<view class="top-view-price" style="margin-top: 46rpx;">
					{{$t('उपलब्ध धन')}}：{{detail.balance}}
					<image src="../../../static/icon_bottom_price.png" style="width: 31rpx;" mode="widthFix"></image>
				</view>
				<view class="top-view-white" style="margin-top: 38rpx;">
					{{$t('प्रगति पर है')}}：{{detail.pendingOrder}}
				</view>
				<view class="top-view-price" style="margin-top: 46rpx;">
					{{$t('उपलब्ध धन')}}：{{detail.pendingMoney}}
					<image src="../../../static/icon_bottom_price.png" style="width: 31rpx;" mode="widthFix"></image>
				</view>
				<view class="top-view-white" style="margin-top: 38rpx;">
					{{$t('प्रगति पर है')}}：{{detail.successOrder}}
				</view>
			</view>
			<view class="top-view-line" style="margin-top: 30rpx;"></view>
			
		</view>
		<view class="notice">
			<image src="../../../static/icon_bottom_notice.png" style="width: 46rpx;margin: 0 17rpx 0 11rpx;" mode="widthFix"></image>
			<view style="flex-wrap: nowrap;overflow: hidden;">{{$t('निधि प्रवाह पूछताछनिधि प्रवाह पूछताछनिधि प्रवाधि प्रवाधि')}}  </view>
		</view>
		<view class="content">
			<view class="content-item-view">
				<view class="content-item" style="margin-top: 60rpx;" @click="showCash">
					<image src="../../../static/icon_bottom_tixian.png" style="width: 80rpx;" mode="widthFix"></image>
					<view>{{$t('नकदी वापिस लेना')}}</view>
				</view>
				
				<view class="content-item" style="margin-top: 60rpx;background-color: #F5BB0F;" @click="toRecharge">
					<image src="../../../static/icon_bottom_czcs.png" style="width: 80rpx;" mode="widthFix"></image>
					<view>{{$t('लबालब भरनाा')}}</view>
				</view>
				
				<view class="content-item" style="margin-top: 60rpx;background-color: #1772F6;" @click="toRechargeList">
					<image src="../../../static/icon_bottom_water.png" style="width: 80rpx;" mode="widthFix"></image>
					<view>{{$t('निधि प्रवाह पूछताछ')}}</view>
				</view>
			</view>
			
		</view>
		<uni-popup ref="popup" background-color="#fff">
			<uni-popup-dialog ref="inputClose" mode="input" title="提现"
				placeholder="请输入内容" @confirm="dialogInputConfirm">
				<view class="popup-content">
					<uni-easyinput style="margin-top: 10rpx;" v-model="dialogForm.money" :clearable=false :placeholder="$t('提现金额')" prefixIcon="" placeholderStyle="color: '#CCCCCC'"></uni-easyinput>
					<uni-easyinput style="margin-top: 10rpx;" v-model="dialogForm.trc20Address" :clearable=false :placeholder="$t('收款地址')" prefixIcon="" placeholderStyle="color: '#CCCCCC'"></uni-easyinput>
					
				</view>
			</uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				detail:{
					userName:'',
					balance:'',
					pendingOrder:'',
					pendingMoney:'',
					successOrder:'',
				},
				dialogForm:{
					userAccount:'',
					money:'',
					trc20Address:'',
				},

			}
		},
		created() {
			this.loadDetail()
		},
		mounted() {
			// this.loadDetail()
		},
		onLoad() {
			// this.loadDetail()
		},
		
		methods: {
			loadDetail(){
				uni.showLoading({
					title:'加载中'
				})
				this.$api
					.post(this.$url.userIndex, {})
					.then(res => {
						if (res.code==0) {
							this.detail=res.data
						}
					})
					.finally(() => {
						uni.hideLoading()
					});
			},
			showCash(){
				this.dialogForm.userAccount=this.$store.getters.aid
				this.dialogForm.money=''
				this.dialogForm.trc20Address=''
				this.$refs.popup.open()
			},
			dialogInputConfirm(){
				let url=this.$url.cashSubmit
				this.$api
					.post(url, this.dialogForm)
					.then(res => {
						if (res.code==0) {
							this.loadDetail()
							this.$refs.popup.close()
						} 
					}).catch(err=>{
					})
					.finally(() => {
						uni.hideLoading()
					});
			},
			toRecharge(){
				uni.navigateTo({
					url:"/pages/index/recharge/recharge"
				})
			},
			toRechargeList(){
				uni.navigateTo({
					url:"/pages/index/user/rechargeList/rechargeList"
				})
			},
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
		align-items: center;
		flex-direction: column;
		.welcome{
			font-family: Microsoft YaHei;
			position: absolute;
			top: 0;
			left: 0;
			font-weight: bold;
			font-size: 166rpx;
			color: #FFFFFF;
			opacity: 0.03;
		}
		.top-view-name{
			font-family: Nirmala UI;
			font-weight: bold;
			font-size: 48rpx;
			color: #D0F0FF;
		}
		.top-view-line{
			width: 267rpx;
			height: 5rpx;
			background: #95C0FF;
		}
		.top-view-price{
			font-family: Nirmala UI;
			font-weight: bold;
			font-size: 37rpx;
			color: #FFF200;
			display: flex;
			align-items: center;
		}
		.top-view-white{
			font-family: Nirmala UI;
			font-weight: bold;
			font-size: 37rpx;
			color: #FFFFFF;
			display: flex;
			align-items: center;
		}
		
	}
	.notice{
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
	.content{
		background: white;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		.content-item-view{
			width: 639rpx;
			.content-item{
				
				height: 180rpx;
				background: #28C613;
				box-shadow: 0px 17rpx 40rpx 0px rgba(40,198,19,0.24);
				border-radius: 33rpx;
				
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 0 50rpx;
				font-family: Nirmala UI;
				font-weight: 400;
				font-size: 44rpx;
				color: #FFFFFF;
			}
		}
		
	}
</style>
