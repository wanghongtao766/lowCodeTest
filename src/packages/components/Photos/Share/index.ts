import { ChartFrameEnum, PackagesCategoryEnum } from '@/packages/index.d'
import { ImageConfig } from '@/packages/components/Informations/Mores/Image/index'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../index.d'

// 远程共享库（调接口获取图像列表）
const imageList = [
  // { imageName: 'carousel1', imageUrl: 'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg' },
  // { imageName: 'carousel2', imageUrl: 'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg' },
  { imageName: '三通-黄', imageUrl: '/private/image/三通-黄.svg' },
  { imageName: '三通-蓝', imageUrl: '/private/image/三通-蓝.svg' },
  { imageName: '三通-绿', imageUrl: '/private/image/三通-绿.svg' },
  { imageName: '弯头-黄', imageUrl: '/private/image/弯头-黄.svg' },
  { imageName: '弯头-蓝', imageUrl: '/private/image/弯头-蓝.svg' },
  { imageName: '弯头-绿', imageUrl: '/private/image/弯头-绿.svg' },




  { imageName: '冷水主机', imageUrl: '/private/image/lengji.png' },
  { imageName: '水泵', imageUrl: '/private/image/shuibeng.png' },
  { imageName: '冷却塔', imageUrl: '/private/image/lengqueta.png' },
  { imageName: '水阀', imageUrl: '/private/image/famen.svg' },
  { imageName: '蓄冰槽', imageUrl: '/private/image/xulengguan-huise.svg' },
  { imageName: '板换', imageUrl: '/private/image/banhuan.svg' },
  { imageName: '分集水器', imageUrl: '/private/image/fenjishuiqi.svg' },
  { imageName: '流量计', imageUrl: '/private/image/liuliangji.svg' },
  { imageName: 'CO', imageUrl: '/private/image/1/CO.png' },
  { imageName: 'CO2', imageUrl: '/private/image/1/CO2.png' },
  { imageName: '电加热', imageUrl: '/private/image/1/电加热.png' },
  { imageName: '阀门2', imageUrl: '/private/image/1/阀门2.png' },
  { imageName: '阀门3', imageUrl: '/private/image/1/阀门3.png' },
  { imageName: '阀门4', imageUrl: '/private/image/1/阀门4.png' },
  { imageName: '分集水器2', imageUrl: '/private/image/1/分集水器2.png' },
  { imageName: '风机1', imageUrl: '/private/image/1/风机1.png' },
  { imageName: '风机2', imageUrl: '/private/image/1/风机2.png' },
  { imageName: '风机3', imageUrl: '/private/image/1/风机3.png' },
  { imageName: '风机4', imageUrl: '/private/image/1/风机4.png' },
  { imageName: '风冷空调1', imageUrl: '/private/image/1/风冷空调1.png' },
  { imageName: '风冷空调2', imageUrl: '/private/image/1/风冷空调2.png' },
  { imageName: '风冷空调3', imageUrl: '/private/image/1/风冷空调3.png' },
  { imageName: '风冷空调4', imageUrl: '/private/image/1/风冷空调4.png' },
  { imageName: '风冷空调5', imageUrl: '/private/image/1/风冷空调5.png' },
  { imageName: '风冷空调6', imageUrl: '/private/image/1/风冷空调6.png' },
  { imageName: '锅炉', imageUrl: '/private/image/1/锅炉.png' },
  { imageName: '换热器2', imageUrl: '/private/image/1/换热器2.png' },
  { imageName: '换热器3', imageUrl: '/private/image/1/换热器3.png' },
  { imageName: '冷却塔2', imageUrl: '/private/image/1/冷却塔2.png' },
  { imageName: '冷水机2', imageUrl: '/private/image/1/冷水机2.png' },
  { imageName: '冷源', imageUrl: '/private/image/1/冷源.png' },
  { imageName: '亮度', imageUrl: '/private/image/1/亮度.png' },
  { imageName: '全空气处理箱1', imageUrl: '/private/image/1/全空气处理箱1.png' },
  { imageName: '全空气处理箱2', imageUrl: '/private/image/1/全空气处理箱2.png' },
  { imageName: '湿度', imageUrl: '/private/image/1/湿度.png' },
  { imageName: '水泵2', imageUrl: '/private/image/1/水泵2.png' },
  { imageName: '水箱2', imageUrl: '/private/image/1/水箱2.png' },
  { imageName: '水箱3', imageUrl: '/private/image/1/水箱3.png' },
  { imageName: '水箱4', imageUrl: '/private/image/1/水箱4.png' },
  { imageName: '温度', imageUrl: '/private/image/1/温度.png' },
]

const photoConfigList = imageList.map(i => ({
  ...ImageConfig,
  category: ChatCategoryEnum.SHARE,
  categoryName: ChatCategoryEnumName.SHARE,
  package: PackagesCategoryEnum.PHOTOS,
  chartFrame: ChartFrameEnum.STATIC,
  image: i.imageUrl,
  dataset: i.imageUrl,
  title: i.imageName,
  redirectComponent: `${ImageConfig.package}/${ImageConfig.category}/${ImageConfig.key}` // 跳转组件路径规则：packageName/categoryName/componentKey
}))

export default photoConfigList
