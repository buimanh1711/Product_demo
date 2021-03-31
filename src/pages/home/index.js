import MainTemplate from '../../layouts/MainLayout'
import Collection1 from './collection1'
import Latest from './latest'
import Invite from './invite'
import { useEffect, useState } from 'react'
import api from '../../utils/axios'

const Home = () => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        console.log(1)
        api('GET', 'api/posts')
            .then(res => {
                console.log(res)
                if(res.data && res.data.status) {
                    setPosts(res.data.posts)
                }
            })
    }, [])

    return (
        <>
            <MainTemplate>
                <Collection1 posts={posts} />
                <Latest posts={posts} />
                <Collection1 posts={posts} />
                <Invite />
            </MainTemplate>
        </>
    )
}

export default Home