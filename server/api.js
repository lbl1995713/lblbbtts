const express = require('express');
const router = express.Router();
const db = require('./db');

router.get('/',function(req,res,next){
	res.json({name: '毛大衣'})
})

//注册
router.post('/register', function(req, res, next){
	var request = req.body
	new db.user(request).save(function(err, response){
		console.log(response);
		if(err){
			res.sned({
				status: 500,
				error: err
			})
		}else{
			res.send({
				result: request,
				status: 200
			})
		}
	})
})

//登录
router.post('/login', function(req, res, next){
    db.user.findOne({userName: req.body.userName},(err, response) =>{
   	  if(err){
   	  	res.send({
   	  		status : 500,
   	  		error: err
   	  	})

   	  	return next();
   	  }else{
   	  	if(response && response.password == req.body.password){
   	  		req.session.user = {userName: response.userName, role: response.role}
   	  		res.send({
   	  			result: {userName: response.userName, role: response.role, userId:response.id},
   	  			status : 200
   	  		})
   	  		return next();
   	  	}else{
   	  		res.send({
   	  			status : 500,
   	  			result: '密码错误或账户不存在'
   	  		})

   	  		return next();
   	  	}
   	  	res.send({
   	  		result: response,
   	  		status: 200
   	  	})

   	  	return next();
   	  }
   })
})

//查询个人资料
router.get('/manage/userManage', function(req, res, next){
	var i = req.query.i;
	if(!req.query.userName){
		res.send({status: 500, error: "您还没有登录请登录再试"})
		return next();
	}
	db.user.findOne({userName: req.query.userName}, (err,response) => {
		if(err){
			res.send({status: 500, error: err})
			next()
		}else{
			res.send({status: 200, result: response, index:i})
			next()
		}
	})
})

//修改个人资料
router.put('/manage/userManage', function(req, res, next){
	var requestBody = req.body, id = req.query.userId
	console.log(requestBody)
	db.user.findByIdAndUpdate(id,{$set:requestBody},function(err, response){
		if(err){
			res.sned({
				status: 500,
				error: err
			})
		}else{
			res.send({
				result: "success",
				status: 200
			})
		}
	})
})

//修改密码
router.put('/manage/password', function(req, res, next){
	var requestBody = req.body, id = req.query.userId
	console.log(id)
	db.user.findById(id,(err, response)=>{
		if(err){
			res.send({
				status : 500,
				error: err
			})
			next();
		}else{
			if(response && response.password == requestBody.oldPassword){
				db.user.findByIdAndUpdate(id,{$set:{password:requestBody.newPassword}}, (err, response)=>{
					if(err){
						res.sned({
							status: 500,
							error: err
						})
					}else{
						res.send({
							result: "success",
							status: 200
						})
					}
				})
			}else{
				res.send({
					status: 200,
					error: "对不起您的旧密码有误请重新输入"
				})
			}
		}
	})
})

//创建信息
router.post('/manage/createInfor', function(req, res, next){
	var request = req.body
	request.creater = req.query.creater;
	request.type = req.query.type;
	request.createrId = req.query.createrId;
	new db.infor(request).save(function(err, response){
		console.log(response);
		if(err){
			res.sned({
				status: 500,
				error: err
			})
		}else{
			res.send({
				result: response,
				status: 200
			})
		}
	})
})

//查询自己创建的供应信息
router.get('/manage/manageSupplyInfor', function(req, res, next){
	if(!req.query.userId){
		res.send({status: 500, error: "您还没有登录请登录再试"})
		return next();
	}
	var pageSize = 10;
	var currentPage = req.query.currentPage;
	var sort = {'createTime': 'desc'}; //排序
	var condition = {'createrId': req.query.userId}//查询条件
	var skipnum = (currentPage - 1) * pageSize; //跳过的数据数量
	db.infor.find(condition).skip(skipnum).limit(pageSize).sort(sort).exec(function(err, response){
		if(err){
			res.send({status:200, error: err})
			next();
		}else{
			db.infor.count(condition, function(errcount, count){
				res.send({status:200, result: response, count: count});
			    next();
			})
		}
	})
})

//操作自己创建的信息
//禁止信息
router.put('/manage/manageSupplyInfor', function(req, res, next){
	var inforId = req.body.inforId;
	var state = req.body.state
	if(state == 'haveBeenRefused'){
		db.infor.findByIdAndUpdate(inforId, {$set:{'state': state, 'refuseReason': req.body.refuseReason}},function(err, response){
			if(err){
				res.sned({
					status: 500,
					error: err
				})
			}else{
				res.send({
					result: "success",
					status: 200
				})
			}
		})
	}else{
		db.infor.findByIdAndUpdate(inforId, {$set:{'state': state}},function(err, response){
			if(err){
				res.sned({
					status: 500,
					error: err
				})
			}else{
				res.send({
					result: "success",
					status: 200
				})
			}
		})
	}
	
})

//删除信息
router.delete('/manage/manageSupplyInfor/delete', function(req, res, next){
	var id = req.query.id;
	console.log(id)
	db.infor.findByIdAndRemove(id,function(err, response){
		if(err){
			res.sned({
				status: 500,
				error: err
			})
		}else{
			res.send({
				result: "success",
				status: 200
			})
		}
	})
})

