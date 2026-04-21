<template>
  <n-space vertical>
    <div style="width: 600px">
      <n-tabs v-model:value="requestContentType" type="segment" size="small">
        <n-tab :name="RequestContentTypeEnum.DEFAULT" tab="普通请求"> </n-tab>
        <n-tab :name="RequestContentTypeEnum.SQL" tab="SQL 请求"> </n-tab>
      </n-tabs>
    </div>
    <div v-show="requestContentType === RequestContentTypeEnum.DEFAULT">
      <n-tabs type="line" animated v-model:value="tabValue">
        <n-tab v-for="item in RequestParamsTypeEnum" :key="item" :name="item" :tab="item"> {{ item }} </n-tab>
      </n-tabs>

      <!-- 各个页面 -->
      <div class="go-mt-3">
        <div v-if="tabValue !== RequestParamsTypeEnum.BODY">
          <request-header-table :target="requestParams[tabValue]" @update="updateRequestParams"></request-header-table>
        </div>

        <!-- 选择了 body -->
        <div v-else>
          <n-radio-group v-model:value="requestParamsBodyType" name="radiogroup">
            <n-space>
              <n-radio v-for="bodyEnum in RequestBodyEnumList" :key="bodyEnum" :value="bodyEnum">
                {{ bodyEnum }}
              </n-radio>
            </n-space>
          </n-radio-group>

          <!-- 为 none 时 -->
          <n-card class="go-mt-3 go-pb-3" v-if="requestParamsBodyType === RequestBodyEnum['NONE']">
            <n-text depth="3">该接口没有 Body 体</n-text>
          </n-card>

          <!-- 具有对象属性时 -->
          <template
            v-else-if="
              requestParamsBodyType === RequestBodyEnum['FORM_DATA'] ||
              requestParamsBodyType === RequestBodyEnum['X_WWW_FORM_URLENCODED']
            "
          >
            <request-header-table
              class="go-mt-3"
              :target="requestParams[RequestParamsTypeEnum.BODY][requestParamsBodyType]"
              @update="updateRequestBodyTable"
            ></request-header-table>
          </template>

          <!-- json  -->
           <template v-else-if="requestParamsBodyType === RequestBodyEnum['JSON']">
            <n-select
              class="go-mt-3"
              v-model:value="requestParams[RequestParamsTypeEnum.BODY][requestParamsBodyType]"
              :options="jsonOptions"
              filterable
              placeholder="请选择设备点位"
              style="width: 600px;"
            />
          </template>

          <!-- 原来 -->
          <!-- <template v-else-if="requestParamsBodyType === RequestBodyEnum['JSON']">
            <monaco-editor
              v-model:modelValue="requestParams[RequestParamsTypeEnum.BODY][requestParamsBodyType]"
              width="600px"
              height="200px"
              language="json"
            />
          </template> -->

          

          <!-- xml  -->
          <template v-else-if="requestParamsBodyType === RequestBodyEnum['XML']">
            <monaco-editor
              v-model:modelValue="requestParams[RequestParamsTypeEnum.BODY][requestParamsBodyType]"
              width="600px"
              height="200px"
              language="html"
            />
          </template>
        </div>
      </div>
    </div>
    <div v-show="requestContentType === RequestContentTypeEnum.SQL">
      <template v-if="requestHttpType === RequestHttpEnum.GET">
        <n-text>SQL 类型不支持 Get 请求，请使用其它方式</n-text>
      </template>
      <template v-else>
        <n-tag type="warning">需要后台提供专门处理 sql 的接口</n-tag>
        <setting-item-box name="键名">
          <n-tag type="primary" :bordered="false" style="width: 40px; font-size: 16px"> sql </n-tag>
        </setting-item-box>
        <setting-item-box name="键值">
          <monaco-editor v-model:modelValue="requestSQLContent['sql']" width="600px" height="200px" language="sql" />
        </setting-item-box>
      </template>
    </div>
  </n-space>
</template>

