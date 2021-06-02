import Mock from 'mockjs'
import homeApi from './home'
import userApi from './user'

// 設置200-2000毫秒延時請求數據
// Mock.setup({
//   timeout: '200-2000'
// })

// 首頁相關
// 攔截的是 /home/getData
Mock.mock(/\/home\/getData/, 'get', homeApi.getStatisticalData)

// 用戶相關
Mock.mock(/\/user\/getUser/, 'get', userApi.getUserList)
Mock.mock(/\/user\/del/, 'get', userApi.deleteUser)
Mock.mock(/\/user\/batchremove/, 'get', userApi.batchremove)
Mock.mock(/\/user\/add/, 'post', userApi.createUser)
Mock.mock(/\/user\/edit/, 'post', userApi.updateUser)
Mock.mock(/\/home\/getData/, 'get', homeApi.getStatisticalData)


