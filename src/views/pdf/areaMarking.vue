<template>

  <div class="app-container">
    <el-row>
      <el-col :span="6">
        <div id="btnContainer" class="center-div">
          <el-button @click="start">Go</el-button>
<!--          <el-button @click="save" type="primary">Get position</el-button>-->
          <el-button @click="clearArea" type="danger">Remove</el-button>
          <el-button @click="handleSave" type="success">Save area</el-button>
        </div>
      </el-col>
      <el-col :span="12" class="exp">
        <canvas id="myCanvas" ref="myCanvas" width="700" height="1000" :style="{'position': 'absolute',
                'z-index': 3}"
                @mousedown="mousedown" @mouseup="mouseup" @mousemove="mousemove">
        </canvas>
        <pdf v-bind:src="previewPdfPath" :page="pdfNumPages" style="display: inline-block; width: 75%;"></pdf>
      </el-col>
      <el-col :span="6">
        <div class="center-div" v-for="(item,index) in newForm">
          <el-form ref="form" :model="form" label-width="100px" style="display: inline-block; width: 75%;margin-bottom: 10px">
            <div :style="`border: 1px solid ${item.color};padding:15px`">index:{{index}}
              <el-form-item label="x-begin">
                <el-input v-model="item.xBegin" readonly></el-input>
              </el-form-item>
              <el-form-item label="x-end">
                <el-input v-model="item.xEnd" readonly></el-input>
              </el-form-item>
              <el-form-item label="y-begin">
                <el-input v-model="item.yBegin" readonly></el-input>
              </el-form-item>
              <el-form-item label="y-end">
                <el-input v-model="item.yEnd" readonly></el-input>
              </el-form-item>
            </div>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>


</template>

<script>
import pdf from "vue-pdf";
import {
  page,
  addObj,
  updateObj,
  uploadFile,
  delObj} from '@/api/pdf/pdfArea'

export default {
  name: "areaMarking",
  components: {
    pdf,
  },
  data() {
    return {
      nowDate: {date: '----', time: '--', week: '--'},
      message: 'Hello Vue!',
      scrollerHeight1: '90%',
      scrollerHeight2: '70%',
      showarrow: 'none',
      x: 0,
      y: 0,
      xOffset: 0,
      yOffset: 0,
      currentCameraUrl: 'http://5b0988e595225.cdn.sohucs.com/images/20180106/f4db5040974a45908fd2d4c741c563ec.jpeg',
      drawArea: false,
      canDraw: false,
      pdfNumPages: 0,
      previewPdfPath: "../../static/pdf/0000_M004k004_呼吸機能検査_170707_システム_呼吸記録検査報告書_1.pdf",
      form: {
        xBegin: 0,
        xEnd: 0,
        yBegin: 0,
        yEnd: 0,
      },
      newForm:[],
      rectArr:[],
      nowColor:undefined
    }
  },
  created() {
    this.pdfPreview();
  },
  methods: {
    initForm() {
      this.form = {
        xBegin: 0,
        xEnd: 0,
        yBegin: 0,
        yEnd: 0,
      }
      this.newForm = [];
    },
    pdfPreview() {
      let path = "../../static/pdf/0000_M004k004_呼吸機能検査_170707_システム_呼吸記録検査報告書_1.pdf";
      console.log(path);
      this.previewPdfPath = pdf.createLoadingTask(encodeURI(path));
      this.previewPdfPath.promise.then((pdf) => {
        console.log(pdf);
        this.pdfNumPages = pdf.numPages;
      });
    },
    start: function () {
      this.canDraw = true;
    },
    getArea: function () {
      const fx = this.x;
      const fy = this.y;
      const fh = this.yOffset;
      const fw = this.xOffset;
      if (fh == 0 && fw == 0) {
        alert("请绘制检测区");
        return;
      }
      const obj = {
        xBegin:fx,
        xEnd:fx + fw,
        yBegin:fy,
        yEnd:fy + fh,
        color: this.nowColor,
        pdfSetName:'breath',
        areaType:'table'
      }
      this.newForm.push(obj);
      this.form.xBegin = fx;
      this.form.xEnd = fx + fw;
      this.form.yBegin = fy;
      this.form.yEnd = fy + fh;
      console.log("x:" + fx);//x轴坐标
      console.log("y:" + fy);//y轴坐标
      console.log("xWidth:" + fw);//宽度
      console.log("yHeight:" + fh);//高度
    },
    mousedown: function (e) {
      this.drawArea = true;
      this.nowColor = this.randomHexColor();
      if (this.canDraw) {
        this.x = e.offsetX; // 鼠标落下时的X
        this.y = e.offsetY; // 鼠标落下时的Y
        this.yOffset = 0;
        this.xOffset = 0;
      }
    },
    mouseup: function (e) {
      this.drawArea = false;
      this.getArea();
    },
    mousemove: function (e) {
      this.drawRect(e);
    },
    drawRect: function (e) {
      if (this.drawArea && this.canDraw) {
        var x = this.x;
        var y = this.y;
        this.xOffset = e.offsetX - x;
        this.yOffset = e.offsetY - y;
        this.drawRectWithParam(x, y, this.xOffset, this.yOffset);
        console.log(x, y, this.xOffset, this.yOffset);
      }
    },
    //根据4个参数绘制矩形
    drawRectWithParam: function (x, y, width, height) {
      console.log(this.$refs);
      const canvas = this.$refs.myCanvas;
      var ctx = canvas.getContext("2d");

      if(width>0||height>0){
        ctx.clearRect(x-1, y-1, x-1+width, y-1+height);
      }else{
        ctx.clearRect(x+width-1, y+height-1, x, y);
      }
      //ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();

      //设置线条颜色，必须放在绘制之前
      ctx.strokeStyle = this.nowColor;
      // 线宽设置，必须放在绘制之前
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, width, height);
      this.rectArr.push({
        xBegin: x,
        xEnd: x+width,
        yBegin: y,
        yEnd: y+height,
      })
    },
    //清除画的区域
    clearArea: function () {
      const canvas = this.$refs.myCanvas;
      var ctx = canvas.getContext("2d");
      this.x = 0;
      this.y = 0;
      this.yOffset = 0;
      this.xOffset = 0;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.initForm();
    },
    handleSave: function () {
      if (!this.form.xBegin) {
        alert("请绘制检测区");
        return;
      }
      for(let index in this.newForm){
        addObj(this.newForm[index]).then(() => {
          this.$notify({
            title: "Success",
            message: `Area ${index} Save success`,
            type: "success",
            duration: 2000,
          });
        });
      }
    },
    randomHexColor: function () { //随机生成十六进制颜色
      return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).substr(-6);
    }
  }
};
</script>

<style>
.exp {
  border: 3px solid #ffa500
}

.center-div {
  top:30%;
  text-align: center;
  vertical-align: middle;
}
</style>
