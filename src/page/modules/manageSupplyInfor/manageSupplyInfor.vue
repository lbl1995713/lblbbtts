<template>
	<div class="col-md-12" style="padding:20px">
		<bbts-table :definition="manageSupplyInfor.definition" :options="manageSupplyInfor.options" :objects="manageSupplyInfor.objects" :title="manageSupplyInfor.title" v-on:disable="disable" v-on:release="release" v-on:removeInfor="removeInfor" v-on:accept="accept" v-on:refuse="refuse" v-on:detail="detail"></bbts-table>
		<bbts-page-jump :search-model="searchModel" v-on:next="next" v-on:previous="previous" v-on:homePage="homePage" v-on:endPage="endPage"></bbts-page-jump>
	    <bbts-dialog :showDialog="isShowDialog" v-on:dialogSubmit="dialogSubmit" v-on:dialogCancel="dialogCancel">
	         <textarea placeholder="请输入拒绝原因" class="refuseTextArea" v-model="refuseReason"></textarea>
	    </bbts-dialog>
	    <bbts-dialog :showDialog="isShowDetail" v-on:dialogSubmit="detailSubmit" v-on:dialogCancel="detailCancel">
	         <div class="col-md-12">
	         	 <div class="col-md-6 whiteTxt" style="margin:5px 0"><label>用户名: <span v-text="detailModel.userName"></span></label></div>
	         	 <div class="col-md-6 whiteTxt"><label>手机号: <span v-text="detailModel.phone"></span></label></div>
	         	 <div class="col-md-12 whiteTxt" style="margin:5px 0"><label>邮箱: <span v-text="detailModel.eMail"></span></label></div>
	         </div>
	    </bbts-dialog>
	</div>
