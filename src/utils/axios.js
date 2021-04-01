const axios = require('axios')

const testDeploy = axios.create({
  withCredentials: true,
  baseURL: 'https://manhbui-testdeploy-mblog.herokuapp.com',
})

const api = (method, url, data) => {
  if (method && url) {
    return testDeploy({
      method,
      url,
      data: data || {},
    })
} else {
  console.log('error somt')
  }
}

export default api

