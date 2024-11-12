<template>
	<view class="u-page">
			<u-list
			>
				<u-list-item
					v-for="(item, index) in indexList"
					:key="index"
				>
					<u-cell
						:title="`列表长度-${index + 1}`"
					>
						
					</u-cell>
				</u-list-item>
			</u-list>
		</view>
</template>

<script>
	import url from '@/common/url.js'
	export default {
		data() {
			return {
				indexList:[],
				url:url.incomeOrderGetList
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
