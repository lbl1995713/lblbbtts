<template>
	<div>
	    <bbts-dialog :showDialog="errorCode != ''" v-on:dialogSubmit="errSubmit" v-on:dialogCancel="errCancel">
	    	<p v-text="errorCode" style="color:#fff;font-size:15px;text-align:center"></p>
	    </bbts-dialog>
		<div id="header">
			<div class="container header-content">
				<div class="row col-md-12">
					<div id="header-ctn-left" class="col-md-4 header-content">
						<span>当前城市：<span v-text="currentCity" class="currentCity"></span></span>&nbsp
						<span>[ <a @click="choseCity">切换城市</a> &nbsp&nbsp <a @click="changeCity">成都</a> &nbsp&nbsp <a>北京</a>&nbsp&nbsp <a>绍兴</a> ]</span>
					</div>
					<div id="header-ctn-right" class="float_right header-content">
						<span v-if="!submitInfor.userName" style="position:absolute;right:15px"><a href="#/login">我是会员 立即登录</a> &nbsp  |  &nbsp  <a href="#/register">木有账号 立即注册</a></span>
						<span v-if="submitInfor.userName"><span  v-text="'欢迎您, ' + submitInfor.userName"></span> | <a href="#/manage">个人中心</a> | <a href="" @click="logout">注销</a></span>
					</div>
				</div>
			</div>
		</div>
		<div class="container" id="nav">
			<div class="col-md-12">
				<div id="logo" class="col-md-2">
					<span class="logo-title">宝托系统</span>
					<span class="logo-txt">  &nbsp bbts.com</span>
				</div>
				<div id="navBtn">
					<button v-if="submitInfor" @click="createInfor">发布信息</button>
					<button v-if="submitInfor.role == 'admin'">禁用信息</button>
				</div>
			</div>
		</div>
		<div class="content">
			<div class="container">
			    <div class="noPadding col-md-12" style="margin: 5px 0 0 0">
				    <a href="#/">返回主页</a>
			    </div>
				<div class="baseInfor inlineBlock float_left white_bg">
					<h2 v-text="object.title"></h2>
					<div class="baseInfor_main">
						<div>
							<label>科目: &nbsp</label>
							<label class="inlineBlock" v-text="object.subject"></label>
							<label class="float_right"><span class="salary" v-text="object.salary"></span>￥/时</label>
						</div>
						<div id="baseInfor_description">
							<span>周一至周五:<span v-text="object.time.from"></span> - <span v-text="object.time.to"></span></span> |
							<span v-if="object.isCallTeach">上门授课 |</span> 
							<span v-if="object.isReceive">包接送 |</span> 
							<span>一对一授课</span>
							<p>滨江 - 浦沿街道 - 钱江湾花园</p>
						</div>
						<div class="col-md-12" style="margin-top: 20px">
							<button class="col-md-offset-3 col-md-6" @click="subscribe" v-if="object.state == 'release'">一键预约</button>
							<button class="col-md-offset-3 col-md-6" style="cursor:auto;color:#f5f5f5;background-color: #ccc" v-if="object.state == 'hasBeenBooked'">已预约</button>
						</div>
						<div style="clear:both"></div>
					</div>
				</div>
			    <div class="personalInfor inlineBlock float_right white_bg">
			    	<div class="borderBtm">
			    		<div class="noPadding col-md-6">
			    			<h3>{{user.fullName}}</h3>
			    			<p v-if="user.gender"><span v-text="'性别: ' + user.gender"></span></p>
			    			<p><span v-text="'电话联系我:' + user.phone "></span></p>
			    			<p><span v-text="'邮箱:' + user.eMail"></span></p>
			    			<p><span v-text="'用户名: ' + object.creater"></span></p>
			    		</div>
			    		<div class="noPadding col-md-6" style="width:50%;margin: 20px 0;">
			    			<img src="" alt="照片" style="background: #ccc" width="100%" height="180px">
			    		</div>
			    		<div style="clear:both"></div>
			    	</div>
			    	<div class="borderBtm" style="padding: 15px 0;" v-if="submitInfor.role == 'supplier'">
			    		教师资格证已上传
			    	</div>
			    	<div style="padding: 15px 0;" v-if="user.showInfor">
			    		<p style="font-size:18px;font-weight:bold">详细资料:</p>
			    		<p>
			    		    <label style="font-size:14px" class="float_left" v-if="user.role == 'supplier'">职称: <span style="font-size:14px" v-text="user.professionalTitle"></span></label>
			    			<label style="font-size:14px" class="float_right" v-if="user.role == 'supplier'">教龄: <span style="font-size:14px" v-text="user.seniority"></span>年</label>
			    			<div style="clear:both"></div>
			    		</p>
			    		<p>教授年级: <span v-text="user.grade.from + ' 至 ' + user.grade.to"></span> </p>
			    		<p>擅长:<span>文科/体育</span></p>
			    		<p> 
			    			<span v-if="user.role == 'supplier'">就职/毕业院校:</span>
			    			<span v-if="user.role == 'demander'">就读院校:</span>
			    			<span v-text="user.school"></span>
			    		</p>
			    		<p>杭州市滨江区浦沿街道钱江湾花园12幢2单元502室</p>
			    	</div>
			    </div>
			    <div class="description inlineBlock float_left white_bg">
			    	<h2>描述说明</h2>
			    	<p v-text="object.description"></p>
			    </div>
			</div>
		</div>
	</div>
