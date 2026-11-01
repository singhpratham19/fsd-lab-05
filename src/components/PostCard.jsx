import { useState } from 'react'
import { Link } from 'react-router-dom'

function PostCard({ post, onEdit, onDelete }) {
  const [confirming, setConfirming] = useState(false)

  const preview =
    post.content.length > 120 ? `${post.content.slice(0, 120)}...` : post.content

  return (
    <article className="post-card">
      <h3>
        <Link to={`/posts/${post._id}`}>{post.title}</Link>
      </h3>
      <p className="author">By {post.author}</p>
      <p>{preview}</p>

      {confirming ? (
        <>
          <button type="button" className="danger" onClick={() => onDelete(post._id)}>
            Yes, delete
          </button>
          <button type="button" className="secondary" onClick={() => setConfirming(false)}>
            Keep post
          </button>
        </>
      ) : (
        <>
          <button type="button" className="secondary" onClick={() => onEdit(post)}>
            Edit
          </button>
          <button type="button" className="danger" onClick={() => setConfirming(true)}>
            Delete
          </button>
        </>
      )}
    </article>
  )
}

export default PostCard
