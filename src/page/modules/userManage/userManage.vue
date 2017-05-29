<template>
	<div>
		<bbts-form :definition="userManage.definition" :title="userManage.title" :description="userManage.description"
		 :options="userManage.options" :initObject="userManage.object" v-on:submitForm="submit"></bbts-form>
	</div>
</template>
<style></style>
<script>

	export default{
		data() {
			return {
				user:{},
				userManage:{
				   title: "个人资料",
				   description: "更完善的个人资料信息可以有助于您找到更适合的老师/学生哟~",
				   object: {},
				   definition:[
				      {
				      	id: "fullName",
				      	name: "真实姓名",
				      	type: "string",
				      	placeholder: "请输入您的真实姓名",
				      	half:true
				      },
				      {
				      	id: "age",
				      	name: "年龄",
				      	type: "number",
				      	placeholder: "您的年龄",
				      	half: true
				      },
				      {
				      	id: "gender",
				      	name: "性别",
				      	type: "select",
				      	options: [
				      	   {
				      	   	  key: "male",
				      	   	  label: "男",
				      	   },{
				      	   	  key: "female",
				      	   	  label: "女"
				      	   }
				      	]
				      },
				      {
				      	id: "phone",
				      	name: "手机号码",
				      	type: "string",
				      	importantable: true,
				      	placeholder: "请输入您的手机号码",
				      	half:true
				      },
				      {
				      	id: "eMail",
				      	name: "邮箱",
				      	type: "string",
				      	importantable: true,
				      	placeholder: "请输入您的常用邮箱",
				      	half:true
				      },
				      {
				      	id: "IDCard",
				      	name: "身份证号",
				      	type: "string",
				      	placeholder: "请输入您的18位居民身份证号"
				      },
				      {
				      	id: "address",
				      	name: "详细地址",
				      	type: "string",
				      	placeholder: "请输入您的详细地址"
				      },
				      {
				      	id: "headerImg",
				      	name: "上传照片",
				      	type: "file",
				      	fileType:['image/jpg','image/jpeg','image/png']
				      }
				   ],
				   options:{
				   	  submit:{
				   	  	 name: "确认修改",
				   	  	 enable: true,
				   	  	 beforeAction:function(data){
				   	  	 	// console.log(data);
				   	  	 	// return [{index:0,errorCode:"什么鬼"}]
				   	  	 }
				   	  }
				   }
			    }
			}
		},
		computed:{},
		methods:{
			submit:function(data){
				console.log(data)
				// if(data.age){
				// 	data.age = parseInt(data.age);
				// }
				if(data.grade){
					data.grade = JSON.stringify(data.grade);
				}
				this.$http.put('http://localhost:3000/manage/userManage?userId=' + this.user.userId, data).then((res)=>{
					console.log(res)
				})
			}
		},
		mounted:function(){
			this.user = JSON.parse(sessionStorage.getItem("user"));
			if(this.user.role == 'supplier'){
				this.userManage.definition.push({
					id: "professionalTitle",
					name: "职称",
					type: "string",
					placeholder: "请输入您的职称",
					half:true
				},{
					id: "grade",
					name: "教授年级",
					type: "rangeSelect",
					from: 'gradeFrom',
					to: 'gradeTo',
					half: true,
					options:[
					{
						key: 1,
						label: "小学一年级"
					},
					{
						key: 2,
						label: "小学二年级"
					},
					{
						key: 3,
						label: "小学三年级"
					},
					{
						key:4,
						label: "小学四年级"
					},
					{
						key:5,
						label: "小学五年级"
					},
					{
						key:6,
						label: "小学六年级"
					}
					]
				},{
					id: "advantage",
					name: "擅长科目",
					type: "string",
					placeholder: "请输入您擅长的科目以、隔开",
					half:true
				},{
					id: "seniority",
					name: "教龄",
					type: "number",
					half:true,
					placeholder: "您的教龄"
				},{
					id: "school",
					name: "任职学校",
					type: "string",
					placeholder: "请输入您的任职学校",
					half:true
				},{
					id: "showInfor",
					name: "是否公开您的职业信息",
					type: "select",
					options: [{key:true,label:"是"},{key:false,label:"否"}],
					half:true
				},{
					id: "description",
					name: "其他说明",
					type: "string",
					placeholder: "请输入您的其他说明信息"
				})
			}

			//加载用户数据
			this.$http.get('http://localhost:3000/manage/userManage/?userName=' + this.user.userName).then((response)=>{
				var res = response.body;
				if(res.status == 200){
					this.userManage.object = res.result;
					if(this.userManage.object.grade){
						this.userManage.object.grade = JSON.parse(this.userManage.object.grade)
					}
					// console.log(this.userManage.object)
				}
			})
			
		}
	}
</script>