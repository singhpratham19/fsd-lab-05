import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

function PostPage() {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [notFound, setNotFound] = useState(false)

  // READ: get one post by its ID
  useEffect(() => {
    fetch(`/api/posts/${id}`)
      .then((response) => {
        if (!response.ok) throw new Error('Post not found')
        return response.json()
      })
      .then((data) => setPost(data))
      .catch(() => setNotFound(true))
  }, [id])

  return (
    <main className="single-post">
      <Link to="/">Back to all posts</Link>
      {notFound && <h2>Post not found</h2>}
      {post && (
        <>
          <h2>{post.title}</h2>
          <p className="post-author">By {post.author}</p>
          <p className="post-content">{post.content}</p>
        </>
      )}
    </main>
  )
}

export default PostPage
