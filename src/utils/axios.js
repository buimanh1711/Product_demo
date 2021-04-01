import axios from 'axios'



axios.defaults.baseURL = 'https://manhbui-testdeploy-mblog.herokuapp.com'
// axios.defaults.baseURL = 'http://localhost:5000'

const api = (method, url, data) => {
  let userToken
  userToken = localStorage.getItem('userToken') || 'abc'
  axios.defaults.headers.common = { 'Authorization': `bearer ${userToken}` }
  console.log(userToken)
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

