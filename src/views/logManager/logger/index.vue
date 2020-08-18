<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-form :inline="true" class="demo-form-inline">
        <el-select class="filter-item" v-model="logform.level"  placeholder="等级" @click="changeSelect">
          <el-option v-for="item in levelOptions" :key="item.level" :label="item.level" :value="item.level"> </el-option>
        </el-select>
        <el-button class="filter-item"  style="margin-left: 10px;" @click="handleSearch('2')" type="primary" icon="edit">搜索</el-button>
        <el-button class="filter-item"  style="margin-left: 10px;" @click="stopTimer" type="primary" icon="edit">停止</el-button>
        <el-button class="filter-item"  style="margin-left: 10px;" @click="downloadLogByPath" type="primary" icon="edit">下载</el-button>
      </el-form>
    </div>
    <el-input
      type="textarea"
      :autosize="{ minRows: 2, maxRows: 20}"
      placeholder="日志内容"
      v-model="result"
      readOnly
      v-loading.body="loggerLoading"
      @change="scrollToBottom">
    </el-input>
  </div>
</template>

<script>
  import {
    logger as getLogger,
    loggerByPath as getLoggerByPath,
    downloadLog
  } from '../../../api/logBack/index';
  import { mapGetters } from 'vuex';

  export default {
    name: 'logger',
    data() {
      return {
        userName:undefined,
        result:"",
        tableKey: 0,
        logSearchCode:"2",
        logSearchOption:[
          {name:"路径搜索",code:"1"},
          {name:"快速搜索",code:"2"},
        ],
        levelOptions:[
          {level:"info"},
          {level:"debug"},
          {level:"error"},
        ],
        dialogFormVisible:false,
        logform:{
          name:undefined,
          level:"error",
          lineCount:10,
          lastReadLine:undefined,
        },
        logPathForm:{
          path:undefined,
          lineCount:10,
          lastReadLine:undefined,
        },
        loggerLoading: false,
        isGetting:false,//请求中标识位
        timer:undefined,
        rules: {
          name: [
            {
              required: true,
              message: '请输入客户名称',
              trigger: 'blur'
            },
            {
              min: 2,
              max: 20,
              message: '长度在 2 到 20 个字符',
              trigger: 'blur'
            }
          ],
        },
      }
    },
    beforeCreate(){
      if(this.$store.state.user&&this.$store.state.user.name!=="超级管理员"){
        this.$store.state.app.visitedViews.pop();//去掉bar上的历史
        this.$router.push('/');
      }
    },
    created() {
      clearInterval(this.timer);
    },
    destroyed(){
      clearInterval(this.timer);
    },
    watch:{
      "result":"scrollToBottom"
    },
    computed: {
      ...mapGetters([
        'elements',
        'name'
      ])
    },
    methods: {
      scrollToBottom(){ //保持在底部
        setTimeout(function(){ //设置100毫秒延时避免数据加载比DOM慢
          const div = document.getElementsByClassName('el-textarea__inner');
          div[0].scrollTop = div[0].scrollHeight;
        }, 100);
      },
      changeSelect(){
        clearInterval(this.timer);
        this.logform={
          name:undefined,
            level:undefined,
            lineCount:10,
            lastReadLine:undefined,
        };
      },
      stopTimer(){
        clearInterval(this.timer);
        this.timer = undefined;
        this.logform.lastReadLine = undefined;
        this.logform.lineCount = 10;
      },
      loggerTimer(fn) {
        this.timer = setInterval( () => {
          if(!this.isGetting){
            fn();
          }
        }, 1000)
      },
      logger(){
        if(this.$store.state.user&&this.$store.state.user.name!=="超级管理员"){
          this.$store.state.app.visitedViews.pop();//去掉bar上的历史
          this.$router.push('/');
        }
        if(!this.logform.lastReadLine){
          this.loggerLoading = true;
        }
        this.isGetting = true;
        getLogger(this.logform).then(response => {
          this.isGetting = false;
          this.loggerLoading = false;
          if(response.status===200){
            this.result += response.data;
            this.logform.lastReadLine = response.lineTotal;
            this.logform.lineCount = undefined;
            this.dialogFormVisible = false;
            console.log("timer",this.timer);
            if(!this.timer){
              this.loggerTimer(this.logger);//启动定时轮询
            }
          }
        })
      },
      loggerByPath(){
        if(this.$store.state.user&&this.$store.state.user.name!=="超级管理员"){
          this.$store.state.app.visitedViews.pop();//去掉bar上的历史
          this.$router.push('/');
        }
        console.log(this.logPathForm);
        if(!this.logPathForm.lastReadLine){
          this.loggerLoading = true;
        }
        this.isGetting = true;
        getLoggerByPath(this.logPathForm).then(response => {
          this.isGetting = false;
          this.loggerLoading = false;
          if(response.status===200){
            this.result += response.data;
            this.logPathForm.lastReadLine = response.lineTotal;
            this.logPathForm.lineCount = undefined;
            this.dialogFormVisible = false;
            if(!this.timer){
              this.loggerTimer(this.loggerByPath);//启动定时轮询
            }
          }
        })
      },
      downloadLogByPath(){
        const obj = {"level":this.logform.level};
        downloadLog(obj).then(res => {
            const content = res;
            const blob = new Blob([content]);
            const fileName = "ewheel-admin-"+ this.logform.level + ".log";
            if ('download' in document.createElement('a')) { // 非IE下载
              const elink = document.createElement('a');
              elink.download = fileName;
              elink.style.display = 'none';
              elink.href = URL.createObjectURL(blob);
              document.body.appendChild(elink);
              elink.click();
              URL.revokeObjectURL(elink.href); // 释放URL 对象
              document.body.removeChild(elink);
            } else { // IE10+下载
              navigator.msSaveBlob(blob, fileName);
            }
          })
      },
      handleSearch(type){
        this.stopTimer();
        this.result = undefined;
        if(type==="2"){
          this.logform.lastReadLine = undefined;
          this.logform.lineCount = 10;
          this.logger();
        }
        if(type==="1"){
          this.logPathForm.lastReadLine = undefined;
          this.loggerByPath();
        }
      },
    }
  }
</script>

<style scoped>
  .wrapper {
    width: 800px;
    margin: 30px auto;
  }
</style>
