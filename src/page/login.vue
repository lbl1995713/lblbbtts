<template>
  <div>
  	<img src="../../static/login_bg3.jpg" alt="" class="bg" width="100%" height="100%">
  	<div id="login" class="container">
  		<div class="col-md-offset-3 col-md-2 main margin_top_20 noPadding">
  			 <a href="#/">返回主页</a>
  		</div>
  		<transition name="loginform">
  			<div class="col-md-offset-3 col-md-6 loginForm" style="margin-top:10px" v-if="showLoginForm">
  		    <div class="form_bg"></div>
  			<div class="col-md-12" style="border-bottom:#fff 1px solid">
  				<h2 style="color:#fff">Logging Now</h2>
  			</div>
  			<div class="col-md-12 margin_top_20" v-if="errorCode != '' ">
  				<p class="error noMargin" v-text="errorCode"></p>
  			</div>
  			<div class="col-md-12 margin_top_20">
  				<bbts-input ipt-type="text" v-on:ipt-value="iptUserName" place-holder="请输入用户名/手机号/邮箱" ipt-class="userName col-md-10" ></bbts-input>
  			</div>
  			<div class="col-md-12 margin_top_20">
  				<bbts-input ipt-type="password" v-on:ipt-value="iptPassword" place-holder="请输入密码" ipt-class="userName col-md-10"></bbts-input>
  			</div>
  		</div>
  		</transition>
  		<div class="col-md-offset-3 col-md-6 main margin_top_20 noPadding">
  			 <div class="form_bg"></div>
  			 <button class="col-md-12" @click="login">登 录</button>
  		</div>
  		<div class="col-md-offset-3 col-md-6 main margin_top_20 noPadding">
  			 <div class="form_bg"></div>
  			 <button class="col-md-12" @click="register">注 册</button>
  		</div>
  	</div>
  </div>
</template>
<style>
	.bg{position:fixed;filter: blur(5px);}
	.margin_top_20{margin-top:20px;}
	.headerTxt{height: 30px;line-height: 30px;margin-top:20px;margin-bottom: 20px;}
	.aDiv{display: inline-block;padding:0 10px;}
	.aDiv a{color:#fff;font-size: 16px;}
    .loginForm{padding: 20px 20px  40px 20px;border-radius: 10px;position: relative;overflow: hidden;}
    .form_bg{position: absolute;width: 100%;height: 100%;background-color: #fff;top:0;left: 0;border-radius: 10px;opacity: 0.2;}
    .userName{height:40px;background:none;border:1px solid #fff;color:#fff;font-size:14px;border-radius: 10px;}
    .userName:focus{background-color: #87CEEB;}

 .loginform-enter-active, .loginform-leave-active {
  transition: all 2s;
}
.loginform-enter, .loginform-leave-active {
  opacity: 0;
}
</style>
<style scoped="">
    .error{background-color: red;color:#fff;height:30px;line-height: 30px;font-size: 14px;padding:0 20px;border-radius: 5px;text-align: center;}
    button{border:none;background: none;height: 50px;font-size: 18px;text-align: center;color:#fff;outline: none;border-radius: 10px;transition:all 0.5s;}
    button:hover{background-color: #87CEEB}
    a{color:#fff;}
</style>

<script>
	export default{
		data() {
			return {
				userName: "",
				password: "",
				errorCode: "",
				showLoginForm: true
			}
		},
		methods:{
			login() {
				// if(!this.showLoginForm){
				// 	this.showLoginForm = true;
				// }else if(!this.errorCode){
				// 	console.log(this.userName,this.password);
				//     this.errorCode = "用户名不存在"
				// }else{
				// 	location.href="#/manage"
				// }
        // console.log(this.userName, this.password);
        this.$http.post('http://localhost:3000/login',{
           userName: this.userName,
           password: this.password
        }).then(function(res){
           console.log(res);
           if(res.body.status == 200){
             //登录成功将返回的用户名和用户角色储存到sessionStorage中
            
             sessionStorage.setItem("user",JSON.stringify(res.body.result));
             window.location = "#/manage"
           }else{
              this.errorCode = res.body.result;
           }
        })
			},
			register() {
				location.href="#/register"
			},
			backHome() {
				location.href = "#/"
			},
			iptUserName(data) {
				this.userName = data.value;
			},
			iptPassword(data){
				this.password = data.value;
			}
		}
	}
</script>