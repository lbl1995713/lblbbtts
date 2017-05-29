<template>
	<div class="col-md-12" style="padding:20px">
		<bbts-table :title="coverManage.title" :definition="coverManage.definition" :objects="coverManage.objects" :options="coverManage.options"></bbts-table>
		<bbts-page-jump></bbts-page-jump>
	</div>
</template>
<style></style>
<script>
	export default{
		data() {
			return {
				coverManage:{
					title: "自荐信息管理",
					definition:[
					  {
					  	 id: "receiver",
					  	 name: "接收人",
					  	 type: "string",
					  	 line: 2
					  },
					  {
					  	 id: "sendTime",
					  	 name: "发送时间",
					  	 type: "date",
					  	 line:2
					  }
					]
				}
			}
		}
	}
</script>