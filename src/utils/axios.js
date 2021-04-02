import axios from 'axios'

const endpoint = 'http://localhost:5000'
axios.defaults.baseURL = 'https://manhbui-testdeploy-mblog.herokuapp.com'

const api = (method, url, data) => {
  let userToken
  userToken = localStorage.getItem('userToken') || null
  axios.defaults.headers.common = { 'Authorization': `bearer ${userToken}` }
  
  if (method && url) {
    return axios({
      method,
      url,
      data: data || {},
    })
  } else {
    console.log('error somt')
  }
}

export default api

