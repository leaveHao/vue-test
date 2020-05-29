<template>
	<div>
		<a-breadcrumb style="margin: 16px 0">
			<a-breadcrumb-item>人员管理</a-breadcrumb-item>
			<a-breadcrumb-item>人员列表</a-breadcrumb-item>
		</a-breadcrumb>
		<!-- 人员列表 -->
		<a-layout-content :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }">
			<a-table :columns="columns" :data-source="$store.state.userList" :row-key="record => record.user_id">
				<template slot="operation" slot-scope="text, record">
					<a-button type="primary" @click="toDetail(record.key)">
						查看详情
					</a-button>
				</template>
			</a-table>
		</a-layout-content>
		<!-- 查看详情对话框 -->
		<a-modal v-model="detailVisible" title="人员详情信息">
			<p>人员ID : {{userInfo.user_id}}</p>
			<p>姓名 : {{userInfo.username}}</p>
			<p>年龄 : {{userInfo.age}}</p>
			<p>邮箱 : {{userInfo.email}}</p>
			<p>手机号 : {{userInfo.mobile}}</p>
			<template slot="footer">
				<a-button type="primary" @click="showEditVisible(userInfo.key)">
					编辑
				</a-button>
				<a-button type="primary" @click="handleOk">
					确认
				</a-button>
			</template>
		</a-modal>
		<!-- 查看编辑用户对话框 -->
		<a-modal v-model="editVisible" title="编辑人员信息">
			<!-- 表单盒子 -->
			<a-form-model layout="horizontal" ref="editInfoForm" :model="editInfo" :rules="editInfoRules" :label-col="{span: 4}"
			 :wrapper-col="{span: 16}">
				<a-form-model-item prop="username" label="姓名">
					<a-input v-model="editInfo.username" placeholder="请输入姓名">
					</a-input>
				</a-form-model-item>
				<a-form-model-item label="年龄">
					<a-input v-model="editInfo.age" placeholder="请输入年龄">
					</a-input>
				</a-form-model-item>
				<a-form-model-item prop="email" label="邮箱">
					<a-input v-model="editInfo.email" placeholder="请输入邮箱">
					</a-input>
				</a-form-model-item>
				<a-form-model-item prop="mobile" label="手机号">
					<a-input v-model="editInfo.mobile" placeholder="请输入手机号">
					</a-input>
				</a-form-model-item>
			</a-form-model>
			<template slot="footer">
				<a-button key="back" @click="editCancel">
					取消
				</a-button>
				<a-button type="primary" @click="editUserInfo">
					确认
				</a-button>
			</template>
		</a-modal>
	</div>
</template>

<script>
	import {
		EDIT_USER_INFO
	} from 'store/mutation-types'
	export default {
		name: 'UserList',
		data() {
			let validateMobile = (rule, value, callback) => {
				let regexp = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/
				if (value === '') {
					callback(new Error('请输入手机号'));
				} else if (!regexp.test(value)) {
					callback(new Error('手机号格式不正确'));
				} else {
					callback();
				}
			};
			let validateEmail = (rule, value, callback) => {
				let regexp = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
				if (value === '') {
					callback(new Error('请输入邮箱'));
				} else if (!regexp.test(value)) {
					callback(new Error('请输入正确格式的邮箱'));
				} else {
					callback();
				}
			};
			return {
				detailVisible: false,
				editVisible: false,
				columns: [{
						title: '人员ID',
						dataIndex: 'user_id'
					},
					{
						title: '姓名',
						dataIndex: 'username'
					},
					{
						title: '年龄',
						dataIndex: 'age'
					},
					{
						title: '操作',
						scopedSlots: {
							customRender: 'operation'
						},
					},
				],
				userInfo: {},
				editInfo: {},
				//表单验证规则
				editInfoRules: {
					username: [{
						required: true,
						message: '请输入姓名',
						trigger: 'blur'
					}],
					email: [{
						validator: validateEmail,
						trigger: 'blur'
					}],
					mobile: [{
						validator: validateMobile,
						trigger: 'blur'
					}],
				}
			}
		},
		created() {
			this.$store.dispatch('getUsers')
		},
		methods: {
			//展示详情对话框
			toDetail(key) {
				this.detailVisible = true;
				this.userInfo = this.$store.state.userList[key];
				// this.userInfo = JSON.parse(JSON.stringify(this.$store.state.userList[key]))
			},
			handleOk() {
				this.detailVisible = false;
			},
			//展示编辑信息对话框
			showEditVisible(key) {
				this.detailVisible = false;
				this.editVisible = true;
				// this.editInfo = this.$store.state.userList[key];
				this.editInfo = JSON.parse(JSON.stringify(this.$store.state.userList[key]))
			},
			//修改用户信息
			editUserInfo() {
				this.$refs.editInfoForm.validate(valid => {
					if (!valid) return;
					this.$store.commit(EDIT_USER_INFO, this.editInfo);
					this.editVisible = false;
					this.$message.success('修改信息成功');
				});
			},
			//关闭编辑信息对话框
			editCancel() {
				console.log(this.$store.state.userList)
				this.editVisible = false;
			}
		}
	}
</script>

<style scoped>
</style>
