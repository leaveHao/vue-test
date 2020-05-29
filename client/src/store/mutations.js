import {
	ADD_ADMIN_NAME,
	EDIT_USER_INFO
} from 'store/mutation-types'
export default {
	//添加管理员账户名
	[ADD_ADMIN_NAME](state, payload) {
		state.adminName = payload.adminName;
	},
	//修改用户信息
	[EDIT_USER_INFO](state, payload) {
		state.userList[payload.key] = payload;
		console.log(state.userList)
	}
}
