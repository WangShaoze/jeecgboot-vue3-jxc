import { MockMethod } from 'vite-plugin-mock';

// 模拟商家数据
const merchantData = {
  'data|10-20': [
    {
      'id|+1': 1,
      'name': '@company',
      'code': 'MER@string(6,10,number)',
      'contactPerson': '@cname',
      'contactPhone': /^1[3-9]\d{9}$/,
      'address': '@province @city @district @street',
      'type|1': ['供应商', '经销商', '合作伙伴'],
      'status|0-1': 1,
      'createdAt': '@datetime',
      'updatedAt': '@datetime'
    }
  ],
  total: 20
};

export default [
  // 商家列表接口
  {
    url: '/pengyipeng/tBMerchant/list',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: 'success',
        result: merchantData
      };
    }
  },
  // 其他接口可以在这里继续添加
] as MockMethod[];