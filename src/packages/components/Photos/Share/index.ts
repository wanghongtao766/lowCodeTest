import { ChartFrameEnum, PackagesCategoryEnum } from '@/packages/index.d'
import { ImageConfig } from '@/packages/components/Informations/Mores/Image/index'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../index.d'

// 远程共享库（调接口获取图像列表）
const imageList = [
  // { imageName: 'carousel1', imageUrl: 'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg' },
  // { imageName: 'carousel2', imageUrl: 'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg' },
  { imageName: '工况主机', imageUrl: 'http://192.168.0.188:9000/private/image/lengji.png' },
  { imageName: '冷却水泵', imageUrl: 'http://192.168.0.188:9000/private/image/shuibeng.png' },
  { imageName: '冷却塔', imageUrl: 'http://192.168.0.188:9000/private/image/lengqueta.png' },
  { imageName: '水阀', imageUrl: 'http://192.168.0.188:9000/private/image/famen.svg' },
  { imageName: '蓄冰槽', imageUrl: 'http://192.168.0.188:9000/private/image/xulengguan-huise.svg' },
  { imageName: '板换', imageUrl: 'http://192.168.0.188:9000/private/image/banhuan.svg' },
  { imageName: '分集水器', imageUrl: 'http://192.168.0.188:9000/private/image/fenjishuiqi.svg' },
  { imageName: '流量计', imageUrl: 'http://192.168.0.188:9000/private/image/liuliangji.svg' },
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
