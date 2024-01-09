import request from '@/utils/request'
import type {
  trademarkFormData,
  trademarkResData,
  trademarkParams,
  ResponseData,
  trademarkUpdateData,
  allTradeMarkListData,
} from './type'

enum Api {
  trademarkList = '/admin/product/baseTrademark/',
  addTrademark = '/admin/product/baseTrademark/save',
  updateTrademark = '/admin/product/baseTrademark/update',
  deleteTrademark = '/admin/product/baseTrademark/remove/',
  allTradeMarkList = '/admin/product/baseTrademark/getTrademarkList',
}

// 获取品牌管理列表
export const getTrademarkList = ({ page, limit }: trademarkFormData) => {
  return request.get<any, trademarkResData>(
    Api.trademarkList + `${page}/${limit}`,
  )
}

// 添加品牌
export const addTrademark = (data: trademarkParams) => {
  return request.post<any, ResponseData>(Api.addTrademark, data)
}

// 更新品牌
export const updateTrademark = (data: trademarkParams) => {
  return request.put<any, trademarkUpdateData>(Api.updateTrademark, data)
}
// 删除品牌
export const deleteTrademark = (id: number) => {
  return request.delete<any, ResponseData>(Api.deleteTrademark + id)
}

// 获取所有品牌数据
export const getAllTradeMarkList = () => {
  return request.get<any, allTradeMarkListData>(Api.allTradeMarkList)
}
