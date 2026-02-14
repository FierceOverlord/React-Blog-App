import React, {useState, useEffect} from 'react'
import {Container, Postcard} from "../components/Index"
import appwriteService from "../appwrite/config"
import { useSelector } from 'react-redux'

function Home() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {
        appwriteService.getPosts().then((post) => {
            if(post) {
                setPosts(post.documents)
                setLoading(false)
            }
        })
    }, [])

    if(!authStatus) return <div className='p-40 text-center h-auto'>Please Login or Create Account</div>   

    if(loading) 
        return <div className='p-40 text-center h-auto'>Loading posts...</div> 

  if(posts.length === 0 && authStatus) {
    return (
        <div className='w-full py-8 mt-4 text-center'>
            <Container>
                <div className='flex felx-wrap'>
                    <div className='p-2 w-full'>
                        <h1 className='text-2xl font-bold hover:text-gray-500'>
                            You have no posts. Try creating some 
                        </h1>
                    </div>
                </div>
            </Container>
        </div>
    )
  }

  if(posts.length === 0 && !authStatus) {
    return (
        <div className='w-full py-8 mt-4 text-center'>
            <Container>
                <div className='flex felx-wrap'>
                    <div className='p-2 w-full'>
                        <h1 className='text-2xl font-bold hover:text-gray-500'>
                            Login to read posts 
                        </h1>
                    </div>
                </div>
            </Container>
        </div>
    )
  }

  return(
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {posts.map((post) => (
                    <div key={post.$id} className='p-2 w-1/4'>
                        <Postcard {...post} />
                    </div>
                )) }
            </div>
        </Container>
    </div>
  )
}

export default Home