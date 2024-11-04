<template>
	<view class="container">
		<view class="top-view">
			<view class="welcome">welcome</view>
			
		</view>
		<view class="notice">
			<image src="../../../static/icon_bottom_notice.png" style="width: 46rpx;margin: 0 17rpx 0 11rpx;" mode="widthFix"></image>
			<view style="flex-wrap: nowrap;overflow: hidden;">निधि प्रवाह पूछताछनिधि प्रवाह पूछताछनिधि प्रवाधि प्रवाधि  </view>
		</view>
		<view class="content">
			
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		methods: {

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
		
	}
</style>
