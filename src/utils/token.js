const KEY = 'heimamm_token'

const setToken = token => {
    localStorage.setItem(KEY,token)
}

const getToken = () => {
    return localStorage.getItem(KEY)
}

const removeToken = () => {
    localStorage.removeItem(KEY)
}

// 按需导出 导出对象
export {setToken,getToken,removeToken}