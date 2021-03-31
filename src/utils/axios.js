const axios = require('axios')

axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:4000'
const api = (method, url, data, responseType) => {
  if(method && url) {
    return axios({
      method,
      url,
      data: data || {},
    })
  } else {
    console.log('error')
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