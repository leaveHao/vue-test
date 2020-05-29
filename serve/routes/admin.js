import express from 'express'
import config from '../src/config.js'

const router = express.Router();

//管理员登录
router.post('/login', async (req, res) => {
	let adminName = req.body.adminName;
	let adminPsw = req.body.password;
	if (adminName === 'leaveHao' && adminPsw === '123456') {
		req.session.admin = adminName;
		res.json({
			status_code: 200,
			message: '登录成功',
		})
	} else {
		res.json({
			status_code: 400,
			message: '账号或密码错误'
		})
	}
})

//设置后台访问权限
router.use((req, res, next) => {
	if (!req.session.admin) {
		res.json({
			status_code: 400,
			message: '无权访问'
		})
	}
	next();
})

// 验证登录状态,若未被中间件拦截则为登录状态
router.get('/isadmin', async (req, res) => {
	res.json({
		status_code: 200,
		message: '进入管理员界面',
		adminName: 'leaveHao',
	})
})

//退出登录
router.get('/logout', (req, res) => {
	req.session.admin = '';
	res.json({
		status_code: 200,
		message: '已退出登录'
	})
})


/**************************************** 用户管理 *******************************************/

//获取用户列表
router.get('/userlist', async (req, res) => {
	res.json({
		status_code: 200,
		message: '获取用户列表成功',
		users: [{
			user_id: 'Xs12',
			username: 'leaveHao',
			age: '22',
			email: 'qqq@qq.com',
			mobile: '13888888888'
		}, {
			user_id: 'Xs15',
			username: '张三',
			age: '23',
			email: 'zzz@qq.com',
			mobile: '15666666666'
		}, {
			user_id: 'Xs42',
			username: '李四',
			age: '19',
			email: 'aaa@qq.com',
			mobile: '13355555555'
		}]
	})
})

export default router;
