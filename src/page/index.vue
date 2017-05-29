<style>
    @import "../css/index.css";
</style>
<template>
	<div>
		<transition name="fade">
			<div id="header-search" class="header-search" v-show="showHeaderSearchBox">
				<div class="container">
					<bbts-search-box class="col-md-offset-5 col-md-7" v-on:header-search-box="headerSearchBoxFunc" v-on:header-search="headerSearchBtn" p-btn-class="header-searchBtn" p-ipt-class="header-searchIpt" button-txt="搜一搜"></bbts-search-box>
				</div>
			</div>
		</transition>
	    
		<div id="header">
			<div class="container header-content">
				<div class="row col-md-12">
					<div id="header-ctn-left" class="col-md-4 header-content">
						<span>当前城市：<span v-text="currentCity" class="currentCity"></span></span>&nbsp
						<span>[ <a @click="choseCity">切换城市</a> &nbsp&nbsp <a @click="changeCity">成都</a> &nbsp&nbsp <a>北京</a>&nbsp&nbsp <a>绍兴</a> ]</span>
					</div>
					<div id="header-ctn-right" class="float_right header-content">
						<span v-if="!user.userName" style="position:absolute;right:15px"><a href="#/login">我是会员 立即登录</a> &nbsp  |  &nbsp  <a href="#/register">木有账号 立即注册</a></span>
						<span v-if="user.userName"><span  v-text="'欢迎您, ' + user.userName"></span> | <a href="#/manage">个人中心</a> | <a href="" @click="logout">注销</a></span>
					</div>
				</div>
			</div>
		</div>
		<div id="content" class="container">
			<div id="content-left" class="col-md-12">
				<!-- 搜索框 -->
				<div id="search-box" class="col-md-12">
					<div id="logo" class="col-md-2">
						<span class="logo-title">宝托系统</span>
						<span class="logo-txt">  &nbsp bbts.com</span>
					</div>
					<div id="search-box-main" class="col-md-10">
						<div class="col-md-10" style="padding: 0">
							<input type="text" placeholder="请输入搜索信息" @focus="searchInputFocus" @blur="searchInputBlur" v-model="searchBox" class="search-box search-ipt col-md-12">
							<ul class="search-box-list col-md-12" v-if="showSearchBoxList && searchList.length > 0" style="padding: 0;">
								<li v-for="item in searchList" class="col-md-12" @mousedown="searchBoxListClick" value="" v-text="item"></li>
								<li style="text-align:right"><button @mousedown="clearSearchList">清除记录</button></li>
							</ul>
						</div>
						<input type="button"  class="search-box search-btn col-md-2" @click="searchBtn" value="搜索一下">
					</div>
				</div>
				<!-- 查询导航 -->
				<div class="col-md-12">
					<div class="search-nav col-md-12">
						<ul class="noListStyle">
							<li v-text="nav.name" :class="{'search-nav-selected':navIndex == index}" v-for="(nav, index) in searchNav" @click="choseSearchNav(index)"></li>
						</ul>
					</div>
					<div class="search-list col-md-12" v-if="false">
						<ul v-for="(item, Ulindex) in searchNavList" class="noListStyle noMargin" :class="{'search-listUl': Ulindex != 0}">
							<p v-text="item.itemTitle + '：'" class="inlineBlock"></p>
							<li v-for="itemValue in item.itemList" class="inlineBlock"><a v-text="itemValue"></a></li>
						</ul>
					</div>
				</div>

				<!-- 主要内容展示 -->
				<div id="content-main" class="col-md-12">
				<!-- 翻页框 -->
				<div class="turnPage" v-if="contentMain">
					<div class="turn-left turn-page" @click="previous" v-if="searchModel.currentPage != 1"><</div>
					<div class="turn-right turn-page" @click="next" v-if="searchModel.currentPage < Math.ceil(count / 8)">></div>
				</div>
					<div class="page-nav col-md-12 noPadding">
						<ul class="noListStyle noMargin">
							<li class="inlineBlock" :class="{'page-navSelected': orderByIndex == index}" v-for="(item, index) in orderBy" v-text="item.name" @click="order(index)"></li>
						</ul>
					</div>
					<div class="col-md-12 noPadding" v-if="contentMain">
						<div class="col-md-3 noPadding" style="padding:10px;" v-for="content in contentMain">
							<div class="content-main noPadding col-md-12">
								<div class="col-md-12 noPadding content-img" style="background:#ccc;text-align:center;height:250px;">
									<img src="" alt="显示主图">
									<div class="col-md-12 noPadding content-btn">
										<a class="col-md-6 noPadding appointment" >一键预约</a>
										<a class="col-md-6 noPadding haveTalk">聊一聊</a>
									</div>
								</div>
								<div class="col-md-12 ">
									<strong class="content-price" v-text=" '￥' + content.salary + '/h' "></strong>
									<span class="content-praiseRate" v-if="content.type != 'demandedInfor'" v-text="'好评率: ' + content.praiseRate"></span>
								</div>
								<div class="col-md-12 ">
								    <router-link class="content-title" :to="{path:'detail', query:{id:content._id}}" v-text="content.title"></router-link>
								</div>
								<div class="col-md-12 content-main-bottom">
									<span class="content-user"><a class="pointer" v-text="content.creater"></a></span>
									<span class="content-address" v-text="content.address"></span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div id="content-right" class="col-md-12 noPadding">
				<div class="favourableComment col-md-12 noPadding">
					好评推荐
				</div>
				<div class="col-md-3" style="margin:10px 0;" v-for="favourableComment in favourableCommentMain">
					<div class="col-md-12 noPadding favourableComment-main">
						<div class="col-md-12 noPadding favourableComment-img" style="background:#ccc;text-align:center;height:220px;">
							<img src="" alt="显示主图">
							<div class="col-md-12 noPadding favourableComment-title">
								<a class="favourableComment-caption" v-text="favourableComment.title"></a>
							</div>
							<div class="col-md-12 noPadding favourableComment-btn">
								<a class="col-md-6 noPadding appointment" >一键预约</a>
								<a class="col-md-6 noPadding haveTalk">聊一聊</a>
							</div>
						</div>
						<div class="col-md-12" style="padding: 0 5px;">
							<strong class="favourableComment-price" v-text="'￥' + favourableComment.price + '/h'"></strong>
							<span class="favourableComment-praiseRate" v-text="'好评率:' + favourableComment.praiseRate + '%'"></span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				currentCity: "杭州",
				user:{},
				transitionName: 'expand',
				searchList:[],
				searchModel:{
					sort: null,
					type: null,
					currentPage: 1
				},
				count: 0,
				searchBox: "",
				headerSearchBox: "",
				orderBy:[{name:"发布时间",value:"createTime"},{name:"价钱",value:"salary"},{name:"年级",value:""},{name:"好评率",value: 'praiseRate'}],
				orderByIndex: 0,
				searchNav:[{name:"所有信息", value:"all"},{name:"学生需求信息", value:"demandedInfor"},{name:"老师供应信息",value:"supplyInfor"}],
				showSearchBoxList: false,
				showHeaderSearchBox: false,
				navIndex: 0,
				searchNavList:[
				   {
				   	  itemTitle: "科目",
				   	  itemList: ["语文","数学","英语","绘画","日语","素描","钢琴","小提琴"]
				   },
				   {
				   	  itemTitle: "街道",
				   	  itemList: ["浦沿街道", "留和街道", "下沙街道", "高沙街道", "江洪街道"]
				   },
				   {
				   	  itemTitle: "年级",
				   	  itemList: ["学龄前","小学","初中","高中","中专"]
				   }
				],
				favourableCommentMain:[
				   {
				   	  title: "最优评老师助你上名校",
				   	  praiseRate: "99.99",
				   	  price: "88.98"
				   },
				   {
				   	  title: "最优评老师助你上名校",
				   	  praiseRate: "99.99",
				   	  price: "88.98"
				   },
				   {
				   	  title: "最优评老师助你上名校",
				   	  praiseRate: "99.99",
				   	  price: "88.98"
				   },
				   {
				   	  title: "最优评老师助你上名校",
				   	  praiseRate: "99.99",
				   	  price: "88.98"
				   }
				],
				contentMain:[
				   // {
				   // 	  imgSrc: "",
				   // 	  price: "60.00",
				   // 	  praiseRate: "90.00",
				   // 	  title: "退休名校职业高级教师,精通高中文科各类,高考提升200分。",
				   // 	  userName: "lbl1995713",
				   // 	  address:{
				   // 	  	region: "滨江",
				   // 	  	street: "浦沿"
				   // 	  }
				   // }
				]
			}
		},
		watch:{
			"searchBox":{
				handler(val,oldval) {
					if(val){
					   this.showSearchBoxList = true;
				    }
				}
			}
		},
		mounted() {
			//监听滚动条
			window.addEventListener('scroll', this.handleScroll);
			if(sessionStorage.getItem("user")){
				//储存用户信息
				this.user =JSON.parse(sessionStorage.getItem("user"));
			}
			//读取查询历史
			if(localStorage.getItem('searchBox')){
				var _index = JSON.parse(localStorage.getItem('searchBox'));
				for(var i = 0;i<_index.length;i++){
					this.searchList.push(_index[i]);
				}	
			}
			//加载主要信息
			this.search();	
		},
		methods:{
			objectService(obj) {
				var str = '?';
				for( var index in obj){
					if(obj[index]){
						str = str + index + '=' + obj[index] + '&'
					}
				}
				return str;
			},
			search() {
				this.$http.get('http://localhost:3000/index' + this.objectService(this.searchModel)).then(function(res){
					var response = res.body.result,_index = null;
					for(var i = 0;i<response.length; i++){
						// console.log(response[i])
						this.$http.get('http://localhost:3000/manage/userManage?userName=' + response[i].creater + '&i=' + i).then(function(res){
							console.log(res.body)
							if(!res.body.result.praiseRate){
								_index = '无评价';
								// console.log(_index)
							}else{
								_index = res.body.result.praiseRate;
							}
							
							response[res.body.index].praiseRate = _index
							this.contentMain = response;
							// if(res.body.index == 7){
								
							// }
						})
						// console.log(response[i])
						
					
					}

					
					// console.log(response)
					this.count = res.body.count;
				})
			},
			clearSearchList() {
				localStorage.removeItem('searchBox');
				this.searchList = [];
				this.showSearchBoxList = false;
			},
			logout() {
				sessionStorage.removeItem("user");
				this.user = {};

			},
			handleScroll() {
				if(window.scrollY >= 100){
					this.showHeaderSearchBox = true;
				}else{
					this.showHeaderSearchBox = false;
				}
			},
			headerSearchBoxFunc(searchData) {
				this.headerSearchBox = searchData;
			},
			headerSearchBtn() {

				this.searchModel.title = this.headerSearchBox;
				this.search();
			},
			changeCity() {
				this.currentCity = "成都";
			},
			choseCity() {
				this.currentCity = "杭州"
			},
			searchBtn() {
				//开始查询
				this.searchModel.title = this.searchBox;
				this.search();

				//保存搜索信息
				if(this.searchBox){
					var arr = []; 
					if(localStorage.getItem('searchBox')){
						var _index = JSON.parse(localStorage.getItem('searchBox'));
						for(var i = 0;i<_index.length;i++){
							arr.push(_index[i]);
						}	
					}
					arr.push(this.searchBox);
					this.searchList = arr;
					arr = JSON.stringify(arr);
					localStorage.setItem('searchBox', arr);
				}
				
			},
			searchInputFocus() {
				if(this.searchBox){
					this.showSearchBoxList = true;
				}
			},
			searchBoxListClick(event) {
				this.searchBox = event.target.textContent;
			},
			searchInputBlur() {
				this.showSearchBoxList = false;
			},
			choseSearchNav(index) {
				this.navIndex = index;
				this.searchModel.currentPage = 1;
				if(this.searchNav[index].value != 'all'){
					this.searchModel.type = this.searchNav[index].value
					this.search();
				}else{
					this.searchModel.type = null;
					this.search();
				}
			},
			order(index) {
				this.orderByIndex = index;
				this.$set(this.searchModel,'sort',this.orderBy[index].value);
				console.log(this.searchModel)
				this.search();
			},
			previous(){
				this.searchModel.currentPage--;
				console.log(this.searchModel)
				this.search();
			},
			next(){
				this.searchModel.currentPage++;
				this.search();
			},
		}
	}
</script>