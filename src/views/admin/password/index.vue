<template>
  <div class="app-container calendar-list-container">

    <el-table :key='tableKey' :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%;font-size:12px;">
      <el-table-column align="center" label="序号" width="50"> <template slot-scope="scope">
        <span>{{scope.row.id}}</span>
      </template> </el-table-column>
      <el-table-column width="100" align="center" label="姓名"> <template slot-scope="scope">
        <span>{{scope.row.name}}</span>
      </template> </el-table-column>
      <el-table-column width="110" align="center" label="账户"> <template slot-scope="scope">
        <span>{{scope.row.username}}</span>
      </template> </el-table-column>
      <el-table-column width="80" align="center" label="性别"> <template slot-scope="scope">
        <span>{{scope.row.sex}}</span>
      </template> </el-table-column>
      <el-table-column width="300" align="center" label="备注"> <template slot-scope="scope">
        <span>{{scope.row.description}}</span>
      </template> </el-table-column>
      <el-table-column width="150" align="center" label="最后时间"> <template slot-scope="scope">
        <span>{{scope.row.updTime}}</span>
      </template> </el-table-column>
      <el-table-column width="160" align="center" label="最后更新人"> <template slot-scope="scope">
        <span>{{scope.row.updName}}</span>
      </template> </el-table-column>
      <el-table-column align="center" label="操作"> <template slot-scope="scope">

        <el-button v-if="userManager_btn_edit" size="small" type="success" @click="handleChangePass(scope.row)">密码修改
        </el-button>

      </template> </el-table-column>
    </el-table>
    <!--<div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
    </div>-->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px">
        <el-form-item label="所属企业:" v-if="dialogStatus !== 'changePass'" prop="tenantId">
          <el-select  class="filter-item" v-model="form.tenantId" loading-text="正在搜索中..." filterable remote clearable value-key="tenantId"   :remote-method="companySearch" :loading="companySearchLoading" placeholder="输入公司名称搜索">
            <el-option v-for="item in  companyList" :key="item.tenantId" :label="item.companyName" :value="item.tenantId"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="姓名" v-if="dialogStatus !== 'changePass'" prop="name">
          <el-input  v-model="form.name" placeholder="请输入姓名" style="width:200px;"></el-input>
        </el-form-item>
        <el-form-item label="账户" v-if="dialogStatus !== 'changePass'" prop="username">
          <el-input v-if="dialogStatus == 'create'" v-model="form.username" placeholder="请输入账户" style="width:200px;"></el-input>
          <el-input v-else v-model="form.username" placeholder="请输入账户" readonly style="width:200px;"></el-input>
        </el-form-item>
        <el-form-item v-if="dialogStatus == 'create'|dialogStatus == 'changePass'" label="密码" placeholder="请输入密码" prop="password" style="width:200px;">
          <el-input type="password" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item v-if="dialogStatus == 'changePass'" label="确认密码" placeholder="请输入密码" prop="confirmPassword" style="width:200px;">
          <el-input type="password" v-model="form.confirmPassword"></el-input>
        </el-form-item>
        <el-form-item v-if="dialogStatus !== 'changePass'" label="性别">
          <el-select class="filter-item" v-model="form.sex" placeholder="请选择">
            <el-option v-for="item in  sexOptions" :key="item" :label="item" :value="item"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="dialogStatus !== 'changePass'" label="描述">
          <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 5}" placeholder="请输入内容" v-model="form.description"> </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel('form')">取 消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="create('form')">确 定</el-button>
        <el-button v-else-if="dialogStatus == 'changePass'" type="primary" @click="updatePassword('form')">确 定</el-button>
        <el-button v-else type="primary" @click="update('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    page,
    pageExactly,
    addObj,
    getObj,
    delObj,
    putObj
  } from 'api/admin/user/index';
  import {
    page4out
  } from 'api/admin/tenant/index';
  import { mapGetters } from 'vuex';

  export default {
    name: 'user',
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.form.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        form: {
          approver: {
            baseOrgId: undefined,
            bizOrgId: undefined,
            realName: undefined,
            userId: undefined
          },
          username: undefined,
          name: undefined,
          sex: '男',
          password: undefined,
          description: undefined,
          tenantId: undefined
        },
        rules: {
          name: [
            {
              required: true,
              message: '请输入用户',
              trigger: 'blur'
            },
            {
              min: 2,
              max: 10,
              message: '长度在 2 到 10 个字符',
              trigger: 'blur'
            }
          ],
          confirmPassword: [
            {
              validator: validatePass,
              trigger: 'blur'
            }
          ],
          username: [
            {
              required: true,
              message: '请输入账户',
              trigger: 'blur'
            },
            {
              min: 3,
              max: 20,
              message: '长度在 3 到 20 个字符',
              trigger: 'blur'
            }
          ],
          password: [
            {
              required: true,
              message: '请输入密码',
              trigger: 'blur'
            },
            {
              min: 5,
              max: 20,
              message: '长度在 5 到 20 个字符',
              trigger: 'blur'
            }
          ]
        },
        list: null,
        total: null,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 20,
          name: undefined
        },
        companySearchLoading: false,
        companyList:[],
        sexOptions: ['男', '女'],
        dialogFormVisible: false,
        dialogStatus: '',
        userManager_btn_edit: false,
        userManager_btn_del: false,
        userManager_btn_add: false,
        textMap: {
          update: '编辑',
          create: '创建'
        },
        tableKey: 0
      }
    },
    created() {
      this.getList();
      this.userManager_btn_edit = this.elements['userManager:btn_edit'];
      this.userManager_btn_del = this.elements['userManager:btn_del'];
      this.userManager_btn_add = this.elements['userManager:btn_add'];
    },
    computed: {
      ...mapGetters([
        'elements'
      ])
    },
    components: { },
    methods: {
      getList() {
        this.listLoading = true;
        pageExactly(this.listQuery)
          .then(response => {
            this.list = response.data.rows;
            this.total = response.data.total;
            this.listLoading = false;
          })
      },
      handleFilter() {
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
      handleCreate() {
        this.resetTemp();
        this.dialogStatus = 'create';
        this.dialogFormVisible = true;
      },
      handleUpdate(row) {
        getObj(row.id)
          .then(response => {
            this.form = response.data;
            this.form.approver = {
              baseOrgId: undefined,
              bizOrgId: undefined,
              realName: undefined,
              userId: undefined
            };
            this.dialogFormVisible = true;
            this.dialogStatus = 'update';
          });
      },
      handleChangePass(row) {
        getObj(row.id)
          .then(response => {
            this.form = response.data;
            this.form.approver = {
              baseOrgId: undefined,
              bizOrgId: undefined,
              realName: undefined,
              userId: undefined
            };
            this.dialogFormVisible = true;
            this.dialogStatus = 'changePass';
          });
      },
      handleDelete(row) {
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            delObj(row.id)
              .then(() => {
                this.$notify({
                  title: '成功',
                  message: '删除成功',
                  type: 'success',
                  duration: 2000
                });
                const index = this.list.indexOf(row);
                this.list.splice(index, 1);
              });
          });
      },
      create(formName) {
        const set = this.$refs;
        set[formName].validate(valid => {
          if (valid) {
            addObj(this.form)
              .then(() => {
                this.dialogFormVisible = false;
                this.getList();
                this.$notify({
                  title: '成功',
                  message: '创建成功',
                  type: 'success',
                  duration: 2000
                });
              })
          } else {
            return false;
          }
        });
      },
      cancel(formName) {
        this.dialogFormVisible = false;
        this.$refs[formName].resetFields();
      },
      update(formName) {
        const set = this.$refs;
        set[formName].validate(valid => {
          if (valid) {
            this.dialogFormVisible = false;
            this.form.password = undefined;
            putObj(this.form.id, this.form).then(() => {
              this.dialogFormVisible = false;
              this.getList();
              this.$notify({
                title: '成功',
                message: '创建成功',
                type: 'success',
                duration: 2000
              });
            });
          } else {
            return false;
          }
        });
      },
      updatePassword(formName) {
        const set = this.$refs;
        set[formName].validate(valid => {
          if (valid) {
            this.dialogFormVisible = false;
            //        this.form.password = undefined;
            putObj(this.form.id, this.form).then(() => {
              this.dialogFormVisible = false;
              this.getList();
              this.$notify({
                title: '成功',
                message: '创建成功',
                type: 'success',
                duration: 2000
              });
            });
          } else {
            return false;
          }
        });
      },
      resetTemp() {
        this.form = {
          username: undefined,
          name: undefined,
          sex: '男',
          password: undefined,
          description: undefined
        };
      },
      companySearch(queryName) {
        if (queryName !== '') {
          this.companySearchLoading = true;
          const listQuery = {
            page: 1,
            limit: 999,
            companyName: queryName
          };
          page4out(listQuery).then(response => {
            this.companySearchLoading = false;
            if (response.status === 200) {
              this.companyList = response.data.datas;
            }
          });
        } else {
          this.companyList = [];
        }
      }
    }
  }
</script>
