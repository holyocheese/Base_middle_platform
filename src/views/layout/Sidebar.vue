<template>
    <el-menu
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      mode="vertical"
      :background-color="sideColor"
      text-color="#bfcbd9"
      active-text-color="#409EFF">
      <sidebar-item :routes='permissionMenus'></sidebar-item>
    </el-menu>
</template>


<script>
  import { mapGetters } from 'vuex';
  import SidebarItem from './SidebarItem';
  let SIDE_COLOR = '#304156';
  export default {
    data(){
      return{
        sideColor:SIDE_COLOR
      }
    },
    watch: {

    },
    components: { SidebarItem },
    computed: {
      ...mapGetters([
        'sidebar',
        'permissionMenus'
      ]),
      isCollapse() {
        return !this.sidebar.opened
      }
    }
  }
</script>
