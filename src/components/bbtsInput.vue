<template>
   <div>
    	<input v-if="inputType == 'text'" :class="inputClass"  type="text" v-bind:placeholder="placeHolder" v-model="iptValue">
        <input v-if="inputType == 'password' " :class="inputClass" type="password" v-bind:placeholder="placeHolder" v-model="iptValue">
        <input v-if="inputType == 'number' "class="formIpt col-md-4" type="number" v-bind:placeholder="placeHolder" v-model="iptValue">
        <input v-if="inputType == 'file' " :class="inputClass" type="file" v-on:change="previewFile">
        <select v-if="inputType == 'select' " :class="inputClass" v-model="iptValue">
        	<option v-for="opt in inputOptions" v-text="opt.label" :value="opt.key"></option>
        </select>
        <div v-if="inputType == 'rangeSelect'" >
        	<select class="formIpt" style="padding:0 15px" v-model="from">
        		<option v-for="opt in inputOptions" v-text="opt.label" :value="opt.key"></option>
        	</select>
        	<span>至</span>
        	<select class="formIpt" style="padding:0 15px" v-model="to">
        		<option v-for="opt in inputOptions" v-text="opt.label" :value="opt.key" ></option>
        	</select>
        </div>
        <!-- <div v-if="inputType == 'multiSelect'">
        	<input type="text" >
        </div> -->
        <div v-if="inputType == 'rangeDate'">
        	<input class="formIpt" style="text-align:center" type="time" v-model="from"/>
        	至
        	<input class="formIpt" style="text-align:center" type="time" v-model="to"/>
        </div>
        <div style="line-height:36px">
        	<input v-if="inputType == 'checkBox'" type="checkbox" :checked="checked"  class="checkBox" v-model="iptValue">
        </div>
        <textarea v-if="inputType == 'textarea'" :class="inputClass" style="height:200px" v-model="iptValue"></textarea>
        <span class="x" v-show="iptValue && iptValue.length>0 && (iptType == 'text' || iptType == 'password')" :style=" 'top:' + xTop + 'px'" @click="clean">x</span>
        <span class="red inlineBlock" style="padding:0 0 0 10px;line-height:30px" v-if="errorCode" v-text="errorCode"></span>
   </div>
   
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped="">
  input {
    padding: 0 10px;
    outline: none;
  }
  .formIpt{height:30px;border-radius: 5px;border:1px solid #ccc;}
  select{ outline: none; }
  textarea{padding:15px 15px;outline: none}
  .x{position: absolute;box-sizing:content-box;right:20%; display: block;border:1px solid #fff;border-radius: 50%;width:16px;height: 16px;text-align: center;line-height: 16px;color:#ccc;font-weight: bold;cursor: pointer;}
</style>

<script>
	export default{
		data() {
			return {
				iptValue: null,
				inputType: this.iptType,
				inputClass: this.iptClass,
				inputOptions: this.iptOptions,
				// $file: null,
				file: null,
				from: null,
				to: null
			}
		},
		computed:{
			errorCode: function(){
				return this.error;
			}
		},
		props:{
			"placeHolder":{
				type: String,
				default: "请输入值"
			},
			"iptType":{
				type: String,
				default: "text"
			},
			"iptClass":{
				type: String,
				default: "col-md-12"
			},
			"xTop":{
				type: Number,
				default: 10
			},
			"iptIndex":{
				type: Number,
				default: 0
			},
			"error":{
				type: String,
				default: ""
			},
			"iptOptions":{
				type: Array,
				default: function(){
					return []
				}
			},
			"fileTypeControll":{
				type: Array,
				default: function(){
					return []
				}
			},
			"checked":{
				type: Boolean,
				default: false
			},
			"initValue":null
		},
		watch:{
			iptValue: function(val){
				//如果使用data储存error值那么 不会监听error值的变化，
				//如果使用computed储存error值那么不改变父组件的error值则不会清空报错信息
				this.errorCode = "";
				this.$emit('ipt-value',{value:this.iptValue,index:this.iptIndex})
			},
			file: function(val){
				this.erroorCode = "";
				this.$emit('file-data',{value:this.file,index:this.iptIndex})
			},
			to: function(val){
				this.$emit('ipt-value',{value:{from:this.from,to:this.to},index:this.iptIndex})
			},
			from: function(val){
				this.$emit('ipt-value',{value:{from:this.from,to:this.to},index:this.iptIndex})
			},
			initValue: function(val){
				if(typeof(val) == 'object' && (val.from || val.to)){
					this.from = val.from;
					this.to = val.to;
				}else{
					this.iptValue = val;
				}
			}
		},
		methods:{
			clean() {
				this.iptValue = "";
				this.errorCode = "";
			},
			previewFile(e) {	
				let file = e.target.files[0];
				// let supportTypes = ['image/jpg','image/jpeg','image/png'];
				this.file = file;
				// if(file && supportTypes.indexOf(file.type) >= 0){
				// 	this.file = file;
				// }else {
				// 	this.errorCode = "文件格式不正确";
				// 	this.clearFile();
				// }
			},
			clearFile() {
				// this.$file = null;
				this.file = null;
			},
		}
	}
</script>