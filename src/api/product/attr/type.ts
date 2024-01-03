export interface ResponseData {
  code?: number
  ok?: boolean
  message?: string
}

export interface paramsArg {
  category1Id?: number | string | undefined
  category2Id?: number | string | undefined
  category3Id?: number | string | undefined
}

// 数据类型定义
export type categoryResponseData = {
  id: number | string
  name: string | undefined
  category1Id?: number
  category2Id?: number
}

export interface categoryResponse extends ResponseData {
  data: categoryResponseData[]
  // data: any
}

export type attrValueList = {
  attrId: number
  id: number
  valueName: string
}
export interface categoryAllResponse extends ResponseData {
  data: {
    id: number
    categoryId: number
    attrName: string
    attrValueList: attrValueList[]
  }
}

export type attrValueListType = {
  attrId?: number | string
  id?: number | string
  valueName: string
  flag: boolean
}
export interface attrsParamsAsgType {
  attrName: string
  categoryId?: number | string
  categoryLevel: 3
  id?: number | string
  attrValueList: attrValueListType[]
}
export interface saveOrUpdateAttrValueResponse extends ResponseData {
  data: null | any
}