</template>
<style scoped="">
    button{transition: all  0.3s;outline:none;}
    label{font-size:18px;font-weight: normal;}
    h2{margin: 0 0 30px 0; font-size:25px; font-weight: bold;}
    .white_bg{ background-color: white }
    .salary{font-size:25px;font-weight: bold;color:#87CEEB;;}
	#navBtn{float:right;}
	#navBtn button{border: none; padding: 5px 10px; outline: none;font-size: 14px;border-radius: 5px;margin: 20px 0;}
	#nav{padding: 15px 0;}
	button:hover{color: #fff;background-color: #87CEEB}
	.borderBtm{border-bottom: #f5f5f5 1px solid}

	.content{width: 100%; background-color: #f5f5f5;}

	.baseInfor{width:65%;margin:0 0.5% 0.5% 0;padding: 30px;}
	.baseInfor_main p{color: #87CEEB; font-size: 14px; margin: 10px 0;}
	.baseInfor_main button{height: 40px; border:none; border-radius: 5px; font-size:15px;}
	#baseInfor_description span{font-size: 14px; margin: 10px 0 0 0; display: inline-block;}

	.personalInfor{width: 34%; margin: 0 0 2% 0.5%;padding: 30px;}
	.personalInfor h3{font-size: 20px;font-weight: bold;}
	.personalInfor label{font-size:14px;}

	.description{width: 65%; margin: 0.5% 0.5% 2% 0;padding: 30px;}
	.description p{font-size:14px;}
</style>
<script>
	export default{
		data() {
			return {
				errorCode: "",
				currentCity: "杭州",
				object:{
					time:{from:null, to: null}
				},
				submitInfor:{
					userName: null,
					role: null,
					userId: null
				},//储存登录信息
				user:{//左侧用户信息
					grade:{from: null, to: null}
				}
			}
		},
		methods: {
			errSubmit() {
				this.errorCode = "";
			},
			errCancel() {
				this.errorCode = "";
			},
			changeCity() {
				this.currentCity = "成都";
			},
			choseCity() {
				this.currentCity = "杭州"
			},
			checkGrade(num){
				switch(num){
					case 1:
					return '一年级';
					case 2:
					return '二年级';
					case 3:
					return '三年级';
					case 4: 
					return '四年级';
					case 5:
					return '五年级';
					case 6:
					return '六年级';
				}
			},
			subscribe() {
				if(!this.submitInfor.userName){
					window.location.href = '#/login';
					return ;
				}
				if(this.submitInfor.userName == this.object.creater || this.submitInfor.role == 'supplier'){
					console.log('老师不能预约')
					this.errorCode = '老师不能预约供应信息且不能预约自己的信息';
					return ;
				}
				var obj = {};
				obj.suber = this.submitInfor.userName;
				obj.id = this.object._id;
				console.log(obj)
				this.$http.put('http://localhost:3000/detail', obj).then(function(res){
					console.log(res)
					if(res.body.status == 200){
						this.object.state = 'hasBeenBooked';
					}
				})
			},
			logout() {
				sessionStorage.removeItem("user");
				this.submitInfor = {};
			},
			createInfor() {
				if(!this.submitInfor.userName){
					location.href = '#/login'
					return;
				}
				location.href = '#/manage/createSupplyInfor'
			}
		},
		mounted:function(){
			// console.log(this.$route.query.id)
			if(sessionStorage.getItem('user')){
				this.submitInfor = JSON.parse(sessionStorage.getItem('user'));
			}
			this.$http.get('http://localhost:3000/detail?id=' + this.$route.query.id).then(function(res){
				console.log(res);
				// this.$set(this.object, )
				var response = res.body.result;
				var resUser = res.body.user;
				response.time = JSON.parse(response.time);
				if(resUser.gender == 'male'){
					resUser.gender = '男';
				}else if(resUser.gender == 'female'){
					resUser.gender = '女';
				}
				if(resUser.grade){
					resUser.grade = JSON.parse(resUser.grade);
					resUser.grade.from = this.checkGrade(resUser.grade.from);
					resUser.grade.to = this.checkGrade(resUser.grade.to);
				}
				
				this.object = response;
				this.user = resUser;
			})
		}
	}
</script>