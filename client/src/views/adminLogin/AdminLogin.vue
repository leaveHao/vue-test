<template>
	<div class="admin_login">
		<div class="login_box">
			<!-- logo盒子 -->
			<div class="logo_box">
				<img src="~assets/img/logo.png" alt="">
			</div>
			<!-- 表单盒子 -->
			<a-form-model layout="horizontal" ref="adminLoginForm" :model="adminLoginForm" :rules="adminLoginRules" class="login_form">
				<a-form-model-item prop="adminName">
					<a-input v-model="adminLoginForm.adminName" placeholder="请输入用户名" class="form_item">
						<a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.4)" />
					</a-input>
				</a-form-model-item>
				<a-form-model-item prop="password">
					<a-input v-model="adminLoginForm.password" type="password" placeholder="请输入密码" class="form_item">
						<a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.4)" />
					</a-input>
				</a-form-model-item>
				<a-button type="primary" class="login-btn" @click="login">
					登录
				</a-button>
			</a-form-model>
		</div>
	</div>
</template>

<script>
	import {
		adminLogin
	} from 'network/admin'
	export default {
		name: 'AdminLogin',
		data() {
			return {
				//表单数据绑定对象
				adminLoginForm: {
					adminName: '',
					password: '',
				},
				//表单验证规则
				adminLoginRules: {
					adminName: [{
						required: true,
						message: '请输入用户名',
						trigger: 'blur'
					}],
					password: [{
						required: true,
						message: '请输入密码',
						trigger: 'blur'
					}]
				}
			}
		},
		methods: {
			//登录
			login() {
				this.$refs.adminLoginForm.validate(async valid => {
					if (!valid) return
					let result = await adminLogin(this.adminLoginForm)
					if (result.status_code !== 200) {
						this.$error({
							title: result.message
						});
					} else {
						this.$message.success(result.message);
						this.$router.replace('/adminhome');
					}
				});
			}
		}
	}
</script>

<style scoped>
	.admin_login {
		background-color: #2b4b6b;
		height: 100%;
	}

	.login_box {
		width: 450px;
		height: 300px;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		border-radius: 5px;
		background-color: #F2F2F2;
	}

	.logo_box {
		width: 130px;
		height: 130px;
		position: absolute;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: #fff;
		border: 1px solid #eee;
		box-shadow: 0 0 10px #ddd;
		border-radius: 50%;
		padding: 10px;
	}

	.logo_box img {
		width: 100%;
		height: 100%;
		background-color: #eee;
		border-radius: 50%;
	}

	.login_form {
		margin: 100px 30px 0 30px;
	}

	.form_item {
		height: 40px;
	}

	.login-btn {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
	}
</style>
