<template>
	<a-layout id="components-layout-demo-top-side-2" class="admin_home">
		<a-layout-header class="head">
			<p>管理员: {{$store.state.adminName}}</p>
			<a-button type="primary" @click="logout">
			      退出登录
			</a-button>
		</a-layout-header>
		<a-layout>
			<a-layout-sider width="200">
				<a-menu mode="inline" style="height: 100%; borderRight: 0;background-color: #323744;color: #F2F2F2;" :default-open-keys="['sub1']" :default-selected-keys="[$route.path]" @click="menuClick">
					<a-sub-menu key="sub1">
						<span slot="title">
							<a-icon type="user" />人员管理</span>
						<a-menu-item key="/adminhome/users">
							人员列表
						</a-menu-item>
					</a-sub-menu>
				</a-menu>
			</a-layout-sider>
			<a-layout style="padding: 0 24px 24px">
				<router-view></router-view>
			</a-layout>
		</a-layout>
	</a-layout>
</template>

<script>
	import {
		ADD_ADMIN_NAME
	} from 'store/mutation-types'
	import {
		isAdmin,
		adminLogout
	} from 'network/admin'
	export default {
		name: 'AdminHome',
		data() {
			return {
				collapsed: false,
			};
		},
		async created() {
			//设置访问权限
			let result = await isAdmin();
			if (result.status_code === 400) {
				this.$warning({
					title: result.message
				});
				this.$router.replace('/adminlogin');
				return;
			}
			this.$store.commit(ADD_ADMIN_NAME, {
				adminName: result.adminName
			});
		},
		methods:{
			menuClick(data){
				this.$router.push(data.key)
			},
			//退出登录
			async logout() {
				let result = await adminLogout();
				this.$message.info(result.message);
				this.$router.replace('/adminlogin')
			},
		}
	}
</script>

<style scoped>
	.admin_home{
		height: 100%;
		width: 100%;
		min-width: 900px;
	}
	
	.head{
		background-color: #20242B;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}
	
	.head p{
		color: #F2F2F2;
		margin-right: 20px;
		margin-top: 15px;
		font-size: 16px;
	}
</style>
