<template>
	<view class="container">
		<view class="top-view">
			<view class="welcome">welcome</view>
			<view class="top-view-title" style="margin-top: 85rpx;">उलटी गिनती</view>
			<view class="top-view-down" style="margin-top: 29rpx;">Countdown</view>
			<view class="top-view-time" style="margin-top: 47rpx;">56:25:30</view>
			<view class="top-view-info" style="margin-top: 48rpx;">
				<view class="top-view-info-text">समीक्षा: <text style="color: #F5BB0F;">1</text></view>
				<view class="top-view-info-text">पूरा नहीं हुआ: <text style="color: #FFF200;">1</text></view>
				<view class="top-view-info-text">पुरा होना।: <text style="color: #2EEC15;">22</text></view>
			</view>
		</view>
		<view class="notice">
			<image src="../../../static/icon_bottom_notice.png" style="width: 46rpx;margin: 0 17rpx 0 11rpx;" mode="widthFix"></image>
			<view style="flex-wrap: nowrap;overflow: hidden;">निधि प्रवाह पूछताछनिधि प्रवाह पूछताछनिधि प्रवाधि प्रवाधि  </view>
		</view>
		<view class="content">
			<view class="tab" style="margin-top: 50rpx;">
				<view class="left">प्रगति पर है</view>
				<view class="right">पुरा होना।</view>
			</view>
			
			<view class="content-card" style="margin-top: 47rpx;">
				<view class="card-title">आदेश की जानकारी</view>
				<view class="card-line" style="margin-top: 29rpx;"></view>
				<view class="card-name" style="margin-top: 29rpx;">नाम：namename</view>
				<view class="card-address" style="margin-top: 29rpx;">किनारा：भारतीय अंतर्राष्ट्रीय बैंक</view>
				<view class="card-phone" style="margin-top: 21rpx;">किनारा：1234567890123456</view>
				<view class="card-card" style="margin-top: 29rpx;">
					<text>मात्रा：566600</text><text>लाभ：560</text>
				</view>
				<view class="card-line" style="margin-top: 29rpx;"></view>
				
				<view class="card-info" style="margin-top: 21rpx;">
					<view class="card-info-view">
						<view class="card-info-title" style="margin-bottom: 23rpx;">
							① चित्र अपलोड करें
						</view>
						<image src="../../../static/icon_bottom_pic.png" style="width: 67rpx;" mode="widthFix"></image>
						<view class="card-info-tips" style="margin-top: 23rpx;">
							5M से अधिक नहीं
						</view>
					</view>
					<view class="card-info-view">
						<view class="card-info-title" style="margin-bottom: 23rpx;">
							②वीडियो अपलोड करें
						</view>
						<image src="../../../static/icon_bottom_video.png" style="width: 67rpx;" mode="widthFix"></image>
						<view class="card-info-tips" style="margin-top: 23rpx;">
							100M से अधिक नहीं
						</view>
					</view>
					
					<view class="card-info-view">
						<view class="card-info-title" style="margin-bottom: 23rpx;">
							③सामग्री सबमिट करें
						</view>
						<view class="card-info-btn" style="margin-top: 30rpx;">
							जमा करना
						</view>
					</view>
				</view>
					
			</view>
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
		.top-view-title{
			font-family: Nirmala UI;
			font-weight: bold;
			font-size: 67rpx;
			color: #FFFFFF;
		}
		.top-view-down{
			font-family: Nirmala UI;
			font-weight: 400;
			font-size: 33rpx;
			color: #93BFFF;
		}
		.top-view-time{
			font-family: Nirmala UI;
			font-weight: 400;
			font-size: 67rpx;
			color: #FFFFFF;
		}
		.top-view-info{
			display: flex;
			align-items: center;
			width: 80%;
			justify-content: space-between;
			.top-view-info-text{
				font-family: Nirmala UI;
				font-weight: bold;
				font-size: 28rpx;
				color: #FFFFFF;
			}
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
		.tab{
			width: 640rpx;
			height: 95rpx;
			display: flex;
			.left{
				width: 320rpx;
				height: 95rpx;
				background: #F5BB0F;
				box-shadow: 0px 17rpx 27rpx 0px rgba(245,187,15,0.24);
				border-radius: 20rpx 0px 0px 20rpx;
				
				font-family: Nirmala UI;
				font-weight: bold;
				font-size: 37rpx;
				line-height: 95rpx;
				text-align: center;
				color: #FFF600;
			}
			.right{
				width: 320rpx;
				height: 95rpx;
				background: #F2D786;
				box-shadow: 0px 17rpx 27rpx 0px rgba(245,187,15,0.24);
				border-radius: 0px 20rpx 20rpx 0rpx;
				
				font-family: Nirmala UI;
				font-weight: bold;
				font-size: 37rpx;
				line-height: 95rpx;
				text-align: center;
				color: #FFFFFF;
			}
		}
		.content-card{
			width: 639rpx;
			background: #28C613;
			box-shadow: 0px 17rpx 40rpx 0px rgba(40,198,19,0.24);
			border-radius: 33rpx;
			padding: 30rpx;
			.card-title{
				font-family: Nirmala UI;
				font-weight: bold;
				font-size: 37rpx;
				color: #FFFFFF;
			}
			.card-line{
				width: 389rpx;
				height: 3rpx;
				background: #8CEA80;
			}
			.card-name{
				font-family: Nirmala UI;
				font-weight: bold;
				font-size: 28rpx;
				color: #FFFFFF;
			}
			.card-address{
				font-family: Nirmala UI;
				font-weight: bold;
				font-size: 28rpx;
				color: #FFFFFF;
			}
			.card-phone{
				font-family: Nirmala UI;
				font-weight: bold;
				font-size: 28rpx;
				color: #FFFFFF;
			}
			.card-card{
				width: 389rpx;
				font-family: Nirmala UI;
				font-weight: bold;
				font-size: 28rpx;
				color: #FFFFFF;
				
				display: flex;
				justify-content: space-between;
			}
			.card-info{
				display: flex;
				justify-content: space-between;
				align-items: center;
				.card-info-view{
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					align-items: center;
					.card-info-title{
						font-family: Adobe Heiti Std;
						font-weight: normal;
						font-size: 21rpx;
						color: #FFFFFF;
					}
					.card-info-tips{
						font-family: Nirmala UI;
						font-weight: 400;
						font-size: 21rpx;
						color: #CFECCB;
					}
					.card-info-btn{
						width: 195rpx;
						height: 91rpx;
						background: #F5BB0F;
						box-shadow: 0px 9rpx 13rpx 0px rgba(245,187,15,0.24);
						border-radius: 20rpx;
						
						font-family: Nirmala UI;
						font-weight: bold;
						font-size: 31rpx;
						line-height: 91rpx;
						color: #FFFFFF;
						text-align: center;
					}
				}
			}
		}
	}
</style>
