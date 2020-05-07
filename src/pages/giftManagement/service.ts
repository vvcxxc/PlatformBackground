import request from '@/utils/request'

/**
 * 添加礼品
 * @param data
 */
export const addRealGift = (data:any) => {
  return request.post('/api/v1/gift/matterGift',{data})
}

/**
 * 获取礼品详情
 * @param id 礼品id
 */
export const getGiftDetails = (id: string) => {
  return request.get('/api/v1/gift/' + id)
}


