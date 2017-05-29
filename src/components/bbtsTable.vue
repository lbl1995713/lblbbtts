<template>
	<div>
		<h3 class="tableTitle noMargin" v-if="title" v-text="title"></h3>
		<div class="col-md-12 noPadding tableHeader">
		    <!-- <div class="col-md-1 tableDef">Index</div> -->
			<div v-for="(def,index) in definition" style="font-size:12px;" class="tableDef" v-text="def.name" :class="['col-md-' + def.line,{'tableHeader_boderRight': index<definition.length, 'tableHeader_isCenter': def.isCenter, 'tableHeader_boderLeft': index > 0}]"></div>
			<div style="font-size:12px;" class="tableDef tableHeader_boderLeft tableHeader_isCenter col-md-2">操作</div>
		</div>
		<div class="tableBody">
			<div v-for="(o,o_index) in objects" class="table_body col-md-12">
				<div style="font-size:12px;" v-for="(def, index) in definition" :class="['col-md-' + def.line,{'tableHeader_isCenter': def.isCenter, 'tableBody_hidden': !o.showHidden}]" @click="showHidden(o_index)" v-text="o[def.id]"></div>
				<div class="col-md-2" style="text-align:center;">
					<button  v-for="option in options.integration" class="inlineBlock table_button" v-text="option.name" v-if="(typeof(option.enable) == 'function'?option.enable(o):option.enable)" @click="btnClick(option.id, o)"></button>
				</div>
			</div>
		</div>
	</div>
</template>
<style scoped="">
	.tableTitle{color:#fff;height:60px;line-height: 60px;background: url(../../static/table_title_bg.png) repeat;border:2px solid #171717;padding:0 20px;letter-spacing: 8px;background-size: 1% 100%}
	.tableHeader{border:2px solid #C4C4C4;background:url(../../static/table_header_bg.png) repeat;background-size: 1% 100%}
	.tableHeader_boderRight{border-right:2px solid #C4C4C4;}
	.tableHeader_boderLeft{border-left:1px solid #fff;}
	.tableHeader_isCenter{text-align: center}
	.table_body{background-color: #F5F5F5;color:#999;line-height: 35px;border:2px solid #c4c4c4;border-top:none;}
	.table_body:hover{background-color: #c4c4c4; color:#fff;}
	.table_button{padding:0 10px; border-radius: 4px;box-shadow: 0 2px #BABABA;outline: none;;background-color: #E0E0E0;border:1px solid #BABABA;color:#3A5FCD}
	.table_button:hover{color:#fff;background-color: #3A5FCD;box-shadow:0 2px #36648B;border-color: #36648B}
	.tableBody button{height: 25px;line-height: 25px;margin:0px 5px;color:#000}

	.tableBody_hidden{overflow: hidden;text-overflow:ellipsis;white-space: nowrap;}
	.tableDef{height: 30px;display: inline-block;font-weight: bold;line-height: 30px;font-family: "微软雅黑"}
</style>
<script>
	export default{
		data() {
			return {
				// obj: this.objects
			}
		},
		props:{
			title:{
				type: String,
				default: ""
			},
			definition:{
				type: Array,
				default: function(){
					return []
				}
			},
			options:{
				type: Object,
				default: function(){
					return {}
				}
			},
			objects:{
				type: Array,
				default: function(){
					return []
				}
			}
		},
		methods:{
			showHidden: function(index){
				if(this.objects[index].showHidden){
					this.objects[index].showHidden = false;
				}else{
					this.$set(this.objects[index], 'showHidden', true);
				}
			},
			btnClick: function(id,data){
				this.$emit(id, data);
			}
		}
	}
</script>