//查询预约人信息
router.get('/manage/manageSupplyInfor/detail', function(req, res, next){
	var userName = req.query.userName;
	db.user.findOne({userName: userName}, function(err, response){
		if(err){
			res.sned({
				status: 500,
				error: err
			})
		}else{
			res.send({
				result: {
					userName: response.userName,
					eMail: response.eMail,
					phone: response.phone
				},
				status: 200
			})
		}
	})
})

//主页查询信息
router.get('/index', function(req, res, next){
	var pageSize = 8;
	var currentPage = req.query.currentPage;
	var sort= {}, //排序
	    condition = {'state': 'release'},//查询条件
	    skipnum = (currentPage - 1) * pageSize; //跳过的数据数量
	if(req.query.sort && req.query.sort!='createTime'){
		sort[req.query.sort] = 'asc';
	}else{
		sort['createTime'] = 'desc';
	}
	if(req.query.type){
		condition['type'] = req.query.type;
	}
	if(req.query.title){
		condition['title'] = new RegExp(req.query.title);
	}
	db.infor.find(condition).skip(skipnum).limit(pageSize).sort(sort).exec(function(err, response){
		if(err){
			res.send({status:200, error: err})
			next();
		}else{
			db.infor.count(condition, function(errcount, count){
				if(errcount){
					res.send({status:200, error: err})
					next();
				}else{
					// db.infor.limit(12).sort[]
					res.send({status:200, result: response, count: count});
			        next();
				}
				
			})
		}
	})
})

//获取详细信息
router.get('/detail', function(req, res, next){
	var id = req.query.id || 0;
	if(!id){
		res.send({status: 500, err: '网络错误'})
	}
	db.infor.findById(id, function(err, response){
		if(err){
			res.send({status: 200, error:err})
			next();
		}else{
			db.user.findById(response.createrId, function(errUser, userRes){
				var obj = {
					eMail: userRes.eMail,
					phone: userRes.phone,
					role: userRes.role,
					advantage: userRes.advantage,
					fullName: userRes.fullName,
					age: userRes.age,
					gender: userRes.gender,
					school: userRes.school,
					seniority: userRes.seniority,
					professionalTitle: userRes.professionalTitle,
					address: userRes.address,
					grade: userRes.grade,
					showInfor: userRes.showInfor
				};
				res.send({status:200, result: response, user: obj});
				next();
			})
		}
	})
})

//预约信息
router.put('/detail', function(req, res, next){
	var suber = req.body.suber;
	var inforId = req.body.id;
	db.infor.findByIdAndUpdate(inforId,{'subscriber':suber, 'state': 'hasBeenBooked'},function(err, response){
		if(err){
			res.send({status: 500, err: err});
			next();
		}else{
			res.send({status: 200, result: 'success'})
			next();
		}
	})
})

//获取预约信息
router.get('/manage/manageSubcribInfor', function(req, res, next){
	var subscriber = req.query.subscriber;
	db.infor.find({'subscriber': subscriber}, function(err, response){
		if(err){
			res.send({status: 500, err: err});
			next();
		}else{
			res.send({status: 200, result: response})
			next();
		}
	})
})

//取消预约信息
router.put('/manage/manageSubcribInfor/cancel', function(req, res, next){
	var inforId = req.body.inforId;
	db.infor.findByIdAndUpdate(inforId,{$set:{'state': 'release', 'subscriber': null}}, function(err, response){
		if(err){
			res.send({status: 500, err: err});
			next();
		}else{
			res.send({status: 200, result: 'success'})
			next();
		}
	})
})

//确认拒绝预约信息
router.put('/manage/manageSubcribInfor/accept', function(req, res, next){
	var inforId = req.body.inforId;
	db.infor.findByIdAndUpdate(inforId,{$set:{'state': 'disable', 'subscriber': null, 'refuseReason': null}}, function(err, response){
		if(err){
			res.send({status: 500, err: err});
			next();
		}else{
			res.send({status: 200, result: 'success'})
			next();
		}
	})
})

//评价老师
router.put('/manage/manageSubcribInfor/evaluate', function(req, res, next){
	var userId = req.body.userId;
	var inforId = req.body.inforId;
	var praiseRate = parseFloat(req.body.praiseRate);
	db.user.findById(userId, function(err, userRes){
		if(err){
			res.send({status: 500, err: err});
			next();
		}else{
			if(userRes.praiseRate != null){
				console.log(userRes.praiseRate, praiseRate, typeof(userRes.praiseRate), typeof(praiseRate));
				praiseRate = parseFloat(((userRes.praiseRate + praiseRate )/2).toFixed(2));
				console.log(praiseRate);
			}
			
			db.user.findByIdAndUpdate(userId,{$set:{'praiseRate': praiseRate}}, function(err, evaluateRes){
				if(err){
					res.send({status: 500, err: err});
					next();
				}else{
					db.infor.findByIdAndUpdate(inforId, {$set:{'state': 'ended'}}, function(err, inforRes){
						if(err){
							res.send({status: 500, err: err});
					        next();
						}else{
							res.send({status: 200, result: 'success'})
					        next();
						}
					})	
				}
			})
		}
	})
})



module.exports = router;