import {
	getUserList
} from 'network/admin'
export default {
	//获取用户列表
	async getUsers(context, payload) {
		let {
			users
		} = await getUserList()
		users.forEach((value,index)=>{
			users[index].key = index
		})
		context.state.userList = users
	}
}