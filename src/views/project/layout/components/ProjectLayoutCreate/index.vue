<template>
  <div @click="clickHandle(ChartEnum.CHART_HOME_NAME)">
    <n-tooltip v-if="collapsed" placement="right" trigger="hover">
      <template #trigger>
        <n-button ghost type="primary" size="small">
          <template #icon>
            <n-icon>
              <DuplicateOutlineIcon v-show="designStore.getDarkTheme"></DuplicateOutlineIcon>
              <DuplicateIcon v-show="!designStore.getDarkTheme"></DuplicateIcon>
            </n-icon>
          </template>
        </n-button>
      </template>
      <span>
        {{ $t('project.create_btn') }}
      </span>
    </n-tooltip>
    <n-button v-else ghost type="primary">
      <template #icon>
        <n-icon>
          <DuplicateOutlineIcon v-show="designStore.getDarkTheme"></DuplicateOutlineIcon>
          <DuplicateIcon v-show="!designStore.getDarkTheme"></DuplicateIcon>
        </n-icon>
      </template>
      <span>
        {{ $t('project.create_btn') }}
      </span>
    </n-button>
  </div>
<!--  <CreateModal :show="modalShow" @close="closeHandle"></CreateModal>-->
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useDesignStore } from '@/store/modules/designStore/designStore'
// import { CreateModal } from './components/CreateModal/index'
import { icon } from '@/plugins'
import { ChartEnum } from '@/enums/pageEnum'
import { ResultEnum } from '@/enums/httpEnum'
import { fetchPathByName, routerTurnByPath, getUUID } from '@/utils'
import { createProjectApi } from '@/api/path'
const emit = defineEmits(['close'])

const { DuplicateIcon, DuplicateOutlineIcon } = icon.ionicons5
const designStore = useDesignStore()

const props = defineProps({
  collapsed: Boolean
})

// const modalShow = ref<boolean>(false)

const clickHandle = async (key: string) => {
  // modalShow.value = true
  // 处理按钮点击
    switch (key) {
      case ChartEnum.CHART_HOME_NAME:
        try {
          // 新增项目
          const res = await createProjectApi({
            // 项目名称
            projectName: getUUID(),
            // remarks
            remarks: null,
            // 图片地址
            indexImage: null,
          })
          if(res && res.code === ResultEnum.SUCCESS) {
            window['$message'].success(window['$t']('project.create_success'))

            const { id } = res.data
            const path = fetchPathByName(ChartEnum.CHART_HOME_NAME, 'href')
            routerTurnByPath(path, [id], undefined, true)
            closeHandle()
          }
        } catch (error) {
          window['$message'].error(window['$t']('project.create_failure'))
        }
        break;
    }
}

// 关闭对话框
const closeHandle = () => {
  emit('close', false)
}

// const closeHandle = () => {
//   modalShow.value = false
// }
</script>
