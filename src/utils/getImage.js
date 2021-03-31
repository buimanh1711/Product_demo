export default (path) => {
  if (path && path !== 'null')
    return `http://localhost:4000/upload/${path}`
  else
    return '/images/defaultimg.jpg'
}