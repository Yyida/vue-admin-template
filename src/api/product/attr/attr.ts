import request from '@/utils/request'

enum Api {
  C1_list = '/admin/product/getCategory1',
  C2_list = '/admin/product/getCategory2',
  C3_list = '/admin/product/getCategory3',
  CategoryAll = '/admin/product/attrInfoList',
}
// 获取一级分类
export const getCategory1List = () => {
  return request.get(Api.C1_list)
}

// 获取二级分类
export const getCategory2List = (category1Id: number) => {
  return request.get(`${Api.C2_list}/${category1Id}`)
}

// 获取三级分类
export const getCategory3List = (category2Id: number) => {
  return request.get(`${Api.C3_list}/${category2Id}`)
}

// 获取三个分类下的所有数据
export const getCategoryAll = ({
  category1Id,
  category2Id,
  category3Id,
}: any) => {
  return request.get(
    Api.CategoryAll + `/${category1Id}/${category2Id}/${category3Id}`,
  )
}
