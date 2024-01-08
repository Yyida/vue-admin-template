export interface ResponseData {
  code: number
  msg: string
  ok: boolean
}

export interface paramsReqArg {
  page: number
  limit: number
  categoryId: number | string
}
interface RecordsItem {
  category3Id: number
  createTime: string
  description: string
  id: number
  spuName: string
  tmId: number
  updateTime: string
}

export type Records = RecordsItem[]

export interface spuListResponseData extends ResponseData {
  data: {
    total: number
    records: Records
  }
}
