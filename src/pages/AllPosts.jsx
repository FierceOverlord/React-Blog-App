import React, { useState, useEffect } from 'react'
import { Container, Postcard } from '../components/Index'
import appwriteService from "../appwrite/config"


function AllPosts() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        appwriteService.getPosts([]).then((posts) => {
            if(posts) {
                setPosts(posts.documents)
                setLoading(false)
            }
        })
    }, [])

    if(loading) 
        return <div className='p-40 text-center h-auto'>Loading posts...</div> 

  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {posts.map((post) => (
                    <div key={post.$id} className='p-2 w-1/4'>
                        <Postcard $id={post.$id} key={post.$id} title={post.title} featuredImage={post.featuredImage} authorName={post.authorName} />
                    </div>
                ))}
            </div>
        </Container>
    </div>
  )
}

export default AllPosts