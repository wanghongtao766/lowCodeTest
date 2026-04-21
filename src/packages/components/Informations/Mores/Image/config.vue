<template>
  <collapse-item name="属性" :expanded="true">
    <setting-item-box name="路径" :alone="true">
      <setting-item>
        <n-input v-model:value="optionData.dataset" size="small"></n-input>
      </setting-item>
    </setting-item-box>
    <setting-item-box name="样式">
      <setting-item name="类型">
        <n-select
          v-model:value="optionData.fit"
          size="small"
          :options="fitList"
        ></n-select>
      </setting-item>
      <setting-item name="圆角">
        <n-input-number
          v-model:value="optionData.borderRadius"
          size="small"
          :min="0"
          placeholder="圆角"
        ></n-input-number>
      </setting-item>
    </setting-item-box>
    <SettingItemBox name="所属设备">
      <SettingItem>
        <div style="width: 260px">
          <n-select v-model:value="optionData.deviceId" :options="deviceList" @update:value="handlepropertyListChange" clearable filterable/>
        </div>
      </SettingItem>
    </SettingItemBox>

    <!-- 准备注释的 -->
    <!-- <SettingItemBox name="选择数据">
      <SettingItem>
        <div style="width: 260px">
        <n-select v-model:value="optionData.property" :options="propertyList" clearable filterable/>
        </div>
      </SettingItem>
    </SettingItemBox> -->
    
    <SettingItemBox name="弹窗开关">
      <SettingItem>
        <n-select v-model:value="optionData.imageStatus" :options="imageStatusList" clearable/>
      </SettingItem>
    </SettingItemBox>
  </collapse-item>
</template>

<script setup lang="ts">
import {onMounted, PropType, ref} from 'vue'
import { option } from './config'
import {
  CollapseItem,
  SettingItemBox,
  SettingItem,
} from '@/components/Pages/ChartItemSetting'
import {getRealTimeData, listDevice} from "@/api/path";

const props = defineProps({
  optionData: {
    type: Object as PropType<typeof option>,
    required: true,
  },
})

// 适应类型
const fitList = [
  {
    value: 'fill',
    label: 'fill'
  },
  {
    value: 'contain',
    label: 'contain'
  },
  {
    value: 'cover',
    label: 'cover'
  },
  {
    value: 'scale-down',
    label: 'scale-down'
  },
  {
    value: 'none',
    label: 'none'
  },
]

const deviceList = ref([]);
const propertyList: any = ref([]);
const imageStatusList = ref([
  {
    value:'0',
    label:'关'
  },
  {
    value:'1',
    label:'开'
  }
]);
/** 初始化设备数据 */
const initDeviceList = async () => {
  let params = {
    pageNum: 1,
    pageSize: 100000
  };

  // @ts-ignore
  const { rows } = await listDevice(params);

  deviceList.value = rows.map((e: any) => {
    const { id, name } = e
    return {
      value: id,
      label: name
    }
  })
  if(props.optionData.deviceId){
    handlepropertyListChange(props.optionData.deviceId,'1')
  }
};

// 所属设备选择变更
const handlepropertyListChange = async(data: any, p?: any) => {
  props.optionData.deviceId = data;
  if(p!=='1'){
    props.optionData.property =''
    props.optionData.imageStatus =''
  }
  const res: any = await getRealTimeData([data]);
  propertyList.value = []
  res.data[0].pointInfo.map((item: any) => {
    propertyList.value.push({
      value: item.identifier,
      label: item.name
    })
  });
};

onMounted(() => {
  initDeviceList();
});
</script>
