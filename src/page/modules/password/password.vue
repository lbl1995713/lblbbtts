<template>
	<div class="col-md-12 noPadding">
		<bbts-form :definition="changPwdForm.definition" :title="changPwdForm.title" :description="changPwdForm.description" :options="changPwdForm.options" v-on:submitForm="submit"></bbts-form>
	</div>
</template>
<script>
	export default{
		data() {
			return{
				user:{},
				changPwdForm:{
					title: "修改个人密码",
					errorCode: "两次密码不同",
					description: "请定期更换密码可以让您的账户更加安全",
					definition:[
				       {
				       	   id: "oldPassword",
				   	       name: "旧密码",
				   	       importantable:true,
				   	       placeholder: "请输入您的旧密码",
				   	       type: 'password'
				       },
				       {
				       	   id: "newPassword",
				       	   name: "新密码",
				       	   importantable: true,
				       	   placeholder: "请输入您的新密码",
				       	   type: "password"
				       },
				       {
				       	   id: "confirmPassword",
				       	   name: "确认新密码",
				       	   importantable: true,
				       	   placeholder: "请再次输入您的新密码",
				       	   type: "password"
				       }
				    ],
				    options:{
				    	submit:{
				    		name: "确认修改",
				    		enable: true,
				    		action(data) {
				    			return [{
				    				index:1,
				    				errorCode: "两次密码不同"
				    			},{
				    				index:2,
				    				errorCode: "两次密码不同"
				    			}];
				    		}
				    	}
				    }
				}
			}
		},
		mounted:function(){
			this.user =JSON.parse(sessionStorage.getItem("user"));
		},
		methods:{
			submit:function(data){
				console.log(data);
				this.$http.put('http://localhost:3000/manage/password?userId=' + this.user.userId, data).then((res)=>{
					console.log(res);
				})
			}
		}
	}
</script>