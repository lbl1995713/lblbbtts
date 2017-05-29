<template>
	<div>
		<bbts-form :definition="createSupplyInfor.definition" :title="createSupplyInfor.title" :options="createSupplyInfor.options"  v-on:submitForm="submit"></bbts-form>
	</div>
</template>
<style></style>
<script>
	export default{
		data() {
			return {
				time: "",
				createSupplyInfor:{
					title: "创建信息",
					definition: [{
						id: "title",
						name: "标题",
						type: "string",
						importantable:true,
						placeholder: "请输入您的标题且不能超过20个字符"
					},{
						id: "subject",
						name: "所授科目",
						type: "string",
						importantable: true,
						placeholder: "请输入您的所授科目以、分开",
						options:[{
							key: "Chinese",
							label: "语文"
						},{
							key: "Math",
							label: "数学"
						},{
							key: "English",
							label: "英语"
						}],
						half: true
					},{
						id: "salary",
						name: "时薪(￥/时)",
						type: "number",
						importantable:true,
						half:true
					},{
						id: "time",
						name: "授课时间",
						type: "rangeDate",
						importantable: true,
						half:true
					},{
						id: "isReceive",
						name: "是否接送",
						type: "checkBox",
						half:true
					},{
						id: "isCallTeach",
						name: "是否上门教学",
						type: "checkBox",
						checked: true
					},{
						id: "description",
						name: "其余说明",
						type: "textarea"
					}],
					options:{
						submit:{
							enable: true,
							name: "创建发布",
							action:function(data){
								console.log(data);
							}
						}
					}
				}
			}
		},
		methods:{
			submit:function(data){
				var user = JSON.parse(sessionStorage.getItem("user"));
				if(this.time == '' || this.time == null){
					data.time = JSON.stringify(data.time);
					this.time= data.time;
					console.log(1)
					
				}
				if(!data.title || !data.subject || !data.salary || !data.time){
					return;
				}
				if(data.time && data.time != this.time){
					console.log(2)
					data.time = JSON.stringify(data.time);
				}
				console.log(data);
				if(user.role == 'supplier'){
					this.$http.post('http://localhost:3000/manage/createInfor?creater=' + user.userName + '&type=supplyInfor&createrId=' + user.userId , data).then((res)=>{
						console.log(res)
					})
				}else if(user.role == 'demander'){
					this.$http.post('http://localhost:3000/manage/createInfor?creater=' + user.userName + '&type=demandedInfor&createrId=' + user.userId , data).then((res)=>{
						console.log(res)
					})
				}
				
			}
		}
	}
</script>