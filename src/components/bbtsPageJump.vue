<template>
	<div class="col-md-12" style="margin:10px 0">
		<div class="float_left" v-text="'总共:' + total + '条'"></div>
		<div class="float_right">
		    <button class="pageButton" :disabled="currentPage == 1" :class="[{'activation':currentPage > 1 },{'disabled': currentPage == 1}]" @click="homePage">首页</button>
			<button class="pageButton" :disabled="currentPage == 1" :class="[{'activation':currentPage > 1 },{'disabled': currentPage == 1}]" @click="previous">上一页</button>
            <span v-text="currentPage + ' / ' + totalPage"></span>
			<button class="pageButton" :disabled="currentPage == totalPage" :class="[{'activation':currentPage < totalPage},{'disabled': currentPage == totalPage}]" @click="next">下一页</button>
			<button class="pageButton" :disabled="currentPage == totalPage" :class="[{'activation':currentPage < totalPage},{'disabled': currentPage == totalPage}]" @click="endPage">尾页</button>
		</div>
	</div>
</template>
<style scoped="">
	.pageButton{padding:3px 8px; border-radius: 4px;box-shadow: 0 2px #BABABA;outline: none;;background-color: #E0E0E0;border:1px solid #BABABA;}
	.activation{color:#3A5FCD}
	.activation:hover{color:#fff;background-color: #3A5FCD;box-shadow:0 2px #36648B;border-color: #36648B}
	.disabled{color: #999;}
</style>
<script>
	export default{
		data() {
			return {
				currentPage: 1
			}
		},
		computed:{
			total:function(){
				return this.searchModel.total;
			},
			totalPage: function(){
				return (Math.ceil(this.searchModel.total / 10))
			}
		},
		props:{
			searchModel:{
				type: Object,
				default: function(){
					return {
						total: 55
					}
				}
			}
		},
		methods:{
			next() {
				console.log(this.searchModel)
				if(this.currentPage<this.totalPage){
					this.currentPage ++;
				}
				//执行查询数据service
				this.$emit('next', this.currentPage);
			},
			previous() {
				if(this.currentPage > 1){
					this.currentPage --;
				}
				this.$emit('previous', this.currentPage);
			},
			homePage() {
				this.currentPage = 1;
				this.$emit('homePage', this.currentPage);
			},
			endPage() {
				this.currentPage = this.totalPage;
				this.$emit('endPage', this.currentPage);
			}
		},
		watch:{
			searchModel:function(val){
				console.log(val)
			}
		}
	}
</script>