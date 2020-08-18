<template>
	<div id="app" style="min-width:900px;">
    <router-view/>
	</div>
</template>

<script>
  export default{
    name: 'APP'
  }
</script>

<style lang="scss">
  @import './styles/index.scss'; // 全局自定义的css样式
</style>