<script setup lang="ts">
import { ref, toRefs, PropType, onMounted, watch } from 'vue'
import { MonacoEditor } from '@/components/Pages/MonacoEditor'
import { RequestHeaderTable } from '../RequestHeaderTable/index'
import { SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'
import { useTargetData } from '@/views/chart/ContentConfigurations/components/hooks/useTargetData.hook'
import { RequestConfigType } from '@/store/modules/chartEditStore/chartEditStore.d'
import {
  RequestParamsTypeEnum,
  RequestContentTypeEnum,
  RequestParamsObjType,
  RequestBodyEnumList,
  RequestBodyEnum,
  RequestHttpEnum
} from '@/enums/httpEnum'
import { listDevice, listDevice2 } from '@/api/path/project.api'


const props = defineProps({
  targetDataRequest: Object as PropType<RequestConfigType>,
  requestUrl: {
    type: String,
    default: ''
  }
})

const { requestHttpType, requestContentType, requestSQLContent, requestParams, requestParamsBodyType } = toRefs(
  props.targetDataRequest as RequestConfigType
)

const tabValue = ref<RequestParamsTypeEnum>(RequestParamsTypeEnum.PARAMS)

const jsonOptions = ref<{label: string, value: any}[]>([])

// 更新参数表格数据
const updateRequestParams = (paramsObj: RequestParamsObjType) => {
  if (tabValue.value !== RequestParamsTypeEnum.BODY) {
    requestParams.value[tabValue.value] = paramsObj
  }
}

// 更新参数表格数据
const updateRequestBodyTable = (paramsObj: RequestParamsObjType) => {
  if (
    tabValue.value === RequestParamsTypeEnum.BODY &&
    // 仅有两种类型有 body
    (requestParamsBodyType.value === RequestBodyEnum.FORM_DATA ||
      requestParamsBodyType.value === RequestBodyEnum.X_WWW_FORM_URLENCODED)
  ) {
    requestParams.value[RequestParamsTypeEnum.BODY][requestParamsBodyType.value] = paramsObj
  }
}

// 设备点
const fetchDeviceOptions = async () => {
  console.log('调用设备点');
  try {
    const res: any = await listDevice({ pageSize: 10000, pageNum: 1 })
    const rows = res?.rows
    // console.log('rows', rows)
    // console.log('res', res)
    
    if (rows && Array.isArray(rows)) {
      const options: {label: any, value: any}[] = []
      rows.forEach((item: any) => {
        if (item.pointInfo && Array.isArray(item.pointInfo)) {
          item.pointInfo.forEach((item2: any) => {
            options.push({
              label: item.name + '-' + item2.name,
              value: JSON.stringify({ properties: [item2.identifier], deviceId: item.id })
            })
          })
        }
      })
      jsonOptions.value = options
    }
  } catch (error) {
    console.error('Failed to fetch device list:', error)
  }
  // const obj = {
  //   "deviceId": "1848922911777587202",
  //   "properties": ["pressure_value"]
  // }
}

// 计算点
const fetchComputedOptions = async () => {
  console.log('调用计算点');
  
  try {
    const res: any = await listDevice2({ pageSize: 10000, pageNum: 1 })
    const rows = res?.rows
    // console.log('rows', rows)
    // console.log('res', res)
    
    if (rows && Array.isArray(rows)) {
      const options: {label: any, value: any}[] = []
      rows.forEach((item: any) => {
        options.push({
          label: item.name,
          value: JSON.stringify({ configId: item.id })
        })

      })
      jsonOptions.value = options
    }
  } catch (error) {
    console.error('Failed to fetch device list:', error)
  }

  // const obj = {
  //   "deviceId": "1848922911777587202",
  //   "properties": ["pressure_value"]
  // }
}

// 监听 props.requestUrl 变化
watch(
  () => props.requestUrl,
  (newVal) => {
    console.log(newVal, 'newVal');
    // @ts-ignore
    requestParams.value[RequestParamsTypeEnum.BODY][requestParamsBodyType.value] = ' '
    if (newVal === '/compute/config/computeValueForSystem') {  // 计算点
      fetchComputedOptions()
    } else { // 设备点
      fetchDeviceOptions()
    }
  },
  // {
  //   immediate: true
  // }
)


onMounted(() => {
  if (props.requestUrl === '/compute/config/computeValueForSystem') {  // 计算点
    fetchComputedOptions()
  } else { // 设备点
    fetchDeviceOptions()
  }
  // fetchDeviceOptions()
  // fetchComputedOptions()
})
</script>

<style lang="scss" scoped>
.select-type {
  width: 300px;
}
</style>
