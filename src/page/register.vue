<template>
  <div>
  	 <img src="../../static/register_bg2.jpg" alt="" class="bg" width="100%" height="100%">
  	 <div id="register" class="container">
  	 	<div class="col-md-6 col-md-offset-3" style="padding:20px;margin-top:5%">
  	 		<div class="form_bg"></div>
  	 		<div class="userName col-md-12 border_bottom noPadding" style="border-bottom:1px solid #fff">
  	 			<label class="col-md-2 noMargin noPadding">用户名</label>
  	 			<bbts-input ipt-type="text" :x-top="6" place-holder="请输入用户名" class="col-md-10" ipt-class="col-md-12 registerIpt" v-on:ipt-value="userName"></bbts-input>
  	 		</div>
  	 		<div class="userName col-md-12 border_bottom noPadding margin_top_20" style="border-bottom:1px solid #fff">
  	 			<label class="col-md-2 noMargin noPadding ">密码</label>
  	 			<bbts-input ipt-type="password" :x-top="6" place-holder="请输入密码" class="col-md-10" ipt-class="col-md-12 registerIpt" v-on:ipt-value="password"></bbts-input>
  	 		</div>
  	 		<div class="userName col-md-12 border_bottom noPadding margin_top_20" style="border-bottom:1px solid #fff">
  	 			<label class="col-md-2 noMargin noPadding ">确认密码</label>
  	 			<bbts-input ipt-type="password" :x-top="6" place-holder="请再次确认密码" class="col-md-10" ipt-class="col-md-12 registerIpt" v-on:ipt-value="rePassword"></bbts-input>
  	 		</div>
  	 		<div class="userName col-md-12 border_bottom noPadding margin_top_20" style="border-bottom:1px solid #fff">
  	 			<label class="col-md-2 noMargin noPadding ">手机号码</label>
  	 			<bbts-input ipt-type="text" :x-top="6" place-holder="请输入手机号" class="col-md-10" ipt-class="col-md-12 registerIpt" v-on:ipt-value="phone"></bbts-input>
  	 		</div>
  	 		<div class="userName col-md-12 border_bottom noPadding margin_top_20" style="border-bottom:1px solid #fff">
  	 			<label class="col-md-2 noMargin noPadding ">常用邮箱</label>
  	 			<bbts-input ipt-type="text" :x-top="6" place-holder="请输入常用邮箱" class="col-md-10" ipt-class="col-md-12 registerIpt" v-on:ipt-value="eMail"></bbts-input>
  	 		</div>
  	 		<div class="userName col-md-12 noPadding border_bottom margin_top_20">
  	 			<label class="col-md-2 noMargin noPadding ">您的身份</label>
  	 			<div class="col-md-5" style="height:30px;line-height:30px;">
  	 				<input type="radio" value="supplier" name="identity" v-model="formModel.role">
  	 			    <span>我是辅导老师</span>
  	 			</div>
  	 			<div class="col-md-5" style="height:30px;line-height:30px;">
  	 				<input type="radio" value="demander" name="identity" v-model="formModel.role">
  	 			    <span>我是学生/家长</span>
  	 			</div>
  	 		</div>
  	 	</div>
  	 	<div class="col-md-offset-3 col-md-6 margin_top_20 noPadding">
  			 <div class="form_bg"></div>
  			 <button class="col-md-12" @click="regist">立 即 注 册</button>
  		</div>
  		<div class="col-md-offset-3 col-md-6 margin_top_20 noPadding">
  			 <a href="#/" class="float_left">返回主页</a>
  			 <a href="#/login" class="float_right">返回登录</a>
  		</div>
  	 </div>
  </div>
</template>
<style>
	.registerIpt{background: none;border:none;height: 30px; border-radius: 15px;}
	.registerIpt:focus{background-color: #87CEEB}
</style>
<style scoped="">
	#register label{color:#fff;font-size:16px;font-weight: normal;border-right: 1px solid #fff;padding-right:10px;height: 30px;line-height: 30px;text-align: center;}
	#register .userName{border:none;border-radius: 0}
	.border_bottom{border-bottom:1px solid #fff;}
	button{border:none;background: none;height: 50px;font-size: 18px;text-align: center;color:#fff;outline: none;border-radius: 10px;transition:all 0.5s;}
    button:hover{background-color: #87CEEB}
    a{font-size:16px;}
</style>
<script>
	  export default{
      data() {
        return {
           formModel:{}
        }
      },
      methods:{
        regist() {
           // this.$http.get('http://localhost:3000/').then(function(response){
           //    console.log(response);
           // })
           
           this.$http.post('http://localhost:3000/register', this.formModel).then(function(res){
             console.log(res);
             if(res.status == 200){
              console.log(2);
                window.location = '#/login'
             }
           })
           
           console.log(this.formModel)
        },
        userName (data) {
          this.formModel.userName = data.value;
        },
        password (data) {
          this.formModel.password = data.value;
        },
        rePassword (data) {
          this.formModel.rePassword = data.value;
        },
        phone (data) {
          this.formModel.phone = data.value;
        },
        eMail (data) {
          this.formModel.eMail = data.value;
        }
      }
    }
</script>