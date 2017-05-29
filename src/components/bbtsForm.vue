<template>
	<div class="col-md-12 noPadding">
		<h2 class="formTitle noMargin" v-if="title != '' " v-text="title"></h2>
		<div class="formMain col-md-12" v-if="show">
			<p v-if="description"><span class="red important formLine">*</span><span v-if="description != ''" v-text="description"></span></p>
			<div class="formLine col-md-12 noPadding" :class="d.half?'col-md-6':'col-md-12'" v-for="(d, index) in def">
				<label class="formLabel" :class="d.half?'col-md-4':'col-md-2'"><span class="red important formLine" v-if="d.importantable" style="font-weight:bold">* </span><span v-text="d.name"></span>:</label>
				<bbts-input :ipt-type="d.type == 'string'? 'text' : d.type" :class="d.half?'col-md-8':'col-md-10'" :ipt-index="index" ipt-class="col-md-10 formIpt" v-on:ipt-value="iptFunc" v-on:file-data="iptFileFunc" :place-holder="d.placeholder" :init-value="d.initValue" :error="d.errorCode" :x-top="7" :ipt-options="d.options" :checked="d.checked"></bbts-input>
			</div>
			<div class="formLine col-md-12" v-if="options.submit && options.submit.enable">
				<button class="col-md-2 col-md-offset-5 formBtn" v-text="options.submit.name"  @click="submit"></button>
			</div>
			<div class="formLine col-md-12" v-if="options.cancel && options.cancel.enable">
				<button class="col-md-2 col-md-offset-5 formBtn" v-text="options.cancel.name"  @click="cancel"></button>
			</div>
		</div>
	</div>
</template>
<style>
	.formTitle{background-color: #999;color:#fff;padding: 10px 20px;border-bottom: 1px solid #000}
	.formMain{padding: 20px 40px;}
	.formLabel{text-align: right;line-height: 30px;font-size:13px;}
	.formIpt{height:30px;border-radius: 5px;border:1px solid #ccc;}
	.formBtn{padding:5px 10px; border-radius: 4px;box-shadow: 0 2px #BABABA;outline: none;;background-color: #E0E0E0;border:1px solid #BABABA;color:#3A5FCD}
	.formBtn:hover{color:#fff;background-color: #3A5FCD;box-shadow:0 2px #36648B;border-color: #36648B}
	.formIptError{border-color: red;}
</style>
<script>
	export default{
		data() {
			return{
				formModel: {},
				def:this.definition,
				test: "",
				show: true,
				isError: false,
			}
		},
		watch:{
			initObject:function(val, oldVal){
				if(val){
					for(var i = 0;i<this.def.length;i++){
						for(var index in val){
							if(index == this.def[i].id){
								this.$set(this.def[i],'initValue',val[index]);
								break;
							}
						}
					}
					// this.$set(this.def[9],'initValue',{from:1,to:3});
					// console.log(this.def)
				}
			}
		},
		props:{
			//表单填写数据的定义
			definition:{
				type: Array,
				default: function() {
					return []
				}
			},
			//表单名
			title: {
				type: String,
				default: ""
			},
			//表单提示或描述
			description: {
				type: String,
				default: ""
			},
			options: {
				type: Object,
				default: function(){
					return {};
				}
			},
			initObject:{
				type: Object,
				default: function(){
					return {};
				}
			}
		},
		methods:{
			iptFunc(data) {
				this.formModel[this.def[data.index].id] = data.value;
				if(this.isError){
					for(var i =0,len = this.def.length;i<len;i++){
					    this.def[i]['errorCode'] = "";
				    }
				}
			},
			iptFileFunc(data) {
				if(this.isError){
					this.def[data.index]['errorCode'] = "";
				};
				let supportTypes = this.def[data.index].fileType;
				if(data.value && supportTypes.indexOf(data.value.type) >= 0){
					this.formModel[this.def[data.index].id] = data.value;
				}else {
					this.isError = true;
					this.$set(this.def[data.index],'errorCode','文件格式不正确');
				}
				// this.formModel[this.definition[data.index].id] = data.value;
			},
			submit() {
				if(this.options.submit.beforeAction){//判断是否需要验证
					var result = this.options.submit.beforeAction(this.formModel);
					if(result  && result.length>0){
						this.isError = true;
						for(var i =0,len = result.length;i<len;i++){
							this.$set(this.def[result[i].index],'errorCode',result[i].errorCode);
						}
						return;
						
					}
				}
				this.$emit('submitForm', this.formModel)
			},
			cancel() {
				this.formModel = {};
				this.show = false;
				this.options.cancel.action(this.formModel);
			}
		}
	}
</script>