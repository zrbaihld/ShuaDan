<template>
	<view class="u-page">
			<u-list>
				<u-list-item
					v-for="(item, index) in indexList"
					:key="index"
				>
				<uni-card :title="`upi账户${item.upiAccount}`" >
					<view>
						<view>upi账户名:{{item.person}}</view>
						<view >状态:{{item.status==0?'启用':'禁用'}}</view>
					</view>
				</uni-card>
				</u-list-item>
				<u-empty
				v-if="indexList.length==0"
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
					.post(url.upiAccountList, {
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
