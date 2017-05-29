<template>
	<div class="col-md-12" style="padding:20px">
		<bbts-table :definition="definition" :title="title" :options="options" :objects="objects" v-on:cancel="cancelSub" v-on:accept="accept" v-on:detail="detail" v-on:complaint="complaint" v-on:evaluate="evaluate"></bbts-table>
		<bbts-dialog :showDialog="showDialog" v-on:dialogSubmit="submit" v-on:dialogCancel="cancel">
			 <label class="whiteTxt">拒绝原因:  </label>
			 <span v-text="reason" class="whiteTxt"></span>
		</bbts-dialog>
		<bbts-dialog :showDialog="showEvaluateDialog" v-on:dialogSubmit="submitEvaluate" v-on:dialogCancel="cancelEvaluate">
			 <label class="whiteTxt">请输入对老师的评价:  </label>
			 <select v-model="evaluateValue">
			 	 <option value="5">五星好评</option>
			 	 <option value="4">四星不错</option>
			 	 <option value="3">三星一般</option>
			 	 <option value="2">两星还行</option>
			 	 <option value="1">一星差评</option>
			 </select>
		</bbts-dialog>
	</div>
</template>
<style scoped="">
	.whiteTxt{color:#fff;font-size:15px;}
	select{width: 100px; outline:none; height:20px;}
</style>
<script>
	export default{
		data() {
			return{
				user:{},
				showDialog: false,
				showEvaluateDialog: false,
				inforObj: {},
				evaluateValue: null,
				reason: "",
				title: "管理预约信息",
				definition:[
				   {
				   	  id: "title",
				   	  name: "标题",
				   	  type: "string",
				   	  line: 2
				   },
				   {
				   	  id: "salary",
				   	  name: "时薪(￥/h)",
				   	  type: "string",
				   	  line: 1
				   },
				   {
				   	  id: "state",
				   	  name: "状态",
				   	  type: "string",
				   	  line: 2
				   },
				   {
				   	  id: "creater",
				   	  name: "发布人",
				   	  type: "string",
				   	  line: 2
				   },
				   {
				   	  id: "description",
				   	  name: "说明",
				   	  type: "string",
				   	  isCenter:true,
				   	  line: 3
				   }
				],
				options:{
					integration:[
					   {
					   	  id: "cancel",
					   	  name: "取消预约",
					   	  enable: function(data){
					   	  	if(data.state == '已预约'){
					   	  		return true;
					   	  	}else{
					   	  		return false;
					   	  	}
					   	  }
					   },
					   {
					   	  id: "accept",
					   	  name: "确认",
					   	  enable: function(data){
					   	  	if(data.state == '已被拒绝'){
					   	  		return true;
					   	  	}else{
					   	  		return false;
					   	  	}
					   	  }
					   },
					   {
					   	  id: "detail",
					   	  name: "原因",
					   	  enable: function(data){
					   	  	if(data.state == '已被拒绝'){
					   	  		return true;
					   	  	}else{
					   	  		return false;
					   	  	}
					   	  }
					   },
					   
					   {
					   	  id: "complaint",
					   	  name: "投诉",
					   	  enable: function(data){
					   	  	if(data.state == '已被拒绝'){
					   	  		return true;
					   	  	}else{
					   	  		return false;
					   	  	}
					   	  }
					   },
					   {
					   	  id: "evaluate",
					   	  name: "评价",
					   	  enable: function(data){
					   	  	console.log(data)
					   	  	if(data.state == '已被接受'){
					   	  		return true;
					   	  	}else{
					   	  		return false;
					   	  	}
					   	  }
					   }
					]
				},
				objects: []
			}
		},
		mounted:function(){
			this.user = JSON.parse(sessionStorage.getItem('user'));
			this.$http.get('http://localhost:3000/manage/manageSubcribInfor?subscriber=' + this.user.userName).then(function(res){
				console.log(res);
				var result = res.body.result;
				if(res.body.status == 200){
					for(var i = 0;i<result.length;i++){
						if(result[i].state == 'hasBeenBooked'){
							result[i].state = '已预约';
						}else if(result[i].state == 'haveBeenRefused'){
							result[i].state = '已被拒绝';
						}else if(result[i].state == 'haveBeenAccepted'){
							result[i].state = '已被接受';
						}else if(result[i].state == 'ended'){
							result[i].state = '已完成课程';
						}else{
							result[i].state = '哎哟喂数据错乱了'
						}
					}
					this.objects = result;
				}
			})
		},
		methods:{
			cancelSub:function(data){
				console.log(data);
				this.$http.put('http://localhost:3000/manage/manageSubcribInfor/cancel', {inforId: data._id}).then(function(res){
					if(res.body.status == 200){
						for(var i = 0;i<this.objects.length;i++){
							if(this.objects[i] == data){
								this.objects.splice(i, 1);
							}
						}
					}
				})
			},
			accept: function(data){
				this.$http.put('http://localhost:3000/manage/manageSubcribInfor/accept', {inforId: data._id}).then(function(res){
					if(res.body.status == 200){
						for(var i = 0;i<this.objects.length;i++){
							if(this.objects[i] == data){
								this.objects.splice(i, 1);
							}
						}
					}
				})
			},
			detail: function(data){
				this.reason = data.refuseReason;
				this.showDialog = true;
				console.log(data)
			},
			complaint: function(data){
				console.log(data)
			},
			evaluate: function(data){
				this.showEvaluateDialog = true;
				this.inforObj = data;
				console.log(data)
			},
			submit: function(){
				this.showDialog = false;
			},
			cancel: function(){
				this.showDialog = false;
			},
			submitEvaluate: function(){
				console.log(this.evaluateValue);
				this.$http.put('http://localhost:3000/manage/manageSubcribInfor/evaluate',{praiseRate: this.evaluateValue, userId: this.inforObj.createrId, inforId: this.inforObj._id}).then(function(res){
					console.log(res, this.evaluateValue)
					if(res.body.status == 200){
						this.inforObj.state = '已完成课程';
					}
				})
				this.showEvaluateDialog = false;
			},
			cancelEvaluate: function(){
				this.showEvaluateDialog = false;
				this.evaluateValue = null;
			}
		}
	}
</script>