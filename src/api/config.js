import axios from 'axios'

// 創建一個axios實例
const service = axios.create({
    // 請求超時時間
    timeout: 3000
})

// 添加請求攔截器
service.interceptors.request.use(
    config => {
        return config
    },
    err => {
        console.log(err)
    }
)

//回應攔截
service.interceptors.response.use(
    response => {
        let res = {}
        res.status = response.status
        res.data = response.data
        return res
    },
    err => console.log(err)
)

export default service

