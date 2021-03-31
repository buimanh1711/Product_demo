import { Link, useHistory } from 'react-router-dom'
import TextareaAutosize from 'react-textarea-autosize'
import { useState, useRef } from 'react'
import moment from 'moment'
import getImage from '../utils/getImage'
import { connect } from 'react-redux'
import { toggleLoading } from '../redux/actions/webActions'
import api from '../utils/axios'

const PostListSelector = (props) => {
  const history = useHistory()
  const { web } = props

  const { posts } = props
  const [comment, setComment] = useState(null)
  const [cmtLoading, setCmtLoading] = useState(false)
  const [commentList, setCommentList] = useState([])
  const [deleteConfirm, setDeleteConfirm] = useState(false)
  const [deletedPost, setDeletedPost] = useState({})

  const commentEl = useRef(null)

  const toggleComment = (index, postId) => {
    if (index === comment) {
      setComment(null)
    } else {
      getComment(postId)
      setComment(index)
    }
  }

  const toggleDeleteForm = (info) => {
    setDeleteConfirm(!deleteConfirm)
    setDeletedPost(info)
  }

  const getComment = (postId) => {
    setCmtLoading(true)
    api("GET", `api/posts/comment/${postId}?page=${1}`)
      .then(res => {
        if (res.data && res.data.status) {
          if (res.data.comments && res.data.comments.length > 0) {
            setCommentList(res.data.comments)
          }
        } else {
          setCommentList([])
        }
      })
      .catch(err => console.log(err))
      .then(() => {
        setCmtLoading(false)
      })
  }

  const sendComment = (item, index) => {
    const postId = item._id
    setCmtLoading(true)
    const value = commentEl.current.value

    const postData = {
      postId: postId,
      content: value
    }

    api('POST', `/api/posts/comment/${postId}`, postData)
      .then(res => {
        if (res.data && res.data.status) {
          const commentCount = [...item.comment]
          commentCount.push({ content: postData.content })

          const newPostList = [
            ...posts.slice(0, index),
            {
              ...item,
              comment: commentCount
            },
            ...posts.slice(index + 1)
          ]
          props.setPosts(newPostList)
          commentEl.current.value = ''
          
          let newComtList = commentList
          if (newComtList.length > 3)
            newComtList = [...commentList.slice(1)]
            console.log(newComtList)
          setCommentList(
            [
              ...newComtList,
              {
                user: {
                  _id: web.user.userId,
                  firstName: web.user.firstName,
                  lastName: web.user.lastName,
                  image: web.user.userImage
                },
                ...postData
              }
            ]
          )
        } else {
          if (res.data.message === 'khong the lay token') {
            history.replace({ pathname: '/sign-in' })
          }
        }
      })
      .catch(err => console.log(err))
      .then(() => {
        setCmtLoading(false)
      })
  }

  const deletePost = (postId, authorId, title) => {

    api('POST', `api/posts/delete/${postId}`, { postId, authorId })
      .then(res => {
        if (res.data && res.data.status) {
          setDeleteConfirm(false)
          props.removeEl(postId)
        }
      })
      .catch(err => {
        console.log(err)
        alert('Error!')
      })
  }

  return <div className='postList'>
    <div style={{ display: deleteConfirm ? 'block' : 'none' }} className='delete-confirm'>
      <div className='confirm-container'>
        <p>Do you want to delete this post?</p>
        <div className='btns'>
          <button onClick={() => deletePost(deletedPost._id, deletedPost.author._id)} className='delete'>Delete</button>
          <button onClick={() => setDeleteConfirm(!deleteConfirm)} >Cancel</button>
        </div>
      </div>
    </div>
    <div className='postList-container'>
      {
        posts && posts.length > 0 && posts.map((item, index) => {
          return (
            <div key={item._id} className='postList-list'>
              <div className='mb-user-info'>
                <Link to={`/posts/${item.slug}`}>{item.author && item.author.firstName}</Link>
                <span> - {moment(item.createDate).format('DD/MM/YYYY')}</span>
              </div>
              <div className='postList-list-container'>
                <div className='info-container'>
                  <div className='user-container'>
                    <Link to={`/posts/${item.slug}`}>
                      <img src={getImage(item.image)} />
                    </Link>
                    <Link to={`/posts/${item.slug}`} className='username'>
                      {item.author && item.author.firstName}
                    </Link>
                  </div>
                  <div className='create-time'>
                    <span>{moment(item.createDate).format('DD/MM/YYYY')}</span>
                  </div>
                </div>
                <div className='content-container'>
                  {
                    props.author &&
                    <div className='author-role'>
                      <Link to={`/posts/update/${item._id}`} style={{ color: 'rgb(84, 84, 216)' }}>Edit</Link>
                      <button onClick={() => toggleDeleteForm(item)} className='delete'>
                        <i className="far fa-trash-alt"></i>
                      </button>
                    </div>
                    ||
                    null
                  }
                  <Link to={`/posts/${item.slug}`} className='post-title'>
                    {item.title}
                  </Link>
                  <p className='category'>{item.category?.name || 'null'}</p>
                  <p className='content'>
                    {item.description}
                  </p>
                  <Link to={`/posts/${item.slug}`} className='read-more'>
                    Read more...
                  </Link>
                  {
                    !props.search &&
                    <>
                      <div className='tools'>
                        <button onClick={() => props.likeHandle(item, index)} className='like'>
                          {
                            item.liked &&
                            <>
                              <i className="fas fa-heart"></i>
                              <span>{`You ${item.like && item.like.length > 1 ? `and ${item.like.length - 1} others` : ''}`}</span>
                            </>
                            ||
                            <>
                              <i className="far fa-heart"></i>
                              <span>{`${item.like && item.like.length === 0 ? `Like this post` : `${item.like.length} people`}`}</span>
                            </>
                          }
                        </button>
                        <button className={comment === index ? 'comment active' : 'comment'} onClick={() => toggleComment(index, item._id)}>
                          <i className="far fa-comments"></i>
                          <span>{item.comment && item.comment.length || 0}</span>
                        </button>
                        <button className='share'>
                          <i className="fas fa-share"></i>
                        </button>
                        <button className='add'>
                          <i className="far fa-plus-square"></i>
                        </button>
                      </div>
                      {
                        comment === index &&
                        <div className='comments active'>
                          <div className='comment-list'>
                            {
                              commentList && commentList.length > 0 &&
                              <ul>
                                {
                                  commentList.map(item => (
                                    <li key={item.id} className='comment-item'>
                                      <div className='comment-author'>
                                        <Link to={`/`}>
                                          <img src={getImage(item.user.image)} />
                                        </Link>
                                        <Link to={`/`}>
                                          {`${item.user.firstName} ${item.user.lastName}`}
                                        </Link>
                                      </div>
                                      <div className='comment-content'>
                                        <p>
                                          {item.content}
                                        </p>
                                      </div>
                                    </li>
                                  ))
                                }
                                {
                                  cmtLoading &&
                                  <li className='postList-comment-loading'>
                                    <img src='/images/cmtloading.gif' />
                                  </li>
                                }
                              </ul>
                              ||
                              <p className='comemnt-list comment-alert'>There are not any comment. write your mind?</p>
                            }
                          </div>
                          <div className='user-comment'>
                            <img src={getImage(web.user.userImage)} />
                            <div className='comment-input-container'>
                              <TextareaAutosize id={item._id} key={item._id} ref={commentEl} placeholder='write a comment...' className='comment-input' />
                              <button onClick={() => sendComment(item, index)}>
                                <i className="far fa-paper-plane"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      }
                    </>
                  }
                </div>
              </div>
              <hr className='boundary' />

            </div>
          )
        }
        )
        ||
        <p>Không có bài viêt nào.</p>
      }
    </div>
  </div>
}

const mapStateToProps = state => ({
  web: state.web
})

const mapActionToProps = {
  toggleLoading
}

const PostList = connect(mapStateToProps, mapActionToProps)(PostListSelector)
export default PostList