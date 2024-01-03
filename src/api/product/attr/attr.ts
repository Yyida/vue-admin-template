import request from '@/utils/request'
import type { categoryResponse, categoryAllResponse, paramsArg } from './type'

enum Api {
  C1_list = '/admin/product/getCategory1',
  C2_list = '/admin/product/getCategory2',
  C3_list = '/admin/product/getCategory3',
  CategoryAll = '/admin/product/attrInfoList',
  SaveOrUpdate_AttrValue = '/admin/product/saveAttrInfo',
}
// 获取一级分类
export const getCategory1List = () => {
  return request.get<any | categoryResponse>(Api.C1_list)
}

// 获取二级分类
export const getCategory2List = (category1Id: paramsArg) => {
  return request.get<any | categoryResponse>(`${Api.C2_list}/${category1Id}`)
}

// 获取三级分类
export const getCategory3List = (category2Id: paramsArg) => {
  return request.get<any | categoryResponse>(`${Api.C3_list}/${category2Id}`)
}

// 获取三个分类下的所有数据
export const getCategoryAll = ({
  category1Id,
  category2Id,
  category3Id,
}: paramsArg) => {
  return request.get<any | categoryAllResponse>(
    Api.CategoryAll + `/${category1Id}/${category2Id}/${category3Id}`,
  )
}

// 保存或更新三级分类属性值
export const saveOrUpdateAttrValue = (data: any) => {
  return request.post<any | categoryAllResponse>(
    Api.SaveOrUpdate_AttrValue,
    data,
  )
}
