<template>
	<view class="u-page">
		<u-list>
			<u-list-item v-for="(item, index) in indexList" :key="index" >
				<uni-card :title="`${$t('upiAccount')}${item.upiAccount}`" @click="changeData(item)">
					<view>
						<view>{{$t('upiAccount')}}:{{item.person}}</view>
						<view>{{$t('状态')}}:{{item.status==0?$t('启用'):$t('禁用')}}</view>
					</view>
				</uni-card>
			</u-list-item>
			<u-empty v-if="indexList.length==0" width="380rpx" height="380rpx" textSize="32"
				icon="http://cdn.uviewui.com/uview/empty/car.png">
			</u-empty>
		</u-list>
		<uni-popup ref="popup" background-color="#fff">
			<uni-popup-dialog ref="inputClose" mode="input" :title="(isEdit?$t('修改'):$t('绑定'))+(accountType==1?'Bank':'UPI')" value="对话框预置提示内容!"
				placeholder="请输入内容" @confirm="dialogInputConfirm">
				<view class="popup-content">
					<uni-easyinput v-if="accountType==1" style="margin-top: 10rpx;" v-model="dialogForm.bankAccount"
						:clearable=false :placeholder="$t('银行卡号')" prefixIcon=""
						placeholderStyle="color: '#CCCCCC'"></uni-easyinput>
					<uni-easyinput v-if="accountType==1" style="margin-top: 10rpx;" v-model="dialogForm.ifsc"
						:clearable=false :placeholder="$t('IFSC')" prefixIcon=""
						placeholderStyle="color: '#CCCCCC'"></uni-easyinput>
					<uni-easyinput v-if="accountType==0" style="margin-top: 10rpx;" v-model="dialogForm.upiAccount"
						:clearable=false :placeholder="$t('upiAccount')" prefixIcon=""
						placeholderStyle="color: '#CCCCCC'"></uni-easyinput>
					<uni-easyinput style="margin-top: 10rpx;" v-model="dialogForm.accountName" :clearable=false
						:placeholder="$t('accountName')" prefixIcon=""
						placeholderStyle="color: '#CCCCCC'"></uni-easyinput>
						<view>{{$t('是否启用')}}<u-switch v-model="dialogForm.accountStatus" activeValue='0' inactiveValue='1' size="50"></u-switch></view>
						
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
				indexList: [],
				accountType: 0,
				isEdit: false,
				dialogForm: {
					userAccount: '',
					bankAccount: '',
					bankAccountId: '',
					ifsc: '',
					accountName: '',
					upiAccount: '',
					accountStatus: '',
					upiAccountId: '',
				}
			}
		},
		onLoad() {
			this.loadList()
		},
		onNavigationBarButtonTap(e) {
			this.$refs.popup.open()
			this.isEdit=false
			this.dialogForm={
				userAccount: '',
				bankAccount: '',
				bankAccountId: '',
				ifsc: '',
				accountName: '',
				upiAccount: '',
				accountStatus: '',
				upiAccountId: '',
			}
		},
		methods: {
			loadList() {
				uni.showLoading({
					title: this.$t('加载中')
				})
				this.$api
					.post(url.upiAccountList, {
						userAccount: this.$store.getters.aid
					})
					.then(res => {
						if (res.code == 0) {
							this.indexList = res.data.rows

						}
					})
					.finally(() => {
						uni.hideLoading()
					});
			},
			changeData(item) {
				// this.dialogForm
				this.$refs.popup.open()
				this.isEdit=true
				this.dialogForm={
					userAccount: item.userAccount,
					bankAccount: item.bankAccount,
					bankAccountId: item.id,
					ifsc: item.ifsc,
					accountName: item.person,
					upiAccount: item.upiAccount,
					accountStatus: item.status+'',
					upiAccountId: item.id,
				}
			},
			dialogInputConfirm(){
				let url=''
				let form=Object.assign(this.dialogForm)
				if (this.accountType==0) {
					
					if (this.isEdit) {
						url=this.$url.upiAccountEdit
						form={
							'userAccount':this.$store.getters.aid,
							'upiAccount':this.dialogForm.upiAccount,
							'accountName':this.dialogForm.accountName,
							'upiAccountId':this.dialogForm.upiAccountId,
							'accountStatus':this.dialogForm.accountStatus,
						}
					}else{
						url=this.$url.upiAccountAdd
						form={
							'userAccount':this.$store.getters.aid,
							'upiAccount':this.dialogForm.upiAccount,
							'accountName':this.dialogForm.accountName,
						}
					}
					
				}else{
					
					if (this.isEdit) {
						url=this.$url.bankAccountEdit
						form={
							'userAccount':this.$store.getters.aid,
							'bankAccount':this.dialogForm.bankAccount,
							'accountName':this.dialogForm.accountName,
							'bankAccountId':this.dialogForm.bankAccountId,
							'ifsc':this.dialogForm.ifsc,
							'accountStatus':this.dialogForm.accountStatus,
						}
					}else{
						url=this.$url.bankAccountAdd
						form={
							'userAccount':this.$store.getters.aid,
							'bankAccount':this.dialogForm.bankAccount,
							'ifsc':this.dialogForm.ifsc,
							'accountName':this.dialogForm.accountName,
						}

					}
				}
				
				uni.showLoading({
					title:this.$t('加载中')
				})
				this.$api
					.post(url, form)
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
			},
		}
	}
</script>

<style>

</style>