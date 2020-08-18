<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <p>通用配置</p>
      <div>
        <div class="filter-container" style="width: 100%;height: 550px;background-color: #F8F8F8;margin-top:20px;border-top: 1.5px solid #1EA2FF;border-bottom: 1.5px solid #ECEBE9;">
          <div align="left" style="margin-left: 50px">
            <el-form ref="form" style="margin-top: 35px" label-width="160px" class="demo-ruleForm">
              <el-form-item label="请选择类型：">
                <el-cascader
                  :options="generalConfigCategoryList"
                  v-model="selectedOptions"
                  @change="handChange($event)">
                </el-cascader>
              </el-form-item>
              <span v-if="generalConfiguratioList.length>0">
                <el-form-item v-for="(item,index) in generalConfiguratioList" :label="item.keyName">
                  <span v-if="item.configType == 1">
                    <el-switch
                      v-model="item.value"
                      active-text="是"
                      inactive-text="否">
                    </el-switch>
                  </span>
                  <span v-if="item.configType == 2">
                    <el-select placeholder="请选择" v-model="item.value">
                      <el-option v-for="gitem in generalConfigurationMappingList" v-if="gitem.generalConfigurationId == item.id" :label="gitem.optionName" :value="gitem.optionValue"> </el-option>
                    </el-select>
                  </span>
                </el-form-item>
              </span>
              <el-form-item>
                <el-button type="primary" @click="save()">保存</el-button>
                <el-button>取消</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { selectGeneralConfigCategoryList, getGeneralConfiguratioList, selectGeneralConfigurationMapping, saveGeneralConfiguration } from 'api/admin/generalConfigCategory/index';
  export default {
    name: 'generalConfiguration',
    data() {
      return {
        resultForList: [],
        generalConfigCategoryList: [],
        generalConfiguratioList: [],
        categoryId: undefined,
        selectedOptions: undefined,
        generalConfigurationMappingList: [],
        generalConfigurationIds: '',
        queryList: []
      }
    },
    created() {
      this.getGeneralConfigCategoryList();
    },
    methods: {
      getGeneralConfigCategoryList() {
        selectGeneralConfigCategoryList()
          .then(response => {
            this.generalConfigCategoryList = response.data;
          })
      },
      handChange(event) {
        let i = event.length - 1;
        this.categoryId = event[i];
        this.getGeneralConfiguratioList();
      },
      getGeneralConfiguratioList() {
        getGeneralConfiguratioList(this.categoryId)
          .then(response => {
            this.generalConfiguratioList = this.handleGeneralConfiguratioList(response.data);
            let ids = this.generalConfigurationIds.substring(0, this.generalConfigurationIds.length - 1);
            this.selectGeneralConfigurationMapping(ids)
          })
      },
      handleGeneralConfiguratioList(array) {
        return array.map(item => {
          const obj = { id: undefined, category: undefined, categoryName: undefined, subCategory: undefined, subCategoryName: undefined, configType: undefined, keyValue: undefined, keyName: undefined, value: undefined, categoryId: undefined };
          obj.id = item.id;
          if (item.id != null) {
            this.generalConfigurationIds += item.id + ',';
          }
          obj.category = item.category;
          obj.categoryName = item.categoryName;
          obj.subCategory = item.subCategory;
          obj.subCategoryName = item.subCategoryName;
          obj.keyName = item.keyName;
          obj.keyValue = item.keyValue;
          obj.categoryId = item.categoryId;
          obj.configType = item.configType;
          if (item.value == '0' || item.value == null) {
            obj.value = false;
          } else if (item.value == '1') {
            obj.value = true;
          } else {
            obj.value = item.value;
          }
          return obj;
        });
      },
      selectGeneralConfigurationMapping(generalConfigurationIds) {
        selectGeneralConfigurationMapping(generalConfigurationIds)
          .then(response => {
            this.generalConfigurationMappingList = response.data;
          })
      },
      handleQueryList(array) {
        return array.map(item => {
          const obj = { id: undefined, value: undefined };
          obj.id = item.id;
          if (item.value === true) {
            obj.value = 1;
          } else if (item.value === false) {
            obj.value = true;
          } else {
            obj.value = item.value;
          }
          return obj;
        });
      },
      save() {
        this.queryList = this.handleQueryList(this.generalConfiguratioList);
        saveGeneralConfiguration(this.queryList)
          .then(response => {
            if (response.data > 0) {
              this.$message({
                message: '保存成功！！！',
                type: 'success'
              });
            } else {
              this.$message.error('保存失败！！！');
            }
          })
      }
    }
  }
</script>
