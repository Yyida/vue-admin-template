import request from '@/utils/request'
import type {
  trademarkFormData,
  trademarkResData,
  trademarkParams,
  ResponseData,
} from './type'

enum Api {
  trademarkList = '/admin/product/baseTrademark/',
  addTrademark = '/admin/product/baseTrademark/save',
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
