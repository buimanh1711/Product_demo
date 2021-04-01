export default (path) => {
  if (path && path !== 'null')
    return `https://manhbui-testdeploy-mblog.herokuapp.com/upload/${path}`
  else
    return '/images/defaultimg.jpg'
}