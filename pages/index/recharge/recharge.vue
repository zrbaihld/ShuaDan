<template>
	<view class="content-view">
		<view>{{$t('充值完成以后需要上传充值凭证，后台人工审核')}}</view>
		
		<image :src="detail.photo" mode="aspectFit"></image>
		<view class="tips">
			{{$t('充值地址')}}：{{detail.addr}}
		</view>
		
		<u-button type="primary" :text="$t('上传凭证')" @click="success"></u-button>
		
		<uni-popup ref="popup" background-color="#fff">
			<uni-popup-dialog ref="inputClose" mode="input" :title="$t('充值成功')" value="对话框预置提示内容!"
				placeholder="请输入内容" @confirm="dialogInputConfirm">
				<view class="popup-content">
					<uni-easyinput style="margin-top: 10rpx;" v-model="dialogForm.sysAddr"
						:clearable=false :placeholder="$t('充值地址')" prefixIcon=""
						placeholderStyle="color: '#CCCCCC'"></uni-easyinput>
					<uni-easyinput style="margin-top: 10rpx;" v-model="dialogForm.userAddr"
						:clearable=false :placeholder="$t('本人地址')" prefixIcon=""
						placeholderStyle="color: '#CCCCCC'"></uni-easyinput>
					<uni-easyinput style="margin-top: 10rpx;" v-model="dialogForm.money"
						:clearable=false :placeholder="$t('输入金额')" prefixIcon=""
						placeholderStyle="color: '#CCCCCC'"></uni-easyinput>
						
				</view>
			</uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import url from '@/common/url.js'
	export default {
		data() {
			return {
				detail:{
					addr: "12311231321322",
					photo: "http://103.225.11.214/base64/trc20/222.jpg"
				},
				dialogForm:{
					userAccount:'',
					sysAddr:'',
					userAddr:'',
					money:'',
				}
			}
		},
		onLoad() {
			this.loadList()
		},
		methods: {
			loadList() {
				uni.showLoading({
					title: this.$t('加载中')
				})
				this.$api
					.post(url.rechargeGetAddr, {
						userAccount: this.$store.getters.aid
					})
					.then(res => {
						if (res.code == 0) {
							this.detail = res.data
			
						}
					})
					.finally(() => {
						uni.hideLoading()
					});
			},
			success(){
				this.$refs.popup.open()
				this.dialogForm={
					userAccount:this.$store.getters.aid,
					sysAddr:this.detail.addr,
					userAddr:'',
					money:'',
				}
			},
			dialogInputConfirm(){
				uni.showLoading({
					title:this.$t('加载中')
				})
				this.$api
					.post(url.rechargeSubmit, this.dialogForm)
					.then(res => {
						if (res.code==0) {
							this.loadList()
							this.$refs.popup.close()
						} 
					}).catch(err=>{
					})
					.finally(() => {
						uni.hideLoading()
					});
			}
		}
	}
</script>

<style lang="less" scoped>
.content-view{
	padding: 20rpx;
	.tips{
		border: 1rpx #e0e0e0 solid;
		padding: 5rpx 20rpx;
		margin: 50rpx;
	}
}
</style>