</template>
<style scoped="">
	.refuseTextArea{width:100%;border-radius: 5px;height:100px; outline: none;padding:5px 10px;font-size:14px;}
	.whiteTxt{color:#fff;}
	label{font-weight: normal;}
</style>
<script>
	export default{
		data() {
			return {
				user:{},
				isShowDialog:false,
				isShowDetail: false,
				detailModel: {},
				inforObj: {},
				refuseReason: "",
				searchModel:{},
				manageSupplyInfor:{
					title: "",
					definition:[
					   {
					   	  id: "title",
					   	  name: "标题",
					   	  type: "string",
					   	  line: 2
					   },
					   {
					   	  id: "state",
					   	  name: "状态",
					   	  type: "string",
					   	  line: 1
					   },
					   {
					   	  id: "subject",
					   	  name: "教授科目",
					   	  type: "string",
					   	  line: 1
					   },
					   {
					   	  id: "salary",
					   	  name: "时薪(￥/时)",
					   	  type: "string",
					   	  line: 1
					   },
					   {
					   	  id: "time",
					   	  name: "授课时间",
					   	  type: "date",
					   	  line: 1
					   },
					   {
					   	  id: "isReceive",
					   	  name: "是否接送",
					   	  type: "string",
					   	  line: 1
					   },
					   {
					   	  id: "isCallTeach",
					   	  name: "是否上门",
					   	  type: "string",
					   	  line: 1
					   },
					   {
					   	  id: "description",
					   	  name: "其余说明",
					   	  type: "string",
					   	  line: 2,
					   	  isCenter: true
					   }
					],
					options:{
						integration:[
						   {
						   	  id: "disable",
						   	  name: "禁用",
						   	  enable: function(data){
						   	  	if(data.state == '已发布'){
						   	  		return true;
						   	  	}else{
						   	  		return false;
						   	  	}
						   	  }
						   },
						   {
						   	  id: "release",
						   	  name: "发布",
						   	  enable: function(data){
						   	  	if(data.state == '已下架'){
						   	  		return true
						   	  	}else{
						   	  		return false
						   	  	}
						   	  }
						   },
						   {
						   	  id: "removeInfor",
						   	  name: "删除",
						   	  enable: function(data){
						   	  	if(data.state == '已下架'){
						   	  		return true;
						   	  	}else{
						   	  		return false;
						   	  	}
						   	  }
						   },
						   {
						   	  id: "accept",
						   	  name: "接受",
						   	  enable: function(data){
						   		 if(data.state == '已被预约'){
						   			return true;
						   		 }else{
						   			return false;
						   		 }
						      }
						   },
						   {
						   	  id: "refuse",
						   	  name: "拒绝",
						   	  enable: function(data){
						   	  	if(data.state == '已被预约'){
						   	  		return true;
						   	  	}else{
						   	  		return false;
						   	  	}
						   	  }
						   },
						   {
						   	  id: "detail",
						   	  name: "详情",
						   	  enable: function(data){
						   	  	if(data.state == '已被预约'){
						   	  		return true;
						   	  	}else{
						   	  		return false;
						   	  	}
						   	  }
						   }
						]
					},
					objects:[]
				}
			}
		},
		mounted:function(){
			this.init();
			if(this.user.role == 'supplier'){
			   this.manageSupplyInfor.title = "供应信息管理"	
			}else if(this.user.role == 'demander'){
				this.manageSupplyInfor.title = "需求信息管理"	
			}
		},
		methods:{
			disable: function(data){//禁用信息
				// console.log(data);
				this.$http.put('http://localhost:3000/manage/manageSupplyInfor', {inforId: data._id, state: 'disable'}).then(function(res){
					console.log(res);
					if(res.body.status == 200){
						data.state = '已下架';
					}
				})
			},
			release: function(data){//重新发布信息
				this.$http.put('http://localhost:3000/manage/manageSupplyInfor', {inforId: data._id,state: 'release'}).then(function(res){
					console.log(res);
					if(res.status == 200){
						data.state = '已发布';
					}
				})
			},
			accept: function(data){//接受预约
				this.$http.put('http://localhost:3000/manage/manageSupplyInfor', {inforId: data._id, state: 'haveBeenAccepted'}).then(function(res){
					console.log(res);
					if(res.body.status == 200){
						data.state = '已接受预约';
					}
				})
			},
			refuse: function(data){//拒绝预约
				this.isShowDialog = true;
				this.inforObj = data;
			},
			detail: function(data){//查看预约人详情
				this.$http.get('http://localhost:3000/manage/manageSupplyInfor/detail?userName=' + data.subscriber).then(function(res){
					console.log(res);
					if(res.body.status == 200){
						this.isShowDetail = true
						this.detailModel = res.body.result;
					}
				})
			},
			detailSubmit: function(){
				this.isShowDetail = false;
				this.detailModel = {};
			},
			detailCancel: function(){
				this.isShowDetail = false;
				this.detailModel = {};
			},
			dialogSubmit: function(){
				var data = this.inforObj;
				this.isShowDialog = false;
				console.log(this.refuseReason);
				this.$http.put('http://localhost:3000/manage/manageSupplyInfor', {inforId: data._id, state: 'haveBeenRefused', refuseReason: this.refuseReason}).then(function(res){
					console.log(res);
					if(res.body.status == 200){
						data.state = '已拒绝';
					}
				})
				this.refuseReason = "";
			},
			dialogCancel: function(){
				this.isShowDialog = false;
				this.refuseReason = "";
			},
			removeInfor: function(data){
				console.log(data._id)
				this.$http.delete('http://localhost:3000/manage/manageSupplyInfor/delete?id=' + data._id).then(function(res){
					console.log(res)
					if(res.status == 200){
						for(var i = 0;i<this.manageSupplyInfor.objects.length;i++){
							if(this.manageSupplyInfor.objects[i]._id == data._id){
								this.manageSupplyInfor.objects.splice(i, 1);
							}
						}
					}
				})
			},
			
			next: function(data){
				this.init(data);
			},
			previous: function(data){this.init(data);},
			homePage: function(data){this.init(data);},
			endPage: function(data){this.init(data);},
			init: function(currentPage){
				var currentPage = currentPage || 1;
				this.user = JSON.parse(sessionStorage.getItem("user"));
				this.$http.get('http://localhost:3000/manage/manageSupplyInfor?userId=' + this.user.userId + '&currentPage=' + currentPage).then(function(res){
					//设置分页
					// this.searchModel.total = res.body.count;
					this.$set(this.searchModel, 'total', res.body.count);
					console.log(this.searchModel)

					for(var i = 0;i<res.body.result.length;i++){
						res.body.result[i].time = JSON.parse(res.body.result[i].time);
						if(res.body.result[i].isCallTeach){
							res.body.result[i].isCallTeach = "是"
						}else{
							res.body.result[i].isCallTeach = "否"
						}

						if(res.body.result[i].isReceive){
							res.body.result[i].isReceive = "是"
						}else{
							res.body.result[i].isReceive = "否"
						}

						if(res.body.result[i].state == 'release'){
							res.body.result[i].state = '已发布';
						}else if(res.body.result[i].state == 'disable'){
							res.body.result[i].state = '已下架'
						}else if(res.body.result[i].state == 'hasBeenBooked'){
							res.body.result[i].state = '已被预约'
						}else if(res.body.result[i].state == 'haveBeenAccepted'){
							res.body.result[i].state = '已接受预约'
						}else if(res.body.result[i].state == 'haveBeenRefused'){
							res.body.result[i].state = '已拒绝'
						}else if(res.body.result[i].state == 'ended'){
							res.body.result[i].state = '已完成课程'
						}else{
							res.body.result[i].state = '哎哟数据错乱'
						}
					}
					for(var i = 0;i<res.body.result.length;i++){
						if(! res.body.result[i].time.from || !res.body.result[i].time.to){
							res.body.result[i].time = "";
						}else{
							res.body.result[i].time = res.body.result[i].time.from + '至' +  res.body.result[i].time.to;
						}

					}
					console.log(res);
					this.manageSupplyInfor.objects = res.body.result;
				})
			}
		}
	}
</script>