<template>
  <el-form-item label="群主|领导">
    <el-select v-model="elementList" multiple filterable remote placeholder="请输入关键词" :remote-method="remoteLeaderMethod" :loading="loading">
      <el-option v-for="item in elementList" :key="item.id" :label="item.name" :value="item.id"> </el-option>
    </el-select>
  </el-form-item>
</template>

<script>
  import {
    page
  } from '../../api/integration/baseElement/index';
  export default {
    name: 'gateElementSelect',
    data() {
      return {
        elementList: undefined
      }
    },
    props: {
      elementName: String,
      id: String
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        page({ name: this.elementName }).then(response => {
          this.elementList = response.data.rows;
        });
      },
      remoteLeaderMethod(query) {
        if (query !== '') {
          this.loading = true;
          this.loading = false;
          page({
            name: query
          }).then(response => {
            this.elementList = response.data.rows;
            this.total = response.data.total;
            this.loading = false;
          });
        } else {
          this.elementList = [];
        }
      },
    },
    watch: {
      type() {
        this.init();
      }
    },
  }
</script>

<style scoped>

</style>
