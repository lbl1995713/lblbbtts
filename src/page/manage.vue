<template>
	<div style="width:100%">
		<div id="manage_nav" class="float_left" style="width:9%;background-color:#333333">
		    <div style="text-align:center;padding:5px 0 0 0"><a href="#/" style="color:#fff">返回查询</a></div>
			<div class="userInfor">
			    <div class="messageNum" v-text="messageNum"></div>
				<div class="userHeadPortrait">
					<img src="../../static/userHead.jpg" alt="用户头像" width="100%"/>
				</div>
			</div>
			<div class="logout_div">
				<img class="logout" src="../../static/logout.png" width="20px" @click="logout">
			</div>
			<div class="manage_nav_main">
				<div v-for="(nav, index) in navInfor" class="nav_div" @mouseenter="mouseenterNav(index)" @mouseleave="mouseleaveNav">
					<div class="nav_img" v-bind:style="'background-position:' + nav.x + 'px ' + nav.y + 'px'"  ></div>
					<div v-text="nav.title" class="nav_txt"></div>
					<transition name="show-nav">
						<div style="background-color:#f40" class="nav_child_div" v-if="navIndex == index">
						     <a v-for="child in nav.child" style="width:100%;display:block" class="nav_child" v-text="child.title" :href="'#/manage/' + child.link" v-if="user.role == child.role || child.role == 'all'">
						     </a>
						     <div class="nav_logo" v-if="nav.child"></div>
					    </div>  
					</transition>		
				</div>
			</div>
		</div>
		<div id="manage_main" class="float_right" style="width:91%;background-color:#fff;">
			<transition  name="fade" mode="out-in" appear>
				<router-view
				class="view"
				keep-alive
				transition
				transition-mode="out-in">
			    </router-view>
		    </transition>
	    </div>
		<div style="clear:both"></div>
	</div>
</template>
<style>
    .userInfor{width:100%; padding: 5px 0 10px 0;position: relative;}
    .logout_div{text-align:center;}
    .logout{cursor: pointer;}
    .nav_txt{color:#999;text-align: center;font-size:13px;height:30px;line-height: 30px;}
    .nav_img{text-align: center;width:40%;height: 50px;margin:0 auto;border-radius: 50%;padding-top:10px;background: url('../../static/nav_img.jpg') no-repeat;background-size: 855%}
    .nav_div{border-left:3px solid #333;position: relative;margin:25% 0;}
    .nav_div:hover{border-color: #f40;}
    .nav_div:hover .nav_txt{color:#fff;}
    .nav_child_div{position:absolute;top:10px;right:-100%;width:100%;border-top-right-radius:5px;border-bottom-right-radius: 5px;z-index: 9999;}
    .nav_child{text-align: center;font-size: 13px;height: 30px;color: #fff;line-height: 30px;z-index: 9999;}
    .nav_child_div a{color:#fff;}
    .nav_child_div a:hover{color:#000;}
    .nav_logo{height:20px;width:20px;background-color: #f40;position: absolute;top:4px;left: -7%;transform: rotate(45deg);z-index:100;}
	.userHeadPortrait{width:60%;border-radius: 50%;overflow: hidden;margin: 0 auto;}
	.messageNum{position: absolute; color:#fff; font-size: 14px;right:13%;background-color: #f40;width:17%;height:23%;
		line-height: 25px;text-align: center;border-radius: 50%; cursor: pointer;}
</style>
<style scoped="">
.show-nav-enter-active {
  transition: all .3s ease;
}
.show-nav-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.show-nav-enter, .show-nav-leave-active {
  transform: translateX(10%);
  opacity: 0;
}
</style>
<script>
	export default{
		data() {
			return {
				messageNum: "2",
				showChild:false,
				navIndex: null,
				navInfor: [],
				user:{}
			}
		},
		mounted() {
			//加载时候设置导航栏高度
			var nav = document.getElementById('manage_nav');
			nav.style.height = window.innerHeight + 'px';

			//储存用户信息
			this.user =JSON.parse(sessionStorage.getItem("user"));
			//加载导航栏信息
			var navPlatForm = require('../data/navPlatform.json');
			this.navInfor = navPlatForm.result;
		},
		methods:{
			mouseenterNav(index) {
				this.navIndex = index;
			},
			mouseleaveNav() {
				this.navIndex = null;
			},
			logout() {
				sessionStorage.removeItem("user");
				this.user = {};
				window.location.href = "#/login"
			}
		}
	}
</script>