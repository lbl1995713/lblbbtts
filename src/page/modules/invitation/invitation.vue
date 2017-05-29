<template>
	<div class="col-md-12" style="padding:20px">
		<bbts-table :title="invitation.title" :definition="invitation.definition" :objects="invitation.objects" :options="invitation.options"></bbts-table>
		<bbts-page-jump></bbts-page-jump>
	</div>
</template>
<style>
	
</style>
<script>
	export default{
		data() {
			return {
				invitation:{
					title: "邀请信息管理",
					definition:[{
						id: "sender",
						name: "发件人",
						type: "string",
						line: 2
					},{
						id: "state",
						name: "状态",
						type: "string",
						line: 1
					},{
						id: "description",
						name: "描述说明",
						type: "string",
						isCenter: true,
						line: 5
					},{
						id: "sendTime",
						name: "发送时间",
						type: "string",
						line: 2
					}],
					options:{
						integration:[{
							name: "接受",
							enable: true,
							action:function(data){
								console.log(data)
							}
						},{
							name: "拒绝",
							enable: true,
							action: function(data){
								console.log(data)
							}
						}]
					},
					objects:[{
						sender: "lbl1995713",
						state: "待接收人处理",
						description: "扎心了，老铁",
						sendTime: "2017-5-7  16:40"
					},{
						sender: "lbl1995713",
						state: "待接收人处理",
						description: "扎心了，老铁",
						sendTime: "2017-5-7  16:40"
					},{
						sender: "lbl1995713",
						state: "待接收人处理",
						description: "扎心了，老铁",
						sendTime: "2017-5-7  16:40"
					},{
						sender: "lbl1995713",
						state: "待接收人处理",
						description: "扎心了，老铁",
						sendTime: "2017-5-7  16:40"
					},{
						sender: "lbl1995713",
						state: "待接收人处理",
						description: "扎心了，老铁",
						sendTime: "2017-5-7  16:40"
					},{
						sender: "lbl1995713",
						state: "待接收人处理",
						description: "扎心了，老铁",
						sendTime: "2017-5-7  16:40"
					},{
						sender: "lbl1995713",
						state: "待接收人处理",
						description: "扎心了，老铁",
						sendTime: "2017-5-7  16:40"
					},{
						sender: "lbl1995713",
						state: "待接收人处理",
						description: "扎心了，老铁",
						sendTime: "2017-5-7  16:40"
					},{
						sender: "lbl1995713",
						state: "待接收人处理",
						description: "扎心了，老铁",
						sendTime: "2017-5-7  16:40"
					},{
						sender: "lbl1995713",
						state: "待接收人处理",
						description: "扎心了，老铁",
						sendTime: "2017-5-7  16:40"
					},]
				}
			}
		}
	}
</script>