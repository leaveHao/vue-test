import path from 'path'
export default {
	publicPath: path.join(__dirname, '../public'),	//静态资源路径
	port: 3000 ,	//监听的端口号
	cors: ['http://localhost:8080'],	//前端跨域请求地址
	secret:'leavehao@foxmail.com',	//session-secret
	maxAge: 1000 * 60 * 60 * 6	,//session保存6个小时
}