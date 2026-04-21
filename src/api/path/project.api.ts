import { http } from '@/api/http'
import { httpErrorHandle } from '@/utils'
import { ContentTypeEnum, RequestHttpEnum, ModuleTypeEnum } from '@/enums/httpEnum'
import { ProjectItem, ProjectDetail } from './project'
import { axiosPre} from '@/settings/httpSetting'

// * 项目列表
export const projectListApi = async (data: object) => {
  try {
    const res = await http(RequestHttpEnum.GET)<ProjectItem[]>(`${axiosPre}${ModuleTypeEnum.PROJECT}/list`, data)
    return res
  } catch {
    httpErrorHandle()
  }
}

// * 新增项目
export const createProjectApi = async (data: object) => {
  try {
    const res = await http(RequestHttpEnum.POST)<{
      /**
       * 项目id
       */
      id: number
    }>(`${axiosPre}${ModuleTypeEnum.PROJECT}/create`, data)
    return res
  } catch {
    httpErrorHandle()
  }
}

// * 获取项目
export const fetchProjectApi = async (data: object) => {
  try {
    const res = await http(RequestHttpEnum.GET)<ProjectDetail>(`${axiosPre}${ModuleTypeEnum.PROJECT}/getData`, data)
    return res
  } catch {
    httpErrorHandle()
  }
}

// * 保存项目
export const saveProjectApi = async (data: object) => {
  try {
    const res = await http(RequestHttpEnum.POST)(`${axiosPre}${ModuleTypeEnum.PROJECT}/save/data`, data)
    return res
  } catch {
    httpErrorHandle()
  }
}


// // * 保存项目
// export const saveProjectApi = async (data: object) => {
//   try {
//     const res = await http(RequestHttpEnum.POST)(
//       `${axiosPre}${ModuleTypeEnum.PROJECT}/save/data`,
//       data,
//       ContentTypeEnum.FORM_URLENCODED
//     )
//     return res
//   } catch {
//     httpErrorHandle()
//   }
// }

// * 修改项目基础信息
export const updateProjectApi = async (data: any) => {
  try {
    const res = await http(RequestHttpEnum.POST)(`${axiosPre}${ModuleTypeEnum.PROJECT}/edit`, data)
    return res
  } catch {
    httpErrorHandle()
  }
}

// * 删除项目
export const deleteProjectApi = async (data: object) => {
  try {
    const res = await http(RequestHttpEnum.DELETE)(`${axiosPre}${ModuleTypeEnum.PROJECT}/delete`, data)
    return res
  } catch {
    httpErrorHandle()
  }
}

// * 修改发布状态 [-1未发布,1发布]
export const changeProjectReleaseApi = async (data: object) => {
  try {
    const res = await http(RequestHttpEnum.PUT)(`${axiosPre}${ModuleTypeEnum.PROJECT}/publish`, data)
    return res
  } catch {
    httpErrorHandle()
  }
}

// * 上传文件
export const uploadFile = async (data: object) => {
  try {
    const res = await http(RequestHttpEnum.POST)<{
      /**
       * 文件地址
       */
      fileName: string,
      fileurl: string,
    }>(`${axiosPre}${ModuleTypeEnum.PROJECT}/upload`, data, ContentTypeEnum.FORM_DATA)
    return res
  } catch {
    httpErrorHandle()
  }
}
/**
 * 查询设备点位列表
 * @param query
 * @returns {*}
 */

export const listDevice= async (data: object) => {
  try {
    const res = await http(RequestHttpEnum.GET)<ProjectDetail>(`/thing/device/list`, data)
    return res
  } catch {
    httpErrorHandle()
  }
}

/**
 * 查询计算点位列表
 * @param query
 * @returns {*}
 */

export const listDevice2= async (data: object) => {
  try {
    const res = await http(RequestHttpEnum.GET)<ProjectDetail>(`/compute/config/list`, data)
    return res
  } catch {
    httpErrorHandle()
  }
}

/**
 * 获取实时数据
 * @param id
 */
export const getRealTimeData = async (data: object) => {
  try {
    const res = await http(RequestHttpEnum.POST)<ProjectDetail>(`/thing/device/realTimeData`, data)
    return res
  } catch {
    httpErrorHandle()
  }
}

/**
 * 新增/修改设备绑定前端元素信息
 * @param id
export const bindDeviceInsertOrUpdate = async (data: object) => {
  try {
    const res = await http(RequestHttpEnum.POST)<ProjectDetail>(`${axiosPre}/bindDevice/insertOrUpdate`, data)
    return res
  } catch {
    httpErrorHandle()
  }
}*/

