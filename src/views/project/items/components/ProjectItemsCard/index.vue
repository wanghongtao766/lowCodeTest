<template>
  <div v-if="cardData" class="go-items-list-card">
    <n-card hoverable size="small">
      <div class="list-content">
        <!-- 顶部按钮 -->
        <div class="list-content-top">
          <mac-os-control-btn
            class="top-btn"
            :hidden="['remove']"
            @close="deleteHandle"
            @resize="resizeHandle"
         ></mac-os-control-btn>
        </div>
        <!-- 中间 -->
        <div class="list-content-img" @click="resizeHandle">
          <n-image
            object-fit="contain"
            height="180"
            preview-disabled
            :src="`${cardData.image}?time=${new Date().getTime()}`"
            :alt="cardData.title"
            :fallback-src="requireErrorImg()"
         ></n-image>
        </div>
      </div>
      <template #action>
        <div class="go-flex-items-center list-footer" justify="space-between">
          <n-text class="go-ellipsis-1">
            {{ cardData.title || cardData.id || '未命名' }}
          </n-text>
          <!-- 工具 -->
          <div class="go-flex-items-center list-footer-ri">
            <n-space>
              <n-text>
                <n-badge
                  class="go-animation-twinkle"
                  dot
                  :color="cardData.release ? '#34c749' : '#fcbc40'"
              ></n-badge>
                {{
                  cardData.release
                    ? $t('project.release')
                    : $t('project.unreleased')
                }}
              </n-text>

              <template v-for="item in fnBtnList" :key="item.key">
                <template v-if="item.key === 'select'">
                  <n-dropdown
                    trigger="hover"
                    placement="bottom"
                    :options="selectOptions"
                    :show-arrow="true"
                    @select="handleSelect"
                  >
                    <n-button size="small">
                      <template #icon>
                        <component :is="item.icon"></component>
                      </template>
                    </n-button>
                  </n-dropdown>
                </template>

                <n-tooltip v-else placement="bottom" trigger="hover">
                  <template #trigger>
                    <n-button size="small" @click="handleSelect(item.key)">
                      <template #icon>
                        <component :is="item.icon"></component>
                      </template>
                    </n-button>
                  </template>
                  <component :is="item.label"></component>
                </n-tooltip>

              </template>
            </n-space>
          <!-- end -->
          </div>
        </div>
      </template>
    </n-card>
  </div>
  <!-- 弹窗 -->
  <n-modal class="go-chart-data-monaco-editor" v-model:show="showModal" :mask-closable="false" :closeOnEsc="false">
    <n-card :bordered="false" role="dialog" size="small" aria-modal="true" style="width: 400px; height: 400px">
      <template #header>
        <n-space>
          <n-text>挂载配置</n-text>
        </n-space>
      </template>
      <template #header-extra> </template>
      <n-space size="small" vertical>
        <n-space justify="space-between">
          <n-scrollbar style="max-height: 280px">
            <setting-item-box name="所属菜单" :alone="true">
              <n-select v-model:value="cardData.projectType"  :options="projectTypeOptions" placeholder="请选择所属菜单" clearable/>
            </setting-item-box>
            <setting-item-box name="子菜单" :alone="true">
              <n-select v-model:value="cardData.childProjectName"  :options="projectChildOptions" placeholder="请选择子菜单" clearable/>
            </setting-item-box>

            <setting-item-box name="暗色亮色" :alone="true">
              <n-select v-model:value="cardData.color"  :options="themeOptions" placeholder="请选择暗亮色" clearable/>
            </setting-item-box>
            <setting-item-box name="项目名称" :alone="true">
                <n-input
                    size="small"
                    type="text"
                    maxlength="16"
                    show-count
                    placeholder="请输入项目名称"
                    v-model:value.trim="cardData.projectName"
                ></n-input>
            </setting-item-box>
            <setting-item-box name="项目排序" :alone="true">
                <n-input-number
                    v-model:value.trim="cardData.sort"
                    class="select-time-number"
                    min="1"
                    placeholder="请输入项目排序"
                >
                </n-input-number>
            </setting-item-box>
            <setting-item-box name="请求名称" :alone="true" style="display: none">
              <n-input size="small" :placeholder="pondData?.dataPondName || '暂无'" :disabled="true">
              </n-input>
            </setting-item-box>

          </n-scrollbar>
        </n-space>
      </n-space>
      <template #action>
        <n-space justify="space-between">
          <n-space></n-space>
          <n-space>
            <n-button size="medium" @click="closeFilter">取消</n-button>
            <n-button size="medium" type="primary" @click="saveFilter">保存</n-button>
          </n-space>
        </n-space>
      </template>
    </n-card>
  </n-modal>
</template>

