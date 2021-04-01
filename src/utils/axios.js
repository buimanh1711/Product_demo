const axios = require('axios')

const testDeploy = axios.create({
  baseURL: 'https://manhbui-testdeploy-mblog.herokuapp.com',
  // baseURL: 'http://localhost:5000',

  withCredentials: true,
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

