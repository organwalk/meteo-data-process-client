<template>
  <el-row>
    <el-col :span="24">
      <el-card id="query-form" shadow="never">
        <el-collapse v-model="openCollapse" v-loading="loadingForm">
          <el-collapse-item name="queryForm">
            <template #title>
              <h2>{{ config.container.query.form.collapse_title }}</h2>
            </template>
            <br />
            <el-form :model="formData" label-width="100px">
              <el-form-item :label="config.container.query.form.label.station">
                <el-select v-model="formData.selectStation">
                  <el-option
                    v-for="item in stationList"
                    :key="item.station"
                    :label="item.name"
                    :value="item.station"
                  />
                </el-select>
              </el-form-item>
              <el-form-item :label="config.container.query.form.label.meteo_elements">
                <el-select
                  v-model="formData.selectMeteoElements"
                  multiple
                  style="width: 30vw"
                  placeholder="至少选择一个气象要素"
                >
                  <el-option
                    v-for="item in config.container.query.form.meteo_elements"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <el-form-item :label="config.container.query.form.label.time_elements">
                <el-row :gutter="25">
                  <el-col :xs="24" :sm="24" :md="12" :lg="11" :xl="11">
                    <el-date-picker
                      v-model="formData.date"
                      type="date"
                      value-format="YYYY-MM-DD"
                      :disabled-date="disabledDate"
                      :clearable="false"
                      @change="normalizeDate"
                    />
                  </el-col>
                  <el-col v-if="queryType === QUERY_TYPES.HOUR" :xs="24" :sm="24" :md="12" :lg="11" :xl="11">
                    <el-time-select
                      v-model="formData.hour"
                      start="00:00"
                      step="01:00"
                      end="23:00"
                      :clearable="false"
                    />
                  </el-col>
                  <el-col
                    v-if="queryType === QUERY_TYPES.DATE || queryType === QUERY_TYPES.CONDITION"
                    :xs="24"
                    :sm="24"
                    :md="12"
                    :lg="11"
                    :xl="11"
                    align="right"
                  >
                    <el-date-picker
                      v-model="formData.end_date"
                      type="date"
                      value-format="YYYY-MM-DD"
                      :disabled-date="disabledDate"
                      :clearable="false"
                      @change="normalizeEndDate"
                    />
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item
                v-if="queryType === QUERY_TYPES.CONDITION"
                :label="config.container.query.form.label.condition"
              >
                <el-button plain :color="editTipButtonColor" @click="openEditDialog" v-buttonAutoLoseFocus>
                  {{ editTip }}
                </el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" style="width: 10vw" @click="query" v-buttonAutoLoseFocus>
                  查询
                </el-button>
              </el-form-item>
            </el-form>
          </el-collapse-item>
        </el-collapse>
      </el-card>
    </el-col>
  </el-row>
  <br />

  <el-dialog
    v-model="editVisible"
    title="填写气象要素范围"
    width="45%"
    :show-close="false"
    style="border-radius: 10px; padding: 20px;"
  >
    <el-row :gutter="15">
      <el-form v-for="item in editData.fields" :key="item.value">
        <el-form-item :label="`${item.label}范围`">
          <el-row>
            <el-col :span="11">
              <el-input-number
                v-model="editData.startValues[`start_${CONDITION_FIELD_KEY_MAP[item.value]}`]"
                :controls="false"
                size="small"
              />
            </el-col>
            <el-col :span="2" align="center">
              <span>&nbsp;~</span>
            </el-col>
            <el-col :span="11">
              <el-input-number
                v-model="editData.endValues[`end_${CONDITION_FIELD_KEY_MAP[item.value]}`]"
                :controls="false"
                size="small"
              />
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </el-row>
    <template #footer>
      <el-button @click="cancelEdit" v-buttonAutoLoseFocus>取消</el-button>
      <el-button type="primary" @click="confirmEdit" v-buttonAutoLoseFocus>确认</el-button>
    </template>
  </el-dialog>

  <query-form-table
    v-if="isQuery"
    :table-data="tableData"
    :table-header="tableHeader"
    :loading-table="loadingTable"
    :total="total"
    @get-page-number="getPageNumber"
  />
</template>

<script setup>
import { ref } from 'vue'
import config from '@/config/main-page-config.json'
import QueryFormTable from '@/components/body/main-pages/container/query/query-form-table.vue'
import { useMainQuery } from '@/composables/useMainQuery'
import { CONDITION_FIELD_KEY_MAP } from '@/modules/query/query-helpers'

const openCollapse = ref('queryForm')
const {
  QUERY_TYPES,
  loadingForm,
  loadingTable,
  isQuery,
  editVisible,
  editTip,
  editTipButtonColor,
  tableHeader,
  tableData,
  total,
  formData,
  editData,
  queryType,
  stationList,
  disabledDate,
  normalizeDate,
  normalizeEndDate,
  openEditDialog,
  cancelEdit,
  confirmEdit,
  query,
  getPageNumber,
} = useMainQuery()
</script>

<style scoped>
#query-form {
  border-radius: 5px;
  font-family: 'Microsoft YaHei', serif;
  user-select: none;
}

:deep(.el-collapse) {
  --el-collapse-border-color: #ffffff;
}
</style>