<script setup lang="ts">
import {reactive, ref, PropType, watch, watchEffect} from 'vue'
import { httpErrorHandle, renderIcon, renderLang, requireErrorImg, toString} from '@/utils'
import { icon } from '@/plugins'
import { MacOsControlBtn } from '@/components/Tips/MacOsControlBtn'
import { Chartype } from '../../index.d'
import { ResultEnum } from '@/enums/httpEnum'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { ProjectInfoEnum } from '@/store/modules/chartEditStore/chartEditStore.d'
import { updateProjectApi } from '@/api/path'
import { useSync } from '@/views/chart/hooks/useSync.hook'
import {SettingItemBox} from "@/components/Pages/ChartItemSetting";

const {
  EllipsisHorizontalCircleSharpIcon,
  CopyIcon,
  TrashIcon,
  PencilIcon,
  DownloadIcon,
  BrowsersOutlineIcon,
  HammerIcon,
  SendIcon
} = icon.ionicons5

const emit = defineEmits(['preview', 'delete', 'resize', 'edit', 'release'])

const props = defineProps({
  cardData: Object as PropType<Chartype>
})

const fnBtnList = reactive([
  {
    label: renderLang('global.r_edit'),
    key: 'edit',
    icon: renderIcon(HammerIcon)
  },
  {
    lable: renderLang('global.r_more'),
    key: 'select',
    icon: renderIcon(EllipsisHorizontalCircleSharpIcon)
  }
])

const selectOptions = ref([
  {
    label: renderLang('global.r_edit_sim'),
    key: 'editSim',
    icon: renderIcon(HammerIcon)
  },
  {
    label: renderLang('global.r_preview'),
    key: 'preview',
    icon: renderIcon(BrowsersOutlineIcon)
  },
  {
    label: props.cardData?.release
      ? renderLang('global.r_unpublish')
      : renderLang('global.r_publish'),
    key: 'release',
    icon: renderIcon(SendIcon)
  },
  {
    label: renderLang('global.r_delete'),
    key: 'delete',
    icon: renderIcon(TrashIcon)
  }
])

const handleSelect = (key: string) => {
  switch (key) {
    case 'editSim':
      editSimHandle()
      break
    case 'preview':
      previewHandle()
      break
    case 'delete':
      deleteHandle()
      break
    case 'release':
      releaseHandle()
      break
    case 'edit':
      editHandle()
      break
  }
}

// 预览处理
const previewHandle = () => {
  emit('preview', props.cardData)
}

// 删除处理
const deleteHandle = () => {
  emit('delete', props.cardData)
}

// 编辑处理
const editHandle = () => {
  emit('edit', props.cardData)
}

// 编辑处理
const releaseHandle = () => {
  emit('release', props.cardData)
}

// 放大处理
const resizeHandle = () => {
  emit('resize', props.cardData)
}

// 受控弹窗
const showModal = ref(false)
const chartEditStore = useChartEditStore()
const { dataSyncUpdate } = useSync()

const projectTypeOptions = ref([
  {
    label: '首页',
    value: 'home',
  },
  {
    label: '空调系统',
    value: 'energyStation',
  }
])

const projectChildOptions = ref([
  {
    label: '冷源',
    value: '冷源',
  },
  {
    label: '末端',
    value: '末端',
  }
])

const themeOptions = ref([
  {
    label: '暗色',
    value: 'dark',
  },
  {
    label: '亮色',
    value: 'light',
  }
])

// 简易编辑
const editSimHandle = () => {
  showModal.value = true
  console.log(props.cardData);
}


// 关闭简易编辑
const closeFilter = () => {
  showModal.value = false
}

// 新增简易编辑
const saveFilter = async() => {
  chartEditStore.setProjectInfo(ProjectInfoEnum.PROJECT_NAME, props.cardData || '')
  const res = (await updateProjectApi(props.cardData))
  if (res && res.code === ResultEnum.SUCCESS) {
    dataSyncUpdate()
  } else {
    httpErrorHandle()
  }
  closeFilter()
}


</script>

<style lang="scss" scoped>
$contentHeight: 180px;
@include go('items-list-card') {
  position: relative;
  border-radius: $--border-radius-base;
  border: 1px solid rgba(0, 0, 0, 0);
  @extend .go-transition;
  &:hover {
    @include hover-border-color('hover-border-color');
  }
  .list-content {
    margin-top: 20px;
    margin-bottom: 5px;
    cursor: pointer;
    border-radius: $--border-radius-base;
    @include background-image('background-point');
    @extend .go-point-bg;
    &-top {
      position: absolute;
      top: 10px;
      left: 10px;
      height: 22px;
    }
    &-img {
      height: $contentHeight;
      @extend .go-flex-center;
      @extend .go-border-radius;
      @include deep() {
        img {
          @extend .go-border-radius;
        }
      }
    }
  }
  .list-footer {
    flex-wrap: nowrap;
    justify-content: space-between;
    line-height: 30px;
    &-ri {
      justify-content: flex-end;
      min-width: 180px;
    }
  }
}
</style>
