const mongoose = require('mongoose'),
      // Schema = mongoose.Schema,
      db_url = 'mongodb://localhost:27017/bbts'

/**
 * 连接数据库
 */
// const db = mongoose.connect(DB_url);
mongoose.connect(db_url);

/**
  * 连接成功
  */
mongoose.connection.on('connected', function () {    
    console.log('Mongoose connection open to ' + db_url);  
});    

/**
 * 连接异常
 */
mongoose.connection.on('error',function (err) {    
    console.log('Mongoose connection error: ' + err);  
});    
 
/**
 * 连接断开
 */
mongoose.connection.on('disconnected', function () {    
    console.log('Mongoose connection disconnected');  
});

// db.on('error', function () {
//   console.log('Database connection error.')
// })

// db.once('open', function () {
//   console.log('The database has connected.')
// })

/**
 * 定义各种表
 */

//用户表
const userSchema = new mongoose.Schema({
	userName:{ type: String, index: true},
	password:{ type: String},
	role:{ type: String},
	phone: { type: String},
	eMail: { type: String},
	registTime: {type: Date, default: Date.now},
	loginDate: {type: Date, default: Date.now},
	fullName: String,
	age: Number,
	gender: String,
	IDCard: String,
	address: String,
	professionalTitle: String,
	grade: String,
	advantage: Array,
	seniority: Number,
	school: String,
	showInfor: Boolean,
	description: String,
	Interests: String,
	praiseRate: Number
})

//信息表
const inforSchema = new mongoose.Schema({
	title: String,//题目信息
	subject: String,//科目
	salary: Number,//薪资
	time: String,//时间
	isReceive: Boolean,
	isCallTeach: Boolean,
	description: String,
	state: {type: String, default:"release"},
	creater: String,
	createTime:{type: Date, default: Date.now},
	type: String,//种类
	createrId: String,//创建人id
	parseRate: Number,//好评率
	subscriber: String,//预约人
	refuseReason: String //拒绝理由
})

const Models = {
	user: mongoose.model('user', userSchema),
	infor: mongoose.model('infor', inforSchema)
}


module.exports = Models;    