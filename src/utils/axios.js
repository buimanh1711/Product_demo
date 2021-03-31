const axios = require('axios')

axios.defaults.withCredentials = true
axios.defaults.baseURL = 'https://manhbui-testdeploy-mblog.herokuapp.com'
const api = (method, url, data, responseType) => {
  if(method && url) {
    return axios({
      method,
      url,
      data: data || {},
      headers: {'Content-Type': 'application/json'}
    })
  } else {
    console.log('error somt')
  }
}

export default api

export const apiUpLoad = (data) => {
  return axios({
    method: 'POST',
    url: '/upload',
    data
  })
}
