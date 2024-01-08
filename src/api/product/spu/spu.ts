import request from '@/utils/request'

import type { spuListResponseData, paramsReqArg } from './type'

enum Api {
  Spu_list = `/admin/product`,
}
// 获取三级类型下的spu数据列表
export const fetchCategory3SpuList = (params: paramsReqArg | any) => {
  // 将 params 对象赋值给参数对象，以传递参数给 request.get 方法
  const { page, limit, ...pathParams } = params
  return request.get<any | spuListResponseData>(
    `${Api.Spu_list}/${page}/${limit}`,
    // 使用参数对象中的属性作为路径参数
    { params: pathParams },
  )
}
