// 品牌管理列表请求参数类型定义
export interface trademarkFormData {
  page: number
  limit: number
}

// 返回数据类型
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

export interface TradeMark {
  id?: number
  tmName: string
  logoUrl: string
}

export type Records = TradeMark
export interface trademarkResData extends ResponseData {
  data: {
    records: Records
    total: number
  }
}
export interface trademarkParams {
  id?: number
  tmName: string
  logoUrl: string
}

export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

export interface trademarkUpdateData extends ResponseData {
  data: any
}
export interface allTradeMarkListData extends ResponseData {
  data: TradeMark[]
}
