import { defineStore } from 'pinia'
import { theme } from '@/settings/designSetting'
import { DesignStateType, AppThemeColorType } from './designStore.d'
import { setLocalStorage, getLocalStorage } from '@/utils'
import { StorageEnum } from '@/enums/storageEnum'
import { ThemeEnum } from '@/enums/styleEnum'
import { useChartHistoryStore } from '@/store/modules/chartHistoryStore/chartHistoryStore'

const { GO_DESIGN_STORE } = StorageEnum

const { darkTheme, appTheme, appThemeDetail } = theme

const storageDesign = getLocalStorage(GO_DESIGN_STORE)

export const useDesignStore = defineStore({
  id: 'useDesignStore',
  state: () =>
    storageDesign || {
      // 是否暗黑
      darkTheme,
      // 主题名称
      themeName: (darkTheme && ThemeEnum.DARK) || ThemeEnum.LIGHT,
      // themeName: ThemeEnum.LIGHT, // 修改 默认浅色模式
      // 颜色色号
      appTheme,
      appThemeDetail,
      // 新增：全局文字颜色
      globalTextColor: '#e71212ff', // 默认深色
    },
  getters: {
    getDarkTheme(e): boolean {
      return this.darkTheme
    },
    getAppTheme(): string {
      return this.appTheme
    },
    getAppThemeDetail(): AppThemeColorType | null {
      return this.appThemeDetail
    }
  },
  actions: {
    // 新增：更新全局文字颜色
    setGlobalTextColor(color: string) {
      this.globalTextColor = color
      // 同步到本地存储
      setLocalStorage(GO_DESIGN_STORE, {...this.$state, globalTextColor: color})
    },
    // 切换主题
    changeTheme(): void {
      this.darkTheme = !this.darkTheme
      this.themeName = this.darkTheme ? ThemeEnum.DARK : ThemeEnum.LIGHT
      setLocalStorage(GO_DESIGN_STORE, this.$state)
    },
    // 设置颜色
    setAppColor(color: AppThemeColorType): void {
      this.appTheme = color.hex
      this.appThemeDetail = color
      setLocalStorage(GO_DESIGN_STORE, this.$state)
    }
  }
})