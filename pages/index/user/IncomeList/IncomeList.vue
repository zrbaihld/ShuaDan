<template>
	<view class="u-page">
			<u-list>
				<u-list-item
					v-for="(item, index) in indexList"
					:key="index"
				>
				<uni-card :title="`${item.acctType == '0'?'UPI':'银行卡'}-${item.orderType == '0'?'代收':'代付'}`" >
					<view>
						<view>抢单用户订单号:{{item.orderPtNo}}</view>
						<view>商户订单号:{{item.orderNo}}</view>
						<view>金额:{{item.amount}}</view>
						<view>收款账户名:{{item.person}}</view>
						<view>收款账户:{{item.bankAccount}}</view>
						<view v-if="item.acctType == 1">收款IFSC:{{item.branchName}}</view>
						<view>订单时间:{{item.createTime}}</view>
					</view>
						
				</uni-card>
				</u-list-item>
				<u-empty
				v-if="indexList.length==1"
				width="380rpx"
				height="380rpx"
				textSize="32"
				        icon="http://cdn.uviewui.com/uview/empty/car.png"
				>
				</u-empty>
			</u-list>
		</view>
</template>

<script>
	import url from '@/common/url.js'
	export default {
		data() {
			return {
				indexList:[],
				}
		},
		onLoad() {
			this.loadList()
		},
		methods: {
			loadList(){
				uni.showLoading({
					title:'加载中'
				})
				this.$api
					.post(url.incomeOrderGetList, {
						userAccount:this.$store.getters.aid
					})
					.then(res => {
						if (res.code==0) {
							this.indexList=res.data.rows
							
						}
					})
					.finally(() => {
						uni.hideLoading()
					});
			}
		}
	}
</script>

<style>

</style>
