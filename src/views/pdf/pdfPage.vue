<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        @keyup.enter.native="handleFilter"
        style="width: 200px"
        class="filter-item"
        placeholder="file name"
        v-model="listQuery.fileName"
      ></el-input>
      <el-select
        v-model="listQuery.setName"
        placeholder="Please select"
        @change="handleFilter"
      >
        <el-option
          v-for="item in typeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-button
        class="filter-item"
        type="primary"
        v-waves
        icon="el-icon-search"
        @click="handleFilter"
        >Serach</el-button
      >
      <el-button
        class="filter-item"
        style="margin-left: 10px"
        @click="handleCreate"
        type="primary"
        icon="el-icon-edit"
        >Add</el-button
      >
    </div>

    <el-table
      :key="tableKey"
      :data="list"
      v-loading="listLoading"
      element-loading-text="加载中..."
      border
      fit
      highlight-current-row
      style="width: 100%; font-size: 13px"
    >
      <el-table-column width="150px" align="center" label="ID">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="50px" align="center" label="File Name">
        <template slot-scope="scope">
          <span>{{ scope.row.fileName }}</span>
        </template>
      </el-table-column>
      <!--      <el-table-column width="80px" align="center" label="File Path">-->
      <!--        <template slot-scope="scope">-->
      <!--          <span>{{scope.row.type | typeFilter}}</span>-->
      <!--        </template>-->
      <!--      </el-table-column>-->
      <el-table-column align="center" label="File Path">
        <template slot-scope="scope">
          <span>{{ scope.row.path }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="Operation"
        width="270"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            type="success"
            size="small"
            @click="handleDetail(scope.row)"
            >Detail</el-button
          >
          <el-button
            type="primary"
            size="small"
            @click="handlePreview(scope.row)"
            >Prewiew</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="listQuery.page"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="listQuery.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>

    <el-dialog :title="jsonTitle" :visible.sync="dialogFormVisible">
      <el-button type="primary" @click="handleToJsonButton">toJson</el-button>
      <el-table
        :key="tableKey"
        :data="lindataList"
        v-loading="listLoading"
        element-loading-text="加载中..."
        border
        fit
        highlight-current-row
        style="width: 100%; font-size: 13px"
      >
        <el-table-column width="100px" align="center" label="yBegin">
          <template slot-scope="scope">
            <span>{{ scope.row.yBegin }}</span>
          </template>
        </el-table-column>
        <el-table-column width="100px" align="center" label="xBegin">
          <template slot-scope="scope">
            <span>{{ scope.row.xBegin }}</span>
          </template>
        </el-table-column>
        <el-table-column width="100px" align="center" label="xEnd">
          <template slot-scope="scope">
            <span>{{ scope.row.xEnd }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="text">
          <template slot-scope="scope">
            <span>{{ scope.row.text }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="isKey">
          <template slot-scope="scope">
            <!--<el-checkbox v-model="scope.row.isKey" :checked="scope.row.isKey===1?true:false"  true-label="1" false-label="0" ></el-checkbox>-->
            <el-checkbox
              @change="checkBoxChange(scope.row)"
              :checked="scope.row.isKey === 1 ? true : false"
            ></el-checkbox>
            <!--<span>{{scope.row.isKey===1?'true':'false'}}</span>-->
          </template>
        </el-table-column>
        <!--        <el-table-column align="center" label="Operation" width="270" class-name="small-padding fixed-width">-->
        <!--          <template slot-scope="scope">-->
        <!--            <el-button type="success" size="small"  @click="handleDetail(scope.row)">Detail</el-button>-->
        <!--          </template>-->
        <!--        </el-table-column>-->
      </el-table>

      <!--      <div slot="footer" class="dialog-footer">-->
      <!--&lt;!&ndash;        <el-button @click="dialogFormVisible = false">取消</el-button>&ndash;&gt;-->
      <!--&lt;!&ndash;        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">提交</el-button>&ndash;&gt;-->
      <!--        <el-button type="primary" @click="updateData">detail</el-button>-->
      <!--      </div>-->
    </el-dialog>

    <el-dialog :title="jsonTitle" :visible.sync="jsonFormVisible">
      <el-input type="textarea" autosize placeholder="Json" v-model="pdfJson">
      </el-input>
    </el-dialog>

    <el-dialog title="Pdf-preview" :visible.sync="previewFormVisible">
      Page:
      <el-input
        @change="handlePdfPage"
        style="width: 200px"
        class="filter-item"
        placeholder="page"
        v-model="pdfNumPages"
        type="number"
      ></el-input>
      <pdf v-bind:src="previewPdfPath" :page="pdfNumPages"></pdf>
    </el-dialog>
  </div>
</template>

<script>
import {
  page,
  addObj,
  updateObj,
  forceUpdate,
  downloadapp,
  uploadFile,
  delObj,
} from "@/api/pdf/pdfPage";
import { getPdfLinedataByPdfId } from "@/api/pdf/pdfLinedata";
import waves from "@/directive/waves"; // 水波纹指令
import { parseTime } from "@/utils";
import pdf from "vue-pdf";

export default {
  name: "pdfPage",
  components: {
    pdf,
  },
  directives: {
    waves,
  },
  data() {
    return {
      pdfJson: "",
      lindataList: [],
      jsonTitle: "",
      tableKey: 0,
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        name: undefined,
        needUpdate: undefined,
        setName: "breath",
      },
      dialogFormVisible: false,
      jsonFormVisible: false,
      dialogUploadVisible: false,
      previewFormVisible: false,
      dialogStatus: "",
      textMap: {
        update: "编辑",
        create: "新增",
      },
      dialogPvVisible: false,
      temp: {
        id: undefined,
        name: "",
        version: null,
        type: null,
        needUpdate: 0,
        effectiveTime: null,
        updateMessage: null,
      },
      rules: {
        name: [{ required: true, message: "app名称不能为空", trigger: "blur" }],
        type: [
          { required: true, message: "系统类型不能为空", trigger: "change" },
        ],
        version: [
          { required: true, message: "版本号不能为空", trigger: "blur" },
        ],
        updateMessage: [
          { required: true, message: "版本说明不能为空", trigger: "blur" },
        ],
      },
      uploadUrl: "",
      url: process.env.BASE_API + "/appSetting/uploadApp",
      pdfNumPages: 0,
      previewPdfPath: "",
      typeOptions: [
        {
          value: "breath",
          label: "breath",
        },
        {
          value: "mri",
          label: "mri",
        },
      ],
    };
  },
  filters: {
    typeFilter(type) {
      return typeKeyValue[type];
    },
    needUpdateFilter(type) {
      return needUpdateKeyValue[type];
    },
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      page(this.listQuery).then((response) => {
        this.list = response.data.rows;
        this.total = response.data.total;
        this.listLoading = false;
      });
    },
    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
    },
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getList();
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: "操作成功",
        type: "success",
      });
      row.status = status;
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        name: undefined,
        needUpdate: undefined,
        type: undefined,
        createId: undefined,
        effectiveTime: undefined,
      };
    },
    handleCreate() {
      this.resetTemp();
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    handleDownload() {
      // downloadapp("123.zip").then(function (res) {
      //     console.log(res);
      //     if (res && res.status == 200) {
      //         const blob = new Blob([res.data], { type: 'application/zip' });
      //             const elink = document.createElement('a');
      //             elink.download = "123.zip";
      //             elink.style.display = 'none';
      //             elink.href = URL.createObjectURL(blob);
      //             document.body.appendChild(elink);
      //             elink.click();
      //             URL.revokeObjectURL(elink.href); // 释放URL 对象
      //             document.body.removeChild(elink);
      //     }
      // })
    },
    createData() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          this.temp.needUpdate = 0;
          addObj(this.temp).then(() => {
            this.getList();
            this.dialogFormVisible = false;
            this.$notify({
              title: "成功",
              message: "创建成功",
              type: "success",
              duration: 2000,
            });
          });
        }
      });
    },
    handleUpload(row) {
      this.temp = Object.assign({}, row); // copy obj
      this.dialogUploadVisible = true;
      this.uploadUrl = this.url + "?id=" + row.id;
      this.$refs.upload.clearFiles(); //清空之前的
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    handleDetail(row) {
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      this.jsonTitle = row.fileName;
      getPdfLinedataByPdfId({ id: row.id, dataType: "key_value" }).then(
        (response) => {
          this.lindataList = response;
        }
      );
    },
    handlePreview(row) {
      let path = "../../static/pdf/" + row.fileName.replaceAll(" ", "");
      console.log(path);
      this.previewPdfPath = pdf.createLoadingTask(encodeURI(path));
      this.previewPdfPath.promise.then((pdf) => {
        this.pdfNumPages = pdf.numPages;
      });
      this.previewFormVisible = true;
    },
    handlePdfPage(page) {
      this.previewPdfPath.promise.then((pdf) => {
        this.pdfNumPages = parseInt(page);
      });
    },
    handleToJsonButton() {
      this.jsonFormVisible = true;
      let json = "{\n";
      const datalist = this.lindataList;
      for (let i = 0; i < datalist.length; i++) {
        if (datalist[i].isKey === 1) {
          //上一个也是key
          if (i > 0 && datalist[i - 1].isKey === 1) {
            json += ' : "",\n';
          }
          json += '  "' + datalist[i].text + '"';
        } else {
          json += ' : "' + datalist[i].text + '",\n';
        }
      }
      if (
        datalist[datalist.length - 1].isKey === 1 &&
        datalist[datalist.length - 2].isKey
      ) {
        json += ' : "",';
      }
      json += "\n}";
      this.pdfJson = json;
    },
    handleDelete(row) {
      this.$confirm("此操作将永久删除这条记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        delObj(row.id).then(() => {
          this.$notify({
            title: "成功",
            message: "删除成功",
            type: "success",
            duration: 2000,
          });
          const index = this.list.indexOf(row);
          this.list.splice(index, 1);
        });
      });
    },
    submitUpload() {
      if (
        !this.$refs.upload.uploadFiles ||
        this.$refs.upload.uploadFiles.length === 0
      ) {
        this.$message({
          message: "请先选择文件",
          type: "warning",
        });
        return;
      }
      this.$confirm("若此前已上传，此操作将覆盖之前的文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$refs.upload.submit();
      });
    },
    // ------------ 文件上传begin ---------------
    handleChange(file, fileList) {
      const formData = new FormData();
      console.log(file);
      formData.append("file", file.raw);
      formData.append("id", this.temp.id);
      uploadFile(formData).then((response) => {
        this.$notify({
          title: "成功",
          message: "上传成功",
          type: "success",
          duration: 2000,
        });
        this.getList();
      });
    },
    // 上传前对文件的大小的判断
    beforeAvatarUpload(file) {
      let fileName = new Array();
      fileName = file.name.split(".");
      console.log("---------" + fileName);
      const extension = fileName[fileName.length - 1] === "apk";
      const isLt2M = file.size / 1024 / 1024 < 100;
      if (!extension) {
        this.$message({
          message: "上传模板只能是apk格式!",
          type: "warning",
        });
      }
      if (!isLt2M) {
        this.$message({
          message: "上传模板大小不能超过 100MB!",
          type: "warning",
        });
      }
      return isLt2M && extension;
    },
    fileHandleSuccsess(response, file, fileList) {
      this.$refs.upload.clearFiles();
      this.$notify({
        title: "成功",
        message: "上传成功",
        type: "success",
        duration: 2000,
      });
    },
    fileHandleError(err, file, fileList) {
      this.$notify({
        title: "失败",
        message: "上传失败",
        type: "error",
        duration: 2000,
      });
    },
    fileHandleProgress(event, file, fileList) {
      console.log("progress", event, file, fileList);
    },
    // ------------ 文件上传end ---------------
    updateData() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp);
          updateObj(tempData).then(() => {
            this.getList();
            this.dialogFormVisible = false;
            this.$notify({
              title: "成功",
              message: "更新成功",
              type: "success",
              duration: 2000,
            });
          });
        }
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) =>
        filterVal.map((j) => {
          if (j === "timestamp") {
            return parseTime(v[j]);
          } else {
            return v[j];
          }
        })
      );
    },
    checkBoxChange(row) {
      if (this.lindataList.indexOf(row) > -1) {
        this.lindataList[this.lindataList.indexOf(row)].isKey =
          ~this.lindataList[this.lindataList.indexOf(row)].isKey + 2;
      }
    },
  },
};
</script>
