<template>
	<view class="container">
		<image class="bg" src="../../static/icon_login_bg.png"></image>
		<view class="content">
			<view class="title">{{$t("Welcome")}}</view>
			<view class="des">{{$t('请输入您的帐号和密码登录。')}}</view>
			<view class="login-input" style="margin-top: 87rpx;">
				<uni-easyinput v-model="form.userAccount"  :inputBorder="false" :clearable=false :placeholder="$t('')" prefixIcon="请验证您的电子邮件帐户。" placeholderStyle="color: '#CCCCCC'">
					<template v-slot:left>
						<image class="login-user" mode="widthFix" style="width: 40rpx;margin-left: 40rpx;"  src="../../static/icon_login_user.png"></image>
					</template>
				</uni-easyinput>
			</view>
			<view class="login-input" style="margin-top: 46rpx;">
				<uni-easyinput v-model="form.userPassword" :inputBorder="false" :type="showPassword?'password':'text'" :clearable=false :placeholder="$t('确认密码')" prefixIcon="" placeholderStyle="color: '#CCCCCC'">
					<template v-slot:left>
						<image class="login-user" mode="widthFix" style="width: 40rpx;margin-left: 40rpx;"  src="../../static/icon_login_password.png"></image>
					</template>
				</uni-easyinput>
				<!-- <image class="login-input-right" mode="widthFix" style="width: 40rpx;margin-right: 40rpx;"  src="../../static/icon_login_password_see.png" @click="showPassword=!showPassword"></image> -->
			</view>
			<view class="login-input" style="margin-top: 46rpx;">
				<uni-easyinput v-model="form.invitationCode" :inputBorder="false"  :clearable=false :placeholder="$t('邀请码')" prefixIcon="" placeholderStyle="color: '#CCCCCC'">
					<template v-slot:left>
						<image class="login-user" mode="widthFix" style="width: 40rpx;margin-left: 40rpx;"  src="../../static/icon_login_link.png" ></image>
					</template>
				</uni-easyinput>
			</view>
			<view class="login-input" style="margin-top: 46rpx;">
				<uni-easyinput v-model="form.email" :inputBorder="false" :clearable=false :placeholder="$t('输入身份验证码')" prefixIcon="" placeholderStyle="color: '#CCCCCC'">
					<template v-slot:left>
						<image class="login-user" mode="widthFix" style="width: 40rpx;margin-left: 40rpx;"  src="../../static/icon_login_email.png"></image>
					</template>
				</uni-easyinput>
			</view>
			
			<view class="btn-login" style="margin-top: 90rpx;" @click="doLogin">
				{{$t('发送电子邮件验证码')}}
			</view>
			<view class="login-tips" style="margin-top: 82rpx;">
				<view class="login-tips-line"></view>
				<view>{{$t('已有账号？')}}</view>
				<view class="login-tips-line"></view>
			</view>
			<view class="btn-regster" style="margin-top: 72rpx;" @click="toRegister" v-if="false">
				{{$t('去登陆')}}
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orangeStyles: {
					color: '#CCCCCC',
					inputColor: '#CCCCCC',
				},
				showPassword:'false',
				form:{
					userAccount:'',
					userPassword:'',
					invitationCode:'',
					email:'',
				},
			}
		},
		methods: {
			doLogin(){
				uni.showLoading({
					title:this.$t('加载中')
				})
				this.$api
					.post(this.$url.userRegist, this.form)
					.then(res => {
						if (res.code == 0) {
							uni.navigateTo({
								url: '/pages/login/login'
							});
						}
					})
					.finally(() => {
						uni.hideLoading()
					});
			},
			toRegister(){
				
			}
		}
	}
</script>

<style lang="less">
.container {
		font-size: 14px;
		position: relative;
		.bg{
			position: absolute;
			z-index: 0;
			top: 0;
			left: 0;
			width: 304rpx;
			height: 309rpx;
		}
		.content{
			position: relative;
			display: flex;
			width: 100%;
			flex-direction: column;
			align-items: center;
			.title{
				font-family: Microsoft YaHei;
				font-weight: 300;
				font-size: 127rpx;
				color: #1772F6;
				margin-top: 260rpx;
			}
			.des{
				width: 470rpx;
				font-family: Nirmala UI;
				font-weight: 400;
				font-size: 24rpx;
				color: #CCCCCC;
				margin-top: 34rpx;
				text-align: center;
			}
		}
		
	}
	.login-input{
		height: 93rpx;
		width: 492rpx;
		background: #FFFFFF;
		box-shadow: 0px 17px 40px 0px rgba(7,94,255,0.12);
		border-radius: 47rpx;
		position: relative;
		::v-deep .uni-easyinput{
			height: 93rpx;
			
			font-family: Nirmala UI;
			font-weight: 400;
			font-size: 27rpx;
			color: #CCCCCC;
		}
		::v-deep .uni-easyinput__content{
			border-radius: 47rpx;
			height: 93rpx;
			.uni-easyinput__content-input{
				line-height: 93rpx;
			}
		}
		
		.login-input-right{
			position: absolute;
			right: 0;
			top: 35rpx;
		}
	}
	.btn-login{
		width: 492rpx;
		height: 93rpx;
		background: #1772F6;
		box-shadow: 0px 17rpx 40rpx 0px rgba(0,89,255,0.24);
		border-radius: 47rpx;
		font-family: Nirmala UI;
		font-weight: 400;
		font-size: 37rpx;
		line-height: 93rpx;
		text-align: center;
		color: #FFFFFF;
	}
	.login-tips{
		display: flex;
		align-items: center;
		justify-content: center;
		font-family: Nirmala UI;
		font-weight: 400;
		font-size: 21rpx;
		color: #CCCCCC;
		
		.login-tips-line{
			width: 140rpx;
			height: 1rpx;
			background: #CCCCCC;
			margin: 0 20rpx;
		}
		
	}
	.btn-regster{
		width: 492rpx;
		height: 93rpx;
		background: #28C613;
		box-shadow: 0px 17rpx 40rpx 0px rgba(46,229,22,0.24);
		border-radius: 47rpx;
		font-family: Nirmala UI;
		font-weight: 400;
		font-size: 37rpx;
		line-height: 93rpx;
		text-align: center;
		color: #FFFFFF;
		
	}
	.login-user{
		
	}
</style>
