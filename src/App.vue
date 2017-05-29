<template>
  <div>
    <transition  name="fade" mode="out-in" appear>
    	<router-view
          class="view"
          keep-alive
          transition
          transition-mode="out-in">
       </router-view>
    </transition>
    
  </div>
</template>

<script>
  var config = require('./util')
</script>

<style lang="css">
	*{padding: 0;margin: 0;font-size:12px;box-sizing: border-box;}
	@import "./css/bootstrap/css/bootstrap.css";
</style>
