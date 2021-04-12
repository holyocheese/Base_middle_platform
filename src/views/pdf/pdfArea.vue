<template>
  <div class="app-container">

    <div class="filter-container">
      <!--<el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="file name" v-model="listQuery.fileName"></el-input>-->

      <el-select v-model="listQuery.pdfSetName" placeholder="Please select" @change="handleFilter">
        <el-option
          v-for="item in typeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>

      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">Serach</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="el-icon-edit">Mark Area</el-button>
    </div>

    <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="加载中..." border fit highlight-current-row
              style="width: 100%;font-size:13px;">
      <el-table-column width="150px" align="center" label="ID">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="50px" align="center" label="File Name">
        <template slot-scope="scope">
          <span>{{scope.row.pdfSetName}}</span>
        </template>
      </el-table-column>
<!--      <el-table-column width="80px" align="center" label="File Path">-->
<!--        <template slot-scope="scope">-->
<!--          <span>{{scope.row.type | typeFilter}}</span>-->
<!--        </template>-->
<!--      </el-table-column>-->
      <el-table-column  align="center" label="yBegin">
        <template slot-scope="scope">
          <span>{{scope.row.yBegin}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" label="yEnd">
        <template slot-scope="scope">
          <span>{{scope.row.yEnd}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" label="xBegin">
        <template slot-scope="scope">
          <span>{{scope.row.xBegin}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" label="xEnd">
        <template slot-scope="scope">
          <span>{{scope.row.xEnd}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" label="Area type">
        <template slot-scope="scope">
          <span>{{scope.row.areaType}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Operation" width="270" class-name="small-padding fixed-width">
        <template slot-scope="scope">
<!--          <el-button type="primary" size="small"  @click="handlePreview(scope.row)">Prewiew</el-button>-->
          <el-button type="danger" size="small"  @click="handleDelete(scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <div style="margin-bottom: 10px"><el-button type="primary" @click="HandleToJsonButton">toJson</el-button></div>
      <el-table :key='tableKey' :data="lindataList" v-loading="listLoading" element-loading-text="加载中..." border fit highlight-current-row
                style="width: 100%;font-size:13px;" :row-class-name="tableRowClassName">
        <el-table-column width="100px" align="center" label="yBegin">
          <template slot-scope="scope">
            <span>{{scope.row.yBegin}}</span>
          </template>
        </el-table-column>
        <el-table-column width="100px" align="center" label="xBegin">
          <template slot-scope="scope">
            <span>{{scope.row.xBegin}}</span>
          </template>
        </el-table-column>
        <el-table-column width="100px" align="center" label="xEnd">
          <template slot-scope="scope">
            <span>{{scope.row.xEnd}}</span>
          </template>
        </el-table-column>
        <el-table-column  align="center" label="text">
          <template slot-scope="scope">
            <span>{{scope.row.text}}</span>
          </template>
        </el-table-column>
<!--        <el-table-column  align="center" label="isKey">-->
<!--          <template slot-scope="scope">-->
<!--            <el-checkbox @change="checkBoxChange(scope.row)" :checked="scope.row.isKey===1?true:false"></el-checkbox>-->
<!--            &lt;!&ndash;<span>{{scope.row.isKey}}</span>&ndash;&gt;-->
<!--          </template>-->
<!--        </el-table-column>-->
        <el-table-column  align="center" label="table_data_type">
          <template slot-scope="scope">
            <!--<el-checkbox v-model="scope.row.isKey" :checked="scope.row.isKey===1?true:false"  true-label="1" false-label="0" ></el-checkbox>-->
            <!--<el-checkbox @change="checkBoxChange(scope.row)" :checked="scope.row.isKey===1?true:false"></el-checkbox>-->
            <span>{{scope.row.tableDataType}}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <el-dialog title="Json" :visible.sync="jsonFormVisible">
      <el-input
        type="textarea"
        placeholder="Json"
        v-model="pdfJson"
        :rows="18">
      </el-input>
      <json-viewer
        :value="pdfJsonObj"
        copyable
        boxed></json-viewer>

    </el-dialog>

    <el-dialog title="Pdf-preview" :visible.sync="previewFormVisible">
      <pdf v-bind:src="previewPdfPath"></pdf>
    </el-dialog>

  </div>
</template>

<style>
  .el-table .warning-row {
    background: #F5BCA9;
  }

  .el-table .success-row {
    background: #D8CEF6;
  }
</style>

<script>
    import {
        page,
        addObj,
        updateObj,
        uploadFile,
        delObj} from '@/api/pdf/pdfArea'
    import { parseTime } from '@/utils'
    import pdf from 'vue-pdf'
    import JsonViewer from 'vue-json-viewer/ssr'
    import 'vue-json-viewer/style.css'

    export default {
        name: 'pdfPage',
        components: {
          pdf,
          JsonViewer
        },
        data() {
            return {
                pdfJson:'',
                pdfJsonObj:undefined,
                lindataList:[],
                tableKey: 0,
                list: null,
                total: null,
                listLoading: true,
                listQuery: {
                    page: 1,
                    limit: 10,
                    name: undefined,
                    needUpdate: undefined,
                    pdfSetName:'breath'
                },
                dialogFormVisible: false,
                jsonFormVisible:false,
                previewFormVisible:false,
                dialogUploadVisible:false,
                dialogStatus: '',
                textMap: {
                    update: '编辑',
                    create: '新增'
                },
                dialogPvVisible: false,
                temp: {
                    id: undefined,
                    name: '',
                    version: null,
                    type: null,
                    needUpdate: 0,
                    effectiveTime: null,
                    updateMessage:null
                },
                selectingId:0,
                previewPdfPath: "../../static/pdf/0000_M004k004_呼吸機能検査_170707_システム_呼吸記録検査報告書_1.pdf",
                pdfNumPages:1,
                typeOptions: [
                  {
                    value:'breath',
                    label:'breath'
                  },
                  {
                    value:'mri',
                    label:'mri'
                  }
                ]

            }
        },
        filters: {
            typeFilter(type) {
                return typeKeyValue[type]
            },
            needUpdateFilter(type) {
                return needUpdateKeyValue[type]
            }
        },
        created() {
            this.getList()
        },
        methods: {
            getList() {
                this.listLoading = true
                page(this.listQuery).then(response => {
                    this.list = response.data.rows
                    this.total = response.data.total
                    this.listLoading = false
                })
            },
            handleFilter() {
                this.listQuery.page = 1
                this.getList()
            },
            handleSizeChange(val) {
                this.listQuery.limit = val
                this.getList()
            },
            handleCurrentChange(val) {
                this.listQuery.page = val
                this.getList()
            },
            handleCreate() {
              this.$router.push("/pdf/areaMarking")
            },
            handlePreview(row) {
              // let path = '../../static/pdf/'+row.fileName.replaceAll(" ","");
              // console.log(path);
              // this.previewPdfPath = pdf.createLoadingTask(encodeURI(path));
              // this.previewPdfPath.promise.then(pdf => {
              //   this.pdfNumPages = pdf.numPages;
              // });
              // this.previewFormVisible = true;
            },
            HandleToJsonButton(){
                this.jsonFormVisible = true;
                getTableJsonById({id:this.selectingId}).then( msg => {
                  this.pdfJson = msg.data;
                  this.pdfJsonObj = JSON.parse(msg.data);
                })
            },
            handleDelete(row) {
                this.$confirm('That will delete this record,are you sure?', '提示', {
                    confirmButtonText: 'Yes',
                    cancelButtonText: 'Cancel',
                    type: 'warning'
                })
                    .then(() => {
                        delObj(row.id)
                            .then(() => {
                                this.$notify({
                                    title: 'Success',
                                    message: 'Delete success',
                                    type: 'success',
                                    duration: 2000
                                });
                                const index = this.list.indexOf(row);
                                this.list.splice(index, 1);
                            });
                    });
            }
        }
    }
</script>

