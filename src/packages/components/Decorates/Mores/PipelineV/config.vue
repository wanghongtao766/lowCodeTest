<template>
  <CollapseItem name="管道" :expanded="true">
    <SettingItemBox name="默认颜色">
      <SettingItem>
        <n-select v-model:value="optionData.color_type" :options="colorOptions" @update:value="handleColorChange" />
      </SettingItem>
    </SettingItemBox>
    <SettingItemBox name="管道颜色">
      <SettingItem>
        <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.o_color"></n-color-picker>
      </SettingItem>
    </SettingItemBox>
    <SettingItemBox name="水流颜色">
      <SettingItem>
        <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.i_color"></n-color-picker>
      </SettingItem>
    </SettingItemBox>
    <SettingItemBox name="正常流向">
      <SettingItem>
        <n-select v-model:value="optionData.line_class" :options="options" clearable/>
      </SettingItem>
    </SettingItemBox>
    <SettingItemBox name="点位类型">
      <SettingItem>
        <div style="width: 260px">
          <n-select v-model:value="optionData.pointType" :options="pointTypeList" @change="handlepointTypeListChange" filterable/>
        </div>
      </SettingItem>
    </SettingItemBox>
    <div v-if="optionData.pointType==='s'">
    <SettingItemBox name="所属设备">
      <SettingItem>
        <div style="width: 260px">
          <n-select v-model:value="optionData.deviceId" :options="deviceList" @change="handlepropertyListChange" clearable filterable/>
        </div>
      </SettingItem>
    </SettingItemBox>
    <SettingItemBox name="选择数据">
      <SettingItem>
        <div style="width: 260px">
        <n-select v-model:value="optionData.property" :options="propertyList" clearable filterable/>
        </div>
      </SettingItem>
    </SettingItemBox>
      <SettingItemBox name="编号">
        <SettingItem>
          <n-input-number :min="1" v-model:value="optionData.deviceCode"/>
        </SettingItem>
      </SettingItemBox>
    </div>
    <div v-if="optionData.pointType==='j'">
      <SettingItemBox name="所属设备">
        <SettingItem>
          <div style="width: 260px">
            <n-select v-model:value="optionData.deviceId2" :options="deviceList2" clearable filterable/>
          </div>
        </SettingItem>
      </SettingItemBox>
      <SettingItemBox name="编号">
        <SettingItem>
          <n-input-number :min="1" v-model:value="optionData.deviceCode2"/>
        </SettingItem>
      </SettingItemBox>
    </div>
  </CollapseItem>
</template>

<script setup lang="ts">
import {onMounted, PropType, ref} from 'vue'
import { CollapseItem, SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'
import { option } from './config'
import {getRealTimeData, listDevice,listDevice2} from "@/api/path";

const props = defineProps({
  optionData: {
    type: Object as PropType<typeof option>,
    required: true
  }
})

const options = ref([
  {
    value: 'svg_ani_flow',
    label: '正向'
  },
  {
    value: 'svg_ani_flow_back',
    label: '反向'
  },
  {
    value: 'svg_ani_flow_stop',
    label: '停止'
  }
])

const colorOptions = ref([
  {
    value: 1,
    label: '蓝'
  },
  {
    value: 2,
    label: '黄'
  }
])

// 默认颜色
const handleColorChange = (e: number) => {
  switch (e) {
    case 1:
      props.optionData.o_color = '#0a7ae2'
      props.optionData.i_color = '#119bfa'
      break
    case 2:
      props.optionData.o_color = '#ff9d00'
      props.optionData.i_color = '#f7ea37'
      break
  }
}

const deviceList = ref([]);
const deviceList2 = ref([]);
const propertyList = ref([]);
const pointTypeList = ref([
  {
    value:'s',
    label:'设备点'
  },
  {
    value:'j',
    label:'计算点'
  }
]);

/** 初始化设备数据 */
const handlepointTypeListChange = async (data) => {
  props.optionData.pointType = data;
  if(data==='s'){
    props.optionData.deviceId2 =''
  }
  if(data==='j'){
    props.optionData.deviceId =''
    props.optionData.property =''
    props.optionData.imageStatus =''
  }
  await initDeviceList();
  await initDeviceList2();
}

/** 初始化设备数据 */
const initDeviceList = async () => {
  let params = {
    pageNum: 1,
    pageSize: 100000
  };
  const { rows } = await listDevice(params);

  deviceList.value = rows.map(e => {
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

/** 节点单击事件设备*/
const handlepropertyListChange = async(data,p) => {
  props.optionData.deviceId = data;
  if(p!=='1'){
    props.optionData.property =''
  }
  const res = await getRealTimeData([data]);
  propertyList.value = []
  res.data[0].pointInfo.map(item => {
    propertyList.value.push({
      value: item.identifier,
      label: item.name
    })
  });
};

/** 初始化计算数据 */
const initDeviceList2 = async () => {
  let params = {
    pageNum: 1,
    pageSize: 100000
  };
  const { rows } = await listDevice2(params);

  deviceList2.value = rows.map(e => {
    const { id, name } = e
    return {
      value: id,
      label: name
    }
  })
};

onMounted(() => {
  if(!props.optionData.pointType){
    props.optionData.pointType = 's'
  }
  if(!props.optionData.deviceCode){
    props.optionData.deviceCode = 1
  }
  if(!props.optionData.deviceCode2){
    props.optionData.deviceCode2 = 1
  }
  handlepointTypeListChange(props.optionData.pointType)
});
</script>
