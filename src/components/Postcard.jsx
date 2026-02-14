import React from 'react'
import appwriteService from "../appwrite/config"
import {Link} from 'react-router-dom'

function Postcard({$id, title, featuredImage, authorName}) {
  const imageUrl = featuredImage ? appwriteService.getFilePreview(featuredImage) : null

  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-gray-100 rounded-xl p-4'>
            <div className='w-full justify-center mb-4'>
              {imageUrl && 
                <img src={imageUrl} alt={title} 
                 className='rounded-xl'
                />
              }
            </div>
            <h2>{authorName}</h2>
            <h2 className='text-xl font-bold' >{title}</h2>
        </div>
    </Link>
  )
}

export default Postcard