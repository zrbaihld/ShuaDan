<template>
	<view class="container">
		<home v-if="viewAction==1"/>
		<task v-if="viewAction==2"/>
		
		
		<view class="bottom-view">
			<view class="bottom-view-item" @click="viewAction=1"><image mode="widthFix" style="width: 50rpx;"  src="../../static/icon_bottom_home.png"></image></view>
			<view class="bottom-view-item" @click="viewAction=2"><image mode="widthFix" style="width: 50rpx;"  src="../../static/icon_bottom_rw.png"></image></view>
			<view class="bottom-view-item" ><image mode="widthFix" style="width: 50rpx;"  src="../../static/icon_bottom_td.png"></image></view>
			<view class="bottom-view-item" ><image mode="widthFix" style="width: 50rpx;"  src="../../static/icon_bottom_vip.png"></image></view>
			<view class="bottom-view-item" ><image mode="widthFix" style="width: 50rpx;"  src="../../static/icon_bottom_user.png"></image></view>
		</view>
	</view>
</template>

<script>
	import home from './home/index.vue'
	import task from './task/index.vue'
	export default {
		data() {
			return {
				viewAction:1,
				href: 'https://uniapp.dcloud.io/component/README?id=uniui'
			}
		},
		mounted() {
			
		},
		components:{
			home,task
		},
		methods: {

		}
	}
</script>

<style lang="less" scoped>
	.container {
		padding-bottom: 120rpx;
		
	}
	.bottom-view{
		height: 120rpx;
		bottom: 0;
		width: 100%;
		left: 0;
		position: fixed;
		background: #1772F6;
		display: flex;
		align-items: center;
		.bottom-view-item{
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
</style>
