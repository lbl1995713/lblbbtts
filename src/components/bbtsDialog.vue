<template>
	<div v-if="show">
		<div class="dialog_shadow"></div>
		<div class="dialog">
			<header><span style="font-size:15px;cursor:pointer" @click="cancel">x</span></header>
			<div class="dialog_content">
			    <slot>这是一个Dialog的主要内容</slot>
			</div>
			<footer>
				<button @click="submit">确定</button>
				<button @click="cancel">取消</button>
			</footer>
		</div>
	</div>
</template>
<style>
	.dialog_shadow{position:fixed;background-color: #888;width:100%;height:1800px;left:0; top:0; opacity: 0.6;z-index: 99;}
	.dialog{width:700px;background-color: #000;position:fixed; left:28%;top:25%;opacity: 0.85;border-radius: 8px;z-index: 101;}
	.dialog header{color:#fff;text-align: right;padding:5px 15px 10px 15px;}
	.dialog_content{width:100%;padding:2px 25px;}
	.dialog footer{padding:10px 15px;width:100%;text-align: center}
	.dialog footer button{width:100px; background-color: #000;color:#fff; border:1px solid #ccc;padding:3px;border-radius: 5px;margin-left:20px;transition: all 0.5s;outline:none;}
	.dialog footer button:hover{background-color: #ccc;color:#000;}
</style>
<script>
	export default{
		data() {
			return {
				// show: this.showDialog
			}
		},
		computed:{
			show:function(){
				return this.showDialog
			}
		},
		props:{
			showDialog:Boolean
		},
		methods:{
			submit:function(){
				this.$emit('dialogSubmit')
			},
			cancel:function(){
				this.$emit('dialogCancel')
			},
		}
	}
</script>