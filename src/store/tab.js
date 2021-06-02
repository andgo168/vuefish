export default {

    //存儲資料
    state: {
        isCollapse: false,
        currentMenu: null,
        tabsList: [
            {
                path: '/',
                name: 'home',
                label: '首頁',
                icon: 'home'
            }
        ]
    },
    //調用方法
    mutations: {
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse
        },
        //選擇標籤 選擇麵包屑
        selectMenu(state, val) {
            if (val.name === 'home') {
                state.currentMenu = null
            } else {
                state.currentMenu = val
                //如果等於-1說明tabsList不存在那麼插入，否則什麼都不做
                let result = state.tabsList.findIndex(item => item.name === val.name)
                result === -1 ? state.tabsList.push(val) : ''

            }
            // val.name === 'home' ? (state.currentMenu = null) : (state.currentMenu = val)
        },
        //關閉標籤
        closeTab(state, val) {
            let result = state.tabsList.findIndex(item => item.name === val.name)
            state.tabsList.splice(result, 1)
        },
    },
    actions: {}
}

