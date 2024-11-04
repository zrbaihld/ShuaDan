<template>
	<view class="container">
		<image class="bg" src="../../static/icon_login_bg.png"></image>
		<view class="content">
			<view class="title">{{$t("Welcome")}}</view>
			<view class="des">{{$t('लॉग इन करने के लिए कृपया अपना खाता नंबर और पासवर्ड दर्ज करें')}}</view>
			<view class="login-input" style="margin-top: 87rpx;">
				<uni-easyinput v-model="form.userAccount" :inputBorder="false" :clearable=false :placeholder="$t('कृपया अपना ईमेल खाता दर्ज करें')" prefixIcon="" placeholderStyle="color: '#CCCCCC'">
					<template v-slot:left>
						<image class="login-user" mode="widthFix" style="width: 40rpx;margin-left: 40rpx;"  src="../../static/icon_login_user.png"></image>
					</template>
				</uni-easyinput>
			</view>
			<view class="login-input" style="margin-top: 46rpx;">
				<uni-easyinput v-model="form.userPassword" type="password" :inputBorder="false" :clearable=false :placeholder="$t('पास वर्ड दर्ज करें')" prefixIcon="" placeholderStyle="color: '#CCCCCC'">
					<template v-slot:left>
						<image class="login-user" mode="widthFix" style="width: 40rpx;margin-left: 40rpx;"  src="../../static/icon_login_password.png"></image>
					</template>
				</uni-easyinput>
				<!-- <image class="login-input-right" mode="widthFix" style="width: 40rpx;margin-right: 40rpx;"  src="../../static/icon_login_password_see.png"></image> -->
			</view>
			<view class="login-input" style="margin-top: 46rpx;" >
				<uni-easyinput v-model="form.email"  :inputBorder="false" :clearable=false :placeholder="$t('सत्यापन कोड भरेंें')" prefixIcon="" placeholderStyle="color: '#CCCCCC'">
					<template v-slot:left>
						<image class="login-user" mode="widthFix" style="width: 40rpx;margin-left: 40rpx;"  src="../../static/icon_login_email.png"></image>
					</template>
				</uni-easyinput>
			</view>
			
			<view class="btn-login" style="margin-top: 90rpx;" @click="doLogin">
				{{$t('ईमेल सत्यापन कोड भेजें')}}
			</view>
			<view class="login-tips" style="margin-top: 82rpx;">
				<view class="login-tips-line"></view>
				<view>{{$t('कोई खाता नहीं है?')}}</view>
				<view class="login-tips-line"></view>
			</view>
			<view class="btn-regster" style="margin-top: 72rpx;" @click="toRegister">
				{{$t('पंजीकरण करवाना')}}
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
				form:{
					userAccount:'',
					userPassword:'',
					email:'',
					
				},
			}
		},
		onLoad() {
			if (process.env.NODE_ENV === 'development') {
				this.form.userAccount='test009'
				this.form.userPassword='1'
				this.form.email='1'
			}
		},
		methods: {
			doLogin(){
				// uni.navigateTo({
				// 	url:"/pages/index/index"
				// })
				uni.showLoading({
					title:'加载中'
				})
				this.$api
					.post(this.$url.userlogin, this.form)
					.then(res => {
						if (res.code == 0) {
							res.data.id=this.form.userAccount
							this.$store.commit('login', res.data);
							uni.navigateTo({
								url:"/pages/index/index"
							})
						}
					})
					.finally(() => {
						uni.hideLoading()
					});
				
			},
			toRegister(){
				uni.navigateTo({
					url:"/pages/register/register"
				})
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
