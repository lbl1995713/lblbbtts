<template>
   <div class="container">
    	<div class="col-md-12">
    		<div class="col-md-10 noPadding">
    			<input type="text" class="col-md-12" :class="iptClass" v-model="searchValue" placeholder="请输入搜索信息">
    			<span class="x" v-show="searchValue != ''" @click="clean">x</span>
    		</div>
			<button class="col-md-2" :class="btnClass" @click="search" v-text="buttonTxt"></button>
    	</div>
   </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped="">
.searchBox-ipt{height: 30px;background-color: #fff;border:1px solid #ff552e;outline:none;}
.searchBox-btn{height: 30px;background-color: #f40;color:#fff;border:none;}
.x{position: absolute;box-sizing:content-box;top:7px;right:7px; display: block;border:1px solid #87CEEB;border-radius: 50%;width:16px;height: 16px;text-align: center;line-height: 16px;color:#87CEEB;font-weight: bold;cursor: pointer;}
</style>

<script>
	export default{
		data() {
			return {
				searchValue: "",
				btnClass: this.pBtnClass,
				iptClass: this.pIptClass
			}
		},
		props:{
			"buttonTxt":{
				type:String,
				default: "搜索"
			},
			"pBtnClass":{
				type: String,
				default: "searchBox-btn"
			},
			"pIptClass":{
				type: String,
				default: "searchBox-ipt"
			}
		},
		watch:{
			'searchValue':{
				handler(val,oldval) {
				    this.$emit('header-search-box',this.searchValue)
				}
			}
		},
		methods:{
			search() {
				this.$emit('header-search', this.searchValue)
			},
			clean() {
				this.searchValue = "";
			}
		}
	}
</script>